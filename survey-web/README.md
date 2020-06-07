# Survey web

The survey web app provide employee a tool to see and submit reviews from other employee.

## Features

- [x] Login
- [x] Displaying list of reviews of current employee
- [x] Displaying list of reviewees need to add reviews
- [x] Submit review for specific reviewee

## Development

Make sure the `survey-api` started.

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
docker build -t survey-web .
```

**run**

```bash
docker run -e NODE_ENV=production -p 3002:3002 survey-web:latest
```

Open: http://localhost:3002/

## Technologies using

- [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- [https://nextjs.org/](https://nextjs.org/)
- [https://material-ui.com/](https://material-ui.com/)
- [https://prettier.io/](https://prettier.io/)
