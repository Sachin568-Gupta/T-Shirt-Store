const User = require("../models/user");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const { email } = req.body;
    const isUserExists = await User.findOne({ email: email });
    if (isUserExists) {
      return res.status(202).json({
        message: "This user is already present in db",
      });
    }
    const user = new User(req.body);
    user.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Not able to save user in database",
        });
      } else {
        data.encrypt_password = undefined;
        data.salt = undefined;
        return res.status(200).json(data);
      }
    });
  } catch (error) {
    res.status(400).json("error while sign up");
  }
};

exports.signIn = async (req, res) => {
  try {
    const { password } = req.body;
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User email is not present in database",
        });
      }
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password is not matched",
        });
      }
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);

      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });

      //send res to frontend
      const { _id, name, email, role } = user;
      return res.status(200).json({ token, user: { _id, name, email, role } });
    });
  } catch (error) {
    res.status(400).json("error while sign In");
  }
};

exports.signOut = async (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  const check = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!check) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Not a Admin, Access Denied",
    });
  }
  next();
};
