import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
    Container,
    Typography
} from '@material-ui/core';

import customStyles from './Top.module.css';


const About: React.FC = () => {
    return (
        <Container maxWidth="md">
            <div className={customStyles.about_page_wrapper}>
                <Typography variant="h6"></Typography>
                <FormattedMessage id="about.hello" defaultMessage="hello world"/>
            </div>
        </Container>
    )
}

export default About
