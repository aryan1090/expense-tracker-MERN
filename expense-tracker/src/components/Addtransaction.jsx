import React,{useState,useContext} from 'react';
import {GlobalContext} from '../context/GlobalState'

export const Addtransaction = () => {
    const [text,setText] = useState('');
    const [amount,setAmount] = useState('');

    const {addTransaction} = useContext(GlobalContext);

    function onSubmit(e){
        e.preventDefault();
        const newTransaction = {
            text,
            amount: parseInt(amount) 
        }
        addTransaction(newTransaction);
        setAmount("");
        setText("");
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form id="form" onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" id="text" value={text} onChange={(e)=> setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount <br /></label>
                    <input type="number" id="amount" value={amount} onChange={(e)=> setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn" type="submit">Add transaction</button>
            </form>
        </>
    )
}
