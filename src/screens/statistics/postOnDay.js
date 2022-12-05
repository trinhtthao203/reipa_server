import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../../components/Title';
import Strings from "../../constants/strings";

import StatisticService from "../../services/statistic.service";
import Helpers from '../../commons/helpers';
const statisticService = new StatisticService();

function preventDefault(event) {
    event.preventDefault();
}

export default function PostOnDay(props) {

    const startd = props.startDate;
    const endd = props.endDate;

    const [count, setCount] = React.useState();
    const countAccount = async (startd, endd) => {
        const result = await statisticService.getPostMonth(startd, endd);
        setCount(result.data);

    }
    React.useEffect(() => {
        if (startd && endd)
            countAccount(startd, endd);
    }, [startd])

    return (
        <React.Fragment>
            <Title>Số lượng bài đăng</Title>
            <Typography component="p" variant="h4">
                {count || 0}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    {Strings.Statistics.DETAIL}
                </Link>
            </div>
        </React.Fragment>
    );
}