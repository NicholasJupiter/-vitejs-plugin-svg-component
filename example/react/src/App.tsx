import IconTwitter, { svgCode, uri } from './assets/svgs/twitter.svg';

export default function App() {
  return (
    <div style={{
    }}>

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