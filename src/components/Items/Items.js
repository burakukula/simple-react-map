import React from 'react'
import styles from './styles.module.css'
import Icons from '../Icons/Icons'
export class Items extends React.Component {
  render() {
    if (this.props.data.rows) {

      var Item = this.props.data.rows.map(row => {
        return (
          <div key={row.id} className={styles.item}>
            <p className={styles.itemTitle}>{row.name}</p>
            <p className={styles.itemAddress}>
              <span>{row.address_object.address_line1}, </span>
              <span>{row.address_object.postalcode} {row.address_object.place}, </span>
              <span>{row.address_object.country}</span>
            </p>
            <div className={styles.itemImage}>
              <img src={row.image_urls[0]} alt="Example Image"/>
              <Icons data={row}/>
              <div className={styles.priceBox}>
                <p>{row.hour_price} $</p>
              </div>
            </div>

          </div>
        )
      })
    }
    return (
      <div className={styles.wraper}>
        <div className={styles.items}>
          {Item}
        </div>
      </div>
    )
  }
}
export default Items;
