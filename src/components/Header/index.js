import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { signOut } from '~/store/module/auth/actions';

import logo from '~/assets/logo-header.jpeg';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const page = useLocation().pathname;

  const profile = useSelector(state => state.user.profile);

  function handleSingOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <Link
            to="/students"
            style={{
              color: page.toLowerCase().includes('student')
                ? '#ee4d64'
                : '#999',
            }}
          >
            ALUNOS
          </Link>
          <Link
            to="/plans"
            style={{
              color: page.toLowerCase().includes('plan') ? '#ee4d64' : '#999',
            }}
          >
            PLANOS
          </Link>
          <Link
            to="/enrollments"
            style={{
              color: page.toLowerCase().includes('enrollment')
                ? '#ee4d64'
                : '#999',
            }}
          >
            MATRÍCULAS
          </Link>
          <Link
            to="/help-orders"
            style={{
              color: page.toLowerCase().includes('help-orders')
                ? '#ee4d64'
                : '#999',
            }}
          >
            PEDIDOS DE AUXÍLIO
          </Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/signUp" onClick={handleSingOut}>
                Sair do sistema
              </Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
