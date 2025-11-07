import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const adminSubmissionController = {
  // Get All Submissions
  async getAllSubmissions(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = req.query.search as string || '';
      const status = req.query.status as string || '';
      const type = req.query.type as string || '';

      const where: any = {};

      if (type) {
        where.type = type;
      }

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { message: { contains: search, mode: 'insensitive' } }
        ];
      }

      if (status) {
        where.status = status;
      }

      const [submissions, total] = await Promise.all([
        prisma.formSubmission.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { id: true, email: true, firstname: true }
            }
          }
        }),
        prisma.formSubmission.count({ where })
      ]);

      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: {
          submissions,
          pagination: {
            current: page,
            total: totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
          },
          filters: { search, status, type },
          total
        }
      });
    } catch (error) {
      console.error('All submissions error:', error);
      res.status(500).json({ success: false, message: 'Error loading submissions' });
    }
  },

  // Get Demo Requests
  async getDemoRequests(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = req.query.search as string || '';
      const status = req.query.status as string || '';

      const where: any = { type: 'demo' };

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } }
        ];
      }

      if (status) {
        where.status = status;
      }

      const [submissions, total] = await Promise.all([
        prisma.formSubmission.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { id: true, email: true, firstname: true }
            }
          }
        }),
        prisma.formSubmission.count({ where })
      ]);

      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: {
          submissions,
          pagination: {
            current: page,
            total: totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
          },
          filters: { search, status },
          total
        }
      });
    } catch (error) {
      console.error('Demo requests error:', error);
      res.status(500).json({ success: false, message: 'Error loading demo requests' });
    }
  },

  // Get Contact Forms
  async getContactForms(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = req.query.search as string || '';

      const where: any = { type: 'contact' };

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ];
      }

      const [submissions, total] = await Promise.all([
        prisma.formSubmission.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' }
        }),
        prisma.formSubmission.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          submissions,
          pagination: {
            current: page,
            total: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
          },
          total
        }
      });
    } catch (error) {
      console.error('Contact forms error:', error);
      res.status(500).json({ success: false, message: 'Error loading contact forms' });
    }
  },

  // Get In Touch Forms
  async getInTouchForms(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const [submissions, total] = await Promise.all([
        prisma.formSubmission.findMany({
          where: { type: 'get_in_touch' },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' }
        }),
        prisma.formSubmission.count({ where: { type: 'get_in_touch' } })
      ]);

      res.json({
        success: true,
        data: {
          submissions,
          pagination: {
            current: page,
            total: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
          },
          total
        }
      });
    } catch (error) {
      console.error('Get in touch forms error:', error);
      res.status(500).json({ success: false, message: 'Error loading get in touch forms' });
    }
  },

  // Get submission details
  async getSubmissionDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const submission = await prisma.formSubmission.findUnique({
        where: { id },
        include: {
          user: {
            select: { id: true, email: true, firstname: true, createdAt: true }
          }
        }
      });

      if (!submission) {
        return res.status(404).json({ success: false, message: 'Submission not found' });
      }

      res.json({ success: true, data: submission });
    } catch (error) {
      console.error('Submission details error:', error);
      res.status(500).json({ success: false, message: 'Error loading submission details' });
    }
  },

  // Update submission status
  async updateSubmissionStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      await prisma.formSubmission.update({
        where: { id },
        data: { status }
      });

      res.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
      console.error('Update status error:', error);
      res.status(500).json({ success: false, message: 'Error updating status' });
    }
  },

  // Delete submission
  async deleteSubmission(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.formSubmission.delete({
        where: { id }
      });

      res.json({ success: true, message: 'Submission deleted successfully' });
    } catch (error) {
      console.error('Delete submission error:', error);
      res.status(500).json({ success: false, message: 'Error deleting submission' });
    }
  },

  // Export submissions
  async exportSubmissions(_req: Request, res: Response) {
    try {
      const submissions = await prisma.formSubmission.findMany({
        orderBy: { createdAt: 'desc' }
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=submissions.csv');

      // Convert to CSV format
      const csv = [
        'ID,Name,Email,Phone,Type,Service,Message,Created At',
        ...submissions.map(s =>
          `${s.id},"${s.name}","${s.email}","${s.phone || ''}","${s.type}","${s.service || ''}","${s.message || ''}","${s.createdAt}"`
        )
      ].join('\n');

      res.send(csv);
    } catch (error) {
      console.error('Export submissions error:', error);
      res.status(500).json({ error: 'Error exporting submissions' });
    }
  },

  // Bulk delete submissions
  async bulkDeleteSubmissions(req: Request, res: Response) {
    try {
      const { ids } = req.body;

      await prisma.formSubmission.deleteMany({
        where: { id: { in: ids } }
      });

      res.json({ success: true, message: 'Submissions deleted successfully' });
    } catch (error) {
      console.error('Bulk delete error:', error);
      res.status(500).json({ success: false, message: 'Error deleting submissions' });
    }
  },

  // Bulk update status
  async bulkUpdateStatus(req: Request, res: Response) {
    try {
      const { ids, status } = req.body;

      await prisma.formSubmission.updateMany({
        where: { id: { in: ids } },
        data: { status }
      });

      res.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
      console.error('Bulk update error:', error);
      res.status(500).json({ success: false, message: 'Error updating status' });
    }
  }
};