import styled from "styled-components";

export const TopLabel = styled.label`
  font-size: 16px;
  font-weight: Regular;
  color: ${(props)=>props.color};
  margin-bottom: 4px;
  align-self: flex-start;
  padding-left: 8px;
  `;

export const Input = styled.input`
  border: 2px solid ${(props)=>props.color};
  border-radius: 5px;
  width: 200px;
  margin-bottom: 6px;
`;

export const Caption = styled.label`
  font-size: 14px;
  font-weigth: Regular;
  color: #c11a26;
  margin-top: 8px;
  padding-left: 8px; 
  align-self: flex-start;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
`;
