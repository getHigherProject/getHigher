const cookieController = {};

//controller store user type and ID in cookies
cookieController.setSSIDCookie = (req, res, next) => {
  try {
    const { userType, userID } = res.locals.applicant;
    res.cookie('userType', userType, { httpOnly: true });
    res.cookie('userID', userID, { httpOnly: true });
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Failed to set cookies' });
  }
};

module.exports = cookieController;