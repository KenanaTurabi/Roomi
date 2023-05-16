const jwt = require("jsonwebtoken");
const { Student, Investor, Admin, Token } = require("../models/connections");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisisRoomiProject");
    console.log(decoded.role);
    console.log(token);
    let user;
    switch (decoded.role) {
      case "student":
        user = await Student.findByPk(decoded._id, {
          include: [{ model: Token, where: { token } }],
        });
        break;
      case "investor":
        user = await Investor.findByPk(decoded._id, {
          include: [{ model: Token, where: { token } }],
        });
        break;
      case "admin":
        user = await Admin.findByPk(decoded._id, {
          include: [{ model: Token, where: { token } }],
        });
        break;
      default:
        throw new Error();
    }

    if (!user.tokens.length) {
      throw new Error();
    }
    req.user = user;
    req.user.token = token;
    req.user.role = decoded.role;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
