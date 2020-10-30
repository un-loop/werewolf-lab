module.exports = (entity) => {
    const cats = entity.table;

    return {
        index: async function(ctx, next) {
            await next;
            let result = await cats.getAll();
            ctx.body = result;
        },
        show: async function(ctx, next){
            await next;
            let result = await cats.get(ctx.params.cat);

            if (!result) {
                ctx.status = 404;
                ctx.body = 'Not Found';
            } else {
                ctx.body = result;
            }
        },
        create: async function(ctx, next) {
            await next;
            if (!ctx.request.body || !ctx.request.body.name) ctx.throw(400, '.name required');
            let cat = (({name, owner, age}) => ({name, owner, age}))(ctx.request.body);
            await cats.create(cat);
            ctx.status = 201;
            ctx.body = 'added!';
        }

        /**
         *
         * DELETE a cat
         *
         * destroy: async function(next) {
         *   //implement me!
         * }
         */

            /**
         *
         * UPDATE a cat
         *
         * update = async function(next) {
         *   //implement me!
         * }
         */
   }
}

module.exports.permissions = {
    default: [] //open permissions
}
