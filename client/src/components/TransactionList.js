import React, { useContext, useEffect } from 'react'
import { Globalcontext } from '../App'
import Transaction from './Transaction';

const TransactionList = () => {
  const {transactions, getTransactions} = useContext(Globalcontext);

  useEffect(()=>{
    getTransactions();
  },[])

  return (
    <>
      <h3>History</h3>
      <ul className="list">
      {transactions.map( transaction =>(
        <Transaction key={transaction.id} transaction={transaction}/>
      ))}
        
      </ul>
    </>
  )
}

export default TransactionList
