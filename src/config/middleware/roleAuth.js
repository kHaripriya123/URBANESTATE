const roleAuth = (allowedRoles) => {
    return (req, res, next) => {
      console.log("User roles:", req.user.role);
    console.log("Allowed roles:", allowedRoles);
      if (!req.user || !allowedRoles.some(role => req.user.role.includes(role))) {
        return res.status(403).json({ error: "Access denied" });
      }
      next();
    };
  };
  
  module.exports = {roleAuth};