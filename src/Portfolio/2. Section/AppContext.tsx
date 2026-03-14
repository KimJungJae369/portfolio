import { createContext, useContext, useState, useCallback } from "react";
import type {ReactNode} from 'react'

interface Transaction{
    id: number;
    type : 'income' | 'expense';
    amount : number;
    description ? : string;
    date?: string;
    desc?: string;
    category?: string;
    memo?: string;
    [key: string]: any;
}

interface AppState{
    transactions : Transaction[];
}

interface AppContextType{
    state : AppState;
    setState : React.Dispatch<React.SetStateAction<AppState>>;
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    deleteTransaction: (id: number) => void;
    updateTransaction: (id: number, updates: Partial<Transaction>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({children} : {children : ReactNode}){
    const [state, setState] = useState<AppState>({
        transactions : []
    });

    const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
        setState(prev => ({
            ...prev,
            transactions: [{ ...transaction, id: Date.now() } as Transaction, ...prev.transactions]
        }));
    }, []);

    const deleteTransaction = useCallback((id: number) => {
        setState(prev => ({
            ...prev,
            transactions: prev.transactions.filter(t => t.id !== id)
        }));
    }, []);

    const updateTransaction = useCallback((id: number, updates: Partial<Transaction>) => {
        setState(prev => ({
            ...prev,
            transactions: prev.transactions.map(t =>
                t.id === id ? { ...t, ...updates } : t
            )
        }));
    }, []);

    return(
        <AppContext.Provider value={{state, setState, addTransaction, deleteTransaction, updateTransaction}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    const context = useContext(AppContext);
    if(!context){
        throw new Error(`useAppContext must be used within an AppProvider`);
    }
    return context;
}