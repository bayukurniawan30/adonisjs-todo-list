// import type { HttpContext } from '@adonisjs/core/http'

import Todo from '#models/todo'
import BaseController from './base_controller.js'

export default class TodosController extends BaseController {
  protected model = Todo
  protected relationships = ['user', 'category']
}
