
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '',name:'loginDefault', component: () => import('pages/Login.vue') },

      { path: 'login', name:'login', component: () => import('pages/Login.vue') },
      { path: 'register',name:'register', component: () => import('pages/Register.vue') },
      { path: 'email-confirmation',name:'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'forgot-password',name:'forgot-password', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password',name:'reset-password', component: () => import('pages/ResetPassword.vue') },
      { path: 'privacy',name:'privacy', component: () => import('pages/privacy.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'accueil',name:'accuil', component: () => import('pages/accueil.vue') },
      { path: 'me',name:'me', component: () => import('pages/Me.vue') },

    ]
  },

  {
    path: '/',
    component: () => import('layouts/QuizLayout.vue'),
    children: [

      { path: 'quiz/:id',name:'quiz', component: () => import('pages/IndexPage.vue') },
    ]
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),

  }
]

export default routes
