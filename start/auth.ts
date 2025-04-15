import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const LoginController = () => import('#controllers/auth/login_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LogoutsController = () => import('#controllers/auth/logouts_controller')

router
  .group(() => {
    router.get('login', [LoginController, 'show']).as('login.show')
    router.post('login', [LoginController, 'store']).as('login.store')

    router.get('register', [RegisterController, 'show']).as('register.show')
    router.post('register', [RegisterController, 'store']).as('register.store')
  })
  .prefix('auth')
  .use(middleware.guest())

router.post('/logout', [LogoutsController, 'handle']).as('auth.logout')
