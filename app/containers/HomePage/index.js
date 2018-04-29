/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import ItemList from 'components/ItemList';
import messages from './messages';


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <ItemList data={[{ img: 'https://i.imgur.com/F2APuqa.jpg', wow: 'wow', bruh: 'bro', test: 'hehhe' }, { img: null, wow: 'oh', bruh: null, test: 'who are' }]} />
      </div>
    );
  }
}
