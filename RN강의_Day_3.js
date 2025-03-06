/**

3회차 
--------------------------------------- 3/6 (목) -----------------------------------------
	🔹 숙제 확인 : 이모지 눌렀을때 이모지가 화면에 뜨도록
	
	https://reactnavigation.org/docs/getting-started
	
	🔹 react-navigation/native :
		1. 용도 : 화면 전환 시 stack을 쌓아 가며 기존화면 위에 새 화면을 쌓아가며 화면을 전환 시킬수 있게 해주는 네이게이터이다. 이전 스크린으로 돌아갈수 있으며 카드처럼 위로 쌓이고 빠지고 하는 역할을 해준다.
		2. 설치
			1) npm install @react-navigation/native
					npm install @react-navigation/native-stack													
			2) npm install react-native-screens react-native-safe-area-context																		
			npx pod-install -> 위 2개 설치 후 반드시 실행해줘야함
		
		3. 사용하기
			1) 반드시 NavigationContainer로 감싼뒤에 import하여 사용한다.
			2) Stack.js 에서는 createNativeStackNavigator()함수로 Stack을 생성한 뒤 네비게이터에 컴포넌트를 바로 입력하여 사용 가능 하다.

		4. 사용예시

			import { NavigationContainer } from '@react-navigation/native';
			import { Stack } from "./navigation/Stack";
			
			
			// app.js 파일
			return (
				<NavigationContainer>
					<Stack />
				</NavigationContainer>
			);


			// stack.js 파일
			const NativeStack = createNativeStackNavigator(); //페이지 이동을 위한 네이게이터 생성 및 제작

			const Stack = () =>{
    			const navigation = useNavigation();

				return (
					 <NativeStack.Navigator 
						initialRouteName="Home"
						
						screenOptions={{
							headerTintColor:"#000000",
							headerTitleAlign:"center",
							headerBackTitleVisible:false,
							headerTitleStyle:{
								fontSize:18,
								fontFamily:'noto500',
							},
							headerShadowVisible:false, //헤더 밑줄 없애기
						>

							<NativeStack.Screen 
								name="Movie"
								component={Movie}
								options={{
									headerShown:false,
									animation:'slide_from_right',
									presentation:'card',
								}}
							/>
						</NativeStack.Navigator>
				)
			}

			// commonNaviFunc.js 파일
			export const goNotification = (navigation:any) => {
				navigation.navigate('Stack -> 스크린명', {screen: 'Movie', params:{}});
			}



	🔹 react-navigation/bottom-tabs.: 바틈 탭 네비게이션
		1. 용도 : 모바일 하단 플로팅 버튼 네이게이터 형식으로 사용한다.
		2. 설치
			1) npm install @react-navigation/native 를 설치하고 (이미 설치 완료)
			2) npm install @react-navigation/bottom-tabs를 설치한다.
			npx pod-install
																				
		3. 사용하기
			1) 반드시 NavigationContainer로 감싼뒤에 import하여 사용한다.
			2) Tabs.js 에서는 createBottomTabNavigator()함수로 Tab을 생성한 뒤 네비게이터에 컴포넌트를 바로 입력하여 사용 가능 하다.

		4. 사용예시
			import { NavigationContainer } from '@react-navigation/native';
			import Tabs from "./navigation/Tabs";

			// app.js 파일
			return (
				<NavigationContainer>
					<Tabs />
				</NavigationContainer>
			);



			//Tabs.js 파일
			import react from "react";
			import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"

			import Movies from "../screens/Movies";
			import Tv from "../screens/Tv";
			import Search from "../screens/Search";

			import { Text, View, Image } from 'react-native';
			import {Ionicons} from '@expo/vector-icons';

			const Tab = createBottomTabNavigator();


			const Tabs = () => {
				return(
					<Tab.Navigator 
					//initialRouteName="Search" 
					screenOptions={{
						//페이지 전환시 마다 데이터를 다시 호출함!!!
						//unmountOnBlur:true,


						// tabBarLabelStyle:{
						//     color:'#fff',
						//     backgroundColor:'red'
						// },
						tabBarLabelPosition:"below-icon",
						tabBarActiveTintColor:"red",
						headerShown : true, //헤더 보여줄지 말지
						tabBarLabelStyle:{
							fontSize:11,
						}
					}}>
						<Tab.Screen name="Movies" component={Movies} options={{
							tabBarIcon:({focused,color,size}) =>{
								//console.log(focused,color,size);
								return <Ionicons name="film" size={size} color={color} />
							},

						}}/>
						<Tab.Screen name="Tv" component={Tv} 
							options={{
								tabBarIcon :({isFocused, color, size}) =>{
									return <Ionicons name="tv" size={size} color={color} />
								},
							}}
						/>
						
						<Tab.Screen name="넷플릭스" component={Tv} />
						
						<Tab.Screen name="Search" component={Search} 
							options={{
								// tabBarLabelStyle:{
								//     color:'#000',
								//     backgroundColor:'gray'
								// },
								tabBarBadge:"new",
								headerTitleStyle:{
									color:'tomato'
								},
								headerRight: () => (
									<View>
									<Text>설정</Text>
									</View>
								),
								tabBarIcon :({isFocused, color, size}) =>{
									//focus 상태에 따라 아이콘을 바꾸어줄때는 네임만 바꾸어 주면 된다! (아웃라인 있는 아이콘, 없는 아이콘)
									return <Ionicons name={isFocused?"search-outline":"search"} size={size} color={color} />
								},
							}}
						/>
					</Tab.Navigator>
				)
			};

			export default Tabs;


			//각 페이이별 js (Search.js)  파일
			import react from "react";
			import {View, Text} from "react-native";

			const Search = () => (
				<View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
					<Text>Search</Text>
				</View>
			);

			export default Search;


			// Movies.js  파일
			import react from "react";
			import {View, Text} from "react-native";


			const Movies = () => (
				<View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
					<Text>Movies</Text>
				</View>
			);

			export default Movies;


			//Tv.js  파일
			import react from "react";
			import {View, Text} from "react-native";


			const Tv = () => (
				<View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
					<Text>Tv</Text>
				</View>
			);

			export default Tv;
	

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

