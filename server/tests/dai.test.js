// @flow

/**
 * Tests for checking if dao.js sends error back when there
 * is a faulty request.
 */

const mysql = require("mysql");

const Dao = require("../dao/dao.js");
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

let dao = new Dao(pool);
let dao2 = new Dao(pool);

beforeAll(done => {
	runsqlfile("dao/create_tables.sql", pool, () => {
		runsqlfile("dao/create_testdata.sql", pool, done);
	});
});

afterAll(() => {
	pool.end();
});

test("sql error", done => {
	async function callback(status, data) {
		console.log(
			"Test callback: status=" + status + ", data=" + JSON.stringify(data)
		);
		await expect(status).toBe(500);
		done();
	}
	
	dao.query("SELECT *", [], callback);
});

test("error connecting", done => {
	async function callback(status, data) {
		console.log(
			"Test callback: status=" + status + ", data=" + JSON.stringify(data)
		);
		await expect(status).toBe(500);
		done();
	}
	
	dao2.query("SELECT * FROM events", [], callback);
});