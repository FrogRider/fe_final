// import React from 'react';
import React, { Suspense, lazy } from 'react';
import './menues.scss';
// import CreateMenu from './subComponents/CreateMenu';
import Preloader from '../preloader/Preloader';

const CreateMenu = lazy(() => import('./subComponents/CreateMenu'));
const Menues = props => {
  return (
    <Suspense fallback={<Preloader />}>
      <div className="menues block">
        <CreateMenu />
      </div>
    </Suspense>
  );
};

export default Menues;
