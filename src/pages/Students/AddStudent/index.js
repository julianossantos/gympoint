import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Title, Content, Formcontent } from '~/styles/default';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .integer('somente numeros inteiros')
    .typeError('Valor inválido')
    .required(),
  weight: Yup.string().typeError('Valor inválido'),
  height: Yup.string().typeError('Valor inválido'),
});

export default function AddStudent() {
  async function handleSubmit(data) {
    try {
      await api.post('students', {
        ...data,
      });
      toast.success('successfully registered');
      history.push('/student');
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  return (
    <Container>
      <Formcontent schema={schema} onSubmit={handleSubmit}>
        <Title>
          <h1>Cadastro de aluno</h1>
          <div>
            <Link className="back" to="/student">
              <MdKeyboardArrowLeft size={20} color="#FFF" />
              <span> VOLTAR</span>
            </Link>
            <button className="save" type="submit">
              <MdCheck size={20} color="#FFF" /> <span> SALVAR</span>
            </button>
          </div>
        </Title>
        <Content>
          <label>
            NOME COMPLETO
            <Input type="text" name="name" placeholder="Nome" />
          </label>
          <label>
            ENDEREÇO DE E-MAIL
            <Input type="text" name="email" placeholder="exemplo@email.com" />
          </label>
          <div className="formline">
            <label>
              <strong>IDADE </strong>
              <Input type="number" name="age" />
            </label>
            <label>
              <strong> PESO (em kg) </strong>
              <Input type="number" step="0.01" name="weight" />
            </label>
            <label>
              <strong>ALTURA </strong>
              <Input type="number" step="0.01" name="height" />
            </label>
          </div>
        </Content>
      </Formcontent>
    </Container>
  );
}
