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
npm run start
```

To serve:
```
npm run serve
```

Browse to http://localhost:3000

Wow, it works!

# Start in watch mode

`npm run nodemon`

# Folder structure

    .
    ├── src                    # Main project files
    │   ├── index.ts           # Required from ../index.js with ts-node
    │   ├── public             # Assets folder
    │   ├── controllers        # Controller files
    │   ├── views              # Jade files
    │   ├── routes             # Routes folder
	│   ├── config             # Configuration folder
	│   ├───├── express.ts     # Express configuration
	│   ├───├── config.ts      # Application configuration in config.js (port etc)
	index.js                   # Requires ./src with ts-node module

#tsc

tsc will output the compiled code to the `dist` folder.

# License

MIT - Do with as you like.

