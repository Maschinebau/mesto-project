export default class UserInfo {

  constructor({name, about, avatar, _id}) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name
    this._about.textContent = data.about
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar
  }
}