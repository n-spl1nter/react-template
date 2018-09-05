import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Root from '../../src/components/Root';

describe('Root component tests', () => {
  const rootComponent = shallow(<Root />);
  it('should correct snapshot render',  () => {
    expect(shallowToJson(rootComponent)).toMatchSnapshot();
  });
});
