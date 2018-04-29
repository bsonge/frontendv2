/**
*
* ItemList
*
*/

import React from 'react';
// import styled from 'styled-components';

import NoImgFound from 'images/no_image_available.png';
import { Table } from 'react-bootstrap';
import PropType from 'prop-types';


class ItemList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props); // headervals len should = todisplay
    this.genList = this.genList.bind(this);
    this.genItem = this.genItem.bind(this);
    this.formify = this.formify.bind(this);
  }
  genList(dataArray) {
    const toRender = [];
    for (let i = 0, len = dataArray.length; i < len; i += 1) {
      toRender.push(this.genItem(dataArray[i]));
    }
    return <tbody>{toRender}</tbody>;
  }
  genItem(obj) {
    const keys = Object.keys(obj);
    let pic = null;
    const items = [];
    for (let i = 0, len = keys.length; i < len; i += 1) {
      const key = keys[i];
      if (obj[key] && obj[key].slice(0, 4) === 'http') {
        pic = obj[key];
      } else {
        items.push(<div>{key}: {obj[key] || ''}</div>);
      }
    }
    return (
      <tr>
        <td style={{ width: '250px' }}>
          <img
            alt=""
            src={pic || NoImgFound}
            style={{
              width: '200px',
              height: 'auto',
              margin: 'auto',
              display: 'block' }}
          />
        </td>
        <td>{items || ''}</td>
      </tr>
    );
  }

  render() {
    return (
      <Table striped bordered condensed hover responsive>
        {this.genList(this.props.data)}
      </Table>
    );
  }
}

ItemList.propTypes = {
  data: PropType.array,
};

export default ItemList;
