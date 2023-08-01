const cookieController = {};

// controller to store userType and id in cookies
cookieController.setSSIDCookie = (req, res, next) => {
  try {
    let userType;
    let _id;

    if (res.locals.company) {
      userType = 'company';
      _id = res.locals.company._id;
    } else if (res.locals.applicant) {
      userType = 'applicant';
      _id = res.locals.applicant._id;
    } else {
      return res.status(500).json({ error: 'User type not recognized' });
    }

    res.cookie('userType', userType, { httpOnly: true });
    res.cookie('userID', _id, { httpOnly: true });

    next();
  } catch (err) {
    return res.status(500).json({ error: 'Failed to set cookies' });
  }
};

module.exports = cookieController;
