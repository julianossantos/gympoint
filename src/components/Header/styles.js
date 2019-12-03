import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: auto;
  margin: 0 auto;
  display: flex;
  /** Faz com que a logo fique todo para a esquerda e o avatar todo para a direita*/
  justify-content: space-between;
  align-content: center;
  border: 1px solid #eee;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: ${props => (props.current ? '#ee4d64' : '#999')};
      padding: 10px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: center;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #ee4d64;
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
