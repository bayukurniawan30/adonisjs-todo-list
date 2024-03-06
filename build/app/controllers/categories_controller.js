import Category from '#models/category';
import BaseController from './base_controller.js';
export default class CategoriesController extends BaseController {
    model = Category;
    relationships = ['user'];
}
//# sourceMappingURL=categories_controller.js.map