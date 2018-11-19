const mysql = require("mysql");

const ArticleDao = require("./articleDao.js");
const runsqlfile = require("./runsqlfile.js");

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
		{headline: "Test-Headline3", category: 'Teknologi', contents: "Test-bdoy", picture: "link", importance: 2},
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
	
	articleDao.getArticlesCategory("Kultur", callback);
	
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


test("delete person by id in db", done => {
	function callback (status, data) {
		console.log("Test callback: status=" + status + ", data" + JSON.stringify(data));
		expect(data.affectedRows).toBeGreaterThanOrEqual(1);
		done();
	}
	
	articleDao.deleteOneByID(2, callback);
	
});

















