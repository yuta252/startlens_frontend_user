import React from 'react';

import {
    Container,
    Typography
} from '@material-ui/core'

import SpotCard from './SpotCard';
import customStyles from './Top.module.css';


const SpotSearch: React.FC = () => {
    return (
        <div className={customStyles.category_content_wrapper}>
            <Typography variant="h6">検索結果</Typography>
            <div className={customStyles.new_spot_wrapper}>
                <SpotCard />
            </div>
        </div>
    )
}

export default SpotSearch
