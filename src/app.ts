import fastify from "fastify";
import { StatusCodes } from "http-status-codes";

import { diaryRouter } from "./routes/diary.route";

const app = fastify();

app.register(diaryRouter);

app.get("/ping", async (request, reply) => {
  reply.status(StatusCodes.OK).send("Pong");
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
