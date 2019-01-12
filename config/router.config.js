export default [
  {
    path: '/login',
    name: 'loginPage',
    component: './login/index',
  },
  // app
  {
    path: '/',
    component: '../layouts/index',
    // Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/dashboard' },
      {
        
          path:"/dashboard",
          name:"dashboard",
          icon:"dashboard",
          component:'./dashboard/index'
      },
      {
        path: '/home',
        name: 'home',
        icon: 'home',
        routes: [
          { path: '/home', redirect: '/home/index' },
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
