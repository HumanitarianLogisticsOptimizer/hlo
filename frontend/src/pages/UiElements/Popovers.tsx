import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PopoversOne from '../../components/Popovers/PopoversOne';
import PopoversTwo from '../../components/Popovers/PopoversTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const Popovers: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Popovers" />

      <div className="flex flex-col gap-7.5">
        <PopoversOne />
        <PopoversTwo />
      </div>
    </DefaultLayout>
  );
};

export default Popovers;
