# React 16 + Webpack 4 Full SSR Starter

## WIP

**What's working :**

- Docker
- Webpack4 build
- HMR
- SSR (full render with HMR and build, including css)

**What's left to do :**
- SSR for images with `import`
- TypeScript
- Tests with Jest+Enzyme

## How to use it

- Clone this repo
- Create a `.env` file  
`make .env`
- Install dependencies  
`yarn install`

### dev
- run a dev server with hot reloading  
`yarn dev`


### prod
- build the `dist` folder  
`yarn build`
- run the production server  
`yarn start`

### Docker

A docker config is available mainly for dev purposes right now.  
I will improve it later.
