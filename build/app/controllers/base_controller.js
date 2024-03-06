export default class BaseController {
    relationships;
    async index({ auth, request, response }) {
        const querystring = request.qs();
        const model = this.model;
        let processedModel = model.query();
        const pagination = {
            page: 1,
            limit: 10,
        };
        if (querystring) {
            processedModel = this.parseQueryString(model, querystring);
            if (querystring.hasOwnProperty('page') && querystring.hasOwnProperty('limit')) {
                const page = Number.parseInt(querystring.page);
                const limit = Number.parseInt(querystring.limit);
                pagination.page = page;
                if (limit === 0) {
                    pagination.page = 1;
                    pagination.limit = 9999999;
                }
                else {
                    pagination.limit = limit;
                }
            }
        }
        if (model.$hasColumn('userId') && auth.user) {
            processedModel = processedModel.where('user_id', auth.user.id);
        }
        if (this.relationships && this.relationships.length > 0) {
            this.relationships.map((relationship) => {
                return processedModel.preload(relationship);
            });
        }
        const result = await processedModel.paginate(pagination.page, pagination.limit);
        return response.status(200).json(result);
    }
    async show({ request, response }) {
        const model = this.model;
        const data = model.query().where('id', request.param('id'));
        if (this.relationships && this.relationships.length > 0) {
            this.relationships.map((relationship) => {
                return data.preload(relationship);
            });
        }
        const result = await data.firstOrFail();
        return response.status(200).json(result);
    }
    async store({ auth, request, response }) {
        const model = this.model;
        let data = request.all();
        if (model.$hasColumn('userId')) {
            data = {
                ...request.all(),
                userId: auth.user ? auth.user.id : null,
            };
        }
        const result = await model.create(data);
        return response.status(201).json(result);
    }
    async update({ auth, request, response }) {
        const model = this.model;
        const data = await model.findOrFail(request.param('id'));
        let updatedData = request.all();
        if (model.$hasColumn('userId')) {
            updatedData = {
                ...request.all(),
                userId: auth.user ? auth.user.id : null,
            };
        }
        data.merge(updatedData);
        const result = await data.save();
        return response.status(200).json(result);
    }
    async destroy({ request, response }) {
        const model = this.model;
        const data = await model.findOrFail(request.param('id'));
        await data.delete();
        return response.status(204);
    }
    parseQueryString(model, qs) {
        const result = model.query().orderBy(qs.sort || 'created_at', qs.order || 'desc');
        if (qs.filter) {
            const parsedFilters = JSON.parse(qs.filter);
            parsedFilters.map((parsedFilter) => {
                return this.doWhereQuery(result, parsedFilter.field, parsedFilter.value, parsedFilter.operator);
            });
        }
        return result;
    }
    doWhereQuery(query, field, value, operator) {
        switch (operator) {
            case 'like':
                query.whereLike(field, `%${value}%`);
                break;
            case '=':
                query.where(field, value);
                break;
            case '<>':
                query.whereNot(field, value);
                break;
            case '<':
                query.where(field, '<', Number.parseInt(value));
                break;
            case '>':
                query.where(field, '>', Number.parseInt(value));
                break;
            case '<=':
                query.where(field, '<=', Number.parseInt(value));
                break;
            case '>=':
                query.where(field, '>=', Number.parseInt(value));
                break;
            case 'in':
                const arrayInValue = value.split(',');
                query.whereIn(field, arrayInValue);
                break;
            case 'not in':
                const arrayNotInValue = value.split(',');
                query.whereNotIn(field, arrayNotInValue);
                break;
            default:
                break;
        }
        return query;
    }
}
//# sourceMappingURL=base_controller.js.map