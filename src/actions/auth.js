import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	SIGNUP_SUCCESS,
	SIGNUP_FAILED,
	SIGNUP_REQUEST,
	LOGOUT_SUCCESS, } from '../actions/actionTypes';

import {API_URL} from '../config/constants'

import axios from 'axios';

export const emailChanged = (email) => {
  return {
    type: 'EMAIL_CHANGED',
    payload: email
  };
};

export const passwordChanged = (password) => {
  return {
    type: 'PASSWORD_CHANGED',
    payload: password
  };
};

export const passwordConfirmationChanged = (password_confirmation) => {
  return {
    type: 'PASSWORD_CONFIRMATION_CHANGED',
    payload: password_confirmation
  };
};

export const usernameChanged = (username) => {
  return {
    type: 'USERNAME_CHANGED',
    payload: username
  };
};

export const phoneChanged = (phone) => {
  return {
    type: 'PHONE_CHANGED',
    payload: phone
  };
};

export const competenceChanged = (competence) => {
  return {
    type: 'COMPETENCE_CHANGED',
    payload: competence
  };
};

export const addressChanged = (address) => {
  return {
    type: 'ADDRESS_CHANGED',
    payload: address
  };
};

export const agreementChanged = (agreement_status) => {
  return {
    type: 'AGREEMENT_CHANGED',
    payload: agreement_status
  };
};

export const userLogin = ( {email, password} ) => {
	return dispatch => {
		dispatch(loginRequest());
		const config = {
		  headers: {
			    "Content-Type": "application/x-www-form-urlencoded",
			    "Cache-Control": "no-cache"
			  }
		};
		var postData = new FormData();
		postData.append("email", email);
		postData.append("senha", password);
		postData.append("request", "processes");

		axios.post(`${API_URL}login`, postData, config)
		.then(response => {
			if(response.data.id){
				dispatch(loginSuccess(response.data));

			} else {
				dispatch(loginFailed(401));
			}
			console.log('response json: ', response.data);
			
			// console.log(response.data.email);
			// console.log(response.data.authentication_token);
			// console.log(response);
		})
		.catch(error => {
			
			if (error.response) {
				console.log(error.response.status);
				dispatch(loginFailed(error.response.status))
			} else if (error.request) {
					console.log(error.request);
				// 	console.log('Error request', error.request.status);
				// 	console.log('Error request', error.request._response);
				dispatch(loginFailed(error.request.status))
			} else {
					console.log('Error', error.message);
				// 	console.log('Error ', error.request.status);
				dispatch(loginFailed(error.request.status))
			}
		    // console.log(error.config);
		});
	}
}

export const userSignup = ( {email, password, password_confirmation, username, phoneArea, phone, competence, address, agreement_status} ) => {
	return dispatch => {
		dispatch(signupRequest());
		dispatch(loginRequest());
		const config = {
		  headers: {
			    "Content-Type": "application/x-www-form-urlencoded",
			  }
		};
		var postData = new FormData();
		postData.append("email", email);
		postData.append("senha", password);
		postData.append("nome", username);
		postData.append("competencia", competence);
		postData.append("telefone", '(' + phoneArea + ')' + phone);
		postData.append("endereco", address);

		axios.post(`${API_URL}cadastro_usuario`, postData, config)
		.then(response => {
			dispatch(signupSuccess(response.data))
		})
		.catch(error => {
			if (error.response) {
				const email_message = '';
				const password_message = '';
				
				if (error.response.status == 401) {
					if (error.response.data.error.email) {
						email_message = '' + error.response.data.error.email[0] + ' ';
					}
					if (error.response.data.error.password) {
						password_message = '' + error.response.data.error.password[0] + ' ';
					}
					console.log(email_message + password_message);
				} else {
					console.log(error.response);
				}
				console.log(error.response.status);
				dispatch(signupFailed(error.response.status, email_message + password_message));
			} else if (error.request) {
				console.log(error.request);
				dispatch(signupFailed(error.request.status, ''))
			} else {
				console.log('Error', error.message);
				dispatch(signupFailed(error.request.status, ''))
			}
		});
	}
}

export const userLogout = () => {
	return dispatch => {
		dispatch(logoutSuccess());
		this._setAuthentication_tokenToNull().done();
	}
}

_setAuthentication_tokenToNull = async () => {
    try {
      await AsyncStorage.setItem('@authentication_token:key', 'asd');
      this.props.navigation.navigate('drawerStack');
    } catch (error) {
      // Error saving data
    }
}

export const loginRequest = () => ({
	type: LOGIN_REQUEST,
});
export const loginSuccess = (data) => ({
	type: LOGIN_SUCCESS,
	email: data.email,
	password: data.password
});
export const loginFailed = (status) => ({
	type: LOGIN_FAILED,
	error_status: status
});

export const signupRequest = () => ({
	type: SIGNUP_REQUEST,
});
export const signupSuccess = (data) => ({
	type: SIGNUP_SUCCESS,
	authentication_token: data.authentication_token,
	email: data.email,
	username: data.username,
	area_id: data.area_id,
	card_number: data.card_number
});
export const signupFailed = (error_status, error_message) => ({
	type: SIGNUP_FAILED,
	error_status: error_status,
	error_message: error_message
});

export const logoutSuccess = () => ({
	type: LOGOUT_SUCCESS,
});