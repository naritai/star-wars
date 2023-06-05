import { ReactNode } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateSchema } from "../config/stateSchema";

interface StoreProviderProps { 
  children?: ReactNode;
  initialState?: StateSchema;
}

export function StoreProvider(props: StoreProviderProps): JSX.Element {
  const { children, initialState } = props;
  const store = createReduxStore(initialState);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}