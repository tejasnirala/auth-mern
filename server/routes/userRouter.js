import { Router } from 'express';
import { forgotPassword, getUser, login, logout, register, resetPassword, verifyOTP } from '../controllers/index.js';
import { isAuthenticated } from '../middlewares/auth.js';

const userRouter = Router();

userRouter.post('/register', register)
userRouter.post('/otp-verification', verifyOTP)
userRouter.post('/login', login)
userRouter.get('/logout', isAuthenticated , logout)
userRouter.get('/me', isAuthenticated , getUser)
userRouter.post('/password/forgot', forgotPassword)
userRouter.post('/password/reset/:token', resetPassword)


export default userRouter;