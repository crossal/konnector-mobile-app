// https://jasonwatmore.com/post/2020/04/18/fetch-a-lightweight-fetch-wrapper-to-simplify-http-requests

class FetchWrapper {

  constructor(handleUnauth) {
    this.handleUnauth = handleUnauth;
  }

  get = (url) => {
    const requestOptions = {
      method: 'GET'
    };
    return fetch(url, requestOptions).then(this.handleResponse);
  }

  post = (url, body) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(this.handleResponse);
  }

  put = (url, body) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(this.handleResponse);
  }

  delete = (url) => {
    const requestOptions = {
      method: 'DELETE'
    };
    return fetch(url, requestOptions).then(this.handleResponse);
  }

  handleResponse = (response) => {
    return response.text().then(text => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        const error = (data && data.message) || response.statusText;

        console.log("FetchWrapper invalid response, status: " + response.status + ", error: " + error);

        if (response.status == 401) {
         this.handleUnauth();
        }

        return Promise.reject(error);
      }

      return data;
    });
  }
}

export default FetchWrapper;
