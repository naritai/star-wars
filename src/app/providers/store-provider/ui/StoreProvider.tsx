import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../config/store";
import { StateSchema } from "../config/stateSchema";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: StateSchema;
}

export function StoreProvider(props: StoreProviderProps): JSX.Element {
  const { children } = props;

  return <Provider store={store}>{children}</Provider>;
}
