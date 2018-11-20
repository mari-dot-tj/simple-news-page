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
};
type jsonUpdateA = {
	articleID: number,
	headline: string,
	category: string,
	contents: string,
	picture: string,
	importance: number
};

module.exports = class ArticleDao extends Dao {
	
	/**
	 * Gets all articles with importance = 1
	 * @param callback
	 */
	getAll (callback: myCallBack) {
		super.query(
			"select articleID, headline, category, contents, picture, importance, DATE_FORMAT(timeStampMade, \"%Y.%c.%d %H:%i\") AS timeStampMade FROM NewsArticle where importance = 1 ORDER BY timeStampMade DESC ",
			[],
			callback);
	}
	
	/**
	 * Gets all articles no matter importance
	 * @param callback
	 */
	getAllImportance (callback: mixed) {
		super.query(
			"select articleID, headline, category, contents, picture, importance, DATE_FORMAT(timeStampMade, \"%Y.%c.%d %H:%i\") as timeStampMade FROM NewsArticle ORDER BY timestampMade DESC",
			[],
			callback);
	}
	
	/**
	 * Gets one article
	 * @param id the id of the article in db
	 * @param callback
	 */
	getOne (id: number, callback: mixed) {
		super.query(
			"select articleID, headline, category, contents, picture, importance, DATE_FORMAT(timeStampMade, \"%Y.%c.%d %H:%i\") as timeStampMade FROM NewsArticle where articleID=?",
			[id],
			callback
		);
	}
	
	/**
	 * Gets one article
	 * @param id the id of the article in db
	 * @param callback
	 */
	getOneByID (id: number, callback: mixed) {
		super.query(
			"select articleID, headline, category, contents, picture, importance, DATE_FORMAT(timeStampMade, \"%Y.%c.%d %H:%i\") as timeStampMade FROM NewsArticle where articleID=?",
			[id],
			callback
		);
	}
	
	/**
	 * Creates new row in db NewsArticle with ned article
	 * @param json
	 * @param callback
	 */
	createOne (json: jsonUpdate, callback: mixed) {
		let val = [json.headline, json.category, json.contents, json.picture, json.importance];
		super.query(
			"insert into NewsArticle (headline,category,contents, picture, importance) values (?,?,?,?,?)",
			val,
			callback
		);
	}
	
	/**
	 * Updates a specific article depending on its id
	 * @param json
	 * @param callback
	 */
	updateOne (json: jsonUpdateA, callback: mixed) {
		let val = [json.headline, json.category, json.contents, json.picture, json.importance, json.articleID];
		super.query(
			"Update NewsArticle set headline = ?, category = ?, contents = ?, picture = ?, importance = ? where articleID = ?",
			val,
			callback
		);
	}
	
	/**
	 * Deletes a specific artivle depending on its id
	 * @param id
	 * @param callback
	 */
	deleteOneByID (id: number, callback: mixed) {
		let val = id;
		super.query(
			"delete from NewsArticle where articleID = ?",
			[val],
			callback
		);
	}
	
	/**
	 * Gets all categories from Category
	 * @param callback
	 */
	getAllCategories (callback: mixed) {
		super.query("select * from Category",
			[],
			callback);
	}
	
	/**
	 * Gets articles depending on its category
	 * @param category
	 * @param callback
	 */
	getArticlesCategory (category: string, callback: mixed) {
		super.query("select * from NewsArticle where category = ?",
			[category],
			callback
		);
	}
	
	/**
	 * Gets all articles from NewsArticle where importance = 2
	 * @param callback
	 */
	getAllLiveFeed (callback: mixed) {
		super.query("select articleID, headline, category, contents, picture, importance, DATE_FORMAT(timeStampMade, \"%Y.%c.%d %H:%i\") as timeStampMade from NewsArticle where importance = 2 ORDER BY timeStampMade DESC",
			[],
			callback);
	}
	
	/**
	 * Gets a limit of articles depending on how many articles are wanted on one page
	 * @param start Limit to start on when getting articles from db
	 * @param end Limit to end on when getting articles form db
	 * @param callback
	 */
	getAllPriority(start: number, end: number, callback: mixed){
		super.query("select articleID, headline, category, contents, picture, importance, DATE_FORMAT(timeStampMade, \"%Y.%c.%d %H:%i\") AS timeStampMade FROM NewsArticle where importance = 1 ORDER BY timeStampMade DESC LIMIT ?,?",
			[start, end],
			callback);
	}
	
	/**
	 * Gets a limit of articles depending on how many articles are wanted on one page
	 * and depending on which category page youre on
	 * @param category
	 * @param start Limit to start on when getting articles from db
	 * @param end Limit to end on when getting articles form db
	 * @param callback
	 */
	getArticlesCategoryPage(category: string, start: number, end: number, callback: mixed){
		super.query("select articleID, headline, category, contents, picture, importance, DATE_FORMAT(timeStampMade, \"%Y.%c.%d %H:%i\") AS timeStampMade FROM NewsArticle where category = ? ORDER BY timeStampMade DESC LIMIT ?,?",
			[category, start, end],
			callback);
	}
	
	/**
	 * Gets count of all articles where importance = 1. For the home page/main page
	 * @param callback
	 */
	getCountArticlesImportance(callback: mixed){
		super.query("select COUNT(*) as x from NewsArticle where importance = 1",
			[],
			callback);
	}
	
	/**
	 * Gets count of all articles where category = either (Sport, Kultur, Teknologi).
	 * Fot the category page.
	 * @param category
	 * @param callback
	 */
	getCountArticlesCategory(category: string, callback: mixed){
		super.query("select COUNT(*) as x from NewsArticle where category = ?",
			[category],
			callback);
	}
	
};
