import pageRoutes from "./router.config";
// ref: https://umijs.org/config/
export default {
  // 路由配置
  routes: pageRoutes,
  "proxy": {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'FEF',
      // dll: true,
      // pwa: true,
      routes: {
        exclude: [
          /\.config\.js$/,
        ],
      },
      // hardSource: true,
      scripts: [
        { src: 'https://unpkg.com/react@16/umd/react.development.js' },
      ],
      links:[{ rel: 'stylesheet', href: 'https://cdn.bootcss.com/twitter-bootstrap/4.2.1/css/bootstrap-grid.css' }]
    }],
  ],
}

