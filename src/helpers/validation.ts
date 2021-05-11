/* eslint-disable max-len */
export function validation(type: string, value: string): boolean {
  const dateReg = /^((((0?[1-9]-(0?[1-9]|1[0-2]))|([12][0-9]-((0?[13-9])|1[0-2]))|(((1[0-9])|(2[0-8]))-0?2)|(30-((0?[13-9])|1[0-2]))|(31-((0?[13578])|10|12)))-[0-9]{4})|(29-0?2-(([0-9]{2}((0[48])|([2468][048])|([13579][26])))|((([02468][048])|([13579][26]))00))))$/gm;
  const nameReg = /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/gm;


  if (type === 'date') {
    const date: string = value.split('.').join('-');
    const dateRev: string = value.split('.').reverse().join('-');
    const flag: boolean = dateReg.test(date);
    if (flag && Date.parse(dateRev) - Date.now() > 0) {
      return true;
    }
    return false;
  }

  if (type === 'name') {
    const name: Array<string> = value.split(' ');
    if (name.length === 3) {
      let res = true;
      name.forEach((item: string): void => {
        res = nameReg.test(item);
      });
      return res;
    }
    return false;
  }

  return true;
}

