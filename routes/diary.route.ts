import { FastifyInstance } from "fastify";
import { StatusCodes } from "http-status-codes";

const dynamicDbData: any = [];

interface Diary {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

// CRUD endpoints for diary app
export async function diaryRouter(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    reply.status(StatusCodes.OK).send(dynamicDbData);
  });

  app.post("/", async (request, reply) => {
    const { body } = request;
    dynamicDbData.push(body);
    reply.status(StatusCodes.CREATED).send(body);
  });

  app.patch("/:id", async (request, reply) => {
    const { id } = request.params as Diary;
    const { body } = request;
    const index = dynamicDbData.findIndex((item: Diary) => item.id === id);
    if (index === -1) {
      reply.status(StatusCodes.NOT_FOUND).send();
    } else {
      dynamicDbData[index] = { ...dynamicDbData[index], ...(body as Diary) };
      reply.status(StatusCodes.OK).send(dynamicDbData[index]);
    }
  });

  app.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const index = dynamicDbData.findIndex((item: Diary) => item.id === id);
    if (index === -1) {
      reply.status(StatusCodes.NOT_FOUND).send();
    } else {
      dynamicDbData.splice(index, 1);
      reply.status(StatusCodes.NO_CONTENT).send();
    }
  });
}
