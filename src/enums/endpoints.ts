export enum Endpoints {
  /** User Endpoints */
  LOGIN = "user/auth/login/", // POST
  REGISTER = "user/auth/register/", // POST
  CHANGE_PASSWORD = "user/auth/password/change/", // PUT - PATCH
  RESET_PASSWORD_CHANGE = "user/auth/password/reset/change/", // PUT - PATCH
  RESET_PASSWORD_SEND = "user/auth/password/reset/send/", // POST
  RESET_PASSWORD_VERIFY = "user/auth/password/reset/verify/", // POST
  TOKEN_REFRESH = "user/auth/token/refresh/", // POST
  ACTIVATE_ACCOUNT = "user/utils/activate/{otp}/{user_id}", // GET
  PROMOTE = "user/utils/user/promote/", // GET
  PROMOTE_DETAILS = "user/utils/user/promote/", // + {id}/ PUT - PATCH
  /** Management Endpoints */
  /** Task Endpoints */
  TASK = "management/task/", // GET - POST - PUT - PATCH - DELETE
  TASK_ATTACHMENT = '/management/files/task/', // POST 
  TASK_ATTACHMENT_DELETE = '/management/files/task/', // /{id} DELETE
  /** Project Endpoints */
  PROJECT = "management/project/", // /{id} GET - POST - PUT - PATCH - DELETE
  PROJECT_ATTACHMENT = '/management/files/project/', // POST 
  PROJECT_ATTACHMENT_DELETE = '/management/files/project/', // /{id} DELETE
  /** Category Endpoints */
  CATEGORY = "category/", // /{id} GET - POST - PUT - PATCH - DELETE
  PERMISSION = "user/utils/permissions/",
  /**  Employee === Register New User */
  EMPLOYEE = "user/utils/list/employee/",
  EMPLOYEE_CREATE = "user/auth/register/",
  EMPLOYEE_PROJECT = "management/employee/", // GET - POST - PUT - PATCH - DELETE

  /**  Manager === Register New User */
  MANAGER = "user/utils/managers/",
 }
