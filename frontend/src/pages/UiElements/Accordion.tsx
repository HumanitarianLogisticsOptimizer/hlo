import React from 'react';
import AccordionOne from '../../components/Accordions/AccordionOne';
import AccordionTwo from '../../components/Accordions/AccordionTwo';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const Accordion: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Accordion" />

      <div className="flex flex-col gap-7.5">
        <AccordionOne />
        <AccordionTwo />
      </div>
    </DefaultLayout>
  );
};

export default Accordion;
