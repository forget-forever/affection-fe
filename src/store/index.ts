import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk';
// import actions from './action';
import initState from './initState';
import reducers, { IReducers } from './reducers';


const middlewares = [ReduxThunk];

export const store = createStore<GlobalState, IReducers<keyof GlobalState>, {}, {}>(reducers, applyMiddleware<IReducers<keyof GlobalState>>(...middlewares))

const initialState = () => {
  Object.keys(initState).forEach((namespace) => {
    store.dispatch({ type: 'SET_STATE', namespace, state: initState[namespace] });
  });
};
initialState();

/**
 * 修改redux中的值
 * @param namespace 第一层的键名
 * @param state 键名对应的可选值
 */
export const setState = <K extends keyof GlobalState>(namespace: K, state: Partial<GlobalState[K]>) => {
  store.dispatch({ type: 'SET_STATE', namespace, state });
}

export * from './action'

// export const actionOption = <K extends keyof typeof actions>(option: K, params: OtherParameters<(typeof actions)[K]>[0]) => {
//   return actions[option](store, params)
// }