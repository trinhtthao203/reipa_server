import * as React from 'react';
import Link from '@mui/material/Link';
import Title from '../../components/Title';
import Typography from '@mui/material/Typography';
import Strings from "../../constants/strings";
import StatisticService from "../../services/statistic.service";
import Helpers from '../../commons/helpers';
const statisticService = new StatisticService();

function preventDefault(event) {
    event.preventDefault();
}

export default function StatisticsPostOnField(props) {
    const startd = props.startDate;
    const endd = props.endDate;
    const province_id = props.provinceID;
    const district_id = props.districtID;
    const ward_id = props.wardID;
    const typeof_post_id = props.typeofPostID;
    const typeof_real_estate_id = props.typeofRealEstateID;

    console.log(ward_id + "++++++++++++")

    const [count, setCount] = React.useState();
    const countPost = async (startd, endd, province_id, district_id, ward_id, typeof_post_id, typeof_real_estate_id) => {
        const result = await statisticService.getPostField(startd, endd, province_id, district_id, ward_id, typeof_post_id, typeof_real_estate_id);
        setCount(result.data);
        console.log(result)
    }
    React.useEffect(() => {
        if (startd && endd) {
            countPost(startd, endd, province_id, district_id, ward_id, typeof_post_id, typeof_real_estate_id);
        }
    }, [startd, typeof_real_estate_id, province_id, ward_id, district_id, typeof_post_id])

    return (
        <React.Fragment>
            <Title>Số lượng bài đăng</Title>
            <Typography component="p" variant="h4">
                {count}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    {Strings.Statistics.DETAIL}
                </Link>
            </div>
        </React.Fragment>
    );
}