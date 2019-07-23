// make React available
import React from 'react';

//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';

//make the Card component available
import Card from './Card';

//make the snapshot renderer available
import renderer from 'react-test-renderer';

//this is the smoke test case
it('renders without crashing', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');

    //render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(<Card />, div);

    //clean up code
    ReactDOM.unmountComponentAtNode(div);
});


//snapshot, I think I did this right
it('renders the UI as expected', () => {
    const tree = renderer
      .create(<Card key="a" title="First card" content="lorem ipsum"/>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
});