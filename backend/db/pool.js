const mssql = require("mssql");

const config = {
  user: "sa",
  password: "Cometota12",
  server: "localhost",
  database: "monitoreo",
  options: {
    trustedconnection: true,
    enableArithAbort: true,
  },
  port: 1433,
};

const pool = new mssql.ConnectionPool(config);

pool.on("errro", (err) => {
  console.log(err);
});

module.exports = pool;
