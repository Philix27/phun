import React, { ChangeEvent, useState } from "react";
import styles from "./text-input.module.scss";
import { BiSearch } from "react-icons/bi";
import styled from "styled-components";

interface Props {
  value: number | string;
  placeholder: string;
  error?: string;
  widthByPercent: string;
  icon?: JSX.Element;

  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function WorkflowTextInput(props: Props) {
  const { value, handleChange, icon, placeholder, error, widthByPercent } =
    props;

  return (
    <Container width={widthByPercent}>
      {icon && icon}
      <input value={value} onChange={handleChange} placeholder={placeholder} />
    </Container>
  );
}

const Container = styled.div<{ width: string }>`
  display: flex;
  align-items: center;
  width: ${(props) => props.width};
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  /* line-height: 28px; */
  letter-spacing: 0.005em;
  color: #1a1a1a;
  background: #fff;
  // flex: none;
  // order: 1;
  // flex-grow: 0;
  border: solid 1px $greyColor;
  & > input {
    width: 100%;
    background: transparent;
    color: #1a1a1a;
    border: none;
    outline: none;
    font-size: 14px;
  }
`;
