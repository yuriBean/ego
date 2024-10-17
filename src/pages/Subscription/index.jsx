import { useState } from "react";
import AsideHeader from "../../components/AsideHeader";
import Switch from '@mui/material/Switch';
import PricingPlan from "../../components/plans";

function Index() {
    // Sample data object with row names and corresponding values

    return (
        <div className="flex mb-20">
            <AsideHeader />
            <div className="w-full mt-6 mx-5">
                <div className="w-full mt-6 mx-5">
                    <div className="flex items-end justify-between">
                        <div className="justify-center self-start p-2.5 mt-6 text-lg font-medium tracking-wide leading-6 text-blue-950">
                            Abonnement

                        </div>
                    </div>
                </div>
                <PricingPlan />
            </div>
        </div>
    );
}

export default Index;
