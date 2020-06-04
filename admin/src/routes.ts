const nextRoutes = require('next-routes');
const routes = nextRoutes();

routes.add('index', '/');
routes.add('employee', '/employee');
routes.add('employee-detail', '/employee/:id');

export const Link = routes.Link;
export const Router = routes.Router;
export default routes;
