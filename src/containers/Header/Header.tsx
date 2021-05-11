/* eslint-disable max-len */
import React from 'react';
import {NavLink} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import classes from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={classes.Header}>
      <div className="container" style={{height: '100%'}}>
        <div className="d-flex  justify-content-between  align-items-center" style={{height: '100%'}}>
          <h1 className={classes.HeaderTitle}>SalutDoc</h1>
          <Nav defaultActiveKey="/" as="ul">
            <Nav.Item as="li">
              <NavLink exact to="/" className="nav-link" activeStyle={{
                color: '#0011fa',
              }}>Форма записи</NavLink>
            </Nav.Item>
            <Nav.Item as="li">
              <NavLink exact to="/shedule" className="nav-link" activeStyle={{
                color: '#0011fa',
              }}>Расписание врачей</NavLink>
            </Nav.Item>
          </Nav>
        </div>
      </div>

    </header>
  );
};

export default Header;
