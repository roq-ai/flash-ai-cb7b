import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { studyGroupValidationSchema } from 'validationSchema/study-groups';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getStudyGroups();
    case 'POST':
      return createStudyGroup();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStudyGroups() {
    const data = await prisma.study_group
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'study_group'));
    return res.status(200).json(data);
  }

  async function createStudyGroup() {
    await studyGroupValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.study_group_member?.length > 0) {
      const create_study_group_member = body.study_group_member;
      body.study_group_member = {
        create: create_study_group_member,
      };
    } else {
      delete body.study_group_member;
    }
    const data = await prisma.study_group.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
