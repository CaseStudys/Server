const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const db = require("./db");
const cronJob = require("cron").CronJob;

const employeeRouter = require("./routers/employee/route.js");
const exhibitRouter = require("./routers/exhibit/route.js");
const testRouter = require("./routers/test/route.js");
const flgRouter = require("./routers/flg/route.js");
const carRouter = require("./routers/car/route.js");
const carPicturesRouter = require("./routers/car/picuture/route.js");
const ledgerRouter = require("./routers/ledger/route.js");
const managementRouter = require("./routers/management/route.js");
const managementdetailRouter = require("./routers/management/detail/route.js");
const loginRouter = require("./routers/login/route.js");
const usersignupRouter = require("./routers/user/signup/route.js");
const auctionRouter = require("./routers/auction/route.js");
const logoutRouter = require("./routers/logout/route.js");
const userRouter = require("./routers/user/route.js");
const bidRouter = require("./routers/bid/route.js");
const userPaymentRouter = require("./routers/user_payment/route.js");

app.use(express.json());
app.use(cors());
app.use("/", employeeRouter);
app.use("/", exhibitRouter);
app.use("/", testRouter);
app.use("/", flgRouter);
app.use("/", carRouter);
app.use("/", carPicturesRouter);
app.use("/", ledgerRouter);
app.use("/", managementRouter);
app.use("/", managementdetailRouter);
app.use("/", loginRouter);
app.use("/", usersignupRouter);
app.use("/", auctionRouter);
app.use("/", logoutRouter);
app.use("/", userRouter);
app.use("/", bidRouter);
app.use("/", userPaymentRouter);
app.use(express.static("pictures"));
app.use(express.static("public"));

const http_socket = require("http").Server(app);
const io_socket = require("socket.io")(http_socket);

http_socket.listen(PORT, console.log(`✋ Server Start:ポート番号${PORT}番 ✋`));

/*-------------------- WebSocket -------------------- */
io_socket.on("connection", async (socket) => {
  socket.on("c2s_bid", (msg) => {
    const userId = msg.userId;
    const exhibitId = msg.exhibitId;
    const bidPrice = msg.price;

    db.mysql_connection.beginTransaction(async (err) => {
      if (err) throw err;
      //現在の最高入札額を取得
      await db.mysql_connection.query(
        "SELECT price FROM bids WHERE exhibit_id = ? ORDER BY price DESC LIMIT 1;",
        [exhibitId],
        async (error, result) => {
          if (error) {
            db.mysql_connection.rollback(() => {
              throw err;
            });
          }
          let price;
          if (result.length === 0) {
            //現在の最高入札額を取得（初期入札の場合）
            await db.mysql_connection.query(
              "SELECT cars.purchace_price * 1.1 as purchace_price from exhibits LEFT JOIN cars ON exhibits.car_id = cars.car_id WHERE exhibits.exhibit_id = ?;",
              [exhibitId],
              (error, result) => {
                price = result[0].purchace_price;
              }
            );
          } else {
            //現在の最高入札額を取得（二回目以降の入札の場合）
            price = result[0].price;
          }

          if (price >= bidPrice) {
            //入札額が現在価格よりも低い場合処理を中断。
            db.mysql_connection.rollback();
            return;
          }
        }
      );
      //入札情報を保存
      await db.mysql_connection.query(
        "INSERT INTO bids(exhibit_id,user_id,price) VALUES(?,?,?)",
        [exhibitId, userId, bidPrice],
        (error, result) => {
          if (error) {
            db.mysql_connection.rollback(() => {
              throw err;
            });
          }
        }
      );
      //コミットして最高入札額をクライアントに通知
      db.mysql_connection.commit((err) => {
        if (err) {
          db.mysql_connection.rollback(() => {
            throw err;
          });
        }

        const sendData = {
          price: bidPrice,
          userId: userId,
        };
        io_socket.emit("s2c_bid", sendData);
      });
    });
  });
});

/*------------------- 落札定時処理一括 -------------------- */
//毎週土曜日当日に終了するオークション全ての落札処理を予約する。
//毎週土曜深夜三時に実行;
const endCronTime = "43 17 * * 1";
//"0 3 * * 1"
//↑テストする場合 例 "5 15 * * 2"月曜にテストする場合、昼三時五分に実行されるようにする。
//プレゼンは、"分 時 日 月 2""
//本番は、"0 3 * * 6"
new cronJob({
  cronTime: endCronTime,
  context: {},
  //アロー記法だと動きません。
  onTick: function () {
    console.log("初期予約実行だぜ！！！");
    createEndReservations();
  },
  //動きません。。。なぜ？？（必要ないから大丈夫）
  onComplete: function () {
    console.log("done!!!!");
  },
  start: true,
});
/*
現在日に終了予定の出品物のexhibit_idを一括取得し
取得した出品IDごとの出品物のオークション終了時の定時処理を予約する関数
*/
const createEndReservations = () => {
  //sqlで使用するため、現在日時（datetime）を取得後yyyy-mm-ddにする。
  const now = new Date();
  const fullYear = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const fullMonth = month < 10 ? `0${month}` : month;
  const fullDay = day < 10 ? `0${day}` : day;
  const fullDate = `${fullYear}-${fullMonth}-${fullDay}`;

  db.mysql_connection.connect(async (err) => {
    //現在日にオークションが終了する出品物のexhibit_idを取得
    await db.mysql_connection.query(
      `SELECT exhibit_id,start_date FROM exhibits WHERE DATE_FORMAT(start_date, '%Y-%m-%d') = DATE_FORMAT(?, '%Y-%m-%d');`,
      [fullDate],
      (error, results) => {
        console.log("createEndReservations sql結果", results);
        if (error) throw error;
        //取得したexhibit_id分（出品物分）の定時処理（落札処理）を予約する
        for (let result of results) {
          //定時処理予約に使う、オークション終了時間の＋５秒後を取得
          const startDate = new Date(result.start_date);
          const endDate = new Date(
            startDate.setMinutes(startDate.getMinutes() + 5)
          );
          const reservationDate = new Date(
            endDate.setSeconds(endDate.getSeconds() + 5)
          );
          //定時処理を予約
          createEndReservation(reservationDate, result);
        }
      }
    );
  });
};

