import styled from "styled-components";

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e6e8e9;
  background-color: rgba(255, 255, 255,0.3);
  border-radius: 5px;
  padding: 10px 20px;
  border-right: 5px solid ${(props) => (props.isExpense ? "red" : "green")};
  margin-bottom: 10px;
  cursor: pointer;
`;

const TransactionItem = ({ transaction }) => {
  return (
    <Item isExpense={transaction?.transType === "expense"}>
      <span>{transaction.name}</span>
      <span>${transaction.amount}</span>
    </Item>
  );
};

export default TransactionItem;
