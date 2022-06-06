// create user / register
exports.registerUser = async (req, res, next) => {
  const {
    name: fullname,
    email,
    phone,
    profile,
    gender,
    password,
    confirmPassword,
  } = req.body;

  try {
  } catch (error) {
    console.log("> ", error.message);
    next(error);
  }
};
