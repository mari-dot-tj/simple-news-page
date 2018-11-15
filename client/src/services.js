// @flow
import axios from 'axios';

axios.interceptors.response.use(response => response.data);


class Article {
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
	
	createOne (article: Article): Promise<Article> {
		return axios.post('/article', article);
	}
	
	getOne (id: number, category: string) : Promise<Article>{
		return axios.get('article/:' + category + '/:' + id);
	}
}

class CategoryService{
	getAllCategories (): Promise<Category[]>{
		return axios.get('/categories');
	}


}


export let articleService = new ArticleService();
export let categoryService = new CategoryService();
/*

class Student {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
}

class StudentService {
	getStudents (): Promise<Student[]> {
		return axios.get('/students');
	}
	
	getStudent (id: number): Promise<Student> {
		return axios.get('/students/' + id);
	}
	
	updateStudent (student: Student): Promise<void> {
		return axios.put('/students', student);
	}
}

export let studentService = new StudentService();
*/
