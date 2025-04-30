import router from '@adonisjs/core/services/router'

const HomeController = () => import('#controllers/user/home_controller')
// const CartsController = () => import('#controllers/user/carts_controller')
const ProfilesController = () => import('#controllers/user/profiles_controller')
const ProductsController = () => import('#controllers/user/products_controller')
const StoreProfilesController = () => import('#controllers/user/store_profiles_controller')
// const AboutController = () => import('#controllers/user/about_controller')
// const CategoriesController = () => import('#controllers/user/categories_controller')
const HelpsController = () => import('#controllers/user/helps_controller')

router.get('/', [HomeController, 'home']).as('user.home')
router.get('/profile-saya', [ProfilesController, 'profile']).as('user.profile')
router.get('daftar-produk', [ProductsController, 'productList']).as('user.productList')
router.get('detail-produk', [ProductsController, 'productDetail']).as('user.productDetail')
router.get('profile-toko', [StoreProfilesController, 'storeProfile']).as('user.storeProfile')
router.get('pusat-bantuan', [HelpsController, 'help']).as('user.help')
router.get('detail-laporan', [HelpsController, 'helpDetail']).as('user.helpDetail')
