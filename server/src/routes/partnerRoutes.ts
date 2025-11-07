import { Router } from 'express';
import {
  getAllPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
  updatePartnerStatus,
  uploadPartnerLogo
} from '../controllers/partnerController';
import { authenticateAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/partners', getAllPartners);
router.get('/partners/:id', getPartnerById);

// Admin routes for partners (protected by admin authentication)
router.get('/admin/partners', authenticateAdmin, getAllPartners);
router.put('/admin/partners/:id', authenticateAdmin, uploadPartnerLogo, updatePartner);
router.delete('/admin/partners/:id', authenticateAdmin, deletePartner);
router.patch('/admin/partners/:id/status', authenticateAdmin, updatePartnerStatus);

export default router;