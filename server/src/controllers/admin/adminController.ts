import { Request, Response } from 'express';
import { updateUserSchema, UpdateUserInput } from '../../validation/userValidation';
import { createCategorySchema, updateCategorySchema, createCategoryTypeSchema, updateCategoryTypeSchema, CreateCategoryInput, UpdateCategoryInput, CreateCategoryTypeInput, UpdateCategoryTypeInput } from '../../validation/categoryValidation';
import { createPartnerSchema, updatePartnerSchema, updatePartnerStatusSchema } from '../../validation/partnerValidation';
import { updateFormSubmissionSchema, UpdateFormSubmissionInput } from '../../validation/formSubmissionValidation';
import prisma from '../../lib/prisma';
import { uploadToCloudinary, deleteFromCloudinary } from '../../utils/cloudinary';

export const adminController = {
  // Dashboard
  async dashboard(_req: Request, res: Response) {
    try {
      // Get statistics
      const [totalSubmissions, demoRequests, contactForms, getInTouch, recentSubmissions] = await Promise.all([
        prisma.formSubmission.count(),
        prisma.formSubmission.count({ where: { type: 'demo' } }),
        prisma.formSubmission.count({ where: { type: 'contact' } }),
        prisma.formSubmission.count({ where: { type: 'get_in_touch' } }),
        prisma.formSubmission.findMany({
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { id: true, email: true, firstname: true }
            }
          }
        })
      ]);

      const stats = {
        totalSubmissions,
        demoRequests,
        contactForms,
        getInTouch
      };

      res.json({
        success: true,
        data: {
          stats,
          recentSubmissions
        }
      });
    } catch (error) {
      console.error('Dashboard error:', error);
      res.status(500).json({ success: false, message: 'Error loading dashboard' });
    }
  },

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
      const validatedData: UpdateFormSubmissionInput = updateFormSubmissionSchema.parse(req.body);

      await prisma.formSubmission.update({
        where: { id },
        data: validatedData
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
      const validatedData: UpdateUserInput = updateUserSchema.parse(req.body);

      await prisma.user.update({
        where: { id: parseInt(id) },
        data: validatedData
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

  // Get analytics
  async getAnalytics(_req: Request, res: Response) {
    try {
      // Get analytics data
      const [
        totalSubmissions,
        submissionsByType,
        submissionsByMonth,
        topServices
      ] = await Promise.all([
        prisma.formSubmission.count(),
        prisma.formSubmission.groupBy({
          by: ['type'],
          _count: { type: true }
        }),
        prisma.formSubmission.groupBy({
          by: ['createdAt'],
          _count: { createdAt: true },
          orderBy: { createdAt: 'asc' }
        }),
        prisma.formSubmission.groupBy({
          by: ['service'],
          _count: { service: true },
          orderBy: { _count: { service: 'desc' } },
          take: 5,
          where: {
            service: {
              not: null
            }
          }
        })
      ]);

      // Process submissionsByMonth to group by month
      const monthlyData = submissionsByMonth.reduce((acc: any, item) => {
        const date = new Date(item.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        acc[monthKey] = (acc[monthKey] || 0) + item._count.createdAt;
        return acc;
      }, {});

      const processedMonthlyData = Object.entries(monthlyData).map(([month, count]) => ({
        month,
        count
      }));

      res.json({
        success: true,
        data: {
          totalSubmissions,
          submissionsByType,
          submissionsByMonth: processedMonthlyData,
          topServices
        }
      });
    } catch (error) {
      console.error('Analytics error:', error);
      res.status(500).json({ success: false, message: 'Error loading analytics' });
    }
  },

  // Get stats API
  async getStats(_req: Request, res: Response) {
    try {
      // Provide fallback values in case database queries fail
      let totalSubmissions = 0;
      let demoRequests = 0;
      let contactForms = 0;
      let getInTouch = 0;
      let totalUsers = 0;
      let totalPartners = 0;
      let approvedPartners = 0;
      let pendingPartners = 0;
      let totalServices = 0;
      let activeServices = 0;

      try {
        const results = await Promise.allSettled([
          prisma.formSubmission.count(),
          prisma.formSubmission.count({ where: { type: 'demo' } }),
          prisma.formSubmission.count({ where: { type: 'contact' } }),
          prisma.formSubmission.count({ where: { type: 'get_in_touch' } }),
          prisma.user.count(),
          prisma.partner.count(),
          prisma.partner.count({ where: { status: 'approved' } }),
          prisma.partner.count({ where: { status: 'pending' } }),
          prisma.service.count(),
          prisma.service.count({ where: { status: 'active' } })
        ]);

        [
          totalSubmissions,
          demoRequests,
          contactForms,
          getInTouch,
          totalUsers,
          totalPartners,
          approvedPartners,
          pendingPartners,
          totalServices,
          activeServices
        ] = results.map(result =>
          result.status === 'fulfilled' ? result.value : 0
        );
      } catch (dbError) {
        console.warn('Database queries failed, using fallback values:', dbError);
      }

      res.json({
        totalSubmissions,
        demoRequests,
        contactForms,
        getInTouch,
        totalUsers,
        totalPartners,
        approvedPartners,
        pendingPartners,
        totalServices,
        activeServices
      });
    } catch (error) {
      console.error('Stats API error:', error);
      // Return fallback values even on error
      res.json({
        totalSubmissions: 0,
        demoRequests: 0,
        contactForms: 0,
        getInTouch: 0,
        totalUsers: 0,
        totalPartners: 0,
        approvedPartners: 0,
        pendingPartners: 0,
        totalServices: 0,
        activeServices: 0
      });
    }
  },

  // Get settings
  async getSettings(_req: Request, res: Response) {
    try {
      res.json({
        success: true,
        data: {
          // Add settings data here
          general: {
            siteName: 'Admin Panel',
            siteDescription: 'Admin management system'
          },
          email: {
            smtpHost: '',
            smtpPort: '',
            smtpUser: '',
            smtpPassword: ''
          },
          security: {
            sessionTimeout: 3600,
            maxLoginAttempts: 5
          }
        }
      });
    } catch (error) {
      console.error('Settings error:', error);
      res.status(500).json({ success: false, message: 'Error loading settings' });
    }
  },

  // Update settings
  async updateSettings(_req: Request, res: Response) {
    try {
      // Implement settings update logic
      res.json({ success: true, message: 'Settings updated successfully' });
    } catch (error) {
      console.error('Update settings error:', error);
      res.status(500).json({ success: false, message: 'Error updating settings' });
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

      // Validate status using Zod
      const validatedStatus = updateFormSubmissionSchema.shape.status.parse(status);

      await prisma.formSubmission.updateMany({
        where: { id: { in: ids } },
        data: { status: validatedStatus }
      });

      res.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
      console.error('Bulk update error:', error);
      res.status(500).json({ success: false, message: 'Error updating status' });
    }
  },

  // Categories Management
  async getCategories(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = req.query.search as string || '';

      const where: any = {};
      if (search) {
        where.name = { contains: search, mode: 'insensitive' };
      }

      const [categories, total] = await Promise.all([
        prisma.category.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            categoryTypes: {
              orderBy: { createdAt: 'desc' }
            }
          }
        }),
        prisma.category.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          categories,
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
      console.error('Categories error:', error);
      res.status(500).json({ success: false, message: 'Error loading categories' });
    }
  },

  async createCategory(req: Request, res: Response) {
    try {
      const validatedData: CreateCategoryInput = createCategorySchema.parse(req.body);

      const category = await prisma.category.create({
        data: validatedData
      });

      res.json({ success: true, message: 'Category created successfully', category });
    } catch (error) {
      console.error('Create category error:', error);
      res.status(500).json({ success: false, message: 'Error creating category' });
    }
  },

  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData: UpdateCategoryInput = updateCategorySchema.parse(req.body);

      await prisma.category.update({
        where: { id: parseInt(id) },
        data: validatedData
      });

      res.json({ success: true, message: 'Category updated successfully' });
    } catch (error) {
      console.error('Update category error:', error);
      res.status(500).json({ success: false, message: 'Error updating category' });
    }
  },

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.category.delete({
        where: { id: parseInt(id) }
      });

      res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Delete category error:', error);
      res.status(500).json({ success: false, message: 'Error deleting category' });
    }
  },

  async createCategoryType(req: Request, res: Response) {
    try {
      const validatedData: CreateCategoryTypeInput = createCategoryTypeSchema.parse(req.body);

      const categoryType = await prisma.categoryType.create({
        data: validatedData
      });

      res.json({ success: true, message: 'Category type created successfully', categoryType });
    } catch (error) {
      console.error('Create category type error:', error);
      res.status(500).json({ success: false, message: 'Error creating category type' });
    }
  },

  async updateCategoryType(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData: UpdateCategoryTypeInput = updateCategoryTypeSchema.parse(req.body);

      await prisma.categoryType.update({
        where: { id: parseInt(id) },
        data: validatedData
      });

      res.json({ success: true, message: 'Category type updated successfully' });
    } catch (error) {
      console.error('Update category type error:', error);
      res.status(500).json({ success: false, message: 'Error updating category type' });
    }
  },

  async getCategoryTypes(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;

      const categoryTypes = await prisma.categoryType.findMany({
        where: { categoryId: parseInt(categoryId) },
        orderBy: { createdAt: 'desc' }
      });

      res.json({ success: true, data: categoryTypes });
    } catch (error) {
      console.error('Get category types error:', error);
      res.status(500).json({ success: false, message: 'Error fetching category types' });
    }
  },

  async deleteCategoryType(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.categoryType.delete({
        where: { id: parseInt(id) }
      });

      res.json({ success: true, message: 'Category type deleted successfully' });
    } catch (error) {
      console.error('Delete category type error:', error);
      res.status(500).json({ success: false, message: 'Error deleting category type' });
    }
  },

  // Partners Management
  async getPartners(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = req.query.search as string || '';
      const status = req.query.status as string || '';

      const where: any = {};
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } }
        ];
      }
      // Only apply status filter if it's not empty string
      if (status && status !== '') {
        where.status = status;
      }

      const [partners, total] = await Promise.all([
        prisma.partner.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' }
        }),
        prisma.partner.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          partners,
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
      console.error('Partners error:', error);
      res.status(500).json({ success: false, message: 'Error loading partners' });
    }
  },

  async getPartnerById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const partner = await prisma.partner.findUnique({
        where: { id: parseInt(id) }
      });

      if (!partner) {
        return res.status(404).json({ success: false, message: 'Partner not found' });
      }

      res.json({ success: true, data: partner });
    } catch (error) {
      console.error('Get partner by ID error:', error);
      res.status(500).json({ success: false, message: 'Error fetching partner' });
    }
  },

  async createPartner(req: Request, res: Response) {
    try {
      console.log('Create partner request body:', req.body);
      console.log('Create partner file:', req.file);

      // For multipart/form-data, we need to handle the data differently
      const formData = req.body;
      
      // Validate the data
      const result = createPartnerSchema.safeParse(formData);
      if (!result.success) {
        console.error('Validation error:', result.error.format());
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          error: result.error.format()
        });
      }
      
      const validatedData = result.data;
      console.log('Validation successful:', validatedData);

      // Check if email already exists
      try {
        const existingPartner = await prisma.partner.findUnique({
          where: { email: validatedData.email }
        });

        if (existingPartner) {
          return res.status(400).json({ success: false, message: 'Partner with this email already exists' });
        }
      } catch (dbError) {
        console.error('Database check error:', dbError);
        return res.status(500).json({ success: false, message: 'Database error while checking existing partner' });
      }

      let logoUrl: string | undefined;

      // Handle logo upload if provided
      if (req.file) {
        try {
          console.log('Uploading file:', req.file.path);
          logoUrl = await uploadToCloudinary(req.file.path, 'partners');
          console.log('Logo uploaded successfully:', logoUrl);
        } catch (uploadError) {
          console.error('Logo upload error:', uploadError);
          return res.status(500).json({ success: false, message: 'Error uploading logo: ' + (uploadError instanceof Error ? uploadError.message : 'Unknown error') });
        }
      }

      // Create the partner
      try {
        const partner = await prisma.partner.create({
          data: {
            ...validatedData,
            logoUrl
          }
        });

        console.log('Partner created successfully:', partner);
        res.json({ success: true, message: 'Partner created successfully', data: partner });
      } catch (dbCreateError) {
        console.error('Database create error:', dbCreateError);
        return res.status(500).json({ success: false, message: 'Database error while creating partner: ' + (dbCreateError instanceof Error ? dbCreateError.message : 'Unknown error') });
      }
    } catch (error) {
      console.error('Create partner error:', error);
      res.status(500).json({ success: false, message: 'Unexpected error creating partner: ' + (error instanceof Error ? error.message : 'Unknown error') });
    }
  },

  async updatePartner(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log('Update partner request body:', req.body);
      console.log('Update partner file:', req.file);

      // For multipart/form-data, we need to handle the data differently
      const formData = req.body;
      
      // Validate the data
      const result = updatePartnerSchema.safeParse(formData);
      if (!result.success) {
        console.error('Validation error:', result.error.format());
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          error: result.error.format()
        });
      }
      
      const validatedData = result.data;

      const existingPartner = await prisma.partner.findUnique({
        where: { id: parseInt(id) }
      });

      if (!existingPartner) {
        return res.status(404).json({ success: false, message: 'Partner not found' });
      }

      let logoUrl = existingPartner.logoUrl;

      // Handle logo upload if new file provided
      if (req.file) {
        try {
          // Delete old logo if exists
          if (existingPartner.logoUrl) {
            const publicId = existingPartner.logoUrl.split('/').pop()?.split('.')[0];
            if (publicId) {
              await deleteFromCloudinary(`partners/${publicId}`);
            }
          }
          logoUrl = await uploadToCloudinary(req.file.path, 'partners');
          console.log('Logo updated successfully:', logoUrl);
        } catch (uploadError) {
          console.error('Logo upload error:', uploadError);
          return res.status(500).json({ success: false, message: 'Error uploading logo: ' + (uploadError instanceof Error ? uploadError.message : 'Unknown error') });
        }
      }

      const partner = await prisma.partner.update({
        where: { id: parseInt(id) },
        data: {
          ...validatedData,
          logoUrl
        }
      });

      console.log('Partner updated successfully:', partner);
      res.json({ success: true, message: 'Partner updated successfully', data: partner });
    } catch (error) {
      console.error('Update partner error:', error);
      res.status(500).json({ success: false, message: 'Error updating partner: ' + (error instanceof Error ? error.message : 'Unknown error') });
    }
  },

  async deletePartner(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingPartner = await prisma.partner.findUnique({
        where: { id: parseInt(id) }
      });

      if (!existingPartner) {
        return res.status(404).json({ success: false, message: 'Partner not found' });
      }

      // Delete logo from Cloudinary if exists
      if (existingPartner.logoUrl) {
        const { deleteFromCloudinary } = await import('../../utils/cloudinary.js');
        const publicId = existingPartner.logoUrl.split('/').pop()?.split('.')[0];
        if (publicId) {
          await deleteFromCloudinary(`partners/${publicId}`);
        }
      }

      await prisma.partner.delete({
        where: { id: parseInt(id) }
      });

      res.json({ success: true, message: 'Partner deleted successfully' });
    } catch (error) {
      console.error('Delete partner error:', error);
      res.status(500).json({ success: false, message: 'Error deleting partner' });
    }
  },

  async updatePartnerStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      // Validate the data
      const result = updatePartnerStatusSchema.safeParse(req.body);
      if (!result.success) {
        console.error('Validation error:', result.error.format());
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          error: result.error.format()
        });
      }
      
      const validatedData = result.data;

      const partner = await prisma.partner.update({
        where: { id: parseInt(id) },
        data: validatedData
      });

      res.json({ success: true, message: 'Partner status updated successfully', data: partner });
    } catch (error) {
      console.error('Update partner status error:', error);
      res.status(500).json({ success: false, message: 'Error updating partner status: ' + (error instanceof Error ? error.message : 'Unknown error') });
    }
  },

  // Export partners
  async exportPartners(_req: Request, res: Response) {
    try {
      const partners = await prisma.partner.findMany({
        orderBy: { createdAt: 'desc' }
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=partners.csv');

      // Convert to CSV format
      const csv = [
        'ID,Name,Email,Phone,Company,Website,Partner Type,Status,Created At',
        ...partners.map(p =>
          `${p.id},"${p.name}","${p.email}","${p.phone || ''}","${p.company || ''}","${p.website || ''}","${p.partnerType || ''}","${p.status}","${p.createdAt}"`
        )
      ].join('\n');

      res.send(csv);
    } catch (error) {
      console.error('Export partners error:', error);
      res.status(500).json({ error: 'Error exporting partners' });
    }
  },

  // Bulk delete partners
  async bulkDeletePartners(req: Request, res: Response) {
    try {
      const { ids } = req.body;

      // Get partners to delete their logos from Cloudinary
      const partnersToDelete = await prisma.partner.findMany({
        where: { id: { in: ids.map((id: string) => parseInt(id)) } },
        select: { logoUrl: true }
      });

      // Delete logos from Cloudinary
      for (const partner of partnersToDelete) {
        if (partner.logoUrl) {
          try {
            const publicId = partner.logoUrl.split('/').pop()?.split('.')[0];
            if (publicId) {
              await deleteFromCloudinary(`partners/${publicId}`);
            }
          } catch (error) {
            console.warn('Failed to delete logo from Cloudinary:', error);
          }
        }
      }

      await prisma.partner.deleteMany({
        where: { id: { in: ids.map((id: string) => parseInt(id)) } }
      });

      res.json({ success: true, message: 'Partners deleted successfully' });
    } catch (error) {
      console.error('Bulk delete partners error:', error);
      res.status(500).json({ success: false, message: 'Error deleting partners' });
    }
  },

  // Bulk update partner status
  async bulkUpdatePartnerStatus(req: Request, res: Response) {
    try {
      const { ids, status } = req.body;

      // Validate status
      const validatedStatus = updatePartnerStatusSchema.shape.status.parse(status);

      await prisma.partner.updateMany({
        where: { id: { in: ids.map((id: string) => parseInt(id)) } },
        data: { status: validatedStatus }
      });

      res.json({ success: true, message: 'Partner status updated successfully' });
    } catch (error) {
      console.error('Bulk update partner status error:', error);
      res.status(500).json({ success: false, message: 'Error updating partner status' });
    }
  }
};