import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdChevronLeft, MdCheck } from 'react-icons/md';

import history from '~/services/history';

import { Container, LeftHeader, ContentForm, FormTable } from './styles';

export default function teste() {
  async function handleStudents() {
    history.push('/students');
  }

  return (
    <Container>
      <header>
        <strong>Cadastro de Alunos</strong>
        <LeftHeader>
          <button type="button" className="back" onClick={handleStudents}>
            <MdChevronLeft /> Voltar
          </button>
          <button type="button">
            <MdCheck /> Salvar
          </button>
        </LeftHeader>
      </header>
      <ContentForm>
        <Form>
          <label htmlFor="name">NOME COMPLETO</label>
          <Input name="name" type="text" placeholder="Nome Completo" />
          <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
          <Input name="email" type="text" placeholder="E-mail" />
          <FormTable>
            <table>
              <thead>
                <th>IDADE</th>
                <th>PESO (Kg)</th>
                <th>ALTURA</th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Input name="age" type="text" />
                  </td>
                  <td>
                    <Input name="age" type="text" />
                  </td>
                  <td>
                    <Input name="age" type="text" />
                  </td>
                </tr>
              </tbody>
            </table>
          </FormTable>
        </Form>
      </ContentForm>
    </Container>
  );
}
