import * as React from 'react';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    PersonRounded as PersonIcon,
} from "@mui/icons-material";

import {
    LayersOutlined,
    AccountCircleOutlined,
    ArchiveOutlined,
    DescriptionOutlined,
    AutoGraphOutlined,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import Constants from "../../constants";
import Screens from "../../constants/screens";
import Strings from "../../constants/strings";
import { getUser } from '../useLocalStorage';

const MainHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();

    let menu = [];
    if (getUser().role_id === 1) {
        menu = [
            {
                name: Strings.Account.TITLE,
                path: Screens.ACCOUNT
            },
            {
                name: Strings.Statistics.TITLE,
                path: Screens.STATISTICS
            },
            {
                name: Strings.Profile.TITLE,
                path: Screens.PROFILE
            },
        ]
    } else if (getUser().role_id === 2) {
        menu = [
            {
                name: Strings.Zoning.TITLE,
                path: Screens.ZONING
            },
            {
                name: Strings.Post.TITLE,
                path: Screens.POST
            },
            {
                name: Strings.Database.TITLE,
                path: Screens.DATABASE
            },
            {
                name: Strings.Profile.TITLE,
                path: Screens.PROFILE
            },
        ]
    }


    const renderMenuIcon = (screenPath) => {
        const iconStyle = {
            marginRight: 26,
            color: Constants.Styles.COLOR_CHETWODE_BLUE,
            fontSize: 30
        }

        if (screenPath === Screens.ACCOUNT) {
            return <PersonIcon style={iconStyle} />
        }
        if (screenPath === Screens.ZONING) {
            return <LayersOutlined style={iconStyle} />
        }
        if (screenPath === Screens.PROFILE) {
            return <AccountCircleOutlined style={iconStyle} />
        }
        if (screenPath === Screens.DATABASE) {
            return <ArchiveOutlined style={iconStyle} />
        }
        if (screenPath === Screens.POST) {
            return <DescriptionOutlined style={iconStyle} />
        }
        if (screenPath === Screens.STATISTICS) {
            return <AutoGraphOutlined style={iconStyle} />
        }
    }

    return (
        <List component="nav">
            <React.Fragment>
                {menu.map((menuItem, index) => (
                    <ListItem
                        key={index.toString()}
                        disableGutters
                        disablePadding
                        className="py-1"
                        style={
                            location.pathname.includes(menuItem.path) ? ({
                                borderLeftStyle: "solid",
                                borderLeftWidth: 3,
                                borderColor: Constants.Styles.COLOR_CHETWODE_BLUE,
                                backgroundColor: Constants.Styles.COLOR_ATHENSGRAY
                            }) : (undefined)
                        }
                    >
                        <ListItemButton onClick={() => navigate(menuItem.path)}>
                            <ListItemIcon>
                                {renderMenuIcon(menuItem.path)}
                            </ListItemIcon>
                            <ListItemText primary={menuItem.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </React.Fragment>
        </List>
    )
}

export default MainHeader