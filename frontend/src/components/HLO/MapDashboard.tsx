import DefaultLayout from "../../layout/DefaultLayout";
import CenterMap from "./CenterMap";

const MapDashboard: React.FC = () => {

  return (
    <DefaultLayout>
      <h2 className="mb-6 text-title-md font-semibold text-black dark:text-white">
        Map Dashboard
      </h2>
      <div className="bg-white p-2 dark:bg-boxdark">
        <div className="grid grid-cols-2 text-black dark:text-gray mt-3 mx-1p">
          <div>
            <div className="flex">
              <img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
              <p>: Blue pins for Emergency Management Authorities</p>
            </div>
            <div className="flex my-3">
              <img src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" />
              <p>: Red pins for Aid Collection Centers</p>
            </div>
            <div className="flex mb-3">
              <img src="https://maps.google.com/mapfiles/ms/icons/green-dot.png" />
              <p>: Green pins for Aid Distribution Centers</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-full">
            <h2 className="text-title-md">Click on a pin to see more detailed information</h2>
          </div>
        </div>
        <CenterMap />
      </div>
    </DefaultLayout>
  );
}

export default MapDashboard;