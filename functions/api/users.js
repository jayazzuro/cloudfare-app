export async function onRequest(context) {
  const { request, env } = context;
  const db = env.DB;

  if (request.method === "GET") {
    const { results } = await db.prepare("SELECT * FROM users").all();

    return Response.json(results);
  }

  if (request.method === "POST") {
    const body = await request.json();
    const { name, email } = body;

    await db
      .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
      .bind(name, email)
      .run();

    return Response.json({ success: true });
  }

  return new Response("Method not allowed", { status: 405 });
}
