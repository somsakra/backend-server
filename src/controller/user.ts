import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const user_signup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(200).json({
          message: "E-mail is already Exist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: `User ${req.body.email} Created`,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

export const user_login = (req: Request, res: Response, nex: NextFunction) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(200).json({
          message: "Authentication Fail",
        });
      } else {
        bcrypt.compare(req.body.password, user!.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Authentication Fail",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user!.email,
                userId: user!._id,
              },
              "secretToken",
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              message: "Authentication Success",
              token: token,
            });
          } else {
            return res.status(401).json({
              message: "Authentication Fail",
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const user_delete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
