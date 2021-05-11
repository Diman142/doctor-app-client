import React, {useState, useEffect} from 'react'
import {Form} from 'react-bootstrap';
import axios from 'axios'
import SelectControl from '../../components/SelectControl/SelectControl'
import DateControl from '../../components/DateControl/DateControl'
import {validation} from '../../helpers/validation'
import Receptions from '../../components/Receptions/Receptions'

const Filter = () => {

  const [currDoc, setCurrDoc] = useState<string>("")
  const [receptionDate, setReceptionDate] = useState<string>("")
  const [docList, setDocList] = useState([])
  const [flag, setFlag] = useState<boolean>(false)
  const [receptionsList, setReceptionsList] = useState([])

  const rowsHandler = (rows: Array<any>, id:string | number): void => {
    let elem: object = {}
    const arr = rows.filter(item => {
      if(item.RecId.toString() !== id){
        return item
      } else {
        elem = item
      }
    })

    console.log(elem)

    axios.get('https://doctotors-table.herokuapp.com/api/delete', {
      params: {
        id: elem["RecId"]
      }
    })

    setReceptionsList(arr)
  }

  useEffect(() => {
    axios.get('https://doctotors-table.herokuapp.com/api/getdocs').then(res => {
      const doctors: Array<string> = []
      res.data.forEach(item => {
        let t = `${item.name} ${item.surname} ${item.midname}`
        doctors.push(t)
      })
      setCurrDoc(doctors[0])
      setDocList(doctors)
    })
  }, [])

  useEffect(() => {
    if(validation("date", receptionDate)){
      setFlag(true)
    } else {
      setFlag(false)
      setReceptionsList([])
    }
  }, [receptionDate])


  useEffect(() => {
    if(flag){
      axios.get('https://doctotors-table.herokuapp.com/api/getreceptions', {
        params: {
          doc: currDoc,
          date: receptionDate,
        }
      }).then(res => {
        console.log(res)
        setReceptionsList(res.data)
      })
    }
  }, [flag, currDoc])


  return (
    <Form>
      <SelectControl controlId="docList" label="Выберите Врача" options={docList} value={currDoc} changeHandler={setCurrDoc}/>
      <DateControl controlId="date" label="Введите дату" mask="99.99.9999" value={receptionDate} errMessage="Введите корректную дату" changeHandler={setReceptionDate}/>
      {receptionsList.length ? <Receptions rows={receptionsList} rowsHandler={rowsHandler}/> : <p>Записей не найдено</p>}
    </Form>
  )
}

export default Filter
