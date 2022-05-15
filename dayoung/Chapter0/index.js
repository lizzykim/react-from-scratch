//LETS BUILD REACT FROM SCRATCH

//before
// const elements = <h1 title="foo">Hello Liz</h1>;

/* 
이건 jsx, jsx를 js로 변환해주는 것은 "babel"이 해줌
이 jsx는 리액트에서 제공하는 것, 이를 js로 구현하기 위해서는 
1) createElement
2) tag 이름 전달 ex)h1
3) Props, children을 parameter로 전달
*/

//after) babel does it for you
// const elements = React.createElement("h1", { title: "foo" }, "Hello Liz");

/*
createElement는 type,props 속성을 가진 object를 생성함
1)type: 어떤 타입의 DOM node를 만들 것인가? -> 어떤 html element를 만들것인지
2)props(Object): jsx의 key,value를 가짐 title="foo" == {title:"foo"}
                 children: 주로 array                
*/

window.onload = function () {
  const elements = {
    type: "h1",
    props: {
      title: "foo",
      children: "Hello Liz",
    },
  };

  const container = document.getElementById("root");

  //before
  // ReactDOM.render(elements, container);

  /* 
Q)ReactDOM.render 가 하는 일은?
A)The ReactDOM.render() function takes two arguments, "HTML code" and an "HTML element".
The purpose of the function is to display the specified HTML code inside the specified HTML element.
해석: 특정 html 코드가 특정 html element에 display 되게 만드든 것이 목적
예를 들어 elements라는 특정 html 코드가 container이라는 elementId가 "root"인 특정 element에서 보이게 함 
*/

  //ReactDOM.render js로 만들어보기

  //1)직접 node(위에서 elements)를 만든다
  //In an HTML document, the document.createElement() method creates the HTML element specified by tagName,
  const node = document.createElement(elements.type); //type:"h1"
  //2)node에 title속성 부여
  node["title"] = elements.props.title; //props: {title:"foo"}
  //3) node의 children  속성 부여, 여기서 children은 string이니깐 textNode로 생성
  const text = document.createTextNode("");

  //createTextNode 예시
  //Create a <h1> element with a text node:
  // const h1 = document.createElement("h1");
  // const textNode = document.createTextNode("Hello World");
  // h1.appendChild(textNode);

  text["nodeValue"] = elements.props.children; // props: { nodeValue: "Hello"} 와 동일
  //4) textNode를 h1에, h1를 container에 붙이기
  node.appendChild(text);
  container.appendChild(node);
};
