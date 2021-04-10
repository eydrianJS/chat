import { RequestStatus } from '../shared/RequestStatus';
import React, { useReducer, createContext } from 'react';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

type Types =
  | typeof AUTH_REQUEST
  | typeof AUTH_FAILURE
  | typeof AUTH_SUCCESS
  | typeof REGISTER_REQUEST
  | typeof REGISTER_SUCCESS
  | typeof REGISTER_FAILURE;

type Action = {
  type: Types;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type State = {
  status: RequestStatus;
  user: { token: string };
  error: string;
};

const initialState = {
  status: RequestStatus.pending,
  user: { token: '' },
  error: '',
};

const AuthStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const authReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, status: RequestStatus.ongoing };
    case AUTH_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        status: RequestStatus.success,
        user: action.payload.token,
      };
    case AUTH_FAILURE:
      return { ...state, status: RequestStatus.failed, error: action.payload };
    default:
      return state;
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthStateContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error('useAuth must me used within AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
