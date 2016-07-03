import React from 'react'
import styles from './styles.module.css'
export class Icons extends React.Component {
  render() {
    if (this.props.data.facility_icons) {

      var Icons = this.props.data.facility_icons.map(icons => {
        return (
          <div className={styles.icons}>
            <i className={icons.icon}></i>
          </div>
        )
      })
    }
    return (
      <div>
        {Icons}
      </div>
    )
  }

}

export default Icons;
