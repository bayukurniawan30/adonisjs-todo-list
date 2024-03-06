// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import BaseController from './base_controller.js'

export default class UsersController extends BaseController {
  protected model = User
}
