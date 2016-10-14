export  default class User {
  constructor() {
    this.email = '';
    this.uid = '';
    this.connected = false;
  }

  setData(email, uid) {
    this.email = email;
    this.uid = uid;
    this.connected = true;
  }

  disconnect() {
    this.email = '';
    this.uid = '';
    this.connected = false;
  }
}
