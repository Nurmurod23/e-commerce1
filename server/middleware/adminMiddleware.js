const admin = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    console.log(`Unauthorized access attempt by user ${req.user ? req.user.email : 'unknown'}`);
    res.status(403).json({ message: 'Access denied' });
  }
};

module.exports = admin;
