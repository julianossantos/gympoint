import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Search, LeftHeader } from './styles';

export default function Students() {
  const [stud, setStud] = useState([]);
  const name = '%%';

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', {
        params: { name },
      });

      /* if (!response) {
        return <span>Não há alunos cadastrados</span>;
      } */

      setStud(response.data);
    }
    loadStudents();
  }, [setStud]);

  async function handleAdd() {
    history.push('/addStudent');
  }

  return (
    <Container>
      <header>
        <strong>Gerenciamento de Alunos</strong>
        <LeftHeader>
          <button type="button" onClick={handleAdd}>
            <MdAdd /> Cadastrar
          </button>
          <Input name="nameSearch" placeholder="Buscar Aluno" />
        </LeftHeader>
      </header>
      <table>
        <thead>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Idade</th>
          <th />
          <th />
        </thead>
        <tbody>
          {stud.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>
                <Link to="/" attribute="update">
                  Editar
                </Link>
              </td>
              <td>
                <Link to="/" attribute="delete">
                  Deletar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
