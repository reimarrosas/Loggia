# Personal Logbook

## Description

This is a Web Application inspired by a deliverable in my System Development Course in Vanier College. You can create logs of all the things you did in a specific date and browse through them. You can also update a log if you made a mistake and delete them if you don't need them anymore.

## Minimum Features

The web application should have at least the following features:

1. The user can create an account to obtain a logbook repository.
2. The user can login to their created account to access their logbook repository.
3. The user can view all their logs within the logbook.
4. The user can create a log by inserting a specific date and the tasks they performed at that date.
5. The user can update a log.
6. The user can delete a log.
7. The user can create a link that will allow anyone who has that link to view the logs of that logbook.

> **Note** <br/>
> Log - a specific entry in a logbook.<br/>
> Logbook - a group of logs within a specific topic.<br/>
> Logbook Repository - the group of logbooks that each user have.

## Nice to haves

1. The user can create multiple logbooks of various topics.
2. The user can filter logs via date.
3. The user can search for logs via titles.
4. The user can share logs within a date range.
5. The user can sort logs in ascending and descending order.

## Technologies

- [NodeJS](https://nodejs.org) - A JavaScript runtime environment that allows JavaScript to be run on the backend.
- [ExpressJS](https://expressjs.com) - An unopinionated backend framework for NodeJS that allows you to create web apis by simplifying the creation of routes, middlewares, and integration of other libraries.
- [React](https://reactjs.org/) - A JavaScript frontend library used for building single-page applications.
- [React-Router](https://reactrouter.com/) - Declarative client-side routing for React.
- [TailwindCSS](https://tailwindcss.com/) - A utility-first, composable CSS framework for rapidly styling custom user interfaces.
- [PostgreSQL](https://postgresql.org) - A relation database management system that will handle data persistence of the application in storing user info, logs, logbooks, and share links, and more.
- [JsonWebToken](https://jwt.io/) - Tokens used for authenticating/authorizing users.
- [NodeMailer](https://nodemailer.com) - A simple email sending library for NodeJS.