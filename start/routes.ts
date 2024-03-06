/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const CategoriesController = () => import('#controllers/categories_controller')
const TodosController = () => import('#controllers/todos_controller')
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])

    router
      .group(() => {
        // User account related routes
        router.get('/me', [AuthController, 'me'])
        router.get('/logout', [AuthController, 'logout'])

        router.resource('categories', CategoriesController).apiOnly()
        router.resource('todos', TodosController).apiOnly()
        router.resource('users', UsersController).apiOnly()
      })
      .use([middleware.auth()])
  })
  .prefix('api')
