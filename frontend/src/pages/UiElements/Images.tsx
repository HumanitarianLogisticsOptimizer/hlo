import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ImagesOne from '../../components/Images/ImagesOne';
import ImagesTwo from '../../components/Images/ImagesTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const Images: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Images" />

      <div className="flex flex-col gap-7.5">
        <ImagesOne />
        <ImagesTwo />
      </div>
    </DefaultLayout>
  );
};

export default Images;
