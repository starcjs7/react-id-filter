// Action type ( 액션 타입 )
// const SET_SECONDPAGE     = 'pageReducer/SET_SECONDPAGE'
// const SET_THIRDPAGE      = 'pageReducer/SET_THIRDPAGE'
// const SET_COMPLETEPAGE   = 'pageReducer/SET_COMPLETEPAGE'
// const SET_RANDOMWHEEL   = 'pageReducer/SET_RANDOMWHEEL'
const SET_IDFILTER     = 'pageReducer/SET_IDFILTER'
const SET_QUIZ      = 'pageReducer/SET_QUIZ'
const SET_TWOHEART      = 'pageReducer/SET_TWOHEART'

// Action Creator Function ( 액션 생성 함수 )
export const setSecondPage = page => ({ type: SET_IDFILTER, page });
export const setThirdPage = page => ({ type: SET_QUIZ, page });
// export const setCompletePage = page => ({ type: SET_COMPLETEPAGE, page });
// export const setRandomWheelPage = page => ({ type: SET_COMPLETEPAGE, page });

// Reducer function ( 리듀서 함수 )
const initState ={
    page: 'idFilter',
}

const pageReducer = (state = initState, action) => {
    switch(action.type){

        case SET_IDFILTER: return { ...state, page: 'idFilter' }
        case SET_QUIZ: return { ...state, page: 'quiz' }
        case SET_TWOHEART: return { ...state, page: 'twoHeart' }
        // case SET_COMPLETEPAGE: return { ...state, page: 'complete' }
        // case SET_RANDOMWHEEL: return { ...state, page: 'randomWheel' }

        default: return state;
    }
}

export default pageReducer;
























// import { combineReducers } from 'redux';

// const pageState = {
//     page: 'first',
//     name: ''
// };

// const pageReducer = (state = pageState, action) => {
//     switch(action.type){
//         case "SET_SECONDPAGE": return{ ...state, page: 'second' }
//         case "SET_THIRDPAGE": return{ ...state, page: 'third' }
//         case "SET_COMPLETEPAGE": return{ ...state, page: 'complete' }
//         case "SET_NAME": {console.log(action.name )}return{ ...state, name: action.name }
//         default: return state;
//     }
// };

// // const extra = (state = { value: 'this_is_extra_reducer' }, action) => {
// //     switch(action.type) {
// //         default:
// //             return state;
// //     }
// // }

// // const counterApp = combineReducers({
// //     pageReducer: pageReducer,
// //     // extra
// // });

// export default counterApp;