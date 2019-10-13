import * as express from 'express';
import * as crypto from 'crypto';
// import { FirebaseAdapter } from './firebase-adapter';
import { InMemoryAdapter } from './in-memory-adapter';
import { FileAdapter } from './file-adapter';
import { Adapter } from './adapter';

// const config = process.env.FIREBASE_CONFIG || null;
const storageAdapter = process.env.STORAGE || 'memory';
let adapter: Adapter;

console.log('Using %s adapter', storageAdapter);

switch (storageAdapter) {
  case 'memory':
    adapter = new InMemoryAdapter();
    break;

  case 'file':
    adapter = new FileAdapter(__dirname + '/store.json');
    break;
}

function checkContentType(req, res, next) {
  if (!req.is('application/json')) {
    return res.status(400).send('Invalid content type');
  }

  next();
}

const router = express.Router();

router.get('/favicon.ico', (_, res) => {
  return res.status(404).send(null);
});

router.get('/new', (_, res) => {
  const seed = crypto.randomBytes(64);
  const hash = crypto.createHash('sha256').update(seed).digest('hex');
  return res.send({ id: hash });
});

router.get(/^\/[0-9a-z]{64}/, (req, res) => {
  adapter
    .get(req.path)
    .then(result => res.status(200).send(result))
    .catch((error) => res.status(error.message === 'NOT_FOUND' ? 404 : 400).send(''))
});

router.post(/^\/[0-9a-z]{64}/, checkContentType, (req, res) =>
  adapter
    .post(req.path, req.body)
    .then(() => res.status(201).send(''))
    .catch(() => res.status(500).send(''))
)

router.put(/^\/[0-9a-z]{64}/, checkContentType, (req, res) =>
  adapter
    .put(req.path, req.body)
    .then(() => res.status(200).send(''))
    .catch(() => res.status(500).send(''))
);

router.patch(/^\/[0-9a-z]{64}/, checkContentType, (req, res) =>
  adapter
    .patch(req.path, req.body)
    .then(() => res.status(200).send(''))
    .catch(() => res.status(500).send(''))
);

router.delete(/^\/[0-9a-z]{64}/, (req, res) =>
  adapter
    .delete(req.path, req.body)
    .then(() => res.status(200).send(''))
    .catch(() => res.status(500).send(''))
);

export default router;
