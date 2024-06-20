import fastify, { FastifyInstance } from "fastify";

export async function diaryRouter(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  app.listen({ port: 3000 });
}
