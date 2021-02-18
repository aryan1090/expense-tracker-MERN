import React,{createContext,useReducer} from 'react';
import {AppReducer} from './AppReducer';
import axios from 'axios'
const initialState = {
    transactions: [],
    error:null,
    isLoading:true
}

//Create Context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({children}) => {
    const [state,dispatch] = useReducer(AppReducer,initialState);

    //Actions

    async function getTransactions(){
        try {
            const res = await axios.get('https://expense-tracker-101.herokuapp.com/api/v1/transactions');
            console.log(res.data.data);
            dispatch({
                type:'GET_TRANSACTIONS',
                payload:res.data.data
            });
        } catch (error) {
            dispatch({
                type:'TRANSACTION_ERROR',
                payload:error.response
            });
        }
    }
    async function deleteTransaction(id){
        const res = await axios.delete(`https://expense-tracker-101.herokuapp.com/api/v1/transactions/${id}`);
        console.log(res);
        dispatch({
            type:'DELETE_TRANSACTION',
            payload:id
        })
    }


    async function addTransaction(transaction){
        const res = await axios.post(`https://expense-tracker-101.herokuapp.com/api/v1/transactions`,transaction);
        dispatch({
            type:'ADD_TRANSACTION',
            payload:res.data.data
        })
    }

    return(<GlobalContext.Provider 
        value={{transactions:state.transactions,
        error:state.error,
        isLoading:state.isLoading,
        getTransactions,
        deleteTransaction,
        addTransaction}}>
            {children}
        </GlobalContext.Provider>)
}