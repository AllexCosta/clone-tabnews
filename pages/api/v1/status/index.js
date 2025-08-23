import database from "infra/database.js";
import { Connection } from "pg";

async function status(request, response) {
  // Atribui data e hora atual convertida em ISO para a constante `updatedAd`
  const updatedAt = new Date().toISOString();
  /*
    Atribui a váriavel `queryPgVersion` o resultado da query "SELECT version();"
    Atribui a constante `pgVersion` somente o valor `PostregsSQL (Versão)`
  */
  let queryPgVersion = await database.query("SHOW server_version;");
  const pgVersion = queryPgVersion.rows[0].server_version;
  /*
    Atribui a váriavel `queryMaxConnections` o resultado da query "SHOW max_connections;"
    Atribui a constante `maxConnections` somente o valor `Máximo de Conexões`
  */
  let queryMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = queryMaxConnections.rows[0].max_connections;
  /*
    Atribui a váriavel `queryUsedConnections` o resultado da query "SELECT count(*) FROM pg_stat_activity;"
    Atribui a constante `usedConnections` somente a contagem da quantidade de conexões
  */
  const dataBaseName = process.env.POSTGRES_DB;
  let queryUsedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dataBaseName],
  });
  const usedConnections = queryUsedConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: pgVersion,
    max_connections: parseInt(maxConnections),
    used_connections: usedConnections,
  });
}

export default status;
