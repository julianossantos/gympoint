import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import api from '~/services/api';
import { Container, Cover, Title, Content } from '~/styles/default';

import { Search, AddButton } from './styles';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadStudents() {
    const response = await api.get('students', {
      params: { name },
    });
    setStudents(response.data);
  }

  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch({ nameSearch }) {
    setName(nameSearch);
    loadStudents();
  }

  async function handleDelete(id) {
    try {
      await api.delete(`students/${id}`);
      toast.success('Exclusão finalizada');
      loadStudents();
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  // Modal to delete
  function modalDelete(id, name) {
    confirmAlert({
      title: 'Exclusão do aluno',
      message: `Deseja realmente excluir o aluno ${name}?`,
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleDelete(id),
        },
        {
          label: 'Cancelar',
        },
      ],
    });
  }

  return (
    <Container>
      <Cover>
        <Title>
          <h1>Gerenciando alunos</h1>
          <Search>
            <AddButton>
              <Link to="/registerStudent">
                <MdAdd size={20} color="#FFF" /> CADASTRAR
              </Link>
            </AddButton>
            <Form onSubmit={handleSearch}>
              <button type="submit">
                <MdSearch size={16} color="#999" />
              </button>
              <Input name="nameSearch" placeholder="Buscar Aluno" />
            </Form>
          </Search>
        </Title>
        <Content>
          <table>
            <thead>
              <tr>
                <td>NOME</td>
                <td>E-Mail</td>
                <td>IDADE</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <Link to={`/studentManagement/${student.name}`}>
                      editar
                    </Link>
                    <button
                      type="submit"
                      onClick={() => modalDelete(student.id, student.name)}
                    >
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
      </Cover>
    </Container>
  );
}