/*一つの出品物の定時処理（落札処理）を予約する関数。
その出品物の最高額入札者とその入札情報を取得し、projectsに登録
入札者がいなかった場合、出品データを削除する。
*/
const createEndReservation = (date, result) => {
  const endCronTime = date;
  if (new Date() > endCronTime) return;
  console.log("endCronTime", endCronTime);
  const data = result;
  //落札時の定時処理を予約
  new cronJob({
    cronTime: endCronTime,
    context: {
      data: data,
    },
    //アロー記法だと動きません。
    onTick: function () {
      //最高入札者と入札情報を取得
      const exhibitId = this.data.exhibit_id;
      console.log("createReservation2", this.data, this.data);
      db.mysql_connection.connect((error) => {
        db.mysql_connection.query(
          "SELECT * FROM bids WHERE exhibit_id = ? and price IN(SELECT max(price) as price from bids WHERE exhibit_id = ?);",
          [exhibitId, exhibitId],
          (error, result) => {
            if (error) throw error;
            if (result.length !== 0) {
              const bidData = result[0];
              //最高入札者と入札情報を取得した場合
              //落札処理
              //購入日時を取得
              const now = new Date();
              //支払い期日を取得
              const date = new Date();
              const dueDate = new Date(date.setDate(date.getDate() + 7));
              //purojectsテーブルに落札情報をINSERT
              db.mysql_connection.query(
                `INSERT INTO projects(exhibit_id,buyer_id,price,purchase_date,due_date,repair_service_flg,car_inspection_service_flg,documents_flg,shipped_flg,delivered_flg,deposit_apply_flg,reminder_flg,cancel_flg,illegal_action_flg,payment_flg,receipt_contact_flg)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                  exhibitId,
                  bidData.user_id,
                  bidData.price,
                  now,
                  dueDate,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                ],
                (error, results) => {
                  if (error) throw error;
                  console.log("success通過");
                  io_socket.emit(`success_${bidData.user_id}`, "yeah!!!!!!!");
                }
              );
            } else {
              //最高入札者と入札情報を取得できなかった場合（入札なしで終了した場合）
              //入札データと出品データを削除
              db.mysql_connection.query(
                "DELETE FROM bids WHERE exhibit_id = ?;" +
                  "DELETE FROM exhibits WHERE exhibit_id = ?;",
                [exhibitId, exhibitId],
                (error, result) => {
                  console.log("delete通過");
                  if (error) throw error;
                }
              );
            }
          }
        );
      });
    },
    //動きません。。。なぜ？？（必要ないから大丈夫）
    onComplete: function () {
      console.log("done!!!!");
    },
    start: true,
  });
};

/*
SELECT exhibits.exhibit_id,COALESCE(a.user_id,0) as user_id,COALESCE(b.price,0) as price,exhibits.start_date from bids a INNER JOIN (SELECT exhibit_id,MAX(price) AS price FROM bids GROUP BY exhibit_id) b ON a.price = b.price RIGHT JOIN exhibits ON b.exhibit_id = exhibits.exhibit_id WHERE DATE_FORMAT(exhibits.start_date, '%Y-%m-%d') = DATE_FORMAT(${fullDate}, '%Y-%m-%d')
*/

/*------------------- 業者月末締め翌月払い定時処理一括 -------------------- */
//月初めに...
//select user_id,total_id from Project where 先月分　かつ　従業員　かつ総額にして取得して...
//usersのtotal_priceに入れる。

const closingCronTime = "31 18 * * 1"; //
//本番はこっち。毎月1日の深夜3時に実行"0 3 1 * *"
new cronJob({
  cronTime: closingCronTime,
  context: {},
  //アロー記法だと動きません。
  onTick: function () {
    console.log("月締予約実行！！！");
    closingReservation();
  },
  //動きません。。。なぜ？？（必要ないから大丈夫）
  onComplete: function () {
    console.log("done!!!!");
  },
  start: true,
});

const closingReservation = () => {
  const nowDate = new Date();
  const date = new Date();
  const beforeDate = new Date(date.setMonth(date.getMonth() - 1));
  const placeholder = [nowDate, beforeDate];
  const test = ["2022-01-24", "2022-02-01"]; //プレゼンはこっち
  db.mysql_connection.connect((err) => {
    db.mysql_connection.query(
      "SELECT users.user_id from users LEFT JOIN projects ON users.user_id = projects.buyer_id WHERE projects.purchase_date >= ? and projects.purchase_date < ? and users.distinction = 1 GROUP BY users.user_id",
      test,
      (err, result) => {
        if (err) throw err;
        const traderIds = [];
        for (let f of result) {
          traderIds.push(f.user_id);
        }
        if (traderIds.length === 0) return;
        db.mysql_connection.query(
          "UPDATE projects SET payment_flg = 1,deposit_apply_flg = 1 WHERE buyer_id IN (?)",
          [traderIds],
          (err, result) => {
            if (err) throw err;
          }
        );
      }
    );
  });
};

closingReservation();
