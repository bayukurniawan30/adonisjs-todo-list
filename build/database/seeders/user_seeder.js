import { BaseSeeder } from '@adonisjs/lucid/seeders';
import User from '#models/user';
export default class UserSeeder extends BaseSeeder {
    async run() {
        await User.createMany([
            {
                fullName: 'Bayu Kurniawan',
                email: 'bayu.kurniawan@taksu.tech',
                password: 'secret',
            },
        ]);
    }
}
//# sourceMappingURL=user_seeder.js.map