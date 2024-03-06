import { Bouncer } from '@adonisjs/bouncer';
export const editCategory = Bouncer.ability((user, category) => {
    return user.id === category.userId;
});
export const deleteCategory = Bouncer.ability((user, category) => {
    return user.id === category.userId;
});
export const editTodo = Bouncer.ability((user, todo) => {
    return user.id === todo.userId;
});
export const deleteTodo = Bouncer.ability((user, todo) => {
    return user.id === todo.userId;
});
//# sourceMappingURL=main.js.map