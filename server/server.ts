import Koa, { Context } from 'koa';
import next from 'next';
import Router from '@koa/router';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// const handleRequest = async (ctx: Context) => {
//   await handle(ctx.req, ctx.res);
//   ctx.respond = false;
//   ctx.res.statusCode = 200;
// };

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  // // Static content is clear
  // router.get('(/_next/static/.*)', handleRequest);
  // // Webpack content is clear
  // router.get('/_next/webpack-hmr', handleRequest);

  router.all('(.*)', async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
