import DefaultLayout from "../../../layout/DefaultLayout";
import CenterMap from "./CenterMap";

const MapDashboard: React.FC = () => {

  return (
    <DefaultLayout>
      <div className="bg-white p-2 dark:bg-boxdark">
        <div className="text-black dark:text-gray mt-3 mx-1p">
          <div>
            {/* <div className="flex">
              <img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
              <p>Emergency Management Authorities</p>
            </div> */}
            <div className="flex my-3">
              <img src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" />
              <p>Aid Collection Centers</p>
            </div>
            <div className="flex mb-3">
              <img src="https://maps.google.com/mapfiles/ms/icons/green-dot.png" />
              <p>Aid Distribution Centers</p>
            </div>
            <div className="flex mb-3">
              <img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
              <p>ACCs that have urgent needs</p>
            </div>
          </div>
        </div>
        <CenterMap />
      </div>
    </DefaultLayout>
  );
}

export default MapDashboard;