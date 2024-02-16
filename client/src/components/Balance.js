import React, { useContext } from 'react'
import { Globalcontext } from '../App'

const Balance = () => {
  const {transactions} = useContext(Globalcontext);
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <>
      <h4>your balance</h4>
      <h1>${total}</h1>
    </>
  )
}

export default Balance
