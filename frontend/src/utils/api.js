class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = options.baseUrl;
    this._headerAuthorization = options.headers.authorization;
    this._contentType = options.headers['Content-Type'];
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }


  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse);
  }

  insertNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return this.deleteLike(id);
    } else {
      return this.putLike(id);
    }
  }



  putLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: data.link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headerAuthorization,
        'Content-Type': this._contentType
      }

    })
      .then(this._checkResponse);
  }
}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25/',
  headers: {
    authorization: 'bbfa3ff1-62aa-4f58-bfbd-0546f73cf56a',
    'Content-Type': 'application/json'
  }
});
export default api;