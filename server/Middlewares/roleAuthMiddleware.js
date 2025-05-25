// const authorizeRole = (...Roles) => {
//   return (req, res, next) => {
//     const loggedInRole = req.user?.role;
//     const loggedInUserId = req.user?.id; // comes from decoded token
//     const targetUserId = req.body?.userId;
//     const targetRole = req.body?.currentRole;

//     // 1. User's role is not in allowed list
//     if (!Roles.includes(loggedInRole)) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     // 2. Manager trying to change an Admin's role
//     if (loggedInRole === "manager" && targetRole === "admin") {
//       return res.status(403).json({
//         message: "Managers are not allowed to modify admin roles",
//       });
//     }

//     // 3. User trying to change their own role
//     if (loggedInUserId === targetUserId) {
//       return res.status(403).json({
//         message: "You cannot change your own role",
//       });
//     }

//     next();
//   };
// };

// export default authorizeRole;

const authorizeRole = (...Roles) => {
  return (req, res, next) => {
    const loggedInRole = req.user?.role;
    const loggedInUserId = req.user?.id;
    const targetUserId = req.body?.userId;
    const targetRole = req.body?.currentRole;
    const newRole = req.body?.newRole;

    // 1. User's role is not in allowed roles
    if (!Roles.includes(loggedInRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // 2. User trying to change their own role
    if (loggedInUserId === targetUserId) {
      return res.status(403).json({
        message: "You cannot change your own role",
      });
    }

    // 3. Manager trying to modify an Admin's role
    if (loggedInRole === "manager" && targetRole === "admin") {
      return res.status(403).json({
        message: "Managers are not allowed to modify admin roles",
      });
    }

    // 4. Manager trying to promote/demote someone to Admin
    if (loggedInRole === "manager" && newRole === "admin") {
      return res.status(403).json({
        message: "Managers are not allowed to assign admin role",
      });
    }

    next();
  };
};

export default authorizeRole;
