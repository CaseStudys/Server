const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const employeeRouter = require("./routers/employee/route.js");
const exhibitRouter = require("./routers/exhibit/route.js");
const testRouter = require("./routers/test/route.js");
const flgRouter = require("./routers/flg/route.js");
const carRouter = require("./routers/car/route.js");
const ledgerRouter = require("./routers/ledger/route.js");
const managementRouter = require("./routers/management/route.js");
const managementdetailRouter = require("./routers/management/detail/route.js");
const loginRouter = require("./routers/login/route.js");
const usersignupRouter = require("./routers/user/signup/route.js");

app.use(express.json());
app.use(cors());
app.use("/", employeeRouter);
app.use("/", exhibitRouter);
app.use("/", testRouter);
app.use("/", flgRouter);
app.use("/", carRouter);
app.use("/", ledgerRouter);
app.use("/", managementRouter);
app.use("/", managementdetailRouter);
app.use("/", loginRouter);
app.use("/", usersignupRouter);

app.listen(PORT, console.log(`✋ Server Start:ポート番号${PORT}番 ✋`));
