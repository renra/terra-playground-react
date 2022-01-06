import React, { Dispatch, useReducer, createContext } from 'react';
import { useSafeContext } from '../utils/SafeContext';

type State = {
};

const defaultState: State = {
};

type Action =
  | {
      type: 'NOOP'
    }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'NOOP': {
      return {
        ...state,
      };
    }
  }
}

type ContextValue = [State, Dispatch<Action>];
export const TerraPlaygroundContext = createContext<ContextValue | undefined>(undefined);
export const useTerraPlaygroundContext = useSafeContext<ContextValue>(TerraPlaygroundContext);

type ProviderProps = { children: React.ReactNode };
export const TerraPlaygroundProvider = (props: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <TerraPlaygroundContext.Provider value={[state, dispatch]}>
      {props.children}
    </TerraPlaygroundContext.Provider>
  );
};
