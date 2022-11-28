import { prisma } from '../../../../db';

export default async (req, res) => {
  try {
    const { id } = req.query;
    if (req.method === 'DELETE') {
      await prisma.todo.delete({
        where: { id },
      });

      res.status(200).json({ message: `Todo id=${id} deleted successfully` });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
