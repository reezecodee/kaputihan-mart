import router from '@adonisjs/core/services/router'

const UserDatatablesController = () => import('#controllers/datatable/user_datatables_controller')
const CategoryDatatablesController = () =>
  import('#controllers/datatable/category_datatables_controller')
const StoreDatatablesController = () => import('#controllers/datatable/store_datatables_controller')

router
  .group(() => {
    router
      .get('user/:role', [UserDatatablesController, 'userDatatable'])
      .where('role', /^(Admin|User|Seller)$/)
      .as('datatable.user')

    router
      .get('categories', [CategoryDatatablesController, 'categoryDatatable'])
      .as('datatable.categoy')

    router.get('stores', [StoreDatatablesController, 'storeDatatable']).as('datatable.store')
  })
  .prefix('api/v1')
