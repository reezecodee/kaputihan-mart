import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const DashboardController = () => import('#controllers/admin/dashboard_controller')
const ManageUMKMsController = () => import('#controllers/admin/manage_umkms_controller')
const ManageUsersController = () => import('#controllers/admin/manage_users_controller')
const SettingsController = () => import('#controllers/admin/settings_controller')
const ProfilesController = () => import('#controllers/admin/profiles_controller')
const HelpsController = () => import('#controllers/admin/helps_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('dashboard', [DashboardController, 'dashboard']).as('admin.dashboard')
        router
          .group(() => {
            router.get('toko', [ManageUMKMsController, 'store']).as('admin.store-umkm')
            router.get('produk', [ManageUMKMsController, 'product']).as('admin.product')
            router.get('kategori', [ManageUMKMsController, 'category']).as('admin.category')

            router.get('edit-toko/:id', [ManageUMKMsController, 'editStore']).as('admin.editStore')
            router
              .get('edit-produk/:slug', [ManageUMKMsController, 'editProduct'])
              .as('admin.editProduct')
            router
              .get('edit-kategori/:id', [ManageUMKMsController, 'editCategory'])
              .as('admin.editCategory')
          })
          .prefix('kelola-umkm')

        router
          .group(() => {
            router.get('admin', [ManageUsersController, 'admin']).as('admin.admin')
            router.get('pengguna', [ManageUsersController, 'user']).as('admin.user')
            router.get('penjual', [ManageUsersController, 'seller']).as('admin.seller')

            router
              .get('edit-penjual/:id', [ManageUsersController, 'editSeller'])
              .as('admin.editSeller')
          })
          .prefix('kelola-pengguna')

        router.get('pengaturan', [SettingsController, 'setting']).as('admin.setting')
        router.get('profile', [ProfilesController, 'profile']).as('admin.profile')
        router.get('bantuan', [HelpsController, 'help']).as('admin.help')
      })
      .prefix('admin')

    router
      .group(() => {
        router
          .post('store/user/:role', [ManageUsersController, 'store'])
          .where('role', /^(Admin|User|Seller)$/)
          .as('store.user')
        router.post('store/category', [ManageUMKMsController, 'storeCategory']).as('store.category')
        router.post('store/store', [ManageUMKMsController, 'storeStore']).as('store.store')
        router.post('store/product', [ManageUMKMsController, 'storeProduct']).as('store.product')

        router.put('update/seller/:id', [ManageUsersController, 'updateSeller']).as('update.seller')
        router.put('update/store/:id', [ManageUMKMsController, 'updateStore']).as('update.store')
        router
          .put('update/product/:id', [ManageUMKMsController, 'updateProduct'])
          .as('update.product')
        router
          .put('update/category/:id', [ManageUMKMsController, 'updateCategory'])
          .as('update.category')
      })
      .prefix('api/v1')

    router
      .group(() => {
        router.delete('destroy/user/:id', [ManageUsersController, 'destroy']).as('destroy.user')
        router
          .delete('destroy/category/:id', [ManageUMKMsController, 'destroyCategory'])
          .as('destroy.category')
      })
      .prefix('api/v1')
  })
  .use(middleware.auth())
