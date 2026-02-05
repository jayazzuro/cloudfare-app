export const onRequest = async (context) => {
  const { request, env } = context;
  const db = env.DB;

  try {
    if (request.method === "GET") {
      const { results } = await db.prepare("SELECT * FROM users").all();

      return new Response(JSON.stringify(results), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (request.method === "POST") {
      const body = await request.json();
      const { name, email } = body;

      if (!name || !email) {
        return new Response(
          JSON.stringify({ error: "Missing name or email" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      await db
        .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
        .bind(name, email)
        .run();

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Method not allowed", { status: 405 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
