const nextRoutes = require('next-routes');
const routes = nextRoutes();

const ROUTES = {
  employee: {
    list: '/employee',
    detail: '/employee/edit/:id',
    new: '/employee/new'
  },
  performance: {
    list: '/performance'
  }
};

routes.add('index', '/');

// Employee
routes.add('employee', ROUTES.employee.list);
routes.add('employee-detail', ROUTES.employee.detail);
routes.add('employee-create', ROUTES.employee.new);

// Performance
routes.add('performance', ROUTES.performance.list);

export const Link = routes.Link;
export const Router = routes.Router;
export default routes;
export { ROUTES };
