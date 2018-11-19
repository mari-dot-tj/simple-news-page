// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import {Component} from 'react-simplified';
import {HashRouter, Route, NavLink, Redirect} from 'react-router-dom';
import {Alert, Card, NavBar, NewsCard, ListGroup, BasicCard, Button, NewsFeedProp} from './widgets';
import {articleService} from './services';
import {categoryService} from './services';

// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
	let script = document.createElement('script');
	script.src = '/reload/reload.js';
	if (document.body) document.body.appendChild(script);
}

import createHashHistory from 'history/createHashHistory';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
	
	render () {
		return (
			
			<NavBar>
				
				<NavBar.Brand>Home</NavBar.Brand>
				<NavBar.Link to = "/home/teknologi">Tek</NavBar.Link>
				<NavBar.Link to = "/home/sport">Sport</NavBar.Link>
				<NavBar.Link to = "/home/kultur">Kultur</NavBar.Link>
				<NavBar.Link to = "/editArticles" exact = {true}>Rediger artikler</NavBar.Link>
			
			</NavBar>
		
		)
	}
	
}

class Home extends Component {
	
	articles = [];
	
	render () {
		
		return (
			<div>
				<LiveFeed />
				<div className = "container-fluid wrapper">
					{
						this.articles.map((article, i) => (
							<Card key = {i}
										imgLink = {article.picture}
										title = {article.headline}
										to = {"/home/" + article.category + "/" + article.articleID} />
						))
					}
				</div>
			</div>
		
		)
	}
	
	mounted () {
		articleService
			.getAll()
			.then(articles => (this.articles = articles))
			.catch((error: Error) => Alert.danger(error.message));
	}
	
	
}

class Article extends Component<{ match: { params: { articleID: number, category: string } } }> {
	
	article = {
		articleID: '',
		headline: '',
		category: '',
		contents: '',
		picture: '',
		importance: '',
		timeStampMade: ''
	};
	
	render () {
		if (!this.article) {
			Alert.danger("Article does not exist");
		}
		console.log(this.article.timeStampMade);
		return (
			<div className = "container-fluid wrapperArt">
				<NewsCard imgLink = {this.article.picture}
									title = {this.article.headline}
									timestamp = {this.article.timeStampMade}>
					{this.article.contents}
				</NewsCard>
			</div>
		)
	}
	
	mounted () {
		articleService.getOne(this.props.match.params.articleID, this.props.match.params.category)
			.then(article => (this.article = article[0]))
			.catch((error: Error) => Alert.danger(error.message));
	}
	
}

class Category extends Component<{ match: { params: { category: string } } }> {
	
	articles = [];
	
	render () {
		return (
			<div className = "container-fluid wrapper">
				{
					this.articles.map((article, i) => (
						<Card key = {i}
									imgLink = {article.picture}
									title = {article.headline}
									to = {"/home/" + article.category + "/" + article.articleID} />
					))}
			
			</div>
		)
	}
	
	mounted () {
		articleService.getArticlesCategory(this.props.match.params.category)
			.then(articles => (this.articles = articles))
			.catch((error: Error) => Alert.danger(error.message));
	}
}

class ArticleOverview extends Component {
	
	articles = [];
	
	render () {
		return (
			<BasicCard title = "Artikler på nettsiden">
				<ListGroup>
					{this.articles.map((article, i) => (
						<ListGroup.Item key = {i}>
							{article.headline} ----- {article.timeStampMade}
							<Button.Danger onClick = {() => this.delete(article.articleID, article.headline)}>
								Slett
							</Button.Danger>
							<Button.Light onClick = {() => history.push('/editArticles/edit/' + article.articleID)}>
								Rediger
							</Button.Light>
						
						</ListGroup.Item>
					))}
				</ListGroup>
			
			</BasicCard>
		);
	}
	
	delete (id: number, headline: string) {
		if (confirm("Sikker på at du vil slette saken " + headline + "?")) {
			if (articleService.deleteOneByID(id)) {
				Alert.success("Artikkelen ble slettet");
				this.mounted();
			}
		}
	}
	
	
	mounted () {
		articleService
			.getAllImportance()
			.then(articles => (this.articles = articles))
			.catch((error: Error) => Alert.danger(error.message));
	}
	
	
}


class EditArticle extends Component<{ match: { params: { articleID: number } } }> {
	
