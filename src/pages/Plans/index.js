/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft
} from 'react-icons/md';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { formatPrice } from '~/util/format';
import api from '~/services/api';
import { Container, Cover, Title, Content, Pagination } from '~/styles/default';

export default function Plan() {
  const [plans, setPlans] = useState([]);

  const [page, setPage] = useState(1);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);

  async function loadPlans() {
    const response = await api.get('plans', {
      params: { page, per_page: 10 },
    });
    if (page === 1) {
      setPrevDisable(true);
    }
    if (response.data.length < 10) {
      setNextDisable(true);
    }
    const data = response.data.map(plan => ({
      ...plan,
      durationFormatted:
        plan.duration === 1 ? `${plan.duration} mês` : `${plan.duration} meses`,
      priceFormatted: formatPrice(plan.price)
    }));
    setPlans(data);
  }

  useEffect(() => {
    loadPlans();
  }, [ page]); // eslint-disable-line

  async function handleDelete(id) {
    try {
      await api.delete(`plans/${id}`);
      toast.success('successfully deleted');
      loadPlans();
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  // Modal to delete
  function modalDelete(id, title) {
    confirmAlert({
      title: 'Exclusão de Plano',
      message: `Deseja realmente excluir o plano ${title}?`,
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
    if (plans.length === 10) {
      setPage(page + 1);
      setPrevDisable(false);
    }
  }

  return (
    <Container>
      <Cover>
        <Title>
          <h1>Gerenciando Planos</h1>
          <Link className="add" to="/addPlan">
            <MdAdd size={20} color="#FFF" /> <span> CADASTRAR</span>
          </Link>
        </Title>
        <Content>
          <table>
            <thead>
              <tr>
                <td>TÍTULO</td>
                <td>DURAÇÃO</td>
                <td>VALOR p/ MÊS</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{plan.durationFormatted}</td>
                  <td>{plan.priceFormatted}</td>
                  <td>
                    <Link to={`/updatePlan/${plan.id}`} className="edit">
                      <MdEdit /> Editar
                    </Link>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => modalDelete(plan.id, plan.title)}
                    >
                      <MdDelete /> Apagar
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
