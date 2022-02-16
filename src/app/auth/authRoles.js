/**
 * Authorization Roles
 */
const authRoles = {
  super_admin: ["super_admin"],
  admin: ["admin", "super_admin"],
  hr_manager: ["hr_manager", "admin", "super_admin"],
  manager: ["manager", "hr_manager", "admin", "super_admin"],
  user: ["user", "manager", "hr_manager", "admin", "super_admin"],
  onlyGuest: [],
};

export default authRoles;
