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
type jsonUpdateA = {
	articleID: number,
	headline: string,
	category: string,
	contents: string,
	picture: string,
	importance: number
}

module.exports = class ArticleDao extends Dao {
	
	/**
	 * Gets all articles with importance = 1
	 * @param callback
	 */
	getAll (callback: myCallBack) {
		super.query(
			"select articleID, headline, category, contents, picture, importance, DATE_FORMAT(timeStampMade, \"%Y.%c.%d %H:%i\") AS timeStampMade FROM NewsArticle where importance = 1 ORDER BY articleID DESC ",
			[],
			callback);
	}
	
	/**
	 * Gets all articles no matter importance
	 * @param callback
	 */
	getAllImportance (callback: mixed) {
		super.query(
			"select articleID, headline, category, contents, picture, importance, DATE_FORMAT(timeStampMade, \"%Y.%c.%d %H:%i\") as timeStampMade FROM NewsArticle ORDER BY articleID DESC",
			[],
			callback);
	}
	
	getOne (id: number, callback: mixed) {
		super.query(
			"select articleID, headline, category, contents, picture, importance, DATE_FORMAT(timeStampMade, \"%Y.%c.%d %H:%i\") as timeStampMade FROM NewsArticle where articleID=?",
			[id],
			callback
		);
	}
	
	getOneByID (id: number, callback: mixed) {
		super.query(
			"select articleID, headline, category, contents, picture, importance, DATE_FORMAT(timeStampMade, \"%Y.%c.%d %H:%i\") as timeStampMade FROM NewsArticle where articleID=?",
			[id],
			callback
		);
	}
	
	createOne (json: jsonUpdate, callback: mixed) {
		let val = [json.headline, json.category, json.contents, json.picture, json.importance];
		super.query(
			"insert into NewsArticle (headline,category,contents, picture, importance) values (?,?,?,?,?)",
			val,
			callback
		);
	}
	
	updateOne (json: jsonUpdateA, callback: mixed) {
		let val = [json.headline, json.category, json.contents, json.picture, json.importance, json.articleID];
		super.query(
			"Update NewsArticle set headline = ?, category = ?, contents = ?, picture = ?, importance = ? where articleID = ?",
			val,
			callback
		);
	}
	
	deleteOneByID (id: number, callback: mixed) {
		let val = id;
		super.query(
			"delete from NewsArticle where articleID = ?",
			[val],
			callback
		);
	}
	
	getAllCategories (callback: mixed) {
		super.query("select * from Category",
			[],
			callback);
	}
	
	getArticlesCategory (category: string, callback: mixed) {
		super.query("select * from NewsArticle where category = ?",
			[category],
			callback
		);
	}
	
	getAllLiveFeed (callback: mixed) {
		super.query("select articleID, headline, category, contents, picture, importance, DATE_FORMAT(timeStampMade, \"%Y.%c.%d %H:%i\") as timeStampMade from NewsArticle where importance = 2",
			[],
			callback);
	}
	
};
