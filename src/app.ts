import fastify from "fastify";

import { diaryRouter } from "../routes/diary.route";

const app = fastify();

app.register(diaryRouter);

app.get("/ping", async (request, reply) => {
  return "pong\n";
});

app.listen({ port: 3004 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
