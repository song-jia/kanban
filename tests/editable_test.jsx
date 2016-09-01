import React from 'react';
import {renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  Simulate} from 'react-addons-test-utils';
import assert from 'assert';
import Editable from '../app/components/Editable';

describe('Editable', () => {
  it('renders value', () => {
    const value = 'value';
    const component = renderIntoDocument(
        <Editable className='editable' value={value} />
    );
    const valueComponent = findRenderedDOMComponentWithClass(component, 'value');
    assert.equal(valueComponent.innerHTML, value);
  });
  it('triggers onValueClick', () => {
    let triggered = false;
    const value = 'value';
    const onEdit = () => triggered = true;
    const component = renderIntoDocument(
      <Editable value={value} onValueClick={onEdit}/>
    );
    const valueComponent = findRenderedDOMComponentWithClass(component, 'value');
    Simulate.click(valueComponent);
    assert.equal(triggered, true);
  });
  it('triggers onEdit when on blur', () => {
    let triggered = false;
    const newValue = 'value';
    const onEdit = (val) => {
      triggered = true;
      assert.equal(val, newValue);
    }
    const component = renderIntoDocument(
      <Editable editing value={'value'} onEdit={onEdit} />
    );
    const input = findRenderedDOMComponentWithTag(component, 'input');
    input.value = newValue;
    Simulate.blur(input);
    assert.equal(triggered, true);
  });
  it('triggers onEdit when press enter key', () => {
    let triggered = false;
    const newValue = 'value';
    const onEdit = (val) => {
      triggered = true;
      assert.equal(val, newValue);
    }
    const component = renderIntoDocument(
      <Editable editing value={'value'} onEdit={onEdit} />
    );
    const input = findRenderedDOMComponentWithTag(component, 'input');
    input.value = newValue;
    Simulate.keyPress(input, {key: 'Enter', keyCode: 13, which: 13});
    assert.equal(triggered, true);
  });
});
