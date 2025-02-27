import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  res
    .status(statusCode)
    .cookie("token", token, {
      expiresIn: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};

