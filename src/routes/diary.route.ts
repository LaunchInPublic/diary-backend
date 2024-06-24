import { FastifyInstance } from "fastify";
import { StatusCodes } from "http-status-codes";

import { notes } from "../dao/persistence/note";

interface Diary {
  id?: number;
  title: string;
  content: string;
  createdAt?: Date;
}

// CRUD endpoints for diary app
export async function diaryRouter(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    reply.status(StatusCodes.OK).send(notes);
  });

  app.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const idInteger = parseInt(id, 10); // Cast to integer decimal number

    const diary = notes.find((item: Diary) => item.id === idInteger);

    if (!diary) {
      console.info("Note entry not found");
      reply.status(StatusCodes.NOT_FOUND).send({
        message: "Note entry not found",
      });
    } else {
      reply.status(StatusCodes.OK).send(diary);
    }
  });

  app.post("/", async (request, reply) => {
    const body = request.body as Diary;

    if (!body.title || !body.content) {
      reply.status(StatusCodes.BAD_REQUEST).send();
      return;
    }

    body.id = notes.length + 1;

    if (!body.createdAt) {
      body.createdAt = new Date();
    }

    notes.push(body);
    reply.status(StatusCodes.CREATED).send(body);
  });

  app.patch("/:id", async (request, reply) => {
    const body = request.body as Diary;
    const { id } = request.params as { id: string };
    const idInteger = parseInt(id, 10); // Cast to integer decimal number

    const index = notes.findIndex((item: Diary) => item.id === idInteger);
    if (index === -1) {
      reply.status(StatusCodes.NOT_FOUND).send();
    } else {
      notes[index] = { ...notes[index], ...(body as Diary) };
      reply.status(StatusCodes.OK).send(notes[index]);
    }
  });

  app.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const index = notes.findIndex((item: Diary) => item.id === parseInt(id));

    if (index === -1) {
      reply.status(StatusCodes.NOT_FOUND).send();
    } else {
      notes.splice(index, 1);
      reply.status(StatusCodes.OK).send({
        message: "Note entry deleted",
      });
    }
  });
}
