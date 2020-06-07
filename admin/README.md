# Admin

The admin provide tool to manage information of employee

## Features

- [x] Display list of employee information
- [x] Allow to create new information of employee
- [x] Allow to edit information of employee
- [x] Allow to see detail information of employee
- [x] Allow to see the list of performance reviews of employees
- [x] Allow to see detail of performance review of specific employee
- [x] Allow to delete employee
- [ ] Login
- [ ] Assign employees to participate in another employee's performance review

## Development

Make sure the `admin` started.

To start web app, run:

```bash
npm run dev
```

## Production

Follow these steps below:

```bash
npm run build
```

```bash
npm start
```

## Docker

To start web app, please follow:

**build**

```bash
docker build -t admin .
```

**run**

```bash
docker run -e NODE_ENV=production -p 3002:3002 admin:latest
```

Open: http://localhost:3001/

## Technologies using

- [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- [https://nextjs.org/](https://nextjs.org/)
- [https://material-ui.com/](https://material-ui.com/)
- [https://prettier.io/](https://prettier.io/)
