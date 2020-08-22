import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';

import { Container, Content, Background, AnimationContainer } from './styles';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();
  // gets the page URL information
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        // reset errors
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Password required'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Passwords do not match',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        // token fetched from the URL
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error('');
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        // check if it is a validation error (wrong format)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        // in case of wrong information, display a toast message
        addToast({
          title: 'Password reset error',
          type: 'error',
          description:
            'An error occurred during password reset. Please try again.',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Password reset</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="New password"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirm new password"
            />

            <Button type="submit">Reset password</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetPassword;
