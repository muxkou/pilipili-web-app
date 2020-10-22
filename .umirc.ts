import { IConfig } from 'umi-types';

const theme = {
  'primary-color': '#00a0d8',
  'error-color': '#f45d90',
  'border-radius-base': '2px',
  'outline-width': '0'

};
// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  history: 'hash',
  theme: theme,
  sass: {
    implementation: require('node-sass'),
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  },
  cssLoaderOptions: {
    localIdentName: '[local]'
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'pili-web-app-umi',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}

export default config;
