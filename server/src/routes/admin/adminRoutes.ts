import { Router } from 'express';
import { adminSubmissionController } from '../../controllers/admin/adminSubmissionController';
import { adminUserController } from '../../controllers/admin/adminUserController';
import { adminCategoryController } from '../../controllers/admin/adminCategoryController';
import { adminServiceController } from '../../controllers/admin/adminServiceController';
import { adminController } from '../../controllers/admin/adminController';
import { authenticateAdmin as authMiddleware } from '../../middlewares/authMiddleware';
import { SignupAdmin } from '../../controllers/authController';
import { upload } from '../../middlewares/uploadMiddleware';

const router = Router();

// Admin registration route (unprotected)
router.post('/register', SignupAdmin);

// Apply authentication middleware to all admin routes
router.use(authMiddleware);

// Dashboard
router.get('/', adminServiceController.dashboard);
router.get('/dashboard', adminServiceController.dashboard);

// Individual submission details
router.get('/submission/:id', adminSubmissionController.getSubmissionDetails);
router.put('/submission/:id/status', adminSubmissionController.updateSubmissionStatus);
router.delete('/submission/:id', adminSubmissionController.deleteSubmission);

// Submission management routes
router.get('/submissions', adminSubmissionController.getAllSubmissions); // Get all submissions
router.get('/submissions/demo', adminSubmissionController.getDemoRequests);
router.get('/submissions/contact', adminSubmissionController.getContactForms);
router.get('/submissions/get-in-touch', adminSubmissionController.getInTouchForms);

// Users Management
router.get('/users', adminUserController.getUsers);
router.get('/users/:id', adminUserController.getUserDetails);
router.put('/users/:id', adminUserController.updateUser);
router.delete('/users/:id', adminUserController.deleteUser);

// Analytics
router.get('/analytics', adminServiceController.getAnalytics);
router.get('/api/stats', adminServiceController.getStats);

// Dashboard stats (alternative endpoint)
router.get('/stats', adminServiceController.getStats);

// Settings
router.get('/settings', adminServiceController.getSettings);
router.put('/settings', adminServiceController.updateSettings);

// Export data
router.get('/export/submissions', adminSubmissionController.exportSubmissions);
router.get('/export/users', adminUserController.exportUsers);

// Bulk actions
router.post('/bulk/delete-submissions', adminSubmissionController.bulkDeleteSubmissions);
router.post('/bulk/update-status', adminSubmissionController.bulkUpdateStatus);

// Categories Management
router.get('/categories', adminCategoryController.getCategories);
router.post('/categories', adminCategoryController.createCategory);
router.put('/categories/:id', adminCategoryController.updateCategory);
router.delete('/categories/:id', adminCategoryController.deleteCategory);

// Category Types Management
router.get('/categories/:categoryId/types', adminCategoryController.getCategoryTypes);
router.post('/categories/:categoryId/types', adminCategoryController.createCategoryType);
router.put('/category-types/:id', adminCategoryController.updateCategoryType);
router.delete('/category-types/:id', adminCategoryController.deleteCategoryType);

// Partners Management
router.get('/partners', adminController.getPartners);
router.get('/partners/:id', adminController.getPartnerById);
router.post('/partners', upload.single('logo'), adminController.createPartner);
router.put('/partners/:id', upload.single('logo'), adminController.updatePartner);
router.delete('/partners/:id', adminController.deletePartner);
router.put('/partners/:id/status', adminController.updatePartnerStatus);

// Services Management
router.get('/services', adminServiceController.getServices);
router.get('/services/:id', adminServiceController.getServiceById);
router.post('/services', upload.single('image'), adminServiceController.createService);
router.put('/services/:id', upload.single('image'), adminServiceController.updateService);
router.delete('/services/:id', adminServiceController.deleteService);
router.put('/services/:id/status', adminServiceController.updateServiceStatus);

// Services by category type
router.get('/services/category-type/:id', adminServiceController.getServicesByCategoryType);

export default router;