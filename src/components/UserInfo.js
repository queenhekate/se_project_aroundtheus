export default class UserInfo {
  constructor({ title, description, avatar }) {
    this._title = document.querySelector(title);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
    this._defaultAvatar = "src/images/default-avatar.jpg"; // Default avatar
  }

  getUserInfo() {
    return {
      title: this._title.textContent,
      description: this._description.innerText,
      avatar: this._avatar.src || this._defaultAvatar,
    };
  }

  setUserInfo({ title, description, avatar }) {
    if (title) this._title.textContent = title;
    if (description) this._description.innerText = description;
    this.changeAvatar(avatar);
  }

  changeAvatar(avatarUrl) {
    this._avatar.src = avatarUrl || this._defaultAvatar;
  }
}
