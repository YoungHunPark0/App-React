/**

 * 2회차 2/27목 => 2/25(화) 변경요청

1회차 
--------------------------------------- 2/20 (목) -----------------------------------------
	: 개발 환경 구성 및 확인
	: 연습 프로젝트 생성 
	: 컴포넌트 소개 및 생성
	: 주요 내장형 컴포넌트 연슴


	🔹 프로젝트 생성
	npx @react-native-community/cli init appName
	// npx create-react-native-app appName (더이상 미사용)
	
	🔹 컴포넌트란 ?
		리액트 네이티브(React Native)에서 컴포넌트(Component) 는 UI를 구성하는 기본 단위임
		JSX를 활용하여 하나의 영역을 완성하여 재사용할수 있게 만들어 놓은 태그 모듈 함수이다.		
		JSX(JavaScript XML)는 React에서 사용하는 문법으로, JavaScript 코드 안에서 HTML 태그와 유사하게 코드를 작성할 수 있다.
			- 컴포넌트 함수명은 첫글자를 대문자로 사용한다.				
			- 컴포넌트에서 변수를 선언할때는 var가 아닌 let이나 const로 해야 한다. var는 전역변수로 인식하기 때문에 변수는 let, 상수는 const를 써야 한다.						
			- 컴포넌트 태그 내에서는 if사용이 불가능하고, 삼항연산자로 대체해야 한다.						
			- 컴포넌트 태그 내에서 자바스크립트 문법 및 변수를 사용하기 위해서는 중괄호 {} 안에 사용한다.						
		
			- 기본 내장 컴포넌트 : View, Text, Pressable, TouchableOpacity, Image, ScrollView, TextInput 등
			- 사용자 정의 컴포넌트(함수형)
			* 참고
				https://reactnative.dev/docs/intro-react
				https://reactnative.dev/docs/intro-react-native-components
	
	🔹 사용자 정의 컴포넌트(함수형) 예시 
		import React from 'react';
		import { View, Text } from 'react-native';

		const MyComponent = () => {
			return (
				<View>
					<Text>Hello, React Native!</Text>
				</View>
			);
		};
		export default MyComponent;
	
	🔹 컴포넌트의 특징 (Props 및 useState)
		Props: 부모 컴포넌트에서 데이터를 전달하는 방식 (<MyComponent title="Hello" />)
		State: 컴포넌트 내부에서 관리하는 동적인 데이터 (useState 사용)

	🔹 useState를 이용한 변수 관리
		- useState란 ?
			리액트 네이티브에서 상태(state)를 관리하는 Hook임. 
			컴포넌트의 값이 변할 때 화면을 다시 렌더링할 수 있도록 도와줌.
		- useState의 특징
			상태가 변경되면 컴포넌트가 다시 렌더링됨

		- useState 사용 예시 형태
			import React, { useState } from 'react';
			import { View, Text, Button } from 'react-native';
			const Counter = () => {
				const [count, setCount] = useState(0);
				return (
					<View>
						<Text>Count: {count}</Text>
						<Button title="Increase" onPress={() => setCount(count + 1)} />
					</View>
				);
			};
			export default Counter;

		- state														
			- 컴포넌트가 관리하는 상태값이다. 해당값은 한번 선언되면 이벤트에 따라 업데이트가 되지 않는다.													
			let name = "Mike"													
			function changeName(){													
				name= name==="Mike" ? "Jane" : "Mike";												
			}													
			
			return (													
				<h1>{name}</<h1>												
				<button onClick={changeName}>이름바꾸기</<button>												 
					=> 아무리 클릭해도 변수내에서 name은 바뀌지만 dom에 표시된 {name}속 이름은 바뀌지 않는다!!
					=> useState를 이용하여 상태 관리를 해야 함
			)													

		- useState (훅)																		
			1) useState 훅 API를 import 해야함																	
				import {useState} from "react";  																
			2) 변수선언을 let name ="Mike" 형태로 하지 않고, let [변수명, 변수를 변경할호출함수] = useState(값)으로 선언한다.																	
				let [name, setName] = useState("Mike");																
			3) 어디에서든 setName("이름")이 호출되면 해당 값이 dom에 반영된다.																	
																				
			const [name, setName] = useState("Mike");																	
			function changeName(){																	
				name= name==="Mike" ? "Jane" : "Mike";																
				setName(name)																
			}																	
																	
			return (																	
				<Text>{name}</<Text>
				<Pressable onClick={changeName}>이름바꾸기</<Pressable>												 
					// => 이름바꾸기 클릭 시 이름이 정해지면, 마지막에 setName이 호출되고 useState에 의해 이름이 바뀐다				
			)																	

		- props																		
			- 컴포넌트의 속성값, 해당컴포넌트를 호출할때, 값을 넣어서 호출할 수 있고, 해당값(props)은 컴포넌트의 매개변수에서 받아 쓸 수 있다.																	
			- app.js에서 컴포넌트 호출 시																	
				<Hello age={20} />																
																				
			- Hello 컴포넌트 작성																	
				export default function Hello(props){	
					// => 이때 매개변수에는 json객체 형태로 들어온다 {age:10}				
					return <Text>Hello</Text>  <p>{props.age}세</p>											 
				}																
																		

	🔹 useEffect를 이용한 life Cycle 관리
		- useEffect란?  
			useEffect는 컴포넌트의 라이프사이클(생명 주기) 관리하는 Hooks의 한 종류로, 
			API 호출, 이벤트 리스너 설정, 타이머, 상태 변경 처리 등에 사용된다.
			1) 컴포넌트가 마운트 됐을 때 (처음 나타났을 때)
			2) 언마운트 됐을 때 (사라질 때) 
			3) 업데이트 될 때 (특정 props가 바뀔 때) 특정 작업을 처리할 수 있게 해준다.

	​	 - useEffect 사용 예시 컴포넌트
			import React, { useState, useEffect } from 'react';
			import { View, Text, Button } from 'react-native';
			const Counter = () => {
				const [count, setCount] = useState(0);

				useEffect(() => {
					console.log(`Count changed: ${count}`);
				}, [count]);

				return (
					<View>
						<Text>Count: {count}</Text>
						<Button title="Increase" onPress={() => setCount(count + 1)} />
					</View>
				);
			};
		export default Counter;





2회차 
--------------------------------------- 2/25 (화) -----------------------------------------
	주요 컴포넌트 이해 및 사용하기
	View, Text, Pressable, TouchableOpacity, Image, ScrollView, TextInput, Alert

	StyleSheet 사용하기
	\ㅞ
	컴포넌트 데이터 주고받기

3회차 
--------------------------------------- 3/6 (목) -----------------------------------------
	styled-components 설치, 이해 및 활용
	type-script 환경 구성 및 이해
	react-navigation 설치, 이해 및 활용
	
	

4회차 
--------------------------------------- 3/13 (목) -----------------------------------------
	FlatList vs ScrollView
	react-native-encrypted-storage를 활용한 로그인 구현
	redux를 이용한 앱 전역 데이터 관리
	useRef

5회차 
--------------------------------------- 3/25 (화) -----------------------------------------
	하이에듀 앱 구조 이해 1

6회차 
--------------------------------------- 4/3 (목) -----------------------------------------
	하이에듀 앱 구조 이해 2

7회차 
--------------------------------------- 4/8 (화) -----------------------------------------
	하이에듀 앱 구조 이해 3

8회차 
--------------------------------------- 4/10 (목) -----------------------------------------
	하이에듀 앱  구조 이해 4 및 앱스토어/플레이스토어 업데이트 하기


 */

