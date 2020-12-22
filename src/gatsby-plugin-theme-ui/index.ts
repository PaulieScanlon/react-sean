export default {
  colors: {
    text: '#0b0829',
    background: '#ffffff',
    primary: '#f095c7',
    secondary: '#4199f1',
    secondaryDark: '#2057b7',
    grey: '#cccccc',
    greyMid: '#999999',
    hightlight: '#221d4e',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  styles: {
    root: {
      fontSize: 1,
      fontFamily: 'body',
      lineHeight: 'body',
    },
  },
  sizes: {
    container: 1340,
    video: {
      width: 400,
      height: 300,
    },
    image: {
      width: 150,
      height: 150,
    },
    canvas: 300,
  },
  buttons: {
    default: {
      cursor: 'pointer',
      color: 'text',
      '&:disabled': {
        cursor: 'not-allowed',
        color: 'greyMid',
        backgroundColor: 'grey',
      },
    },
    primary: {
      variant: 'buttons.default',
    },
    secondary: {
      variant: 'buttons.default',
      color: 'background',
      backgroundColor: 'secondary',
    },
  },
}
