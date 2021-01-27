import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { makeStyles, Theme } from '@material-ui/core/styles';
import {
    Container,
    Grid,
    Link,
    Typography
} from '@material-ui/core';

import customStyles from './Footer.module.css';


const useStyles = makeStyles( (theme: Theme) => ({
    footer: {
        backgroundColor: theme.palette.primary.main,
        marginTop: theme.spacing(4)
    },
    content: {
        padding: theme.spacing(3, 0),
    },
    textTitle: {
        color: "#fff",
        fontWeight: theme.typography.fontWeightBold
    },
    textSub: {
        color: "#fff",
    }
}))


const Footer: React.FC = () => {
    const intl = useIntl();
    const classes = useStyles()

    const footers = [
        {
            title: "Startlens",
            description: [
                {
                    title: intl.formatMessage({ id: "header.about", defaultMessage: "What's Startlens?" }),
                    link: "./about"
                },
            ]
        },
        {
            title: intl.formatMessage({ id: "footer.sitemap", defaultMessage: "Site map" }),
            description: [
                {
                    title: intl.formatMessage({ id: "footer.topPage", defaultMessage: "Top page" }),
                    link: "./"
                },
                {
                    title: intl.formatMessage({ id: "footer.myPage", defaultMessage: "My page" }),
                    link: "./profile/edit"
                },
                {
                    title: intl.formatMessage({ id: "footer.admin", defaultMessage: "Admin page" }),
                    link: `${process.env.REACT_APP_ADMIN_URL}`
                },
            ]
        },
    ]

    return (
        <div className={customStyles.footer_wrapper}>
            <Container maxWidth="md" component="footer" className={classes.content}>
                <Grid container spacing={4} justify="space-evenly">
                    {footers.map( (footer) => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                            <Typography variant="subtitle1" className={classes.textTitle}>
                                {footer.title}
                            </Typography>
                            <ul className={customStyles.footer_list_item}>
                                {footer.description.map( (item, index) => (
                                    <li key={index}>
                                        <Link href={item.link} variant="subtitle2" className={classes.textSub}>
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
                <div className={customStyles.footer_copyright_wrapper}>
                    <Typography variant="body2" align="center" className={classes.textSub}>
                        { 'Copyright &copy; Startlens All rights reserved.' }
                    </Typography>
                </div>
            </Container>
        </div>
    )
}

export default Footer
