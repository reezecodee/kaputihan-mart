import { BaseSeeder } from '@adonisjs/lucid/seeders'
import app from '@adonisjs/core/services/app'

export default class IndexSeeder extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    if (
      !Seeder.default.environment ||
      (!Seeder.default.environment.includes('development') && app.inDev) ||
      (!Seeder.default.environment.includes('testing') && app.inTest) ||
      (!Seeder.default.environment.includes('production') && app.inProduction)
    ) {
      return
    }

    await new Seeder.default(this.client).run()
  }

  async run() {
    await this.seed(await import('#database/seeders/user_seeder'))
    await this.seed(await import('#database/seeders/category_seeder'))
    await this.seed(await import('#database/seeders/store_seeder'))
    await this.seed(await import('#database/seeders/help_seeder'))
    await this.seed(await import('#database/seeders/product_seeder'))
    await this.seed(await import('#database/seeders/transaction_seeder'))
    await this.seed(await import('#database/seeders/rating_seeder'))
    await this.seed(await import('#database/seeders/cart_seeder'))
    await this.seed(await import('#database/seeders/setting_seeder'))
  }
}
