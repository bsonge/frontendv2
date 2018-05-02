/**
 *
 * Asynchronously loads the component for OptionsModal
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
