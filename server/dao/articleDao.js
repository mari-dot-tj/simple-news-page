// @flow
const Dao = require("./dao.js");

type myCallBack = {
	status: number,
	data: Array<string>
};

type jsonUpdate = {
	headline: string,
	category: string,
	contents: string,
	picture: string,
	importance: number
}

module.exports = class ArticleDao extends Dao {
	getAll (callback: myCallBack) {
		super.query("select * from NewsArticle", [], callback);
	}
	
	getOne (id: number, callback: mixed) {
		super.query(
			"select * from NewsArticle where id=?",
			[id],
			callback
		);
	}
	
	createOne (json: jsonUpdate, callback: mixed) {
		var val = [json.headline, json.category, json.contents, json.picture, json.importance];
		super.query(
			"insert into NewsArticle (headline,category,contents, picture, importance) values (?,?,?,?,?)",
			val,
			callback
		);
	}
	
	updateOne (id: number, json: jsonUpdate, callback: mixed) {
		var val = [json.headline, json.category, json.contents, json.picture, json.importance];
		super.query(
			"Update NewsArticle set headline = ?, category = ?, contents = ?, picture = ?, importance = ? where id = ?",
			val,
			callback
		);
	}
	
	deleteOneByID (id: number, callback: mixed) {
		var val = id;
		super.query(
			"delete from NewsArticle where id = ?",
			[val],
			callback
		);
	}
	
	getAllCategories(callback: mixed){
		super.query("select * from Category", [], callback);
	}
	
};
