import React, { useState } from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Scheduled appointments</h1>
          <p>
            <span>Today</span>
            <span>August 22</span>
            <span>Saturday</span>
          </p>

          <NextAppointment>
            <strong>Next appointments</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/60102062?s=460&u=d46cf65e8d14695ff7ef324c1bc2d903d8248f24&v=4"
                alt="Gabriel A Rocha"
              />

              <strong>Gabriel A. Rocha</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Morning</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/60102062?s=460&u=d46cf65e8d14695ff7ef324c1bc2d903d8248f24&v=4"
                  alt="Gabriel A Rocha"
                />

                <strong>Gabriel A. Rocha</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/60102062?s=460&u=d46cf65e8d14695ff7ef324c1bc2d903d8248f24&v=4"
                  alt="Gabriel A Rocha"
                />

                <strong>Gabriel A. Rocha</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Afternoon</strong>

            <Appointment>
              <span>
                <FiClock />
                13:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/60102062?s=460&u=d46cf65e8d14695ff7ef324c1bc2d903d8248f24&v=4"
                  alt="Gabriel A Rocha"
                />

                <strong>Gabriel A. Rocha</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                14:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/60102062?s=460&u=d46cf65e8d14695ff7ef324c1bc2d903d8248f24&v=4"
                  alt="Gabriel A Rocha"
                />

                <strong>Gabriel A. Rocha</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar />
      </Content>
    </Container>
  );
};

export { Dashboard };
