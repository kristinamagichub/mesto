//класс отвечает за управление отображением информации о пользователе на странице
export default
  class UserInfo {
  constructor(configInfo) {
    //nринимает объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
    this._nameProfile = document.querySelector(configInfo.nameProfileSelector);
    this._jobProfile = document.querySelector(configInfo.jobProfileSelector);
    this._profileAvatar = document.querySelector(configInfo.profileAvatar);
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return { username: this._nameProfile.textContent, job: this._jobProfile.textContent }
  }

  //принимает новые данные пользователя и добавляет их на страницу
  //сервер отдает объект пользователя в полном его виде, то мы можем использовать один и тот же метод в 3х местах - в изменении аватара, в изменении информации о себе, при загрузке страницы
  setUserInfo({ username, job, avatar }) {
    this._profileAvatar.src = avatar;
    this._nameProfile.textContent = username;
    this._jobProfile.textContent = job;
  }


  setUserId(id) {
    this._id = id;
  }

  getUserId() {
    return this._id;
  }
}
