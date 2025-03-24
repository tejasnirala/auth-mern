import ErrorHandler from '../../middlewares/error.js';
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';
import { User } from '../../models/userModel.js';
import { sendToken } from '../../utils/sendToken.js';

export const verifyOTP = catchAsyncError(async (req, res, next) => {

  const {email, otp, phone} = req.body;

  // Phone Number Validation;
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+91\d{10}$/;
    return phoneRegex.test(phone);
  }

  if (!validatePhoneNumber(phone)) {
    return next(new ErrorHandler('Invalid Phone Number', 400));
  }

  try {
    const userAllEntries = await User.find({
      $or: [
        {email, accountVerified: false},
        {phone, accountVerified: false}
      ]
    }).sort({ createdAt: -1 });


    if(!userAllEntries) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    let user;

    if(userAllEntries.length > 1) {
      user = userAllEntries[0];

      await User.deleteMany({
        _id: { $ne: user._id },
        $or: [
          {email, accountVerified: false},
          {phone, accountVerified: false}
        ]
      });
    } else {
      user = userAllEntries[0];
    }


    if(user.verificationCode !== Number(otp)) {
      return next(new ErrorHandler('Invalid OTP', 404));
    }

    const currentTime = Date.now();
    const verificationCodeExpire = new Date(user.verificationCodeExpire).getTime();

    if(currentTime > verificationCodeExpire) {
      return next(new ErrorHandler('OTP Expired', 400));
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;

    await user.save({ validateModifiedOnly: true});

    sendToken(user, 200, 'Account Verified', res);
  } catch (error) {
    return next(new ErrorHandler('Internal Server Error', 500));
  }
});
