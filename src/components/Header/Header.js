import React from 'react'
import {Link} from 'react-router'
import $ from 'jquery'
import Items from '../Items/Items'
import styles from './styles.module.css'
export class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <Link to="/"><h1 className={styles.logo}>Deskbookers</h1></Link>
      </div>
    )
  }
}

export default Header;
