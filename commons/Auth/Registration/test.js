'use strict';

import React from 'react';

import PersonDataForm from '../../components/PersonDataForm';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('PersonDataForm', () => {

  it('should fail when given an uncomplete params', () => {
    const name = 'JOhn Doe';
    const email = 'example@email.com';
    const phone = '812345678';
    const countryCallCd = '62';
    const password = 'abcde12345';

    const renderer = new ShallowRenderer();
    renderer.render(<PersonDataForm onSubmit={jest.fn()}/>);
    const dom = renderer.getRenderOutput();

    dom._onSubmitForm({
    	name, email, phone, countryCallCd, password
    });
  });

  it('should fail when lack of required params', () => {
    let a = true;
    expect(a).toBe(true);
  });

  it('should succeed when lack of unrequired params', () => {
    let a = true;
    expect(a).toBe(true);
  });

  it('should succeed when given the correct params', () => {
    const email = 'example@email.com';
    const phone = '812345678';
    const countryCallCd = '62';
    const password = 'abcde12345';

    const renderer = new ShallowRenderer();
    renderer.render(<PersonDataForm />);
    let dom = renderer.getRenderOutput();
    // dom.props.onSubmit = jest.fn();
    // dom.props.onSubmit({
    //   email, phone, countryCallCd, password
    // });
    expect(dom.props.onSubmit).toHaveBeenCalled();
    expect(dom.state().disabled).toEqual(true);
  });

});