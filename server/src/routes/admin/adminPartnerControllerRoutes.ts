import { Router } from 'express';
import { authenticateAdmin } from '../../middlewares/authMiddleware';
import { adminPartnerController } from '../../controllers/admin/adminPartnerController';

const router = Router();

// Apply authentication middleware to all admin partner routes
router.use(authenticateAdmin);

// Get all partners with status breakdown (pending, approved, rejected)
router.get('/all-with-status', adminPartnerController.getAllPartnersWithStatus);

// Get all partners in a single array
router.get('/all', adminPartnerController.getAllPartners);

export default router;