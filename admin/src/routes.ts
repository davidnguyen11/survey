const nextRoutes = require('next-routes');
const routes = nextRoutes();

routes.add('index', '/');
routes.add('search', '/search');
routes.add('dictionary', '/dictionary/:word');

export const Link = routes.Link;
export const Router = routes.Router;
export default routes;
