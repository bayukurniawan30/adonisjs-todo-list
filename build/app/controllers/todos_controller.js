import Todo from '#models/todo';
import BaseController from './base_controller.js';
export default class TodosController extends BaseController {
    model = Todo;
    relationships = ['user', 'category'];
}
//# sourceMappingURL=todos_controller.js.map