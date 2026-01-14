import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const initialState = {
  transactions: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload)
      };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t => 
          t.id === action.payload.id ? { ...t, ...action.payload.updates } : t
        )
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: { ...transaction, id: Date.now() } });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const updateTransaction = (id, updates) => {
    dispatch({ type: 'UPDATE_TRANSACTION', payload: { id, updates } });
  };

  return (
    <AppContext.Provider value={{ state, addTransaction, deleteTransaction, updateTransaction }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
