Typescript and Express.js 
=========================

An Express.js project implemented using Typescript with strongly typed objects:

# Installation

Clone the repository

```
npm install 
```

For development:
```
npm run dev
```

To start:
```
npm run start
```

To debug in visual studio code:
```
npm run debug
```

Then run the `launch.json` configuration inside visual studio code `f5`.  You should now be able to set breakpoints in your typescript.

Test
```
npm run test
```

Test Watch
```
npm run test:watch
```

Build to `./dist`
```
npm run build
```

Browse to http://localhost:3000


# Folder structure

```
├── docker-compose.yaml
├── Dockerfile
├── nodemon.json
├── package.json
├── package-lock.json
├── README.md
├── spec
│   ├── index.spec.ts
│   └── model.spec.ts
├── src
│   ├── controllers
│   │   └── index.server.controller.ts
│   ├── database
│   │   └── index.ts
│   ├── helpers
│   │   └── index.ts
│   ├── index.ts
│   ├── models
│   │   └── example.model.ts
│   ├── public
│   │   ├── favicon.ico
│   │   └── stylesheets
│   ├── routes
│   │   └── index.server.route.ts
│   ├── server
│   │   └── index.ts
│   ├── socket
│   │   └── index.ts
│   ├── tsconfig.json
│   ├── var
│   │   └── config.ts
│   └── views
│       ├── error.pug
│       ├── index.pug
│       └── layout.pug
├── tsconfig.json
└── tslint.json
```

# Docker

Build the image `sudo docker build -t rjmacarthy/express-typescript-starter .`

Run the image `docker-compose up`

Open `http://localhost:3000`


# License

MIT

