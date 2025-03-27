import router from '@adonisjs/core/services/router'
const DashboardController = () => import('#controllers/admin/dashboard_controller')
const ManageUMKMsController = () => import('#controllers/admin/manage_umkms_controller')
const ManageUsersController = () => import('#controllers/admin/manage_users_controller')
const SettingsController = () => import('#controllers/admin/settings_controller')
const ProfilesController = () => import('#controllers/admin/profiles_controller')
const HelpsController = () => import('#controllers/admin/helps_controller')

router
  .group(() => {
    router.get('dashboard', [DashboardController, 'dashboard']).as('admin.dashboard')
    router
      .group(() => {
        router.get('toko', [ManageUMKMsController, 'store']).as('admin.store-umkm')
        router.get('produk', [ManageUMKMsController, 'product']).as('admin.product')
        router.get('kategori', [ManageUMKMsController, 'category']).as('admin.category')
      })
      .prefix('kelola-umkm')

    router
      .group(() => {
        router.get('admin', [ManageUsersController, 'admin']).as('admin.admin')
        router.get('pengguna', [ManageUsersController, 'user']).as('admin.user')
        router.get('penjual', [ManageUsersController, 'seller']).as('admin.seller')
      })
      .prefix('kelola-pengguna')
    router.get('pengaturan', [SettingsController, 'setting']).as('admin.setting')
    router.get('profile', [ProfilesController, 'profile']).as('admin.profile')
    router.get('bantuan', [HelpsController, 'help']).as('admin.help')
  })
  .prefix('admin')
