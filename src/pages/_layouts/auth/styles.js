import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #ee4d64, #ef4d64);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.image``;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
  text-align: center;
  background: #fff;
  border-radius: 4px;

  img {
    padding: 30px 15px 0 20px;
    width: 50%;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding: 30px;

    label {
      display: flex;
      padding: 5px;
      font: 14px 'Roboto', sans-serif;
      font-weight: bold;
      color: #666;
    }

    input {
      border: 1px solid #eee;
      border-radius: 4px;
      height: 44px;
      padding: 15px 15px;
      color: #000;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.3);
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: backgound 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      transition: background 0.2s;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
