export default class UserInfo {
  constructor({
    profileNameSelector,
    profileDescriptionSelector,
    profileAvatarSelector,
  }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo(name, description) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
  }
}
