import React from 'react'
import Header from '../containers/Header/Header'
import Form from '../containers/Form/Form'



const Main: React.FC = () => {


  return(
    <>
    <Header/>
    <div className="container">
      <h2 className="mb-3 mt-3 text-center">Запись к врачу</h2>
      <Form/>
    </div>
    </>
  )
}

export default Main
