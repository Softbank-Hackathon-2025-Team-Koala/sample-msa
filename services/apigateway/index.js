const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.json());

// /auth → auth 서비스로 프록시
app.use('/auth', createProxyMiddleware({
  target: 'http://auth:8080',   // ★ 서비스 DNS 이름
  changeOrigin: true,
  pathRewrite: {
    '^/auth': '',               // /auth → / 로 전달
  },
}));

// /users → user 서비스로 프록시
app.use('/users', createProxyMiddleware({
  target: 'http://user:8080',   // ★ user 서비스
  changeOrigin: true,
  pathRewrite: {
    '^/users': '/users',        // /users → /users 그대로
  },
}));

app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway is running' });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
