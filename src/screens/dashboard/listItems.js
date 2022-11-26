import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { LayersOutlined, AccountTreeOutlined, AccountCircleSharp, DataObjectSharp, AssignmentOutlined } from '@mui/icons-material';
import Strings from '../../constants/strings';
import { Link } from 'react-router-dom';
export const adminListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <Link href="/account">
                    <AccountTreeOutlined />
                </Link>
            </ListItemIcon>
            <ListItemText primary={Strings.ScreenName.ACCOUNT} />
        </ListItemButton>
    </React.Fragment>
);

export const staffListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <LayersOutlined />
            </ListItemIcon>
            <ListItemText primary={Strings.ScreenName.ZONING} />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentOutlined />
            </ListItemIcon>
            <ListItemText primary={Strings.ScreenName.POST} />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <DataObjectSharp />
            </ListItemIcon>
            <ListItemText primary={Strings.ScreenName.DATABASE} />
        </ListItemButton>
    </React.Fragment>
);

export const generalListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <AccountCircleSharp />
            </ListItemIcon>
            <ListItemText primary={Strings.ScreenName.PROFILE} />
        </ListItemButton>
    </React.Fragment>
);