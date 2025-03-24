import ErrorHandler from '../../middlewares/error.js';
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';
import { User } from '../../models/userModel.js';
import { sendVerificationCode } from '../../utils/sendVerificationCode.js';

export const register = catchAsyncError(async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      verificationMethod
    } = req.body;

    // Ensuring all fields are present
    if (!name || !email || !phone || !password || !verificationMethod) {
      return next(new ErrorHandler('All fields are required', 400));
    }

    // Phone Number Validation;
    const validatePhoneNumber = (phone) => {
      const phoneRegex = /^\+91\d{10}$/;
      return phoneRegex.test(phone);
    }

    if (!validatePhoneNumber(phone)) {
      return next(new ErrorHandler('Invalid Phone Number', 400));
    }

    // Ensuring Phone/Email is unique
    const existingUser = await User.findOne({
      $or: [
        {
          email,
          accountVerified: true,
        },
        {
          phone,
          accountVerified: true,
        },
      ],
    });

    if (existingUser) {
      return next(new ErrorHandler('Phone or Email is already used', 400));
    }

    // Rate limiting
    const registerationAttemptsByUser = await User.find({
      $or: [
        {
          email,
          accountVerified: false
        },
        {
          phone,
          accountVerified: false
        },
      ]
    });

    if (registerationAttemptsByUser.length > 3) {
      return next(
        new ErrorHandler(
          'You have exceeded the maximum number of attempts (3). Please try again after an hour.',
          400
        )
      );
    }

    const userData = {
      name,
      email,
      phone,
      password,
    }

    // Registering user
    const user = await User.create(userData);

    const verificationCode = await user.generateVerificationCode();
    await user.save();
    sendVerificationCode(verificationMethod, verificationCode, email, phone, res);
  } catch (error) {
    next(error);
  }
});
