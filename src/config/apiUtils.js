import axios from 'axios';

let apiUtils = {
	userLogin(url, email, password) {
		axios.post(url, {
			email: email,
			password: password
		})
		.then(function (response) {
			console.log(response.data.email);
	        console.log(response.data.authentication_token);
			console.log(response);
		})
		.catch(function (error) {
			if (error.response) {
				console.log(error.response.status);
		    } else if (error.request) {
				console.log(error.request);
		    } else {
				console.log('Error', error.message);
		    }
		    console.log(error.config);
		});
	}
}

module.exports = apiUtils;