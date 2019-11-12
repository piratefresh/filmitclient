const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api/*",
    proxy({
      target: "http://localhost:8000",
      changeOrigin: true
    })
  );
  app.use(
    "/google",
    proxy({
      target: "http://localhost:8000",
      changeOrigin: true
    })
  );
  app.use(
    "/auth/*",
    proxy({
      target: "http://localhost:8000",
      changeOrigin: true
    })
  );
  app.use(
    "/refresh_token",
    proxy({
      target: "http://localhost:8000",
      changeOrigin: true
    })
  );
};
