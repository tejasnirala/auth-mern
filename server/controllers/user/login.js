import ErrorHandler from '../../middlewares/error.js';
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';
import { User } from '../../models/userModel.js';
import { sendToken } from '../../utils/sendToken.js';


export const login = catchAsyncError(async (req, res, next) => {
  const {email, password} = req.body;
  if(!email || !password) {
    return next(new ErrorHandler('Email and Password are required', 400));
  }

  const user = await User.findOne({ email, accountVerified: true }).select('+password');
  if(!user) {
    return next(new ErrorHandler('User with email not found', 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if(!isPasswordMatched) {
    return next(new ErrorHandler('Wrong Password', 400));
  }

  sendToken(user, 200, 'User logged in successfully', res);
});
