import React, { useContext } from 'react'
import { Globalcontext } from '../App';

const Transaction = (props) => {
  const { deleteTransaction } = useContext(Globalcontext)

  const sign = props.transaction.amount < 0 ? '-' : '+';
  return (
    <div>
      <li className={props.transaction.amount < 0 ? 'minus' : 'plus'}>{props.transaction.text}
          <span>{sign}${Math.abs(props.transaction.amount)}</span><button onClick={()=>deleteTransaction(props.transaction._id)} className="delete-btn">x</button>
        </li>
    </div>
  )
}

export default Transaction
