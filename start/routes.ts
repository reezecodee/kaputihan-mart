/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const HomeController = () => import('#controllers/user/home_controller')
const DashboardController = () => import('#controllers/admin/dashboard_controller')
import router from '@adonisjs/core/services/router'

router.get('/', [HomeController, 'home'])
router.get('admin', [DashboardController, 'dashboard'])
