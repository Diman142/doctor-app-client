import React from 'react'
import Header from '../containers/Header/Header'
import Filter from '../containers/Filters/Filters'

const Shedule: React.FC = () => {


  return(
    <>
    <Header/>
    <div className="container">
      <h2 className="mb-3 mt-3 text-center">Расписание врачей</h2>
      <div className="form-wrap">
      <Filter/>
      </div>
    </div>
    </>
  )
}

export default Shedule
