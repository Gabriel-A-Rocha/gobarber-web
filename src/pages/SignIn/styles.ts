import styled from 'styled-components';

import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container: React.FC = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content: React.FC = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 700px;
  flex: 1;

  /* place-content: center; */
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    text-align: center;

    margin: 80px 0;
    width: 340px;

    h1 {
      margin-bottom: 24px;
    }

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;
      height: 48px;

      color: #f4ede8;

      &::placeholder {
        color: #666360;
      }

      & + input {
        margin-top: 8px;
      }
    }

    button {
      background: #ff9000;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      width: 100%;
      height: 56px;
      color: #312e38;
      font-weight: 500;
      margin-top: 16px;
      transition: background 0.2s;

      &:hover {
        background-color: ${shade(0.2, '#ff9000')};
      }
    }

    a {
      color: #f4ede8;
      /* display: block; */
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: flex;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 12px;
    }
  }
`;

export const Background: React.FC = styled.div`
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
  flex: 1;
`;
