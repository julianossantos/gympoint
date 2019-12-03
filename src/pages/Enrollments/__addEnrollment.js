import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
import * as Yup from 'yup';

// import AsyncSelect from 'react-select/async';

import { Form, Input, Select, useField } from '@rocketseat/unform';
import { MdChevronLeft, MdCheck } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import 'react-datepicker/dist/react-datepicker.css';

import {
  Container,
  LeftHeader,
  ContentForm,
  FormTable,
} from '~/pages/Students/styles';

registerLocale('pt', pt);

export default function AddEnrollments({ name }) {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Custom invalid email message')
      .required('Custom required message'),
    password: Yup.string()
      .min(4)
      .required(),
  });

  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);
  const [student, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [price, setPrice] = useState([]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  /* useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      const data = response.data.map(s => [
        {
          value: s.id,
          label: s.name,
        },
      ]);

      setStudents(data);
    }
    loadStudents();
  }, [student]); */

  async function handleCalculate() {
    const responsePlan = await api.get('plans');

    const newSelectPlan = responsePlan.data.map(element => ({
      id: element.id,
      title: element.title,
      price: element.price,
      /*value: element.id,
      label: element.title,
      duration: element.duration, */
    }));

    setPlans(newSelectPlan);
  }

  function filterPlans(inputValue) {
    if (inputValue) {
      return plans.filter(plan =>
        String(plan.label)
          .toLowerCase()
          .includes(String(inputValue).toLowerCase())
      );
    }
    return plans;
  }

  const loadOptionsPlans = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterPlans(inputValue));
    }, 10);
  };

  function handleSubmit(data) {
    console.log(data);
  }

  async function handlePlans() {
    history.push('/enrollments');
  }

  return (
    <Container>
      <header>
        <strong>Cadastro de Matrícula</strong>
        <LeftHeader>
          <button type="button" className="back" onClick={handlePlans}>
            <MdChevronLeft /> Voltar
          </button>
          <button type="submit" form="addEnrollment">
            <MdCheck /> Salvar
          </button>
        </LeftHeader>
      </header>
      <ContentForm>
        <Form onSubmit={handleSubmit} id="addEnrollment">
          <label htmlFor="name">ALUNO</label>
          <select name="student" key="selectStudent">
            <option value="1">Juliano</option>
          </select>
          <FormTable>
            <table>
              <thead>
                <tr>
                  <th>PLANO </th>
                  <th>DATA DE INÍCIO</th>
                  <th>DATA DE TÉRMINO</th>
                  <th>VALOR FINAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Select
                      name="plans"
                      options={plans}
                      onClick={handleCalculate}
                    />
                  </td>
                  <td>
                    <ReactDatePicker
                      name={fieldName}
                      selected={selected}
                      onChange={date => setSelected(date)}
                      ref={ref}
                      dateFormat="d/MM/yyyy"
                    />
                  </td>
                  <td>
                    <Input name="endDate" type="date" disabled />
                  </td>
                  <td>
                    <Input name="price" type="text" disabled value={price} />
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
