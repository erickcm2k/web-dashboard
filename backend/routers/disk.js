const express = require("express");
const router = new express.Router();

const pool = require("../db/pool");
const todayString = require("../utils/today");
// Consulta para día actual / última hora.
// http://localhost:3000/disk/
router.get("/disk/", async (req, res) => {
  let today = todayString();
  console.log(`Fecha actual: ${today}`);
  const query = `
  SELECT top 20
  Servidor, Unidad, Etiqueta, CapacidadTotal, CapacidadUso, CapacidadLibre, PorcLibre, FORMAT(FechaMonitoreo, 'yyyy/MM/dd hh:mm:ss') as FechaMonitoreo
  FROM Tbl_CapacidadDisco
  WHERE CapacidadUso > 80
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
// http://localhost:3000/disk/interval/?initialDate=2021-01-02&finalDate=2021-01-28
// Ejemplo con fecha
// http://localhost:3000/disk/interval/?initialDate=2021-01-02&finalDate=2021-01-28&initialHour=01:00&finalHour=23:59

router.get("/disk/interval/", async (req, res) => {
  const { initialDate, finalDate, initialHour, finalHour } = req.query;
  let query = "";

  // Si no se especifica un intervalo de tiempo, se tendrán valores por defecto.
  if (initialHour && finalHour) {
    console.log(`Intervalo entre ${initialHour} ${finalHour}`);

    query = `
    SELECT top 20
    Servidor, Unidad, Etiqueta, CapacidadTotal, CapacidadUso, CapacidadLibre, PorcLibre, FORMAT(FechaMonitoreo, 'yyyy/MM/dd hh:mm:ss') as FechaMonitoreo
    FROM Tbl_CapacidadDisco
    WHERE CapacidadUso > 80
    AND FechaMonitoreo between '${initialDate} ${initialHour}' AND '${finalDate} ${finalHour}'
    ORDER BY FechaMonitoreo DESC
    `;
  } else {
    console.log("No se ingresó un intervalo de tiempo.");
    query = `
    SELECT top 20
    Servidor, Unidad, Etiqueta, CapacidadTotal, CapacidadUso, CapacidadLibre, PorcLibre, FORMAT(FechaMonitoreo, 'yyyy/MM/dd hh:mm:ss') as FechaMonitoreo
    FROM Tbl_CapacidadDisco
    WHERE CapacidadUso > 80
    AND FechaMonitoreo between '${initialDate} 00:00' AND '${finalDate} 23:59'
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
