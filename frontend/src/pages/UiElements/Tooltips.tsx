import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TooltipsOne from '../../components/ToolTips/TooltipsOne';
import TooltipsTwo from '../../components/ToolTips/TooltipsTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const Tooltips: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tooltips" />

      <div className="flex flex-col gap-7.5">
        <TooltipsOne />
        <TooltipsTwo />
      </div>
    </DefaultLayout>
  );
};

export default Tooltips;
