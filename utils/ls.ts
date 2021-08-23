export default class Ls {
  prefix = "hdc_ls_";
  userKey = this.prefix + "user_t";
  userToken: string;

  constructor() {
    this.userToken = this.getLs(this.userKey);
  }

  getUserToken() {
    return this.getLs(this.userKey);
  }

  setUserToken(value: string | Object) {
    return this.setLs(this.userKey, value);
  }

  getLs(key: string) {
    return localStorage.getItem(key);
  }

  setLs(key: string, value: string | Object) {
    return localStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value)
    );
  }
}
