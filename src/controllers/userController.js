import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      nama: true,
      email: true,
      role: true,
    },
    orderBy: { id: "desc" }
  });

  res.json(users);
};

export const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const { nama, email, role } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: { nama, email, role },
  });

  res.json(user);
};

export const deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.user.delete({
      where: { id }
  });

  res.json({ message: "Deleted" });
};
