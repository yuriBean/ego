import React from 'react'
import PricingHeader from '../../components/pricingHeader'
import PricingPlan from '../../components/plans'

const index = ({userId}) => {
    return (
        <div>
            <PricingHeader/>
            <PricingPlan userId={userId}/>
        </div>
    )
}

export default index
