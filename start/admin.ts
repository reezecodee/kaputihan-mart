import router from '@adonisjs/core/services/router'
const DashboardController = () => import('#controllers/admin/dashboard_controller')

router
  .group(() => {
    router.get('dashboard', [DashboardController, 'dashboard'])
  })
  .prefix('admin')
