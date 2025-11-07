import { Router } from 'express';
import { SigninUser, SignupAdmin, SignupUser, SigninAdmin, renderAdminLogin, verifyAdmin, logoutAdmin } from '../controllers/authController';

const router = Router();

// User registration route
router.post('/register', SignupUser);
router.post("/register", SignupAdmin)

// User login route
router.post('/login', SigninUser);

// Admin login routes
router.get('/admin/login', renderAdminLogin);
router.post('/admin/login', SigninAdmin);
router.get('/admin/verify', verifyAdmin);
router.post('/admin/logout', logoutAdmin);

export default router;