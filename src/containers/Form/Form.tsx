/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import DateControl from '../../components/DateControl/DateControl';
import SelectControl from '../../components/SelectControl/SelectControl';
import TextControl from '../../components/TextControl/TextControl';
import axios from 'axios';
import {validation} from '../../helpers/validation';

const doctors = ['Школвский Борис Елизарович', 'Воронова Тамара Ильевна', 'Барсова Лилия Олеговна', 'Крючков Валерий Филиппович'];
const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];


const UserForm: React.FC = () => {
  const [disBtn, setDisBtn] = useState(true);

  const [userName, setUserName] = useState<string>('');
  const [doctorName, setdoctorName] = useState<string>('Школвский Борис Елизарович');
  const [receptionDate, setReceptionDate] = useState<string>('');
  const [receptionTime, setReceptionTime] = useState<string>('');
  const [complaints, setComplaints] = useState<string>('');
  const [timeDis, setTimeDis] = useState<boolean>(true);
  const [timeList, setTimeList] = useState([] as any);

  useEffect(() => {
    if (validation('date', receptionDate)) {
      setTimeDis(false);
      axios.get('https://doctotors-table.herokuapp.com/api/gettimes', {
        params: {
          doc: doctorName,
          date: receptionDate,
        },
      }).then((resp) => {
        let resTime: Array<string> = [];

        const excludeTimes = resp.data.map((item) => {
          return item.RecTime.slice(0, 5);
        });

        resTime = times.filter((item) => {
          if (!excludeTimes.includes(item)) {
            return item;
          }
        });

        setReceptionTime(resTime[0]);
        setTimeList(resTime);
      });
    }

    if (validation('date', receptionDate) && validation('name', userName)) {
      setDisBtn(false);
    } else {
      setDisBtn(true);
    }
  }, [userName, receptionDate, doctorName]);

  return (
    <div className="form-wrap">
      <Form>

        <TextControl controlId="patient" label="Введите ФИО" value={userName} validType="name" errMessage="Введите ФИО в формате: 'Иванов Иван Иванович'" changeHandler={setUserName}/>
        <SelectControl controlId="doctors" label="Выберите Врача" options={doctors} value={doctorName} changeHandler={setdoctorName} disabled={false}/>
        <DateControl controlId="date" label="Введите дату" mask="99.99.9999" value={receptionDate} errMessage="Введите корректную дату" changeHandler={setReceptionDate}/>
        <SelectControl controlId="time" label="Выберите время" options={timeList} value={receptionTime} changeHandler={setReceptionTime} disabled={timeDis}/>

        <Form.Group controlId="area" className="mb-3">
          <Form.Label>Жалобы</Form.Label>
          <Form.Control as="textarea" rows={3} value={complaints} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setComplaints(e.target.value);
          }}/>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={disBtn} onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          const data = {
            patient: userName,
            doctor: doctorName,
            date: receptionDate,
            time: receptionTime,
            complaints,
          };
          axios.post('https://doctotors-table.herokuapp.com/api/insert', {
            data,
          });

          setUserName('');
          setReceptionDate('');
          setReceptionTime('');
          setTimeList([]);
          setComplaints('');
          setDisBtn(true);
        }}>Записаться на прием</Button>
      </Form>
    </div>
  );
};


export default UserForm;