	article = {
		articleID: -1,
		headline: '',
		category: '',
		contents: '',
		picture: '',
		importance: -1,
		timeStampMade: ''
	};
	
	categories = [];
	
	style = {
		marginTop: '20px'
	};
	
	render () {
		return (
			<div className = "container-fluid">
				<h5 className = "headlines">Rediger artikkel</h5>
				<div className = "row" style = {this.style}>
					<div className = "col-md-1" />
					<div className = "col-md-4">
						<form>
							<div className = "form-group">
								<label htmlFor = "inOverskrift">Overskrift</label>
								<input
									type = "text"
									className = "form-control"
									id = "inOverskrift"
									value = {this.article.headline}
									onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => {
										if (this.article) (this.article.headline = event.target.value);
									}}
								/>
								<br />
								<label htmlFor = "inBildelink">Link til bilde</label>
								<input
									type = "text"
									className = "form-control"
									id = "inBildelink"
									value = {this.article.picture}
									onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => {
										if (this.article) (this.article.picture = event.target.value);
									}}
								/>
							</div>
							<div className = "form-group">
								<label htmlFor = "optKategori">Kategori</label>
								<select
									className = "form-control"
									id = "optKategori"
									required
									value = {this.article.category}
									onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => {
										if (this.article) (this.article.category = event.target.value)
									}}
								>
									{/*<option value="" hidden></option>
										{this.categories.map(cat=>{
											<option value={cat.category}>{cat.category}</option>
										})}
									*/}
									{this.categories.map((category, i) => (
										<option key = {i} value = {category.category}>
											{category.category}
										</option>
									))}
								</select>
							</div>
							<div className = "form-group">
								<label htmlFor = "chViktighet">Viktighet</label>
								<br />
								<input name = "viktighet"
											 className = "form-check-input"
											 type = "radio"
											 value = "1"
											 id = "chViktighet1"
									// $FlowFixMe
											 onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.importance = event.target.value)}
								/>
								<label className = "form-check-label" htmlFor = "defaultCheck1">
									Svært viktig
								</label>
								<br />
								<input name = "viktighet"
											 className = "form-check-input"
											 type = "radio"
											 value = "2"
											 id = "chViktighet2"
									// $FlowFixMe
											 onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.importance = event.target.value)}
								/>
								<label className = "form-check-label" htmlFor = "chViktighet2">
									Mindre viktig
								</label>
							</div>
							<Button.Success onClick = {() => this.update()}>
								Oppdater
							</Button.Success>
						
						</form>
					</div>
					
					<div className = "col-md-6">
						<div className = "form-group">
							<label htmlFor = "inTekst">Tekst</label>
							<textarea id = "inTekst"
												className = "form-control"
												rows = "13"
												value = {this.article.contents}
												onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.contents = event.target.value)}>
							</textarea>
						</div>
					</div>
					<div className = "col-md-1" />
				
				</div>
			
			</div>
		)
	}
	
	
	update () {
		// $FlowFixMe
		articleService.updateOne(this.article)
		/*
					.then(history.push('/home/' + this.article.category + '/' + this.article.articleID))
		*/
			.then(Alert.success('You successfully updated ' + this.article.headline))
			.catch((error: Error) => Alert.danger(error.message));
		// $FlowFixMe
		/*		articleService.updateOne(article.articleID, article)
					.then(Alert.success('You successfully updated' + this.article.headline))
					.catch((error: Error) => Alert.danger(error.message));
				
				history.push('/home/' + article.category + '/' + article.articleID);*/
		history.push('/home/' + this.article.category + '/' + this.article.articleID);
	}
	
	mounted () {
		articleService.getOneByID(this.props.match.params.articleID)
			.then(article => (this.article = article[0]))
			.catch((error: Error) => Alert.danger(error.message));
		
		categoryService.getAllCategories()
			.then(categories => (this.categories = categories))
			.catch((error: Error) => Alert.danger(error.message));
	}
	
	
}


class EditArticles extends Component {
	
	categories = [];
	
	article = {
		headline: '',
		category: '',
		contents: '',
		picture: '',
		importance: ''
	};
	
	style = {
		marginTop: '20px'
	};
	
