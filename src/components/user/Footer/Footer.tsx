import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import {
    Container
} from '@material-ui/core';

const useStyles = makeStyles( (theme: Theme) => ({
    footer: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(3, 0),
    }
}))

const Footer: React.FC = () => {
    const classes = useStyles()

    return (
        <Container maxWidth="md" component="footer" className={classes.footer}>
            footer
        </Container>
    )
}

export default Footer
