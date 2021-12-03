const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const employeeRouter = require("./routers/employee/route.js");
const exhibitRouter = require("./routers/exhibit/route.js");

app.use(express.json());
app.use(cors());
app.use("/", employeeRouter);
app.use("/", exhibitRouter);

app.listen(PORT, console.log(`✋ Server Start:ポート番号${PORT}番 ✋`));
