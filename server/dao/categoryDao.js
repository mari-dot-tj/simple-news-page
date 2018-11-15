// @flow

const Dao = require("./dao.js");

module.exports = class CategoryDao extends Dao{

	getAll(callback: mixed){
		super.query("select category from Category", [], callback);
	}
	
};