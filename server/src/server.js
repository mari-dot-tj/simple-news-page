// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';

const mysql = require("mysql");
const bodyParser = require("body-parser");
const apiRoutes = express.Router();
const ArticleDao = require("../dao/articleDao.js");
type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/../../client/public');

const app = express();
app.use(bodyParser.json()); // for å tolke JSON

app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

const pool = mysql.createPool({
	connectionLimit: 2,
	host: "mysql.stud.iie.ntnu.no",
	user: "mariteil",
	password: "ErXzlR6a",
	database: "mariteil",
	debug: false
});

let articleDao;
if (pool) {
	articleDao = new ArticleDao(pool);
}

app.get('/article', (req: Request, res: Response) => {
	articleDao.getAll((status, data) => {
		res.status(status);
		res.json(data);
	})
});

app.post('/article', (req: Request, res: Response) => {
	articleDao.createOne(req.body, (status, data) => {
		res.status(status);
		res.json(data);
	})
});

app.get('/articlesImportance', (req: Request, res: Response) => {
	articleDao.getAllImportance((status, data) => {
		res.status(status);
		res.json(data);
	})
});


app.get('/article/:category/:articleID', (req: Request, res: Response) => {
	articleDao.getOne(req.params.articleID, (status, data) => {
		res.status(status);
		res.json(data);
	})
});

app.get('/articleGetOne/:articleID', (req: Request, res: Response) => {
	articleDao.getOneByID(req.params.articleID, (status, data) => {
		res.status(status);
		res.json(data);
	})
});

app.get('/categories', (req: Request, res: Response) => {
	articleDao.getAllCategories((status, data) => {
		res.status(status);
		res.json(data);
	})
});

app.get('/article/:category', (req: Request, res: Response) => {
	articleDao.getArticlesCategory(req.params.category, (status, data) => {
		res.status(status);
		res.json(data);
	})
});

app.delete('/deleteArticle/:articleID', (req: Request, res: Response) => {
	articleDao.deleteOneByID(req.params.articleID, (status, data) => {
		res.status(status);
		res.json(data);
	})
});

app.put('/updateArticle/:articleID', (req: Request, res: Response) => {
	articleDao.updateOne(req.body, (status, data) => {
		res.status(status);
		res.json(data);
	})
});

app.get('/liveFeed', (req: Request, res: Response)=>{
	articleDao.getAllLiveFeed((status, data) => {
		res.status(status);
		res.json(data);
	})
});


// Hot reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
	let reloadServer = reload(app);
	fs.watch(public_path, () => reloadServer.reload());
}

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
	app.listen(3000, error => {
		if (error) reject(error.message);
		console.log('Server started');
		resolve();
	});
});
