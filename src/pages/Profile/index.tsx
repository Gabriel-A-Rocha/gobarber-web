import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input/index';
import Button from '../../components/Button/index';

import { Container, Content, AvatarInput } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        // reset errors
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name required'),
          email: Yup.string()
            .required('Email required')
            .email('Invalid email address'),
          password: Yup.string().required('Password required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Registration successful!',
          description: 'You can now access GoBarber!',
        });

        history.push('/');
      } catch (err) {
        // check if it's a format error
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          // in case of wrong information, display a toast message
          addToast({
            title: 'Registration error',
            type: 'error',
            description: 'Registration failed. Please try again.',
          });
        }
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />
              <button type="button">
                <FiCamera />
              </button>
            </AvatarInput>

            <h1>My profile</h1>

            <Input name="name" icon={FiUser} placeholder="Name" />
            <Input name="email" icon={FiMail} placeholder="Email" />

            <Input
              containerStyle={{ marginTop: 24 }}
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />
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
              placeholder="New password (confirm)"
            />

            <Button type="submit">Save changes</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
