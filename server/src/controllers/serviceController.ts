import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { ApiResponse } from '../utils/apiResponse';
import { ApiError } from '../utils/apiError';
import { asyncHandler } from '../utils/asyncHandler';
import { Priority } from '@prisma/client';
import { createServiceSchema, updateServiceSchema, CreateServiceInput, UpdateServiceInput } from '../validation/serviceValidation';

// Get all services
export const getAllServices = asyncHandler(async (_req: Request, res: Response) => {
  const services = await prisma.service.findMany({
    include: {
      category: true,
      categoryType: true
    },
    orderBy: { priority: 'asc' }
  });

  res.status(200).json(new ApiResponse(200, services, 'Services retrieved successfully'));
});

// Get service by ID
export const getServiceById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const service = await prisma.service.findUnique({
    where: { id: parseInt(id) },
    include: {
      category: true,
      categoryType: true
    }
  });

  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  res.status(200).json(new ApiResponse(200, service, 'Service retrieved successfully'));
});

// Create new service
export const createService = asyncHandler(async (req: Request, res: Response) => {
  const validatedData: CreateServiceInput = createServiceSchema.parse(req.body);

  const service = await prisma.service.create({
    data: {
      ...validatedData,
      categoryId: validatedData.categoryId || null,
      categoryTypeId: validatedData.categoryTypeId || null,
      monthlyPrice: validatedData.monthlyPrice || null,
      yearlyPrice: validatedData.yearlyPrice || null,
      imageUrl: validatedData.imageUrl || null,
      description: validatedData.description || null,
      ownerId: 1 // Assuming admin user ID, you might want to get this from auth
    }
  });

  res.status(201).json(new ApiResponse(201, service, 'Service created successfully'));
});

// Update service
export const updateService = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedData: UpdateServiceInput = updateServiceSchema.parse(req.body);

  const service = await prisma.service.update({
    where: { id: parseInt(id) },
    data: {
      ...validatedData,
      categoryId: validatedData.categoryId !== undefined ? validatedData.categoryId : undefined,
      categoryTypeId: validatedData.categoryTypeId !== undefined ? validatedData.categoryTypeId : undefined,
      monthlyPrice: validatedData.monthlyPrice !== undefined ? validatedData.monthlyPrice : undefined,
      yearlyPrice: validatedData.yearlyPrice !== undefined ? validatedData.yearlyPrice : undefined,
      imageUrl: validatedData.imageUrl !== undefined ? validatedData.imageUrl : undefined,
      description: validatedData.description !== undefined ? validatedData.description : undefined,
      ram: validatedData.ram !== undefined ? validatedData.ram : undefined,
      storage: validatedData.storage !== undefined ? validatedData.storage : undefined
    }
  });

  res.status(200).json(new ApiResponse(200, service, 'Service updated successfully'));
});

// Delete service
export const deleteService = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.service.delete({
    where: { id: parseInt(id) }
  });

  res.status(200).json(new ApiResponse(200, null, 'Service deleted successfully'));
});

// Get services by category
export const getServicesByCategory = asyncHandler(async (req: Request, res: Response) => {
  const { category } = req.params;

  const services = await prisma.service.findMany({
    where: {
      category: {
        name: {
          equals: category,
          mode: 'insensitive'
        }
      },
      status: 'active'
    },
    include: {
      category: true,
      categoryType: true
    },
    orderBy: { priority: 'asc' }
  });

  res.status(200).json(new ApiResponse(200, services, 'Services retrieved successfully'));
});

// Get services by category type
export const getServicesByCategoryType = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const services = await prisma.service.findMany({
    where: {
      categoryTypeId: parseInt(id),
      status: 'active'
    },
    include: {
      category: true,
      categoryType: true
    },
    orderBy: { priority: 'asc' }
  });

  res.status(200).json({ success: true, data: services });
});

// Get services by priority
export const getServicesByPriority = asyncHandler(async (req: Request, res: Response) => {
  const { priority } = req.params;

  const priorityEnum = priority.toUpperCase() as Priority;

  if (!['LOW', 'MEDIUM', 'HIGH'].includes(priorityEnum)) {
    throw new ApiError(400, 'Invalid priority value. Must be LOW, MEDIUM, or HIGH');
  }

  const services = await prisma.service.findMany({
    where: {
      priority: priorityEnum,
      status: 'active'
    },
    include: {
      category: true,
      categoryType: true
    },
    orderBy: { priority: 'asc' }
  });

  res.status(200).json(new ApiResponse(200, services, 'Services retrieved successfully'));
});

// Get services by category and priority
export const getServicesByCategoryAndPriority = asyncHandler(async (req: Request, res: Response) => {
  const { category, priority } = req.params;

  const priorityEnum = priority.toUpperCase() as Priority;

  if (!['LOW', 'MEDIUM', 'HIGH'].includes(priorityEnum)) {
    throw new ApiError(400, 'Invalid priority value. Must be LOW, MEDIUM, or HIGH');
  }

  const services = await prisma.service.findMany({
    where: {
      category: {
        name: {
          equals: category,
          mode: 'insensitive'
        }
      },
      priority: priorityEnum,
      status: 'active'
    },
    include: {
      category: true,
      categoryType: true
    },
    orderBy: { priority: 'asc' }
  });

  res.status(200).json(new ApiResponse(200, services, 'Services retrieved successfully'));
});