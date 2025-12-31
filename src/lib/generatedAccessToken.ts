import jwt from 'jsonwebtoken';

// Interface for payload structure
interface JwtPayload {
  id: string;
}

// Function to generate access token
export const generateAccessToken = async (userId: string): Promise<string> => {
  const payload: JwtPayload = { id: userId };

  if (!process.env.FORGOT_PASSWORD_SECRET) {
    throw new Error("FORGOT_PASSWORD_SECRET is not defined in environment variables");
  }

  const token = jwt.sign(payload, process.env.FORGOT_PASSWORD_SECRET, { expiresIn: '1h' });

  return token;
};
