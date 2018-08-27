/**
 * @method save
 * @method saveMulti
 * @method read
 * @method readMulti
 * @method clear
 * @method clearMulti
 */
class Storage {
  constructor(type = 'localStorage') {
    if (['sessionStorage', 'localStorage'].indexOf(type) === -1) {
      throw console.error('Type can only be session/local storage');
    }
    this.storage = window[type];
  }

  save(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  saveMulti(datas) {
    if (datas instanceof Array) {
      for (const item of datas) {
        this.save(item.key, item.value);
      }
    } else if (datas instanceof Object) {
      const keys = Object.keys(datas);
      for (const key of keys) {
        this.save(key, datas[key]);
      }
    }
  }

  read(key) {
    try {
      let result = JSON.parse(this.storage.getItem(key));
      return result;
    } catch (err) {
      return this.storage.getItem(key);
    }
  }

  readMulti(keys) {
    return keys.map(key => this.read(key));
  }

  clear(key) {
    this.storage.removeItem(key);
  }

  clearMulti(keys) {
    for (const key of keys) {
      this.clear(key);
    }
  }

  clearAll() {
    this.storage.clear();
  }
}

export const sessionStorage = new Storage('sessionStorage');
export const localStorage = new Storage('localStorage');
