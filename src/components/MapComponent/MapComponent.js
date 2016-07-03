import React, {PropTypes, Component} from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import styles from './styles.module.css';
export class MapComponent extends React.Component {

  state = {
    markers: []
  };

  updateState() {
    if (this.props.data.rows) {
      var markers = this.props.data.rows.map(function(item, i) {
        return {
          position: {
            lat: item.coordinate[0],
            lng: item.coordinate[1]
          },
          item: item
        }
      }.bind(this));

      this.setState({
        markers: markers
      });
    }
  }

  componentWillMount() {
    this.updateState();
  }

  render() {
    this.componentWillMount();
    return (
      <div className={styles.map}>
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={9}
            defaultCenter={{lat: 52.379189, lng: 4.899431}}>
            {this.state.markers.map((marker, index) => {
              return (
                <Marker
                {...marker}
                />
              );
            })}
          </GoogleMap>
        }
      />
      </div>
    );
  }
}
export default MapComponent;
