import router from '@adonisjs/core/services/router'

const UserDatatablesController = () => import('#controllers/datatable/user_datatables_controller')

router
  .group(() => {
    router
      .get('user/:role', [UserDatatablesController, 'userDatatable'])
      .where('role', /^(Admin|User|Seller)$/)
      .as('datatable.user')
  })
  .prefix('api/v1')
