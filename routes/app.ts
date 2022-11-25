export enum ROLE {
  ADMIN = "admin",
  USER = "user",
  PUBLIC = "public",
}
export const appRoutes = [
  {
    path: "/login",
    roles: [ROLE.PUBLIC],
  },
  {
    path: "/dashboard",
    roles: [ ROLE.USER],
  },
];
