import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
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
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        // reset errors
        formRef.current?.setErrors({});

        // input fields validation
        const schema = Yup.object().shape({
          name: Yup.string().required('Name required'),

          email: Yup.string()
            .required('Email required')
            .email('Invalid email address'),

          old_password: Yup.string(),

          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Type the new password.'),
            otherwise: Yup.string(),
          }),

          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Confirm the new password.'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password')],
              'New password and confirmation do not match.',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Profile updated!',
          description: 'Your profile has been updated successfully.',
        });
      } catch (err) {
        // check if it's a format error
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          // in case of wrong information, display a toast message
          addToast({
            title: 'Update error',
            type: 'error',
            description: 'Your profile has not been updated. Please try again.',
          });
        }
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        // console.log(e.target.files[0]);
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar picture updated!',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <>
      <Container>
        <header>
          <div>
            <Link to="/dashboard">
              <FiArrowLeft />
            </Link>
          </div>
        </header>

        <Content>
          <Form
            ref={formRef}
            initialData={{
              name: user.name,
              email: user.email,
            }}
            onSubmit={handleSubmit}
          >
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />
              <label htmlFor="avatar">
                <FiCamera />

                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
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
