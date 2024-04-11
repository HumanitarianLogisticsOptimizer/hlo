import { useState, useEffect } from "react";
import { DataView } from 'primereact/dataview';
import axios from "axios";

function DataViewACCs() {
  const [accData, setAccData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/acc/")
      .then(res => {
        setAccData(res.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const accItemTemplate = (accData) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img src={"/layout/images/ACC.svg"} width="90px" height="90px" alt={accData.name} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{accData.name}</div>
              <span>{accData.address}</span>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-map-marker"></i>
                  <span className="font-semibold">{accData.location}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DataView value={accData} itemTemplate={accItemTemplate} paginator rows={5}/>
  );
};

export default DataViewACCs;