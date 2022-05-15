// GOAL : React.createElement를 대신 동작하는 나만의 createElement를 만들어보자

//before
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// );

//before : what babel does
// const element = React.createElement(
//   "div",
//   { id: "foo" },
//   React.createElement("a", null, "bar"),
//   React.createElement("b", null, null)
// );

// keypoint 1) element는 type과 props 속성으로 구성된 OBJECT이다!

// keypoint 2) Spread Operator VS Rest Parameter
//https://indepth.dev/posts/1363/getting-started-with-modern-javascript-spread-vs-rest
/*
spread operator : unpack elements
if Array)
const arrayA = [1, 2, 3];
const arrayB = [0, ...arrayA, 4];
console.log(arrayB); -> [0, 1, 2, 3, 4]
if Object)
const x = { x: 1 };
const y = { y: 2 };
const coord = {...x, ...y};
console.log(coord); -> {x: 1, y: 2}
*/

/*
Rest parameter: pack elements
the rest parameter instead collects all the remaining elements into an array.
function sum(...args) {
  let result = 0;

  for (let arg of args) {
    result += arg;
  }

  return result
}

sum(4, 2) // -> 6
sum(3, 4, 5, 6) // -> 18
parameter 갯수가 몇개 들어갈지 모를때 사용, 2개가 들어가던 4개가 들어간던 ...args는
[3,4,5,6]이 라는 array 형태로 들어간다.
rest parameter는 무조건 마지막 parameter 로 들어가야된다.
왜냐면 파라미터의 마지막 값 들을 모두 array  형태로 묶어버리기 때문이다.

*/

function createElement(type, props, ...children) {
  return {
    type: type,
    props: { ...props, children },
  };
}

//ex) createElement("div"): children 빈 배열 들어감 == { type:"div", props:{ "children": []} }
//ex) createElement("div",null,a) == {type: "div" , props:{ children: [a] } }
//ex) createElement("div",null,a,b) == {type: "div", props:{ children:[a,b] } }
const element1 = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

const element2 = <div id="foo">Hello Liz</div>;
//element2 는 children이 string, number 같은 원시 객체이기 때문에 새로운 createTextElement로 정의 해줄 것이다.
//근데 왜???

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

//이제 직접 만든 createElement와 createTextElement로 바꿔주자!

//Didact라는 libary선언
const Didact = {
  createElement,
};

//내가 만든 createElement를 사용하거나
const element = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
);

//jsx를 직접 사용하고 싶으면

window.onload = function () {
  const element3 = (
    <div id="foo">
      <a>bar</a>
      <b />
    </div>
  );

  const container = document.getElementById("root");
  ReactDOM.render(element3, container);
};
