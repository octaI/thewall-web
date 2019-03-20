import {connect} from 'react-redux'
import NavBar  from '../Components/NavBar';
import {removeUserAuth} from "../actions/user";
import {refreshAuth} from "../actions/user";
import {refreshAuthSuccess} from "../actions/user";
import {refreshAuthFailure} from "../actions/user";
import {setRefreshTimerID} from "../actions/user";


const mapStateToProps =  (state) => {
    return {
        username: state.UserState.userData.userName,
        isAuthed: state.UserState.isAuthed,
        refreshToken: state.UserState.refreshToken,
        expiresIn: state.UserState.expiresIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeUserAuth: (refreshTimerID) => {
            clearInterval(refreshTimerID);
            dispatch(removeUserAuth())
        },
        refreshAuth: (refreshToken) => {
            console.log(refreshToken)
            dispatch(refreshAuth(refreshToken)).then( (res) =>{
                dispatch(refreshAuthSuccess(res.payload.data))
            }).catch( (error) => {
                dispatch(refreshAuthFailure(error))
            })
        },
        setRefreshTimerID: (timerID) => {
            dispatch(setRefreshTimerID(timerID))
        },

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)