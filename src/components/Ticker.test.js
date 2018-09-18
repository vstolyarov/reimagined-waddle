import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render } from 'enzyme';
import renderer from 'react-test-renderer';
import Ticker from './Ticker';

it('shows buy when price less than 1000', () => {
  // ARRANGE
  const component = <Ticker price={700} pair="DEMO/DEMO2" />;
  const tree = shallow(component);
  tree.setState({ agreeGiven: true }); // <---
  //ACT?

  // ASSERT
  expect(tree.find('button').hasClass('buyIndicator')).toBeTruthy();
});

it('does not shows buy when price is higher than 1000', () => {
  const component = <Ticker price={2000} pair="DEMO/DEMO2" />;
  expect(shallow(component).find('span')).toHaveLength(0);
});

it('does not shows buy button by default', () => {
  const component = <Ticker price={2000} pair="DEMO/DEMO2" />;
  expect(shallow(component).find('button')).toHaveLength(0);
});

it('shows buy button if I agreed', () => {
  // ARRANGE
  const component = <Ticker price={700} pair="DEMO/DEMO2" />;
  const tree = shallow(component);

  // ACT
  tree.find('input').simulate('change');

  // ASSERT
  expect(tree.state('agreeGiven')).toBeTruthy();
  expect(tree.find('button')).toHaveLength(1);
});

it('should call function when buy button clicked', () => {
  const buyFn = jest.fn();

  const component = <Ticker price={700} pair="DEMO/DEMO2" buy={buyFn} />;
  const tree = shallow(component);
  tree.setState({ agreeGiven: true });

  tree.find('button').simulate('click');
  expect(buyFn).toHaveBeenCalled();
});
