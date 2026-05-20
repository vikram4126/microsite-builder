import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({ bodyParser: false });

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Increase body limit to 50mb
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));

// IMPORTANT: Tell json-server's internal body-parser that the body is already parsed
server.use((req, res, next) => {
  req._body = true;
  next();
});

// Use default router
server.use(router);

const PORT = 5001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT} with 50mb body limit`);
});
