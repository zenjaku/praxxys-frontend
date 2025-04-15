# IONIC VIA VUE WITH CAPACITOR (FRONT-END)

## Install first the Ionic CLI to run and make the project
```bash
npm install -g @ionic/cli  
ionic start praxxy-frontend blank --type vue
```  

## Uninstall TypeScript and change all the file extensions from .ts to .js
```bash
npm uninstall --save typescript @types/jest @typescript-eslint/eslint-plugin @typescript-eslint/parser @vue/cli-plugin-typescript @vue/eslint-config-typescript vue-tsc
``` 
1. Delete **tsconfig.json**  
2. In package.json, change the build script from **"build": "vue-tsc && vite build"** to **"build": "vite build"**  

## Added FontAwesome icons for Vue
```bash
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/vue-fontawesome@latest-3.
``` 

## Install TailwindCSS for fast styling of layouts
`npm install tailwindcss @tailwindcss/vite ` 
1. Add these lines to vite.config.js:  
    -- ``**import tailwindcss from '@tailwindcss/vite'**``  
    -- ``**plugins: [ tailwindcss(), ],**``
2. Add this line to **src/theme/variable.css**:  
    -- ``**@import "tailwindcss";**`` 

## Install Ionic extension in Visual Studio Code and add Capacitor packages from there.

1.  Initialize Capacitor
```bash
npx cap init
```
2. Add android **(iOS is only supported on Mac with Xcode)**
```bash
npx cap add android
```
3. Build the app **(Make sure that the "webDir" in capacitor.config.json is set to "dist")**
```bash
npx cap build android
```
4. Synchronize with the development
```bash
npx cap sync android
```

## To run the development
```bash
ionic cap run android -l --external --target DEVICE_ID
```
**Note: I use an android phone to display the development app**