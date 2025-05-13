import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const HomeController = () => import('#controllers/user/home_controller')
const ProfilesController = () => import('#controllers/user/profiles_controller')
const ProductsController = () => import('#controllers/user/products_controller')
const StoreProfilesController = () => import('#controllers/user/store_profiles_controller')
const HelpsController = () => import('#controllers/user/helps_controller')
const TransactionsController = () => import('#controllers/user/transactions_controller')

router
  .group(() => {
    router.get('/', [HomeController, 'home']).as('user.home')
    router
      .get('daftar-produk/:categoryId', [ProductsController, 'productList'])
      .as('user.productList')
    router
      .get('detail-produk/:slug', [ProductsController, 'productDetail'])
      .as('user.productDetail')
    router
      .get('profile-toko/:id', [StoreProfilesController, 'storeProfile'])
      .as('user.storeProfile')
    router
      .group(() => {
        router.get('/profile-saya', [ProfilesController, 'profile']).as('user.profile')
        router.get('pusat-bantuan', [HelpsController, 'help']).as('user.help')
        router.get('detail-laporan/:id', [HelpsController, 'helpDetail']).as('user.helpDetail')
        router
          .get('riwayat-transaksi', [TransactionsController, 'transaction'])
          .as('user.transaction')
        router
          .get('detail-transaksi/:id', [TransactionsController, 'transactionDetail'])
          .as('user.transactionDetail')
      })
      .use(middleware.auth())
  })
  .use([middleware.userGlobalVariable(), middleware.silentAuth()])
