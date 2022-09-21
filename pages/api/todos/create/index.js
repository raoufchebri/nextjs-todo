import { prisma } from '../../../../db';

export default async (req, res) => {
  try {
    const { text } = req.body;
    if (req.method === 'POST') {
      const data = await prisma.todo.create({
        data: { text, completed: false },
      });

      res.status(200).json({ newTodo: data });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
