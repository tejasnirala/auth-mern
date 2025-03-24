export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  const cookieExpireDays = Number(process.env.COOKIE_EXPIRE) || 7; // Default to 7 days if not set

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
      httpOnly: true,  // Prevents client-side JS from accessing cookie
      secure: process.env.NODE_ENV === "production", // Send over HTTPS only in production
      sameSite: "Strict", // Prevent CSRF attacks
      path: "/", // Makes cookie available for the whole site
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
