const nextRoutes = require('next-routes');
const routes = nextRoutes();

routes.add('index', '/');
routes.add('login', '/login');
routes.add('reviews', '/reviews');
routes.add('reviewees', '/reviewees');
routes.add('submit-review', '/reviewees/:revieweeId');

export const Link = routes.Link;
export const Router = routes.Router;
export default routes;
