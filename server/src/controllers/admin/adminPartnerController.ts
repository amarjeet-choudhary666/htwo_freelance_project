import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import prisma from '../../lib/prisma';

export const adminPartnerController = {
  // Get all partners with their statuses (pending, approved, rejected)
  getAllPartnersWithStatus: asyncHandler(async (_req: Request, res: Response) => {
    // Get partners grouped by status
    const [pendingPartners, approvedPartners, rejectedPartners] = await Promise.all([
      prisma.partner.findMany({
        where: { status: 'pending' },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          company: true,
          logoUrl: true,
          website: true,
          description: true,
          status: true,
          partnerType: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.partner.findMany({
        where: { status: 'approved' },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          company: true,
          logoUrl: true,
          website: true,
          description: true,
          status: true,
          partnerType: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.partner.findMany({
        where: { status: 'rejected' },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          company: true,
          logoUrl: true,
          website: true,
          description: true,
          status: true,
          partnerType: true,
          createdAt: true,
          updatedAt: true
        }
      })
    ]);

    // Get summary counts
    const [pendingCount, approvedCount, rejectedCount, totalCount] = await Promise.all([
      prisma.partner.count({ where: { status: 'pending' } }),
      prisma.partner.count({ where: { status: 'approved' } }),
      prisma.partner.count({ where: { status: 'rejected' } }),
      prisma.partner.count()
    ]);

    const summary = {
      total: totalCount,
      pending: pendingCount,
      approved: approvedCount,
      rejected: rejectedCount
    };

    res.status(200).json(
      new ApiResponse(200, {
        summary,
        partners: {
          pending: pendingPartners,
          approved: approvedPartners,
          rejected: rejectedPartners
        }
      }, "All partners retrieved successfully with status breakdown")
    );
  }),

  // Get all partners in a single array (alternative endpoint)
  getAllPartners: asyncHandler(async (_req: Request, res: Response) => {
    const partners = await prisma.partner.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        logoUrl: true,
        website: true,
        description: true,
        status: true,
        partnerType: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.status(200).json(
      new ApiResponse(200, partners, "All partners retrieved successfully")
    );
  })
};