import {connect} from 'react-redux'
import RegisterForm from '../Components/RegisterForm'
import {registerUser,registerUserFailure,registerUserSuccess} from "../actions/user";

const mapStateToProps = (state) => {
    return {
        loading: state.UserState.loading,
        error: state.UserState.error,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (userInfo) => {
            dispatch(registerUser(userInfo)).then((res) => {
                dispatch(registerUserSuccess(res.payload.data))
            }).catch((error) => {
                dispatch(registerUserFailure(error))
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm)