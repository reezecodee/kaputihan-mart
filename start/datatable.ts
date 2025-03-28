import router from '@adonisjs/core/services/router'

const UserDatatablesController = () => import('#controllers/datatable/user_datatables_controller')

router
  .group(() => {
    router
      .get('user/:type', [UserDatatablesController, 'userDatatable'])
      .where('type', /^(Admin|User|Seller)$/)
      .as('datatable.user')
  })
  .prefix('api/v1')
