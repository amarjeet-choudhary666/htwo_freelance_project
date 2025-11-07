import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const adminCategoryController = {
  // Get categories
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

  // Create category
  async createCategory(req: Request, res: Response) {
    try {
      const { name, description } = req.body;

      const category = await prisma.category.create({
        data: { name, description }
      });

      res.json({ success: true, message: 'Category created successfully', category });
    } catch (error) {
      console.error('Create category error:', error);
      res.status(500).json({ success: false, message: 'Error creating category' });
    }
  },

  // Update category
  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      await prisma.category.update({
        where: { id: parseInt(id) },
        data: { name, description }
      });

      res.json({ success: true, message: 'Category updated successfully' });
    } catch (error) {
      console.error('Update category error:', error);
      res.status(500).json({ success: false, message: 'Error updating category' });
    }
  },

  // Delete category
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

  // Create category type
  async createCategoryType(req: Request, res: Response) {
    try {
      const { name, categoryId } = req.body;

      console.log('Creating category type:', { name, categoryId, type: typeof categoryId });

      // Validate inputs
      if (!name || !name.trim()) {
        return res.status(400).json({ success: false, message: 'Category type name is required' });
      }

      if (!categoryId || isNaN(parseInt(categoryId))) {
        return res.status(400).json({ success: false, message: 'Valid category ID is required' });
      }

      const parsedCategoryId = parseInt(categoryId);

      // Check if category exists
      const category = await prisma.category.findUnique({
        where: { id: parsedCategoryId }
      });

      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      const categoryType = await prisma.categoryType.create({
        data: {
          name: name.trim(),
          categoryId: parsedCategoryId
        }
      });

      res.json({ success: true, message: 'Category type created successfully', categoryType });
    } catch (error) {
      console.error('Create category type error:', error);
      res.status(500).json({ success: false, message: 'Error creating category type' });
    }
  },

  // Update category type
  async updateCategoryType(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await prisma.categoryType.update({
        where: { id: parseInt(id) },
        data: { name }
      });

      res.json({ success: true, message: 'Category type updated successfully' });
    } catch (error) {
      console.error('Update category type error:', error);
      res.status(500).json({ success: false, message: 'Error updating category type' });
    }
  },

  // Get category types
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

  // Delete category type
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
  }
};