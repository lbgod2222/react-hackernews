import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
// import thunk from "redux-thunk";

// 增强整合中间件
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSED__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSED__({}) : compose
// const enhancer = composeEnhancer(applyMiddleware(thunk))

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // applyMiddleware(thunk, enhancer),
    )
export default store