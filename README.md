# OBS Browser-based Presentation Recording Studio

![Build and Deploy](https://github.com/ruthetdav/obs-remote-recording/workflows/Build%20and%20Deploy/badge.svg)

### Description

This project is a small client-side web application that allows:
- allows driving/controlling a locally installed and pre-configured OBS
- to simplify the management of a presentation that is recorded or streamed to a pre-configured destination.

### How to run

##### Pre-requisite

This projects depends on the `obs-websocket` plugin being installed in OBS.
Installation instructions for the last version are there:
https://github.com/Palakis/obs-websocket/releases/tag/4.7.0

##### Demo

You can test it here:

https://ruthetdav.github.io/obs-remote-recording

It works on Firefox and Chrome, but **not on MacOS 10 Safari**, because of mixed content between https and http.

### Used Technological stacks:

- Webpack 4
- TypeScript
- Bootstrap 4 (SCSS, JS)
- jQuery 
- Popper
- Google Material Icons

This project contains preconfigured Webpack 4 to work with the following tasks:

- Compile `SCSS` to `CSS`
- Optimize images (`*.png`, `*.jpeg`, `*.gif`)
- Convert `SVG` into inline `'data:image'` format
- Fonts loader
- Automatic copy `static` directory to the `dist` directory
- Production optimization (styles, JavaScript, images)
- Build source maps

### Installation

- Execute a command from the root directory
```
npm install
npm run build
``` 
### Project structure

- **src**: Project sources root
    - **img**: Images and icons used in the styles
    - **js**: Typescript code-base for the application
    - **scss**: Styles sources (may contain structure what you like)
    - **static**: Images and media-files which uses statically (will be copied to the `dist` directory), ex: uses in the HTML

### Tasks

- Build sources - ```npm run build```
- Start file watcher for recompiling - ```npm run watch```
- Start webpack dev server - ```npm run start```
- Build sources for production (**with optimization**) - ```npm run production```
- Clean '`dist`' folder - ```npm run clear```
