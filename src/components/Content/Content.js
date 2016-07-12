import React from 'react'
import {Link} from 'react-router'
import $ from 'jquery'
import GoogleMap from 'google-map-react'
import Items from '../Items/Items'
import MapComponent from '../MapComponent/MapComponent'
export class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  loadFromServer() {
    $.ajax({
      url: this.props.source,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          data: data
        })
      }.bind(this)
    });
  }
  componentDidMount() {
    this.loadFromServer();
  }


  render() {
    return (
      <div>
        <section>
          <Items data={this.state.data} />
          <MapComponent data={this.state.data} />
        </section>
      </div>
    )
  }
}

export default Content;
