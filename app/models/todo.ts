import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import Category from './category.js'
import User from './user.js'

export default class Todo extends BaseModel {
  @belongsTo(() => Category)
  declare category: relations.BelongsTo<typeof Category>

  @belongsTo(() => User)
  declare user: relations.BelongsTo<typeof User>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare status: 'active' | 'done'

  @column()
  declare assignDate: Date

  @column()
  declare categoryId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
