import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { ApiResponse } from '../utils/apiResponse';
import { ApiError } from '../utils/apiError';
import { asyncHandler } from '../utils/asyncHandler';
import { updateUserSchema, UpdateUserInput } from '../validation/userValidation';

// Get all users with their services
export const getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      services: true
    },
    orderBy: { createdAt: 'desc' }
  });

  res.status(200).json(new ApiResponse(200, users, 'Users retrieved successfully'));
});

// Get user by ID with services
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: {
      services: true
    }
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(new ApiResponse(200, user, 'User retrieved successfully'));
});

// Update user
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedData: UpdateUserInput = updateUserSchema.parse(req.body);

  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: validatedData,
    include: {
      services: true
    }
  });

  res.status(200).json(new ApiResponse(200, user, 'User updated successfully'));
});

// Delete user
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id: parseInt(id) }
  });

  res.status(200).json(new ApiResponse(200, null, 'User deleted successfully'));
});