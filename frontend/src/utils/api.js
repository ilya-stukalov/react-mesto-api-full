import { BASE_URL } from './utils';

class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = options.baseUrl;
    this._contentType = options.headers['Content-Type'];
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }


  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
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
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
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
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: data.link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }
  deleteCookies() {
    return fetch(`${this._baseUrl}/logout`, {
      method: '' +
        'GET',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});
export default api;
