import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';

import { sigInRequest } from '~/store/module/auth/actions';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(sigInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Gympoint" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">SEU E-MAIL</label>
        <Input name="email" type="email" placeholder="exemplo@email.com" />

        <label htmlFor="password">SUA SENHA</label>
        <Input name="password" type="password" placeholder="*******" />

        <button type="submit">{loading ? 'Carregando ...' : 'Acessar'}</button>
      </Form>
    </>
  );
}
