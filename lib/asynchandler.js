import { Prisma } from '@prisma/client';

export default function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      console.error(e.code);

      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        res.status(404).send({ message: `Cannot find, ${e.message}` });
      } else if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        res
          .status(400)
          .send({ message: `Unique constraint failed, ${e.message}` });
      } else {
        res.status(500).send({ message: e.message || 'Unknown server error' });
      }
    }
  };
}
