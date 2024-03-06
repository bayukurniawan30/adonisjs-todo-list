import { DateTime } from 'luxon'
import {
  BaseModel,
  afterCreate,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
} from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import Todo from './todo.js'
import User from './user.js'
import { convert } from 'url-slug'

export default class Category extends BaseModel {
  @hasMany(() => Todo)
  declare posts: relations.HasMany<typeof Todo>

  @belongsTo(() => User)
  declare user: relations.BelongsTo<typeof User>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createSlug(category: Category) {
    category.slug = convert(category.name)
  }

  @afterCreate()
  static async updateSlug(category: Category) {
    category.slug = category.id + '-' + convert(category.name)
    await category.save()
  }
}
