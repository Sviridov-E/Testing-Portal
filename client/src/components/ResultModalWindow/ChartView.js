import React from 'react';
import { ChartCard } from '../ChartCard';

export const ChartView = ({content}) => {    
    return <ChartCard
                type='line'
                name={content.title}
                data={content.scales.points}    
           />
}