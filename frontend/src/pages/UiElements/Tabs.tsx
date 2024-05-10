import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TabOne from '../../components/Tabs/TabOne';
import TabThree from '../../components/Tabs/TabThree';
import TabTwo from '../../components/Tabs/TabTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const Tabs: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tabs" />

      <div className="flex flex-col gap-9">
        <TabOne />
        <TabTwo />
        <TabThree />
      </div>
    </DefaultLayout>
  );
};

export default Tabs;