	render () {
		return (
			<div className = "container-fluid">
				<h5 className = "headlines">Legg til artikkel</h5>
				<div className = "row" style = {this.style}>
					<div className = "col-md-1" />
					<div className = "col-md-4">
						<form>
							<div className = "form-group">
								<label htmlFor = "inOverskrift">Overskrift</label>
								<input
									type = "text"
									className = "form-control"
									id = "inOverskrift"
									onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.headline = event.target.value)}
								/>
								<br />
								<label htmlFor = "inBildelink">Link til bilde</label>
								<input
									type = "text"
									className = "form-control"
									id = "inBildelink"
									onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.picture = event.target.value)}
								/>
							</div>
							<div className = "form-group">
								<label htmlFor = "optKategori">Kategori</label>
								<select
									className = "form-control"
									id = "optKategori"
									onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.category = event.target.value)}>
									{
										this.categories.map((category, i) => (
										<option key = {i} value = {category.category}>
											{category.category}
										</option>
									))
									}
								</select>
							</div>
							<div className = "form-group">
								<label htmlFor = "chViktighet">Viktighet</label>
								<br />
								<input name = "viktighet"
											 className = "form-check-input"
											 type = "radio"
											 value = "1"
											 id = "chViktighet1"
											 onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.importance = event.target.value)}
								/>
								<label className = "form-check-label" htmlFor = "defaultCheck1">
									Svært viktig
								</label>
								<br />
								<input name = "viktighet"
											 className = "form-check-input"
											 type = "radio"
											 value = "2"
											 id = "chViktighet2"
											 onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.importance = event.target.value)}
								/>
								<label className = "form-check-label" htmlFor = "chViktighet2">
									Mindre viktig
								</label>
							</div>
							<Button.Success onClick = {() => this.publish()}>
								Publiser
							</Button.Success>
							{/*<button type = "submit" className = "btn btn-primary" onClick = {this.publish}>Publiser</button>*/}
						</form>
					</div>
					
					<div className = "col-md-6">
						<div className = "form-group">
							<label htmlFor = "inTekst">Tekst</label>
							<textarea id = "inTekst"
												className = "form-control"
												rows = "13"
												onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.contents = event.target.value)}>
							</textarea>
						</div>
					</div>
					<div className = "col-md-1" />
				
				</div>
			</div>
		)
	}
	
	
	async publish () {
		//$FlowFixMe
		await articleService.createOne(this.article)
			.catch((error: Error) => Alert.danger(error.message));
		this.mounted();
		Alert.success('You successfully created' + this.article.headline);
	}
	
	mounted () {
		categoryService.getAllCategories()
			.then(categories => (this.categories = categories))
			.catch((error: Error) => Alert.danger(error.message));
	}
	
}

class LiveFeed extends Component {
	
	articles = [];
	
	render () {
		return (
			
			<div className = "container">
				<div className = "newsfeed">
					<div className = "box_horizontal">
						<div className = "list_horizontal">
							
							<div className = "items newsfeed_title ">
								<h4>NEWSFEED</h4>
								<div className = "line_arrow right"/>
							</div>
							
							{
								this.articles.map((article, i)=>(
									<NewsFeedProp key={i} time={article.timeStampMade}
																headline={article.headline}
																onClick={() => history.push('/home/' + article.category + '/' + article.articleID)}>
										{article.headline}
									</NewsFeedProp>
								))
							}
							
						</div>
					</div>
				</div>
			</div>
			
		)
	}
	
	mounted () {
		articleService.getAllLiveFeed()
			.then(article => (this.articles = article))
			.catch((error: Error) => Alert.danger(error.message));
	}
	
}


class Redirection extends Component {
	render () {
		return (
			<Redirect to = '/home' />
		)
	}
}

const root = document.getElementById('root');
if (root)
	ReactDOM.render(
		<HashRouter>
			<div>
				<Menu />
				<Alert />
				<Route exact path = "/" component = {Redirection} />
				<Route exact path = "/#/" component = {Redirection} />
				<Route exact path = "/home" component = {Home} />
				<Route exact path = "/home/:category" component = {Category} />
				<Route exact path = "/home/:category/:articleID" component = {Article} />
				<Route exact path = "/editArticles" component = {EditArticles} />
				<Route exact path = "/editArticles" component = {ArticleOverview} />
				<Route exact path = "/editArticles/edit/:articleID" component = {EditArticle} />
			
			</div>
		</HashRouter>,
		root
	);
