import React from 'react';
import BreadcrumbOne from '../../components/Breadcrumbs/BreadcrumbOne';
import BreadcrumbThree from '../../components/Breadcrumbs/BreadcrumbThree';
import BreadcrumbTwo from '../../components/Breadcrumbs/BreadcrumbTwo';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const Breadcrumbs: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Breadcrumb" />

      <div className="flex flex-col gap-7.5">
        <BreadcrumbOne />
        <BreadcrumbTwo />
        <BreadcrumbThree />
      </div>
    </DefaultLayout>
  );
};

export default Breadcrumbs;
