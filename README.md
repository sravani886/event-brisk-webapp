Event Brisk
It's developed using MERN Stack(MongoDB, Expressjs, React/Redux, Nodejs)

## project structure

```terminal
LICENSE
package.json
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage (run app on your machine)

## Prerequisites

- [MongoDB]
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

you need client and server runs parallaly in different terminal session, in order to integrate both back end and front end

## Client-side usage(PORT: 3000)

```terminal
$ cd client          // go to client folder
$ yarn # or npm install --legacy-peer-deps    // npm install packages
$ npm run dev        // run it locally

```

## Server-side usage(PORT: 8000)

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm run dev // run it locally

```
