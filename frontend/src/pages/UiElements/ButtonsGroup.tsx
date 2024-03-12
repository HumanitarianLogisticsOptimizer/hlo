import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ButtonsGroupOne from '../../components/ButtonsGroups/ButtonsGroupOne';
import ButtonsGroupTwo from '../../components/ButtonsGroups/ButtonsGroupTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const ButtonsGroup: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Buttons Group" />

      <div className="flex flex-col gap-7.5">
        <ButtonsGroupOne />
        <ButtonsGroupTwo />
      </div>
    </DefaultLayout>
  );
};

export default ButtonsGroup;
