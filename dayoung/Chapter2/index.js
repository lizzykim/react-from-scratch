// GOAL : React.DOM을 대신 만들어보자

function createElement(type, props, ...children) {
  return {
    type: type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: [], //여기에 children을 속성을 만들어줘야하는 이유는?????
    },
  };
}

// const elements = <h1 title="foo">Hello Liz</h1>;
const elements = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello Liz",
  },
};

//GOAL: element type에 따른 1)DOM node를 만들고 2)만든 node를 container에 붙여준다.
function render(element, container) {
  //type가 TEXt_ELEMENTS라면 createElement 대신 createTextElement로 textnode 생성
  const dom =
    element.type == "TEXT_ElEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  //The last thing we need to do here is assign the element props to the node.????지
  //isProperty가? 속성중 children이 아닌 것들
  const isProperty = (key) => key !== "children";

  Object.keys(element.props) //객체의 키만 담은 배열, 여기서는  { title: "foo", children: "Hello Liz"}에서 [title,children]
    .filter(isProperty) //filter거치면 title이 남고
    .forEach((name) => {
      dom[name] = element.props[name]; //dom[title] = element.props[title]
    });

  //element.props.children => 이게 배열형태로 들어옴
  element.props.children.forEach((child) => render(child, dom));
  container.appendChild(dom);
}

//Didact라는 libary 선언
const Didact = {
  createElement,
  render,
};

//jsx를 직접 사용하고 싶으면

/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

const container = document.getElementById("root");
// ReactDOM.render(element, container);
Didact.render(element, container);
