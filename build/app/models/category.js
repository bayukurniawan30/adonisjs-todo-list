var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, afterCreate, beforeCreate, belongsTo, column, hasMany, } from '@adonisjs/lucid/orm';
import * as relations from '@adonisjs/lucid/types/relations';
import Todo from './todo.js';
import User from './user.js';
import { convert } from 'url-slug';
export default class Category extends BaseModel {
    static async createSlug(category) {
        category.slug = convert(category.name);
    }
    static async updateSlug(category) {
        category.slug = category.id + '-' + convert(category.name);
        await category.save();
    }
}
__decorate([
    hasMany(() => Todo),
    __metadata("design:type", Object)
], Category.prototype, "posts", void 0);
__decorate([
    belongsTo(() => User),
    __metadata("design:type", Object)
], Category.prototype, "user", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Category.prototype, "slug", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Category.prototype, "userId", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Category.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Category.prototype, "updatedAt", void 0);
__decorate([
    beforeCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Category]),
    __metadata("design:returntype", Promise)
], Category, "createSlug", null);
__decorate([
    afterCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Category]),
    __metadata("design:returntype", Promise)
], Category, "updateSlug", null);
//# sourceMappingURL=category.js.map