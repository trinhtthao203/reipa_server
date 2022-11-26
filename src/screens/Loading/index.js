import CircularProgress from "@mui/material/CircularProgress"
import Constants from "../../constants"

const Loading = (props) => {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <CircularProgress style={{ color: props.color || Constants.Styles.BLACK_COLOR }} />
        </div>
    )
}

export default Loading