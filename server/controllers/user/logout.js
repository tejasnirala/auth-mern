import { catchAsyncError } from '../../middlewares/catchAsyncError.js';

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie('token', '', {
      expires: new Date(),
      httpOnly: true,  // Prevents client-side JS from accessing cookie
      secure: process.env.NODE_ENV === "production", // Send over HTTPS only in production
      sameSite: "Strict", // Prevent CSRF attacks
      path: "/", // Makes cookie available for the whole site
    })
    .json({
      success: true,
      message: 'Logged out successfully'
    });
});
