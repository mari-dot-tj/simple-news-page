// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import {Component} from 'react-simplified';
import {NavLink} from 'react-router-dom';

/**
 * Renders alert messages using Bootstrap classes.
 */
export class Alert extends Component {
	alerts: { text: React.Node, type: string }[] = [];
	
	render () {
		return (
			<>
				{this.alerts.map((alert, i) => (
					<div key = {i} className = {'alert alert-' + alert.type} role = "alert">
						{alert.text}
						<button
							className = "close"
							onClick = {() => {
								this.alerts.splice(i, 1);
							}}
						>
							&times;
						</button>
					</div>
				))}
			</>
		);
	}
	
	static success (text: React.Node) {
		// To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
		setTimeout(() => {
			for (let instance of Alert.instances()) instance.alerts.push({text: text, type: 'success'});
		});
	}
	
	static info (text: React.Node) {
		// To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
		setTimeout(() => {
			for (let instance of Alert.instances()) instance.alerts.push({text: text, type: 'info'});
		});
	}
	
	static warning (text: React.Node) {
		// To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
		setTimeout(() => {
			for (let instance of Alert.instances()) instance.alerts.push({text: text, type: 'warning'});
		});
	}
	
	static danger (text: React.Node) {
		// To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
		setTimeout(() => {
			for (let instance of Alert.instances()) instance.alerts.push({text: text, type: 'danger'});
		});
	}
}

class NavBarBrand extends Component<{ children?: React.Node }> {
	render () {
		
		if (!this.props.children) return null;
		return (
			<NavLink className = "navbar-brand" activeClassName = "active" exact to = "/home">
				{this.props.children}
			</NavLink>
		);
	}
}

class NavBarLink extends Component<{ to: string, exact?: boolean, children?: React.Node }> {
	render () {
		if (!this.props.children) return 'zxcd';
		return (
			<NavLink className = "nav-link" activeClassName = "active" exact = {this.props.exact} to = {this.props.to}>
				{this.props.children}
			</NavLink>
		);
	}
}


/**
 * Renders a navigation bar using Bootstrap classes
 */
export class NavBar extends Component<{ children: React.Element<typeof NavBarBrand | typeof NavBarLink>[] }> {
	static Brand = NavBarBrand;
	static Link = NavBarLink;
	
	render () {
		return (
			<nav className = "navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
				{this.props.children.filter(child => child.type === NavBarBrand)}
				<ul className = "navbar-nav">{this.props.children.filter(child => child.type === NavBarLink)}</ul>
			</nav>
		);
	}
}

/**
 * Renders an information card using Bootstrap classes
 */
export class Card extends Component<{ imgLink: string, title: React.Node, to: string, children?: React.Node }> {
	
	style = {
		width: '100%',
	};
	
	render () {
		return (
			<div className = "card" style = {this.style}>
				<img className = "card-img-top card-img-top" src = {this.props.imgLink} alt = "panda"
						 style = {{width: '100%'}} />
				<div className = "card-body">
					<NavBarLink to = {this.props.to}>{this.props.title}</NavBarLink>
					<div className = "card-text">{this.props.children}</div>
				</div>
			</div>
		);
	}
}

export class BasicCard extends Component<{ title: React.Node, children?: React.Node }> {
	render () {
		return (
			<div className = "card artEdit">
				<div className = "card-body">
					<h5 className = "card-title">{this.props.title}</h5>
					<div className = "card-text">{this.props.children}</div>
				</div>
			</div>
		);
	}
}


export class NewsCard extends Component<{
	imgLink: string,
	title: React.Node,
	timestamp: string,
	children?: React.Node
}> {
	
	style = {
		width: '100%',
	};
	
	render () {
		return (
			<div className = "card" >
				<img className = "card-img-top card-img-top" src = {this.props.imgLink} alt = "panda"
						 style = {{width: '100%'}} />
				<div className = "card-body">
					<h4 className = "card-title headerSpecs">{this.props.title}</h4>
					<p className = "timeStampSpecs">Publisert: {this.props.timestamp}</p>
					<div className = "card-text">{this.props.children}</div>
				</div>
			</div>
		);
	}
}

class ListGroupItem extends Component<{ to?: string, children: React.Node }> {
	render () {
		return this.props.to ? (
			<NavLink className = "list-group-item" activeClassName = "active" to = {this.props.to}>
				{this.props.children}
			</NavLink>
		) : (
			<li className = "list-group-item">{this.props.children}</li>
		);
	}
}

/**
 * Renders a list group using Bootstrap classes
 */
export class ListGroup extends Component<{
	children: React.Element<typeof ListGroupItem> | (React.Element<typeof ListGroupItem> | null)[] | null
}> {
	static Item = ListGroupItem;
	
	render () {
		return <ul className = "list-group">{this.props.children}</ul>;
	}
}

class ButtonSuccess extends Component<{
	onClick: () => mixed,
	children: React.Node
}> {
	render () {
		return (
			<button type = "button" className = "btn btn-success ml-3" onClick = {this.props.onClick}>
				{this.props.children}
			</button>
		);
	}
}

class ButtonDanger extends Component<{
	onClick: () => mixed,
	children: React.Node
}> {
	render () {
		return (
			<button type = "button" className = "float-right btn btn-danger ml-3" onClick = {this.props.onClick}>
				{this.props.children}
			</button>
		);
	}
}

class ButtonLight extends Component<{
	onClick: () => mixed,
	children: React.Node
}> {
	render () {
		return (
			<button type = "button" className = "float-right btn btn-light ml-3" onClick = {this.props.onClick}>
				{this.props.children}
			</button>
		);
	}
}

/**
 * Renders a button using Bootstrap classes
 */
export class Button {
	static Success = ButtonSuccess;
	static Danger = ButtonDanger;
	static Light = ButtonLight;
}


export class NewsFeedProp extends Component<{
	time: string,
	onClick: () => mixed,
	children?: React.Node
}>{

	render(){
		return(
			<button className = "btn-heading" aria-expanded = "false" onClick={this.props.onClick}>
				<div className = "items">
					<div className = "content">
						<div className = "entry_metadata">
							<time className = "time">{this.props.time}</time>
						</div>
						<div className = "title">
							<h4>{this.props.children}</h4>
						</div>
					</div>
				</div>
			</button>
		)
	}

}







