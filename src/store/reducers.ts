const constants = { SET_STATE: 'SET_STATE' } as const;

export type IReducers<N extends keyof GlobalState> = {
  namespace: N;
  state: Partial<GlobalState[N]>;
  type: ValueOf<typeof constants>
};
const reducers = <N extends keyof GlobalState>(state = {} as GlobalState, action: IReducers<N>) => {
  if (action.namespace) {
    return Object.assign({}, state, {
      [action.namespace]: {
        ...state[action.namespace],
        ...action.state,
      },
    });
  }
  return Object.assign({}, state);
};
export default reducers;
