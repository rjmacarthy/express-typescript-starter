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

To serve:
```
npm run serve
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
|-- Dockerfile 
|-- README.md 
|-- package.json
|-- spec
|   -- index.spec.ts
|-- src
|   |-- config
|   |   -- config.ts
|   |   -- express.ts
|   |-- controllers
|   |   -- index.server.controller.ts
|   |-- index.ts
|   |-- public
|   |   -- stylesheets
|   |       -- style.css
|   |-- routes
|   |   -- index.server.route.ts
|   |-- tsconfig.json
|   -- views
|       -- error.jade
|       -- index.jade
|       -- layout.jade
-- tsconfig.json
```

# Docker

Build the image `sudo docker build -t rjmacarthy/express-typescript-starter .`

Run the image `docker-compose up`

Open `http://localhost:8080`


# License

MIT - Do with as you like.

