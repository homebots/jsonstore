import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import apiRoutes from './app/routes';
import { LOG } from './app/common';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json({ strict: false }));
app.use(cors());
app.get('/', (_, res) => res.sendFile(__dirname + '/../README.md'));
app.get('/favicon.ico', (_, res) => res.status(404).send(null));
app.use(apiRoutes);
app.use((_, res) => res.status(404).send('Not found'));

app.listen(port);

LOG(`Started at port ${port}`);
