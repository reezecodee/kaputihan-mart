import router from '@adonisjs/core/services/router'

const HomeController = () => import('#controllers/user/home_controller')
const CartsController = () => import('#controllers/user/carts_controller')
const ProfilesController = () => import('#controllers/user/profiles_controller')
const ProductsController = () => import('#controllers/user/products_controller')
const StoreProfilesController = () => import('#controllers/user/store_profiles_controller')
const AboutController = () => import('#controllers/user/about_controller')
const CategoriesController = () => import('#controllers/user/categories_controller')
const HelpsController = () => import('#controllers/user/helps_controller')

router.get('/', [HomeController, 'home']).as('user.home')
router.get('keranjang', [CartsController, 'cart']).as('user.cart')
router.get('profile', [ProfilesController, 'profile']).as('user.profile')
router.get('detail-produk', [ProductsController, 'product']).as('user.product')
router.get('profile-toko', [StoreProfilesController, 'storeProfile']).as('user.storeProfile')
router.get('tentang-kami', [AboutController, 'about']).as('user.about')
router.get('kategori-produk', [CategoriesController, 'category']).as('user.category')
router.get('pusat-bantuan', [HelpsController, 'help']).as('user.help')
