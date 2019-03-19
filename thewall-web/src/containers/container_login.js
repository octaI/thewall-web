import {connect} from 'react-redux'
import {
    authUser,
    authUserFailure,
    authUserSuccess,
} from "../actions/user";
import Login  from '../Components/Login';


const mapStateToProps =  (state) => {
    return {
        isAuthed: state.UserState.isAuthed,
        authToken: state.UserState.authToken,
        refreshToken: state.UserState.refreshToken,
        expiresIn: state.UserState.expiresIn,
        error: state.UserState.error,
        refreshTimerID: state.UserState.refreshTimerID
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        authUser: (userCredentials) => {
            dispatch(authUser(userCredentials)).then((res) => {
                dispatch(authUserSuccess(res.payload.data));

            }).catch((error) => {
                    dispatch(authUserFailure(error));

                }
            )
        },

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)