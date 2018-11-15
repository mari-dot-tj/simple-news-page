var mysql = require("mysql");

const ArticleDao = require("./articleDao.js");
const runsqlfile = require("./runsqlfile.js");

// GitLab CI Pool
var pool = mysql.createPool({
  connectionLimit: 1,
  host: "mysql.stud.iie.ntnu.no",
  user: "mariteil",
  password: "ErXzlR6a",
  database: "mariteil",
  debug: false,
  multipleStatements: true
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
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].navn).toBe("Hei Sveisen");
    done();
  }

  articleDao.getOne(1, callback);
});

test("get unknown article from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(0);
    done();
  }

  articleDao.getOne(0, callback);
});

test("add article to db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  articleDao.createOne(
    { navn: "Nils Nilsen", alder: 34, adresse: "Gata 3" },
    callback
  );
});

test("get all persons from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data.length=" + data.length
    );
    expect(data.length).toBeGreaterThanOrEqual(2);
    done();
  }
  articleDao.getAll(callback);
});


test("update person by id in db", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  articleDao.updateOne(
      { navn: "Nils Nilsen", alder: 35, adresse: "Gata 4", id: 3},
      callback
  );
});


test("delete person by id in db", done => {
  function callback(status, data) {
      console.log("Test callback: status=" + status + ", data" + JSON.stringify(data));
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
      done();
  }
  articleDao.deleteOneByID({id: 3}, callback);

});

















