import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { studentValidationSchema } from 'validationSchema/students';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getStudents();
    case 'POST':
      return createStudent();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStudents() {
    const data = await prisma.student
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'student'));
    return res.status(200).json(data);
  }

  async function createStudent() {
    await studentValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.exam?.length > 0) {
      const create_exam = body.exam;
      body.exam = {
        create: create_exam,
      };
    } else {
      delete body.exam;
    }
    if (body?.flashcard?.length > 0) {
      const create_flashcard = body.flashcard;
      body.flashcard = {
        create: create_flashcard,
      };
    } else {
      delete body.flashcard;
    }
    if (body?.performance?.length > 0) {
      const create_performance = body.performance;
      body.performance = {
        create: create_performance,
      };
    } else {
      delete body.performance;
    }
    if (body?.study_group?.length > 0) {
      const create_study_group = body.study_group;
      body.study_group = {
        create: create_study_group,
      };
    } else {
      delete body.study_group;
    }
    if (body?.study_group_member?.length > 0) {
      const create_study_group_member = body.study_group_member;
      body.study_group_member = {
        create: create_study_group_member,
      };
    } else {
      delete body.study_group_member;
    }
    const data = await prisma.student.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
