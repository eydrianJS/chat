import { RequestStatus } from '../shared/RequestStatus';
import React, { useReducer, createContext } from 'react';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

type Types =
  | typeof LOGIN_REQUEST
  | typeof LOGIN_FAILURE
  | typeof LOGIN_SUCCESS
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
  error: string;
};

const initialState = {
  status: RequestStatus.pending,
  error: '',
};

const AuthStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const authReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, status: RequestStatus.ongoing };
    case LOGIN_SUCCESS:
      console.log(action.payload);
      return { ...state, status: RequestStatus.success };
    case LOGIN_FAILURE:
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
