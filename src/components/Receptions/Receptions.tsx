import React from 'react'
import {Table} from 'react-bootstrap';

interface ReceptionsProps{
  rows: Array<object>,
  rowsHandler(rows: Array<object>, id: string | number): void
}

const Receptions: React.FC<ReceptionsProps>  = ({rows, rowsHandler}) => {


  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Пациент</th>
          <th>Время записи</th>
          <th>Жалобы</th>
          <th>Отмена</th>
        </tr>
      </thead>
      <tbody>
      {rows.map((item, index) => {
        return (
          <tr key={item.RecId} id={item.RecId}>
            <td>{index + 1}</td>
            <td>{item.Patient}</td>
            <td>{item.RecTime.slice(0,5)}</td>
            <td>{item.Complaints}</td>
            <td style={{cursor: "pointer"}} onClick={(e: React.MouseEvent<HTMLElement>) => {
              console.log(e.target.parentNode.id)
              rowsHandler(rows, e.target.parentNode.id)
            }}>Отменить</td>
          </tr>
        )
      })}
      </tbody>
    </Table>
  )
}


export default Receptions
