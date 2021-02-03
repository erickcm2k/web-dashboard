const express = require("express");
const router = new express.Router();

const pool = require("../db/pool");
const todayString = require("../utils/today");
// Consulta para día actual / última hora.
// http://localhost:3000/cpumem/
router.get("/cpumem/", async (req, res) => {
  let today = todayString();
  console.log(`Fecha actual: ${today}`);
  const query = `
  SELECT TOP 20
  Servidor, PorcUsoCPU, PorcUsoMemoria, FORMAT(FechaMonitoreo, 'yyyy/MM/dd hh:mm:ss') as FechaMonitoreo
  FROM Tbl_CapacidadCPU_MEM
  WHERE cast(PorcUsoCPU AS FLOAT) > 80
  AND FechaMonitoreo BETWEEN '${today} 01:00' AND '${today} 23:59'
  ORDER BY FechaMonitoreo DESC
  `;
  await pool.connect();
  try {
    const request = pool.request();
    const result = await request.query(query);
    res.send(result.recordset);
  } catch (err) {
    console.error("SQL error", err);
    console.log(err);
    res.sendStatus(400).send();
  }
});

// Consulta para un intervalo de fecha y/u hora.
// Ejemplo sin fecha
// http://localhost:3000/cpumem/interval/?initialDate=2020-01-02&finalDate=2021-01-28
// Ejemplo con fecha
// http://localhost:3000/cpumem/interval/?initialDate=2020-01-02&finalDate=2021-01-28&initialHour=01:00&finalHour=23:59

router.get("/cpumem/interval/", async (req, res) => {
  const { initialDate, finalDate, initialHour, finalHour } = req.query;
  let query = "";

  // Si no se especifica un intervalo de tiempo, se tendrán valores por defecto.
  if (initialHour && finalHour) {
    console.log(
      `Intervalo entre ${initialDate} ${initialHour} y ${finalDate} ${finalHour}`
    );
    query = `
    SELECT TOP 20
    Servidor, PorcUsoCPU, PorcUsoMemoria, FORMAT(FechaMonitoreo, 'yyyy/MM/dd hh:mm:ss') as FechaMonitoreo
    FROM Tbl_CapacidadCPU_MEM
    WHERE cast(PorcUsoCPU AS FLOAT) > 80
    AND FechaMonitoreo BETWEEN '${initialDate} ${initialHour}' AND '${finalDate} ${finalHour}'
    ORDER BY FechaMonitoreo DESC
    `;
  } else {
    console.log(`Intervalo entre ${initialDate} y ${finalDate}`);
    query = `
    SELECT TOP 20
    Servidor, PorcUsoCPU, PorcUsoMemoria, FORMAT(FechaMonitoreo, 'yyyy/MM/dd hh:mm:ss') as FechaMonitoreo
    FROM Tbl_CapacidadCPU_MEM
    WHERE cast(PorcUsoCPU AS FLOAT) > 80
    and FechaMonitoreo between '${initialDate} 00:00' and '${finalDate} 23:59'
    ORDER BY FechaMonitoreo DESC
    `;
  }
  await pool.connect();
  try {
    const request = pool.request();
    const result = await request.query(query);
    res.send(result.recordset);
  } catch (err) {
    console.error("SQL error", err);
    console.log(err);
    res.sendStatus(400).send();
  }
});

module.exports = router;
