const koa = require('koa');
const mount = require('koa-mount');
const wsServer = require('./wsServer');

const path = require('path');
const body = require('koa-bodyparser');
const decode = require('koa-decode-params');
const resourceBuilder = require('unloop-resource-builder')(__dirname);
const staticRouter = require('unloop-static-router')( path.resolve(__dirname, "../client"),
[
    {
        route: '/',
        permissions: []
    }
]);

const builderWithMiddleware = resourceBuilder(decode());
const cats = builderWithMiddleware("cats");

const koaApi = new koa();

const koaApp = new koa();
koaApp.use(body());

koaApi.use(cats.middleware());
koaApp.use(mount('/api', koaApi));

koaApp.use(staticRouter(koaApp));
const httpServer = koaApp.listen(3000);

//hook up web socket server to existing httpServer
wsServer(httpServer);
