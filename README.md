# Electron-Angular
Create beautiful one page desktop apps with Electron and Angular for Windows, macOS, Linux and Web from a single code base.



## Project structure

| Folder | Description                                      |
|--------|--------------------------------------------------|
| app    | Electron main process folder (NodeJS)            |
| src    | Electron renderer process folder (Web / Angular) |

## Getting Started

*Clone this repository locally:*

``` bash
git clone git@github.com:voelkerb/electron-angular.git
```

*Install angular cli:*

``` bash
npm install -g @angular/cli
```

*Install dependencies with npm (used by Electron renderer process):*

``` bash
npm install
```

*Install NodeJS dependencies with npm (used by Electron main process):*

``` bash
npm install
```

Why two package.json ? This project follow [Electron Builder two package.json structure](https://www.electron.build/tutorials/two-package-structure) in order to optimize final bundle and be still able to use Angular `ng add` feature.

## To build for development

``` bash
npm start
```

If you change sth. within the angular code `src/*` hot-reload will allow you to see all changes directly after saving the file. Changes under `app/*`

The application code is managed by `app/main.ts`. The app runs with the Angular App [http://localhost:4200](http://localhost:4200) in an Electron window.

## To build for deployment

We use [electron-builder](https://www.electron.build) for packaging the application. See the available platforms in [package.json](app/package.json).
Depending on your operating system chosse between:

``` bash
npm run electron:buildWin
npm run electron:buildMac
npm run electron:buildLinux
```

## Kudos

* Maxim GRIS for hist [angular-electron demo](https://github.com/maximegris/angular-electron)
* Ronnie Dutta for his [electron seamless titlebar tutorial](https://github.com/binaryfunt/electron-seamless-titlebar-tutorial)