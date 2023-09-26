import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  // accessing the stored token from the cookie
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  // verifying the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }
    req.user = user; //accessing the user info we haved stored in the cookie
    next(); //execute the middleware ofter verifyToken
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // if user id matches and isAdmin than the user is verified
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next(); //execute the middleware ofter verifyUser
    } else {
      next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // checking if the user is a verified admin account
    if (req.user.isAdmin) {
      next(); //execute the middleware ofter verifyAdmin
    } else {
      next(createError(403, "You are not authorized admin account!"));
    }
  });
};
