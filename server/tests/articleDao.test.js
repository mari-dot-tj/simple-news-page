// @flow

const mysql = require("mysql");

const ArticleDao = require("../dao/articleDao.js");
const runsqlfile = require("../dao/runsqlfile.js");

// GitLab CI Pool
const pool = mysql.createPool({
	connectionLimit: 1,
	host: "mysql",
	user: "root",
	password: "root",
	database: "school",
	debug: false,
	multipleStatements: true
});

const poolLocal = mysql.createPool({
	connectionLimit: 2,
	host: "mysql.stud.iie.ntnu.no",
	user: "mariteil",
	password: "ErXzlR6a",
	database: "mariteil",
	debug: false
});

let articleDao = new ArticleDao(pool);

beforeAll(done => {
	runsqlfile("dao/create_tables.sql", pool, () => {
		runsqlfile("dao/create_testdata.sql", pool, done);
	});
});

afterAll(() => {
	pool.end();
});

test("get one article from db", done => {
	function callback (status, data) {
		console.log(
			"Test callback: status=" + status + ", data=" + JSON.stringify(data)
		);
		expect(data.length).toBe(1);
		expect(data[0].headline).toBe("Test-Headline");
		done();
	}
	
	articleDao.getOneByID(1, callback);
});

test("get unknown article from db", done => {
	function callback (status, data) {
		console.log(
			"Test callback: status=" + status + ", data=" + JSON.stringify(data)
		);
		expect(data.length).toBeGreaterThanOrEqual(1);
		expect(data[0].headline).toBe("Test-Headline");
		expect(data[0].category).toBe("Sport");
		
		done();
	}
	
	articleDao.getAll(callback);
});

test("get all no matter importance", done => {
	function callback (status, data) {
		console.log(
			"Test callback: status=" + status + ", data=" + JSON.stringify(data)
		);
		expect(data.length).toBeGreaterThanOrEqual(2);
		done();
	}
	
	articleDao.getAllImportance(callback);
});

test("add article to db", done => {
	function callback (status, data) {
		console.log(
			"Test callback: status=" + status + ", data=" + JSON.stringify(data)
		);
		expect(data.affectedRows).toBeGreaterThanOrEqual(1);
		done();
	}
	
	articleDao.createOne(
		{
			headline: "Test-Headline3",
			category: "Teknologi",
			contents: "Test-bdoy",
			picture: "link",
			importance: 2
		},
		callback
	);
});


test("update person by id in db", done => {
	function callback (status, data) {
		console.log(
			"Test callback: status=" + status + ", data=" + JSON.stringify(data)
		);
		expect(data.affectedRows).toBeGreaterThanOrEqual(1);
		done();
	}
	
	articleDao.updateOne(
		{articleID: 2,
			headline: "Updated-Headline",
			category: "Teknologi",
			contents: "Updated",
			picture: "link updated",
			importance: 2},
		callback
	);
});

test("get all categories", done => {
	function callback (status, data) {
		console.log(
			"Test callback: status=" + status + ", data.length=" + data.length
		);
		expect(data.length).toBeGreaterThanOrEqual(3);
		done();
	}
	
	articleDao.getAllCategories(callback);
	
});

test("get all articles by category", done => {
	function callback (status, data) {
		console.log(
			"Test callback: status=" + status + ", data.length=" + data.length
		);
		expect(data.length).toBeGreaterThanOrEqual(1);
		done();
	}
	
	articleDao.getArticlesCategory("Sport", callback);
	
});

test("get all articles by importance = 2 for livefeed", done => {
	function callback (status, data) {
		console.log(
			"Test callback: status=" + status + ", data.length=" + data.length
		);
		expect(data.length).toBeGreaterThanOrEqual(1);
		done();
	}
	
	articleDao.getAllLiveFeed(callback);
	
});

test("get all by importance=1 and max x decided by articles you want per page", done =>{
	function callback(status, data){
		console.log(
			"Test callback: status=" + status + ", data.length=" + data.length
		);
		expect(data.length).toBe(6);
		done();
	}
	
	articleDao.getAllPriority(0, 6, callback);
	
});

test("get all by category=? and max x decided by articles you want per page", done =>{
	function callback(status, data){
		console.log(
			"Test callback: status=" + status + ", data.length=" + data.length
		);
		expect(data.length).toBe(6);
		done();
	}
	
	articleDao.getArticlesCategoryPage('kultur' ,0, 6, callback);
	
});

test("get all categories from Category table", done => {
	function callback (status, data) {
		console.log(
			"Test callback: status=" + status + ", data.length=" + data.length
		);
		expect(data.length).toBe(3);
		done();
	}
	
	articleDao.getAllCategories(callback);
	
});

test("get all articles count from NewsArticle where importance = 1", done => {
	function callback (status, data) {
		console.log(
			"Test callback: status=" + status + ", data.length=" + data.length
		);
		expect(data[0].x).toBeGreaterThan(1);
		done();
	}
	
	articleDao.getCountArticlesImportance(callback);
	
});

test("get all articles count from NewsArticle where category = ?", done => {
	function callback (status, data) {
		console.log(
			"Test callback: status=" + status + ", data[0].x=" + data[0].x
		);
		expect(data[0].x).toBeGreaterThan(1);
		done();
	}
	
	articleDao.getCountArticlesCategory('Kultur', callback);
	
});


test("delete person by id in db", done => {
	function callback (status, data) {
		console.log("Test callback: status=" + status + ", data" + JSON.stringify(data));
		expect(data.affectedRows).toBeGreaterThanOrEqual(1);
		done();
	}
	
	articleDao.deleteOneByID(2, callback);
	
});

















