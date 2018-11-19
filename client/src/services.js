// @flow
import axios from 'axios';

axios.interceptors.response.use(response => response.data);


class Article {
	articleID: number;
	headline: string;
	category: string;
	contents: string;
	picture: string;
	importance: number;
	timeStampMade: any
	
}

class Category{
	category: string;
}



class ArticleService {
	getAll (): Promise<Article[]> {
		return axios.get('/article');
	}
	
	getAllImportance(): Promise<Article[]>{
		return axios.get('/articlesImportance')
	}
	
	createOne (article: Article): Promise<void> {
		return axios.post('/article', article);
	}
	
	getOne (id: number, category: string) : Promise<Article[]>{
		return axios.get('/article/' + category + '/' + id);
	}
	
	getArticlesCategory(category: string): Promise<Article[]>{
		return axios.get('/article/' + category)
	}
	
	deleteOneByID(id: number): Promise<void>{
		return axios.delete('/deleteArticle/' + id)
	}
	
	updateOne(article: Article): Promise<void>{
		return axios.put('/updateArticle/' + article.articleID, article)
	}
	
	getOneByID(id: number): Promise<Article[]>{
		return axios.get('/articleGetOne/' + id, id)
	}
	
	getAllLiveFeed(): Promise<Article[]>{
		return axios.get('/liveFeed');
	}
	
	getAllPriority(page: number = 0): Promise<Article[]>{
		return axios.get('/mainpage?page=' + page);
	}
	
	getArticlesCategoryPage(page: number = 0 ,category: string): Promise<Article[]>{
		console.log('Page number: ' + page + ' category: ' + category + ' SERVICES');
		return axios.get('/mainpage/categoryPage/' + category + '?page=' + page);
	}
	
}

class CategoryService{
	getAllCategories (): Promise<Category[]>{
		return axios.get('/categories');
	}
	
}


export let articleService = new ArticleService();
export let categoryService = new CategoryService();

