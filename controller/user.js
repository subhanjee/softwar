const bcrypt = require("bcryptjs");
const User = require("../models/user");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const sendEmail = require("../utils/sendEmail");

// Controller function to register a new user
const signup = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(httpStatus.CREATED).json(user);
  } catch (error) {
    next(new ApiError(httpStatus.BAD_REQUEST, error.message));
  }
};

// Controller function to log in a user
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    // Return success response
    res.status(httpStatus.OK).json({ message: "Login successful", user });
  } catch (error) {
    next(
      new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Could not log in user")
    );
  }
};

// Controller function to handle forget password
const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
  }

  const resetToken = user.createPasswordResetToken();

  console.log(resetToken);
  // Save the user with the reset token
  await user.save();

  // Send email with reset link
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const message = `click on the link for resetPassword${resetUrl} `
  // Send the reset link via email using your preferred email sending library
  try {
    await sendEmail({
      email: user.email,
      subject: "Token sent to email (valid for 10 mins)",
      message
    });
    // Return success response after sending email
    return res
      .status(httpStatus.OK)
      .json({ message: "Reset password email sent" });
  } catch (error) {
    // If sending email fails, handle the error
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    console.log(error);
    // Return error response
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error sending reset password email" });
  }
};

// Controller function to reset password
const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hax");
  this.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // Token expires in 1 hour
  try {
    // Find user by reset token and ensure it has not expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Invalid or expired token" });
    }

    // Reset password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    // Clear reset token and expiry
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    // Save the updated user
    await user.save();

    // Return success response
    res.status(httpStatus.OK).json({ message: "Password reset successfully" });
  } catch (error) {
    next(
      new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Could not reset password")
    );
  }
};

module.exports = { signup, login, forgetPassword, resetPassword };
