import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { studyGroupMemberValidationSchema } from 'validationSchema/study-group-members';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.study_group_member
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getStudyGroupMemberById();
    case 'PUT':
      return updateStudyGroupMemberById();
    case 'DELETE':
      return deleteStudyGroupMemberById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStudyGroupMemberById() {
    const data = await prisma.study_group_member.findFirst(convertQueryToPrismaUtil(req.query, 'study_group_member'));
    return res.status(200).json(data);
  }

  async function updateStudyGroupMemberById() {
    await studyGroupMemberValidationSchema.validate(req.body);
    const data = await prisma.study_group_member.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteStudyGroupMemberById() {
    const data = await prisma.study_group_member.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
