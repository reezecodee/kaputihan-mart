import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth/auth_controller')

router
  .group(() => {
    router.get('login', [AuthController, 'login']).as('auth.login')
    router.get('register', [AuthController, 'register']).as('auth.register')
  })
  .prefix('auth')
