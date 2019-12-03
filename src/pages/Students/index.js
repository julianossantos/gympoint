/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdSearch,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { signOut } from '~/store/module/auth/actions';
import api from '~/services/api';
import { Container, Cover, Title, Content, Pagination } from '~/styles/default';

import { Search } from './styles';

export default function Student() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadStudents() {
    try {
      const response = await api.get('students', {
        params: { name, page, perPage: 10 },
      });
      setStudents(response.data);
      if (page === 1) {
        setPrevDisable(true);
      }
      if (response.data.length < 10) {
        setNextDisable(true);
      }
    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error);
      }
    }
  }

  useEffect(() => {
    loadStudents();
  }, [page]); // eslint-disable-line

  function handleSearch({ nameSearch }) {
    setName(nameSearch);
    loadStudents();
  }

  async function handleDelete(id) {
    try {
      await api.delete(`students/${id}`);
      toast.success('successfully deleted');
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

  function handlePevPage() {
    if (page > 1) {
      setPage(page - 1);
      setNextDisable(false);
    }
  }

  function handleNextPage() {
    if (students.length === 10) {
      setPage(page + 1);
      setPrevDisable(false);
    }
  }

  return (
    <Container>
      <Cover>
        <Title>
          <h1>Gerenciando alunos</h1>
          <Search>
            <Link className="add" to="/registerStudent">
              <MdAdd size={20} color="#FFF" /> <span> CADASTRAR</span>
            </Link>
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
                    <Link
                      to={`/studentManagement/${student.name}`}
                      className="edit"
                    >
                      <MdEdit /> Editar
                    </Link>
                    <button
                      type="submit"
                      className="delete"
                      onClick={() => modalDelete(student.id, student.name)}
                    >
                      <MdDelete />
                      Apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
        <Pagination>
          <button
            type="button"
            className={prevDisable ? 'pageDisable' : ''}
            onClick={() => handlePevPage()}
          >
            <MdKeyboardArrowLeft
              size={30}
              color={prevDisable ? '#BBB' : '#EE4D64'}
            />
          </button>
          <button
            type="button"
            className={nextDisable ? 'pageDisable' : ''}
            onClick={() => handleNextPage()}
          >
            <MdKeyboardArrowRight
              size={30}
              color={nextDisable ? '#BBB' : '#EE4D64'}
            />
          </button>
        </Pagination>
      </Cover>
    </Container>
  );
}
