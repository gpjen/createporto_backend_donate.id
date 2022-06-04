const bcrypt = require("bcrypt");

exports.hashedText = async (myPlaintextPassword, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(myPlaintextPassword, salt);
  } catch (error) {
    return false;
  }
};

exports.compareText = async (checkText, hashedText) => {
  try {
    return await bcrypt.compare(checkText, hashedText);
  } catch (error) {
    return false;
  }
};
