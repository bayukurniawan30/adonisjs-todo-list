import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'todos';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('title').notNullable();
            table.string('status').notNullable().defaultTo('active');
            table.date('assign_date').notNullable();
            table.integer('category_id').references('categories.id').onDelete('CASCADE');
            table.integer('user_id').references('users.id').onDelete('CASCADE');
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1709273476385_create_todos_table.js.map