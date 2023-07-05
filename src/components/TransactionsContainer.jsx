import { useEffect, useState } from "react";
import styled from "styled-components";
import TransactionItem from "./TransactionItem";
import axios from 'axios';

const Container = styled.div``;

const Heading = styled.h2`
  font-size: 25px;
  font-weight: 600;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  outline: none;
  border-radius: 5px;
  margin: 5px 0;
  // border: 1px solid #e6e8e9;
  background-color: rgba(255, 255, 255,0.3);
  margin-bottom: 25px;
`;

const TransactionItems = styled.div``;

const TransactionsContainer = ({ transactions }) => {
  const [searchInput, setSearchInput] = useState("");
  const [allIncomeTransactions, setAllIncomeTransactions] = useState([]);
  const [allExpenseTransactions, setAllExpenseTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  const GetAllTransactions = () => {
    let allTransactionFromDB = [];
    let userId = Number(localStorage.userId)
    axios.get(`http://localhost:8000/api/income/${userId}`)
      .then(function (response) {
        setAllIncomeTransactions(response.data.data); 
        
      })
      .catch(function (error) {
        console.log(error);
      });
      axios.get(`http://localhost:8000/api/expense/${userId}`)
          .then(function (response) {
            setAllExpenseTransactions(response.data.data); 
          })
          .catch(function (error) {
            console.log(error);
          });
  };

  const filteredData = (searchInput) => {
    if (!searchInput || !searchInput.trim().length) {
      setFilteredTransactions(transactions);
      return;
    }

    let filtered = [...filteredTransactions];
    filtered = filtered.filter((item) => item.details.toLowerCase().includes(searchInput.toLowerCase().trim()));
    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    filteredData(searchInput);
    GetAllTransactions();
  }, [transactions, searchInput]);

  return (
    <Container>
      <Heading>Transactions</Heading>

      <SearchInput
        type={"text"}
        placeholder="Search here"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <TransactionItems>
        {allExpenseTransactions?.length ? (
          allExpenseTransactions.map((transaction) => (
            <TransactionItem transaction={transaction} key={transaction.id} />
          ))
        ) : (
          <p>No Expense Transactions</p>
        )}
      </TransactionItems>

      <TransactionItems>
        {filteredTransactions?.length ? (
          filteredTransactions.map((transaction) => (
            <TransactionItem transaction={transaction} key={transaction.id} />
          ))
        ) : (
          <p>No Income Transactions</p>
        )}
      </TransactionItems>
    </Container>
  );
};

export default TransactionsContainer;
