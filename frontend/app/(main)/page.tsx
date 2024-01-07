'use client';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import axios from 'axios';

function Dashboard() {
    const [accData, setAccData] = useState([]);
    const [adcData, setAdcData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/acc/")
            .then(res => {
                setAccData(res.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axios.get("http://localhost:8000/api/adc/")
            .then(res => {
                setAdcData(res.data);
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
                        {/*<div className="flex align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <i className="pi pi-info-circle my-auto"></i>
                            <Button className="p-button-rounded">Details</Button>
                        </div>*/}
                    </div>
                </div>
            </div>
        );
    };

    const adcItemTemplate = (adcData) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img src={"/layout/images/ADC.svg"} width="90px" height="90px" alt={adcData.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{adcData.name}</div>
                            <span>{adcData.address}</span>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-map-marker"></i>
                                    <span className="font-semibold">{adcData.location}</span>
                                </span>
                            </div>
                        </div>
                        {/*<div className="flex align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <i className="pi pi-info-circle my-auto"></i>
                            <Button className="p-button-rounded">Details</Button>
                        </div>*/}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <h2>Aid Collection Centers</h2>
            <DataView value={accData} itemTemplate={accItemTemplate} paginator rows={5} />
            <br />
            <h2>Aid Distribution Centers</h2>
            <DataView value={adcData} itemTemplate={adcItemTemplate} paginator rows={5} />      
        </>
    );
};

export default Dashboard;
