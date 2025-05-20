export default class UserInfo {
  constructor({ title, description, avatar }) {
    this._title = document.querySelector(title);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      title: this._title.textContent,
      description: this._description.innerText,
      avatar: this._avatar.src,
    };
  }

  setUserInfo({ title, description, avatar }) {
    if (title) this._title.textContent = title;
    if (description) this._description.innerText = description;
    if (avatar) this.changeAvatar(avatar);
  }

  changeAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
  }
}
