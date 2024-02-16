import React, { createContext } from 'react';
import { useReducer } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import './App.css';



//initial state
const initialState = {
  transactions: [
    // {id:1, text: 'flower', amount: -20},
    // {id:2, text: 'salary', amount: 5000}
  ]
}

//creating context
const Globalcontext = createContext();

//reducer
const reducer = (state, action)=>{
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return{
        ...state,
        transactions: action.payload
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload] //adding newtransaction(payload) to existing transactions(...state)
      }
    case 'Transaction_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}


function App() {
  //usereducer hook
  const [state, dispatch] = useReducer(reducer,initialState)

  //Actions
  //getting data from mongodb
  async function getTransactions(){
    try{
      //npm package (axios) used to bring the data from server to client
      const res = await axios.get('/api/v1/transactions');
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data //thats the data from mongodb
      })
    }catch (err){
      dispatch({
        type: 'Transaction_ERROR',
        payload: err.response.data.error
      })

    }
  }

  async function deleteTransaction(id) {
    try{
      await axios.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    }catch (err){
      dispatch({
        type: 'Transaction_ERROR',
        payload: err.response.data.error
      })

    }
    
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try{
      const res = await axios.post('/api/v1/transactions', transaction, config)

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });

    }catch (err){
      dispatch({
        type: 'Transaction_ERROR',
        payload: err.response.data.error
      })

    }
    
  }

  return (
    <div>
      <Globalcontext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction,
            getTransactions
          }}>
          <Header />
            <div className="container">
              <Balance />
              <IncomeExpense />
              <TransactionList />
              <AddTransaction />
            </div>
      </Globalcontext.Provider> 
      
    </div>
      
  );
}

export default App;
export { Globalcontext };
