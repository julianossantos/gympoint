import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  max-width: 80%;
  margin: 10px auto;

  header {
    display: flex;
    align-self: center;
    align-items: center;
    padding-top: 20px;
    justify-content: space-between;
    align-content: center;

    strong {
      font-size: 24px;
      margin: 0 15px;
    }
  }

  table {
    height: auto;
    width: 100%;
    background: #fff;
    border-radius: 1px solid #eee;

    thead {
      padding: auto;

      th {
        font-size: 18px;
        font: 'Roboto', Arial, Helvetica, sans-serif;
        text-align: left;
        color: #111;
        padding: 10px;
        font-weight: bold;
        border: 0;
      }
    }

    tbody {
      text-align: left;

      td {
        font: 'Roboto', Arial, Helvetica, sans-serif;
        font-size: 16px;
        border-bottom: 1px solid #ccc;
        color: #444;
        padding-bottom: 20px;
      }
    }
  }

  th,
  td {
    font-weight: unset;
    padding: 10px;
  }
`;

export const Search = styled.div`
  form {
    margin-left: 15px;
    border: 1px solid #aaa;
    border-radius: 4px;
    height: 36px;
    width: 237px;
    background: rgba(255, 255, 255, 0.7);
    display: flex;

    input {
      flex: 1;
      background: none;
      border: 0;
      height: 36px;
      color: #444;

      &::placeholder {
        color: #999;
      }
    }

    > button {
      height: 36px;
      background: none;
      border: 0;
      padding: 8px;
    }
  }
`;

export const AddButton = styled.button`
  height: 36px;
  width: 130px;
  padding: 5px;
  background: #ee4d64;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  transition: backgound 0.2s;

  &:hover {
    background: ${darken(0.03, '#ee4d64')};
  }
`;

export const LeftHeader = styled.div`
  button {
    margin: 5px;
    height: 34px;
    width: 130px;
    padding: 5px;
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

  button.back {
    background: #aaa;
    border-radius: 4px;

    &:hover {
      background: ${darken(0.03, '#999')};
    }
  }

  input {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    height: 44px;
    padding: 15px;
    color: #fff;
    margin: 10px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    &::disabled {
      background: #666;
      color: #eee;
    }
  }
`;

export const ContentForm = styled.div`
  max-width: 100%;
  margin: 10px auto;
  background: #fff;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      font: 'Roboto', Arial, helvetica, sans-serif;
      size: 14px;
      font-weight: bold;
      margin: 20px 10px 0 20px;
    }

    input {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 44px;
      max-width: 80%;
      padding: 0 15px;
      color: #666;
      margin: 20px;

      &::placeholder {
        color: #aaa;
      }

      &::disabled {
        background: #666;
        color: #eee;
      }
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
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
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: backgound 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }
  }

  > button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: backgound 0.2s;

    &:hover {
      background: ${darken(0.08, '#f64c75')};
    }
  }
`;

export const FormTable = styled.div`
  table {
    height: auto;
    width: 80%;
    margin-left: 0px;
    background: #fff;
    border: 0;

    thead {
      padding: auto;
    }

    th {
      font: 'Roboto', Arial, helvetica, sans-serif;
      font-size: 14px;
      font-weight: bold;
      color: #111;
      border: 0;
      padding-left: 20px;
      margin-bottom: 0px;
    }

    tbody {
      input {
        margin: 5px;

        &::disabled {
          background: #666;
          color: #eee;
        }
      }
    }
  }
`;

export const Active = styled.image`
  width: 100px;
  color: ${props => (props.active ? '#76CF21' : '#999')};
`;
