import * as React from 'react';
import Link from '@mui/material/Link';
import Title from '../../components/Title';

function preventDefault(event) {
    event.preventDefault();
}

export default function StatisticsZoningOnField() {

    return (
        <React.Fragment>
            <Title>Recent Orders</Title>

            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}