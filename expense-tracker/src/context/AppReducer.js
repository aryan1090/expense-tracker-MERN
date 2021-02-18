export const  AppReducer = (state, action) =>{
    switch (action.type) {
        case 'GET_TRANSACTIONS':
            let new_state = {...state,transactions:action.payload,isLoading:false};
            console.log(new_state);
            return new_state;
        case 'DELETE_TRANSACTION':
            return { ...state, transactions: state.transactions.filter(transaction => transaction._id !== action.payload) };
        case 'ADD_TRANSACTION':
            console.log(action.payload);
            return {
                ...state,
                transactions: [...state.transactions,action.payload]
            };
        case 'TRANSACTION_ERROR':
            return {...state,error:action.payload}
        default:
            return state;
    }
}