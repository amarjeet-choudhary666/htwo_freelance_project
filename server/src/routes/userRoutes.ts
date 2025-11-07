import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController';
import { authenticateAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Admin routes for users (protected by admin authentication)
router.get('/admin/users', authenticateAdmin, getAllUsers);
router.get('/admin/users/:id', authenticateAdmin, getUserById);
router.put('/admin/users/:id', authenticateAdmin, updateUser);
router.delete('/admin/users/:id', authenticateAdmin, deleteUser);

export default router;