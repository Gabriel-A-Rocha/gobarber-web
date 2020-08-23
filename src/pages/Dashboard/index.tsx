import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

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
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    // fetch month availability from the API
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  // when the month is changed in the calendar, unavailable days must be identified
  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

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

        <Calendar>
          <DayPicker
            weekdaysShort={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            months={[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]}
            fromMonth={new Date()}
            disabledDays={[
              {
                daysOfWeek: [0, 6],
              },
              ...disabledDays,
            ]}
            modifiers={{
              available: {
                daysOfWeek: [1, 2, 3, 4, 5],
              },
            }}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export { Dashboard };
