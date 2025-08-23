test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});

//Apresenta data e hora atual
test("Apresenta Data e Hora Atualizada", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
});

//Apresenta a Versão do Postgres
test("Apresenta a versão do postgres", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  let stringifyPgVersion = JSON.stringify(
    responseBody.dependecies.database.postgres_version,
  );
  const parsedPgVersion = stringifyPgVersion
    .replace(/\\"/g, "")
    .replace(/"/g, "");
  expect(responseBody.dependecies.database.postgres_version).toBe(
    parsedPgVersion,
  );
});

//Apresenta o Máximo de Conexões
test("Apresenta o Máximo de Conexões", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  expect(responseBody.dependecies.database.max_connections).toBe(100);
});

//Apresenta Conexões Utilizadas
test("Apresenta Conexões Utilizadas", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  expect(responseBody.dependecies.database.used_connections).toBe(1);
});
