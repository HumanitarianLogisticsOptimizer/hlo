/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';

const Documentation = () => {
    return (
        <>
            <div className="grid">
                <div className="col-12">
                    <div className="card docs">
                        <h4>Current Version</h4>
                        <p>HLO 1.0</p>

                        <h5>Getting Started</h5>
                        <p>
                             HLO is a humanitarian logistics optimizitation platform for any urgency. For now, you can install and try current version from{' '}
                            <a href="https://github.com/HumanitarianLogisticsOptimizer" className="font-medium hover:underline text-primary">
                                Github.
                            </a>
                        </p>                        
                        <h5>User Structure</h5>
                        <p>There are 9 types of user in the platform. They have different capabilities and permissions on system.</p>
                        <ul className="line-height-3">
                            <li>
                                <span className="text-primary font-medium">HLO Admin</span>: The HLO Admin is responsible for accoununt management for EMA Coordinators.
                            </li>
                            <li>
                                <span className="text-primary font-medium">EMA Coordinator</span>: The EMA Coordinator is the manager of the platform for all operations of the urgency.
                            </li>
                            <li>
                                <span className="text-primary font-medium">ACC Coordinator</span>: The ACC Coordinator is mainly responsible for inventory management of Aid Collection Center.
                            </li>
                            <li>
                                <span className="text-primary font-medium">ADC Coordinator</span>: The ADC Coordinator is mainly responsible for inventory management of Aid Distribution Center.
                            </li>
                            <li>
                                <span className="text-primary font-medium">Enterprise Courier</span>: The Enterprise Courier is responsible for well-organized logistics of aids.
                            </li>
                            <li>
                                <span className="text-primary font-medium">Enterprise Supplier</span>: The Enterprise Supplier is responsible for providing huge amounts of aid materials.
                            </li>
                            <li>
                                <span className="text-primary font-medium">Volunteer Courier</span>: The Volunteer Courier might support logistics of aids via own vehicle.
                            </li>
                            <li>
                                <span className="text-primary font-medium">Donor</span>: The Donor is volunteer aid supplier to support aid delivery individually.
                            </li>
                            <li>
                                <span className="text-primary font-medium">Victim</span>: The Victim is the individual affected from urgency. 
                            </li>
                        </ul> 
                        

                        <h5>Organization Structure</h5>
                        <p>There are 4 types of organization in the platform.</p>
                        <ul className="line-height-3">
                            <li>
                                <span className="text-primary font-medium">ACC</span>: Aid Collection Centers are the base location for Donors. Each donor can find nearest ACC via mobile application.
                            </li>
                            <li>
                                <span className="text-primary font-medium">ADC</span>: Aid Distribution Centers are the base location for Victims. Each victim can find nearest ADC via mobile application.
                            </li>
                            <li>
                                <span className="text-primary font-medium">EMA</span>: Emergency Management Authority is responsible for navigation of the all process for any urgency. 
                            </li>
                            <li>
                                <span className="text-primary font-medium">Enterprise</span>: Enterprises Couriers and Enterprise Suppliers are shaped as well-organized donors on platform.
                            </li>
                        </ul> 
                    </div>
                </div>
            </div>
        </>
    );
};

export default Documentation;
