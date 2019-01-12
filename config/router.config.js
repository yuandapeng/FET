export default [
 
  // app
  {
    path: '/',
    component: '../layouts/index',
    // Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/home/index' },
      {
        
          path:"/login",
          name:"login",
          icon:"table",
          routes:[{
            path: '/login/index',
            name: 'loginPage',
            component: './login',
          },]
      },
      {
        path: '/home',
        name: 'home',
        icon: 'dashboard',
        routes: [
          {
            path: '/home/index',
            name: 'home',
            component: './home',
          },
          {
            path: '/home/detail',
            name: 'detail',
            component: './home/detail',
          }
        ],
      },
      {
        component: '404',
      },

    ],
  },
];
