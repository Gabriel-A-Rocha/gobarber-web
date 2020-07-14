import styled from 'styled-components';

import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container: React.FC = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content: React.FC = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px;

  width: 100%;
  max-width: 700px;
  flex: 1;

  place-content: center;
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

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #f4ede8;
    display: flex;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    svg {
      margin-right: 12px;
    }
  }
`;

export const Background: React.FC = styled.div`
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
  flex: 1;
`;
