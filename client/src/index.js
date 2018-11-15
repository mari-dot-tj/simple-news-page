// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import {Component} from 'react-simplified';
import {HashRouter, Route, NavLink} from 'react-router-dom';
import {Alert, NavBar} from './widgets';
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
				<NavBar.Link to = "/home/nyheter">Nyheter</NavBar.Link>
				<NavBar.Link to = "/home/tek">Tek</NavBar.Link>
				<NavBar.Link to = "/home/sport">Sport</NavBar.Link>
				<NavBar.Link to = "/home/kultur">Kultur</NavBar.Link>
				<NavBar.Link to = "/registerArticle" exact = {true}>Registrer artikkel</NavBar.Link>
			
			</NavBar>
			
			
			/*<nav id = "meny" className = "navbar navbar-inverse">
				<div className = "container-fluid">
					<div className = "navbar-header">
						<NavLink className = "navbar-brand" to = "/" replace>COMMUNITY NETTAVIS</NavLink>
					</div>
					
					<div>
						<ul className = "nav navbar-nav">
							{this.categories.map((category, i) => (
								<li key = {i}>
									<NavLink exact to = {'/category/' + category.category}>{category.category}</NavLink>
								</li>
							))}
						</ul>
					
					
					</div>
					
					<ul className = "nav navbar-nav navbar-right">
						<li>
							<NavLink exact to = "/registerArticle">Registreringsside</NavLink>
						</li>
					</ul>
				</div>
			</nav>*/
		)
	}
	
	/*	mounted () {
			categoryService.getAllCategories()
				.then(categories => (this.categories = categories))
				.catch((error: Error) => Alert.danger(error.message));
		}*/
	
	
}

class Home extends Component {


}

class Article extends Component {


}

class Category extends Component {

}

class RegisterArticle extends Component {
	
	categories = [];
	
	article = {
		headline: '',
		category: '',
		contents: '',
		picture: '',
		importance: ''
	};
	
	style = {
		marginTop: '80px'
	};
	
	render () {
		return (
			<div className = "row" style = {this.style}>
				<div className="col-md-1"/>
				<div className = "col-md-4">
					<form>
						<div className = "form-group">
							<label htmlFor = "inOverskrift">Temp Headline</label>
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
								onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.category = event.target.value)}
							>
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
						<button type = "submit" className = "btn btn-primary" onClick = {this.publish}>Publiser</button>
					</form>
				</div>
				
				<div className = "col-md-6">
					<div className = "form-group">
						<label htmlFor = "inTekst">Tekst</label>
						<textarea id = "inTekst"
							//defaultValue = {loremipsum}
											className = "form-control"
											rows = "13"
											onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.contents = event.target.value)}>
						</textarea>
					</div>
				</div>
				<div className="col-md-1"/>
			
			</div>
		)
	}
	
	
	publish () {
		//$FlowFixMe
		articleService.createOne(this.article)
			.catch((error: Error) => Alert.danger(error.message));
	}
	
	mounted () {
		categoryService.getAllCategories()
			.then(categories => (this.categories = categories))
			.catch((error: Error) => Alert.danger(error.message));
	}
	
}

/*
class Menu extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} exact to="/">
                React example
              </NavLink>
            </td>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} to="/students">
                Students
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class Home extends Component {
  render() {
    return <div>React example with component state</div>;
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <ul>
        {this.students.map(student => (
          <li key={student.email}>
            <NavLink activeStyle={{ color: 'darkblue' }} exact to={'/students/' + student.id}>
              {student.firstName} {student.lastName}
            </NavLink>{' '}
            <NavLink activeStyle={{ color: 'darkblue' }} to={'/students/' + student.id + '/edit'}>
              edit
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    studentService
      .getStudents()
      .then(students => (this.students = students))
      .catch((error: Error) => Alert.danger(error.message));
  }
}

class StudentDetails extends Component<{ match: { params: { id: number } } }> {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        <ul>
          <li>First name: {this.student.firstName}</li>
          <li>Last name: {this.student.lastName}</li>
          <li>Email: {this.student.email}</li>
        </ul>
      </div>
    );
  }

  mounted() {
    studentService
      .getStudent(this.props.match.params.id)
      .then(student => (this.student = student))
      .catch((error: Error) => Alert.danger(error.message));
  }
}

class StudentEdit extends Component<{ match: { params: { id: number } } }> {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <form>
        <ul>
          <li>
            First name:{' '}
            <input
              type="text"
              value={this.student.firstName}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.student) this.student.firstName = event.target.value;
              }}
            />
          </li>
          <li>
            Last name:{' '}
            <input
              type="text"
              value={this.student.lastName}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.student) this.student.lastName = event.target.value;
              }}
            />
          </li>
          <li>
            Email:{' '}
            <input
              type="text"
              value={this.student.email}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.student) this.student.email = event.target.value;
              }}
            />
          </li>
        </ul>
        <button type="button" onClick={this.save}>
          Save
        </button>
      </form>
    );
  }

  mounted() {
    studentService
      .getStudent(this.props.match.params.id)
      .then(student => (this.student = student))
      .catch((error: Error) => Alert.danger(error.message));
  }

  save() {
    if (!this.student) return null;

    studentService
      .updateStudent(this.student)
      .then(() => {
        let studentList = StudentList.instance();
        if (studentList) studentList.mounted(); // Update Studentlist-component
        if (this.student) history.push('/students/' + this.student.id);
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}*/

class Redirection extends Component {
	render () {
		return (
			<Redirection to = {"/home"} />
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
				{/*<Route exact path = "/" component = {Redirection} />
				<Route exact path = "/#/" component = {Redirection} />*/}
				<Route exact path = "/registerArticle" component = {RegisterArticle} />
				<Route exact path = "/home/:category" component = {Category} />
				<Route exact path = "/home" component = {Home} />
				{/*<Route exact path = "/" component = {Home} />
				<Route path = "/students" component = {StudentList} />
				<Route exact path = "/students/:id" component = {StudentDetails} />
				<Route exact path = "/students/:id/edit" component = {StudentEdit} />*/}
			</div>
		</HashRouter>,
		root
	);
