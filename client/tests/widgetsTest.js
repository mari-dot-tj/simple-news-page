// @flow

import * as React from 'react';
import {Alert} from '../src/widgets.js';
import {shallow} from 'enzyme';
import {Card, NavBar, NewsFeedProp, Button, NewsCard} from "../src/widgets";

describe('Alert tests', () => {
	const wrapper = shallow(<Alert />);
	
	it('initially', () => {
		let instance: ?Alert = Alert.instance();
		expect(typeof instance).toEqual('object');
		if (instance) expect(instance.alerts).toEqual([]);
		
		expect(wrapper.find('button.close')).toHaveLength(0);
	});
	
	it('after danger', done => {
		Alert.danger('test');
		
		setTimeout(() => {
			let instance: ?Alert = Alert.instance();
			expect(typeof instance).toEqual('object');
			if (instance) expect(instance.alerts).toEqual([{text: 'test', type: 'danger'}]);
			
			expect(wrapper.find('button.close')).toHaveLength(1);
			
			done();
		});
	});
	
	it('after clicking close button', () => {
		wrapper.find('button.close').simulate('click');
		
		let instance: ?Alert = Alert.instance();
		expect(typeof instance).toEqual('object');
		if (instance) expect(instance.alerts).toEqual([]);
		
		expect(wrapper.find('button.close')).toHaveLength(0);
	});
});


describe('NavBarBrand tests', () => {
	const wrapper = shallow(
		<NavBar.Brand>
			Hei
		</NavBar.Brand>
	);
	
	it('Checking that Brand has the right classes', () => {
		expect(wrapper.find('NavLink').hasClass('navbar-brand')).toEqual(true)
	});
});

describe('Card tests', () => {
	const wrapper = shallow(
		<Card imgLink = "link" to = "/test" title = "test-title">
			Test-child
		</Card>
	);
	
	it('Checking that img has the right classes', () => {
		expect(wrapper.find('img').hasClass('card-img-top card-img-top')).toEqual(true)
	});
	
	it('Checking that Card has the right classes', () => {
		expect(wrapper.find('img').parent().hasClass('card')).toEqual(true)
	});

});

describe('NewsFeedProp tests', () => {
	const wrapper = shallow(
		<NewsFeedProp time='2018 13:09' onClick={() => console.log('test')} >
			Headline-test
		</NewsFeedProp>
	);
	
	it('Checking that button has the right classes', () => {
		expect(wrapper.find('button').hasClass('btn-heading')).toEqual(true)
	});
	
	it('Checking if time has parent with right classes', () => {
		expect(wrapper.find('time').parent().hasClass('entry_metadata')).toEqual(true)
	});
	it('Checking if h4 has the right classes', () => {
		expect(wrapper.find('h4').parent().hasClass('title')).toEqual(true)
	});

});

describe('ButtonSuccess tests', () => {
	const wrapper = shallow(
		<Button.Success onClick={() => console.log('test')}>
			Test-button
		</Button.Success>
	);
	
	it('Checking that ButtonSuccess has the right classes', () => {
		expect(wrapper.find('button').hasClass('btn btn-success ml-3')).toEqual(true)
	});
	
	it('Check that button has correct type', ()=>{
		expect(wrapper.find('button').prop('type')).toEqual('button')
	})
	
});

describe('NewsCard tests', () => {
	const wrapper = shallow(
		<NewsCard imgLink='/link' title='testTitle' timestamp='2018 13:23'>
			Test-NewsCard
		</NewsCard>
	);
	
	it('Checking that img has the right classes', () => {
		expect(wrapper.find('img').hasClass('card-img-article')).toEqual(true)
	});
	
	it('Checking that h4 has the right classes', () => {
		expect(wrapper.find('h4').hasClass('card-title headerSpecs')).toEqual(true)
	});
	
	it('Checking if h4 has parent with right classes', () => {
		expect(wrapper.find('h4').parent().hasClass('card-body')).toEqual(true)
	});
});










