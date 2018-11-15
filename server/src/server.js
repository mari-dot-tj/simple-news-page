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


app.get('/article/:category/:id', (req: Request, res: Response) => {
	articleDao.getOne(req.params.articleID, (status, data)=>{
		res.status(status);
		res.json(data);
	})
});

app.get('/categories', (req: Request, res: Response)=>{
	articleDao.getAllCategories((status, data)=>{
		res.status(status);
		res.json(data);
	})
});


//TODO: put updateOne
//TODO: put deleteOneByID

/*
app.get('/students', (req: Request, res: Response) => {
	return Students.findAll().then(students => res.send(students));
});

app.get('/students/:id', (req: Request, res: Response) => {
	return Students.findOne({where: {id: Number(req.params.id)}}).then(
		student => (student ? res.send(student) : res.sendStatus(404))
	);
});

app.put('/students', (req: Request, res: Response) => {
	if (
		!req.body ||
		typeof req.body.id !== 'number' ||
		typeof req.body.firstName !== 'string' ||
		typeof req.body.lastName !== 'string' ||
		typeof req.body.email !== 'string'
	)
		return res.sendStatus(400);
	
	return Students.update(
		{firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email},
		{where: {id: req.body.id}}
	).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
*/


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
