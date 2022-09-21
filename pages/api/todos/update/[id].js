import { prisma } from '../../../../db';

export default async (req, res) => {
  try {
    const { id } = req.query;
    const { completed } = req.body;
    console.log(id);
    console.log(completed);
    console.log(req.method);
    if (req.method === 'PUT') {
      await prisma.todo.update({
        where: { id },
        data: { completed },
      });

      res
        .status(200)
        .json({ message: `Todo set as ${completed ? '' : 'not '}completed` });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
