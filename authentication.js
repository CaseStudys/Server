const db = require("./db.js");
const TEST_MODE = true; //trueにすると、cookie認証が必ず成功するようになります。
const auth = async (req) => {
  return new Promise((resolve) => {
    if (TEST_MODE) return resolve(true);

    const cookieRoot =
      req.headers.cookie !== undefined ? req.headers.cookie : false;

    if (!cookieRoot) return resolve(false);

    const cookieDataList = cookieRoot
      .split(";")
      .map((cookieData) => cookieData.trim());
    const fullName = cookieDataList.find((cookieData) =>
      cookieData.startsWith("name=")
    );
    const fullPassword = cookieDataList.find((cookieData) =>
      cookieData.startsWith("password=")
    );

    if (fullName === undefined || fullPassword === undefined) {
      return resolve(false);
    }

    const name = decodeURIComponent(fullName.split("=")[1]);
    const password = decodeURIComponent(fullPassword.split("=")[1]);

    db.mysql_connection.connect((err) => {
      const placeholder = [name, password];
      db.mysql_connection.query(
        "SELECT * FROM users WHERE name = ? AND password = ?;",
        placeholder,
        (err, result) => {
          if (err) return resolve(false);

          return resolve(result.length !== 0 ? true : false);
        }
      );
    });
  });
};

module.exports = auth;
