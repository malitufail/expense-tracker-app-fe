import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';

const Container = styled.div`
  text-align: center;
  border: 1px solid #000;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 25px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  outline: none;
  border-radius: 5px;
  margin: 5px 0;
  border: 1px solid #000;
`;

const Select = styled.select`
  width: 100%;
  padding: 15px 20px;
  outline: none;
  border-radius: 5px;
  margin: 5px 0;
  border: 1px solid #000;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  margin-left: 10px;
  cursor: pointer;
`;

const RadioBtn = styled(RadioContainer)`
  margin: 10px 20px 10px 0;
`;

const SubmitBtn = styled.button`
cursor: pointer;
background-color: rgba(255, 255, 255, 0.3);
color: rgb(255, 255, 255);
padding: 7px 20px;
font-size: 16px;
border: none;
text-transform: uppercase;
border-radius: 5px;
  &:hover {
    background-color: #000;
  }
`;

const AddTransaction = ({ setToggle, AddTransactions }) => {
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [title, setTitle] = useState("");
  const [transType, setTransType] = useState("expense");
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);

  const GetAllCategories = () => {
    axios.get('http://localhost:8000/api/category')
      .then(function (response) {
        console.log(response.data.data)
        setCategories(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const AddTransactionData = () => {
    let userId = Number(localStorage.userId)
    AddTransactions({
      amount: Number(amount),
      details,
      transType,
      id: Date.now(),
      name: title,
    });

    axios.post(transType == 'income' ? 'http://localhost:8000/api/income/add' : 'http://localhost:8000/api/expense/add', {
      name: title,
      amount: Number(amount),
      description: details,
      user_id: userId,//Number(localStorage.userId),
      category_id: Number(categoryId)
    })
      .then(function (response) {
        setToggle();
      })
      .catch(function (error) {
        alert(error);
      });


  };

  useEffect(() => {
    GetAllCategories();
  }, []);
  return (
    <Container>
      <Input
        type={"text"}
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        type={"number"}
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Input
        type={"text"}
        placeholder="Enter Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />

      <Select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Select a category</option>
        {categories.map((category, index) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
      <RadioContainer>
        <RadioBtn>
          <input
            type="radio"
            id="expense"
            name="type"
            value={"expense"}
            checked={transType === "expense"}
            onChange={(e) => setTransType(e.target.value)}
          />
          <Label htmlFor="expense">Expense</Label>
        </RadioBtn>

        <RadioBtn>
          <input
            type="radio"
            id="income"
            name="type"
            value={"income"}
            checked={transType === "income"}
            onChange={(e) => setTransType(e.target.value)}
          />
          <Label htmlFor="income">Income</Label>
        </RadioBtn>
      </RadioContainer>

      <SubmitBtn onClick={AddTransactionData}>Add Transaction</SubmitBtn>
    </Container>
  );
};

export default AddTransaction;
