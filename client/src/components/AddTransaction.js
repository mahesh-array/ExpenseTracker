import React, { useContext } from 'react'
import {useState} from 'react';
import { Globalcontext } from '../App';

const AddTransaction = () => {
    const [text,setText] = useState('');
    const [amount,setAmount] = useState(0);
    const { addTransaction } = useContext(Globalcontext)
    const submitHandler =(e)=>{
        e.preventDefault()

        const newTransaction = {
          id: Math.floor(Math.random() * 100000000),
          text,
          amount: +amount
        }

        addTransaction(newTransaction);

        setText("");
        setAmount(0);

    }
  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={submitHandler}>
        <div className="form-control">
            <label>Text</label>
            <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}/>
        </div>
        <div className="form-control">
            <label for="amount">amount</label>
            <input type="number" placeholder="Enter amount..." value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
        </div>
        <button type="submit" className="btn">Add Tranaction </button>
      </form>
    </>
  )
}

export default AddTransaction
