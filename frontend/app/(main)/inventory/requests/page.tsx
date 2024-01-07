"use client";
import type { Demo, Page } from "@/types";
import { Fieldset } from 'primereact/fieldset';


const InputDemo: Page = () => {

    return (
        <div className="grid p-fluid input-demo">
            <div className="col-12">
            <Fieldset legend="Coming Soon!">
            <p className="m-0">
                You can request to your EMA Coordinator for new aid types.
            </p>
            </Fieldset>
            </div>
        </div>
    );
};

export default InputDemo;
