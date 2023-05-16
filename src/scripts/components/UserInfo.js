//класс отвечает за управление отображением информации о пользователе на странице
export default
  class UserInfo {
  constructor(configInfo) {
    //nринимает объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
    this._nameProfile = document.querySelector(configInfo.nameProfileSelector);
    this._jobProfile = document.querySelector(configInfo.jobProfileSelector);
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return { username: this._nameProfile.textContent, job: this._jobProfile.textContent }
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userData) {
    this._nameProfile.textContent = userData.username;
    this._jobProfile.textContent = userData.job;
  }
}


