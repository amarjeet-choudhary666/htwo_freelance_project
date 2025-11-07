import { Router } from 'express';
import {
  getAllServices,
  getServicesByCategory,
  getServicesByPriority,
  getServicesByCategoryAndPriority,
  getServicesByCategoryType
} from '../controllers/serviceController';

const router = Router();

// Public routes for services
router.get('/services', getAllServices);
router.get('/services/category/:category', getServicesByCategory);
router.get('/services/priority/:priority', getServicesByPriority);
router.get('/services/category/:category/priority/:priority', getServicesByCategoryAndPriority);
router.get('/services/category-type/:id', getServicesByCategoryType);



export default router;