/** @jsx MiniReact.createElement */

import MiniReact from '../utils/react.js';

window.onload = function () {
  const element = (
    <div className="foo">
      <div>something</div>
      <p>
        Hello <b>World</b>
      </p>
    </div>
  );
  console.log(element);
};
