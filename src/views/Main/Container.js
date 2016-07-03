import React from 'react'
import Header from '../../components/Header/Header'
import Content from '../../components/Content/Content'
import styles from './styles.module.css'

export class Container extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Content source="https://www.deskbookers.com/nl-nl/sajax.json?q=Amsterdam&type=-&people=any&favorite=0&pid=&sw=52.293753%2C4.634942&ne=52.455562%2C5.162286&ids=17201%2C19640%2C13692%2C13691%2C12136%2C17938%2C15292%2C14886%2C14885%2C14884%2C14883%2C15730%2C15353%2C15351%2C15330%2C15080%2C17290%2C15454%2C15451%2C15379" />
      </div>
    )
  }
}

export default Container;
