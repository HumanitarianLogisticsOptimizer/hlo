import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableFive from '../../components/Tables/TableFive';
import TableSix from '../../components/Tables/TableSix';
import DefaultLayout from '../../layout/DefaultLayout';

const ProTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableFive />
        <TableSix />
      </div>
    </DefaultLayout>
  );
};

export default ProTables;
