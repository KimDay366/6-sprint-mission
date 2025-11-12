import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// cursor 방식의 페이지 네이션 기능
// :끊김없이 데이터가 나열되는 페이징 기능, 최신 글이 맨 위로 오도록 셋팅
export async function commentsList(req, res) {
  const comments_list = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  if (!comments_list) {
    throw new Error(`Cannot found data`);
  }

  return res.status(200).send(comments_list);
}

export async function commentOnly(req, res) {
  const id = req.params.id;
  const comment = await prisma.comment.findUniqueOrThrow({
    where: { id },
  });

  if (!comment) {
    throw new Error(`Cannot found ${id}`);
  }

  res.status(200).send(comment);
}

export async function commentUpdate(req, res) {
  
  const id = req.params.id;
  const comment_update = await prisma.comment.update({
    where: { id },
    data: req.body,
  });

  res.status(200).send(comment_update);
}

export async function commentDelete(req, res) {
  const id = req.params.id;
  await prisma.comment.delete({
    where: { id },
  });

  res.status(204).send({ massage: `delete Comment ${id}` });
}

// 카테고리 별 데이터 조회 => 작업 확인 필요
// export async function commentCategory(req, res) {
//   const { category } = req.query;
//   console.log(category);

//   const commentList = await prisma.comment.findMany({
//     where: {
//       productId: {
//         contains: true,
//       },
//     },
//     orderBy: { createdAt: 'desc' },
//     select: {
//       id: true,
//       content: true,
//       createdAt: true,
//     },
//   });

//   if (type) {
//     const typeName = String(type) + String('id');
//     console.log(typeName);
//     const commentsType = commentList.find((comment) => {
//       comment.typeName !== null;
//     });

//     res.status(200).send(commentsType);
//   } else {
//     res.status(200).send(commentList);
//   }
// }
