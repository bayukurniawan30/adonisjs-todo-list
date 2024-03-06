// import type { HttpContext } from '@adonisjs/core/http'

import Category from '#models/category'
import BaseController from './base_controller.js'

export default class CategoriesController extends BaseController {
  protected model = Category
  protected relationships = ['user']
}
