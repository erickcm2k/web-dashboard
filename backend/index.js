const express = require("express");
const cors = require("cors");
const app = express();
const cpuMemRouter = require("./routers/cpuMem");
const diskRouter = require("./routers/disk");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cpuMemRouter);
app.use(diskRouter);

app.listen(port, () => {
  console.log("Servidor activo.");
});
