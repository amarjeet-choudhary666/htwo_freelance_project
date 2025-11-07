import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const adminUserController = {
  // Get users
  async getUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = req.query.search as string || '';

      const where: any = {};
      if (search) {
        where.OR = [
          { email: { contains: search, mode: 'insensitive' } },
          { firstname: { contains: search, mode: 'insensitive' } },
          { companyName: { contains: search, mode: 'insensitive' } }
        ];
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            email: true,
            firstname: true,
            role: true,
            address: true,
            companyName: true,
            gstNumber: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: { formSubmissions: true }
            }
          }
        }),
        prisma.user.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          users,
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
      console.error('Users error:', error);
      res.status(500).json({ success: false, message: 'Error loading users' });
    }
  },

  // Get user details
  async getUserDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: {
          formSubmissions: {
            orderBy: { createdAt: 'desc' },
            take: 10
          }
        }
      });

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.json({ success: true, data: user });
    } catch (error) {
      console.error('User details error:', error);
      res.status(500).json({ success: false, message: 'Error loading user details' });
    }
  },

  // Update user
  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { firstname, email, address, companyName } = req.body;

      await prisma.user.update({
        where: { id: parseInt(id) },
        data: { firstname, email, address, companyName }
      });

      res.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ success: false, message: 'Error updating user' });
    }
  },

  // Delete user
  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.user.delete({
        where: { id: parseInt(id) }
      });

      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ success: false, message: 'Error deleting user' });
    }
  },

  // Export users
  async exportUsers(_req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=users.csv');

      // Convert to CSV format
      const csv = [
        'ID,Email,First Name,Company,Address,Created At',
        ...users.map(u =>
          `${u.id},"${u.email}","${u.firstname || ''}","${u.companyName || ''}","${u.address || ''}","${u.createdAt}"`
        )
      ].join('\n');

      res.send(csv);
    } catch (error) {
      console.error('Export users error:', error);
      res.status(500).json({ error: 'Error exporting users' });
    }
  }
};