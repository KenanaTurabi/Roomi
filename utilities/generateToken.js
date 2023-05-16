const Token = require("../models/token");
const jwt = require("jsonwebtoken");

const generateAuthToken = async function (role) {
  const user = this;
  console.log(role);
  const token = jwt.sign(
    { _id: user.id.toString(), role: role },
    "thisisRoomiProject"
  );

  //const token=jwt.sign({ _id: user.id.toString() }, 'thisisRoomiProject')
  let userToken;
  switch (role) {
    case "student":
      userToken = new Token({ token, studentId: user.id });

      break;
    case "investor":
      userToken = new Token({ token, investorId: user.id });
      break;
    case "admin":
      userToken = new Token({ token, adminId: user.id });
      break;
    default:
      throw new Error();
  }
  await user.save();
  //const userToken = new Token({ token,userId: user.id  })
  await userToken.save();
  return token;
};

module.exports = generateAuthToken;
