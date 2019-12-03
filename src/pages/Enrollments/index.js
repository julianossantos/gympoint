/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import {
  MdAdd,
  MdCheckCircle,
  MdEdit,
  MdDelete,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { signOut } from '~/store/module/auth/actions';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Cover, Title, Content, Pagination } from '~/styles/default';
import { Active } from '~/pages/Students/styles';

export default function Enrollments() {
  const dispatch = useDispatch();
  const [enrollment, setEnroll] = useState([]);
  const [page, setPage] = useState(1);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(true);

  async function loadEnrollments() {
    try {
      const response = await api.get('enrollments');

      const data = response.data.map(enrollments => ({
        ...enrollments,
        start_date: format(
          parseISO(enrollments.start_date),
          "dd 'de' MMMM' de 'yyyy",
          { locale: pt }
        ),
        end_date: format(
          parseISO(enrollments.end_date),
          "dd 'de' MMMM' de 'yyyy",
          { locale: pt }
        ),
      }));

      if (response.length >= 2) {
        setNextDisable(false);
      }
      setEnroll(data);
    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error);
      }
    }
  }

  useEffect(() => {
    loadEnrollments();
  }, [page]); // eslint-disable-line

  async function handleDelete(id) {
    try {
      await api.delete(`enrollments/${id}`);
      toast.success('successfully deleted');
      history('/enrollments');
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  // Modal to delete
  function modalDelete(id, name) {
    confirmAlert({
      title: 'Exclusão de Matrícula',
      message: `Deseja realmente excluir a matrícula do aluno ${name}?`,
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
    if (enrollment.length === 10) {
      setPage(page + 1);
      setPrevDisable(false);
    }
  }

  return (
    <Container>
      <Cover>
        <Title>
          <h1>Gerenciamento de Matrículas</h1>
          <Link to="/addEnrollment" className="add">
            <MdAdd /> CADASTRAR
          </Link>
        </Title>
        <Content>
          <table>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th>PLANO</th>
                <th>INÍCIO</th>
                <th>TÉRMINO</th>
                <th>ATIVA</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {enrollment.map(s => (
                <tr key={s.id}>
                  <td>{s.student.name}</td>
                  <td>{s.plan.title}</td>
                  <td>{s.start_date}</td>
                  <td>{s.end_date}</td>
                  <td>
                    <Active active={s.active}>
                      <MdCheckCircle size={20} />
                    </Active>
                  </td>
                  <td>
                    <Link
                      to={`/updateEnrollment/${s.id}`}
                      attribute="update"
                      alt="Editar"
                      className="edit"
                    >
                      <MdEdit alt="Editar" />
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => modalDelete(s.id, s.name)}
                    >
                      <MdDelete alt="Deletar" />
                    </button>
                  </td>
                  <td />
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
