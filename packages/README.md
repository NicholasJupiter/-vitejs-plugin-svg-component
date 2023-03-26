# vite svg component plugin


## how to use 

`npm i svg-component-vite-plugin` 
or
`yarn add svg-component-vite-plugin`


## react

```javascript
// vite.config.js
import { viteReactSvgComponentPlugin } from 'svg-component-vite-plugin/dist/react';

plugins: [
  ...,
  viteReactSvgComponentPlugin({
    include: './assets/svgs/*.svg', //svg icon dir
  })
],

```

### example

```javascript
import IconTwitter, { svgCode, uri } from './assets/svgs/twitter.svg';

export default function App() {
  return (
    <div>
      <IconTwitter
        size="8"
        replacePropsByFill={{
          "#FDA085": {
            fill: 'yellow',
            fillOpacity: 1
          }
        }} />

      <p>uri: {uri}</p>

      <p>svgCode: {svgCode}</p>
    </div>
  )
}

```

### Code suggestion

```js
// Add the following line of code to any .d.ts file that is included in tsconfig.json. 
// For example, in the src/svg-component.d.ts file.
import 'svg-component-vite-plugin/dist/react/react-svg-component';

```

## vue coming soon.