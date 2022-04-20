import styled from "styled-components";

export const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.bg};
  transition: 0.3s;
  &:disabled {
    background-color: #c7c7c7;
  }
`;

export const SubmitButtonText = styled.span`
  color: ${(props) => props.theme.color};
`;

export const AuthTitle = styled.h1`
  font-weight: 700;
  line-height: 70px;
  color: #000;
`;
