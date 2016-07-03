import React from 'react'
import styles from './styles.module.css'
export class Icons extends React.Component {
  render() {
    if (this.props.data.facility_icons) {

      var Icons = this.props.data.facility_icons.map(icons => {
        return (
          <div className={styles.box}>
            <i className={icons.icon}></i>
          </div>
        )
      })
    }
    return (
      <div className={styles.icons}>
        {Icons}
      </div>
    )
  }

}

export default Icons;
