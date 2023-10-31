import React from 'react'

import './Header.css'
import { NavLink } from 'react-router-dom'

type HeaderPropsType = {
  login: string | null
  isAuth: boolean
  logout: () => void
}

const Header: React.FC<HeaderPropsType> = props => {
  return (
    <header className="header">
      <a className="logo" href="src/components/Header/Header#">
        <img
          className="logo__img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png"
          alt="Logo"
          width="150"
          height="70"
        />
      </a>

      <div className={'header__login'}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Log out</button>{' '}
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  )
}

export default Header
