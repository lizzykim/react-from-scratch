/** @jsx MiniReact.createElement */
import MiniReact from '../utils/react.js';

window.onload = function () {
  const element = MiniReact.createElement(
    'div',
    {
      className: 'foo',
    },
    MiniReact.createElement('div', null, 'something'),
    MiniReact.createElement('p', null, 'Hello ', MiniReact.createElement('b', null, 'World'))
  );
  console.log(element);
};
