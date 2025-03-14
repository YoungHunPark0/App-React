/**

4회차 
--------------------------------------- 3/13 (목) -----------------------------------------
	* FlatList vs ScrollView
		- ScrollView : 데이터가 없고 스크롤이 필요한 화면 또는 데이터가 10개 이하 적을때 사용
			모든 자식 컴포넌트를 한 번에 렌더링해서 화면에 표시
			데이터가 적을 때(예: 10개 이하) 사용
			메모리 사용량이 많아질 수 있음 → 데이터가 많으면 성능 문제
			map - key입력
		- FlatList : 데이터가 많을때 사용
			필요한 아이템만 렌더링하고, 화면에서 사라지면 제거
			데이터가 많아도 성능이 좋음 (가상화 리스트 사용). (데이터가 많을 때 캐시인)
			renderItem을 사용해 각 아이템을 정의 - 함수로 실행하여 map 
			keyExtractor로 각 아이템의 고유 키를 설정

	* redux를 이용한 앱 전역 데이터 관리
		- Redux 
			앱이 켜져있는동안 데이터를 저장해 놓고 전역적으로 사용할수 있게 해주는 기능
			앱이 꺼지면 데이터가 휘발되므로 로그인 등에 활용할수는 없고 => 로그인에는 활용 못함(앱을 보통 껏다키니까), 
			자주 사용하는데이터를 서버로 부터 불러와서 앱이 켜져있는동안 가장 빠르게 접근할 수 있게 해준다.
			(프로필 사진으로 예를 들면 어느 페이지에서든 프로필 사진(데이터를)을 댕겨와서 - 전역)
		- 설치
			npm i @reduxjs/toolkit react-redux
			npx pod-install 

		- 환경설정
			1) slices 폴더 생성 후 user.ts 파일 생성
				import {createSlice} from '@reduxjs/toolkit';

				//컴포넌트 전체에서 공유하는 전역상태의 변수들 (초기상태)
				const initialState = {
					phone: null,
					isTeacher: false,
					userData : {}
				};

				const userSlice = createSlice({
					name: 'user',
					initialState,

					//동기액션용 리듀서
					reducers: {
						//모든 상태를 동시에 바꾸는 리듀서
						setUser(state, action) {
							state.phone = action.payload.phone;
							state.isTeacher = action.payload.isTeacher;
							state.userData = action.payload.userData;
						},

						// phone 바꾸는 리듀서  (데이터 1개일때 편하다)
						setPhone(state, action) {
							state.phone = action.payload;
						},
						setIsTeacher(state, action) {
							state.isTeacher = action.payload;
						},
						setUserData(state, action) {
							state.userData = action.payload;
						},

					},

					//비동기액션용 리듀서
					extraReducers: builder => {},
				});

				export default userSlice;


			2) store 폴더 생성 후 redecers.ts 파일 생성
				import {combineReducers} from 'redux';
				import userSlice from '../slices/user';


				// root 리듀서로서, 여기에 각각의 슬라이스를 등록하면 app.js 에서 state.user, state.XXX 등으로 각 슬라이서의 정보를 쓸 수 있음.
				const rootReducer = combineReducers({
					user: userSlice.reducer,
				});

				export type RootState = ReturnType<typeof rootReducer>;
				export default rootReducer;

			3) store폴더에 index.ts 파일 생성
				import {configureStore} from '@reduxjs/toolkit';
				import {useDispatch} from 'react-redux';
				import rootReducer from './reducer';

				const store = configureStore({
					reducer: rootReducer,
				});
				export default store;

				export type AppDispatch = typeof store.dispatch;
				export const useAppDispatch = () => useDispatch<AppDispatch>();

			4) App.js 파일에 Priveder를 감싸준다
				import store from './store';

				<Provider store={store}>
					<AppInnerForRedux />
				</Provider>

			5) 리듀서를 이용한 데이터 저장 및 사용하기
				- 저장
				import { useAppDispatch } from "../store";

				const dispatch = useAppDispatch();
				dispatch(userSlice.actions.setPhone('01012345678'));

				- 데이터 사용
				let phone = useSelector((state:any)=>state.user.phone);

	
		* react-native-encrypted-storage 데이터 저장
			- react-native-encrypted-storage
				보안성이 높은 데이터를 저장할 수 있도록 도와주는 라이브러리
				비밀번호, 토큰 등 민감한 데이터 저장 가능
				비동기 API 지원
			
			- 설치
				npm install react-native-encrypted-storage
				npx pod-install 

			- 저장 (key, value)
				await EncryptedStorage.setItem('accessToken','accessToken값');
			- 사용 (key)
				const accessToken =  await EncryptedStorage.getItem('accessToken');
			- 삭제 (key)
				await EncryptedStorage.removeItem('accessToken');

		
		* node.js 작동 구조
			1) url 호출
			2) 라우터에서 url 인식
				- get 라우터 (데이터 select)
				- post 라우터 (insert, delete, update)

			3) 라우터에서 url 인식 시
				- contoroller로 보냄
			
			4) controller에서 
				- 호출된 함수로 DAO를 통해 데이터 처리 (DB) 후 데이터 리턴

			5) 라우터에서 url 미 인식 시
				- 404 처리

		* react-native-encrypted-storage를 활용한 로그인 구현

		* 요청작업  
		user_service 테이블에서 service = ‘messenger’ // user_id로 걸러서 조건 추가할것!.


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

