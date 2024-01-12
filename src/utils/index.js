
import moment from 'moment'

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
export function timeFormat (data, format = 'YYYY-MM-DD HH:MM:SS') {
  if (!data) {
    return ''
  }
  if (data) {
    if (typeof data == 'number') {
      data = String(data)
    }
    if (data.length) {
      if (data.length == 10) {
        data = Number(data * 1000)
      } else if (data.length == 13) {
        data = Number(data)
      }
    }
    let date = new Date(data)
    let year = date.getFullYear()
    let month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    let minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    let seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
  } else {
    return '-'
  }
}
// 千位数字每三位加逗号
export function thousandsComma (num) {
  let Num = (num || 0).toString();
  let symbol = '';
  if (new RegExp(/^\+|^-/).test(Num)) {
    symbol = Num.substr(0, 1);
    Num = Num.substr(1);
  }
  let number = 0;
  let floatNum = '';
  let intNum = '';
  // 判断是否有小数位，有则截取小数点后的数字
  if (Num.indexOf('.') > 0) {
    number = Num.indexOf('.'); // 获取小数点出现的位置
    floatNum = Num.substr(number); // 截取arr.substr(form, length)
    intNum = Num.substring(0, number); // 截取arr.substring(start, end)
  } else {
    intNum = Num;
  }
  const result = [];
  let counter = 0;
  intNum = intNum.split('');
  // 利用3的倍数，向数组插入','
  for (let i = intNum.length - 1; i >= 0; i -= 1) {
    counter += 1;
    result.unshift(intNum[i]);
    if (!(counter % 3) && i !== 0) { result.unshift(','); }
  }
  return symbol + result.join('') + floatNum || '';
};
// 乘法
export function nul(arg1, arg2) {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {
    // console.log(e);
  }
  try {
    m += s2.split('.')[1].length;
  } catch (e) {
    // console.log(e);
  }
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / (10 ** m));
}
//  除法
export function division(arg1, arg2) {
  let t1 = 0;
  let t2 = 0;
  let r1 = 0;
  let r2 = 0;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    // console.log(e);
  }
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {
  //  console.log(e);
  }
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * (10 ** (t2 - t1));
}
// 精度计算
export const fixD = (num, precision) => {
  // num初始化
  if (`${num}` === '0') {
    if (!window.parseFloat(precision)) {
      return 0;
    }
    return '0.'.padEnd(precision + 2, '0');
  }
  if (!num) {
    return '--';
  }
  // 暂用 ----
  // if (num.length > 14) {
  //   let rNum = num.slice(0, 14);
  //   if (num[13] === '.') {
  //     rNum = rNum.slice(0, 13);
  //   }
  //   return `${rNum}+`;
  // }
  // ----------
  let flag = false;
  if (parseFloat(num) < 0) {
    flag = true;
  }

  const newnum = `${Math.abs(parseFloat(num))}`;
  if (newnum === 'NaN') {
    return '--';
  }
  let fixNum = newnum;
  // 科学计数法计算
  if (newnum.toLowerCase().indexOf('e') > -1) {
    if (newnum.toLowerCase().indexOf('+') > -1) return fixDEAdd(newnum, precision);
    const a = newnum.toLowerCase().split('e');
    let b = a[0];
    const c = Math.abs(parseFloat(a[1]));
    let d = '';
    let h = b.length;
    let i;
    if (a[0].split('.')[1]) {
      b = a[0].split('.')[0] + a[0].split('.')[1];
      h = a[0].split('.')[0].length;
    }
    for (i = 0; i < c - h; i += 1) {
      d += '0';
    }
    fixNum = `0.${d}${b}`;
  }
  // 精度格式化
  // precision初始化
  if (`${precision}` !== '0' && !precision) {
    return (flag ? '-' : '') + fixNum;
  }
  if (`${parseFloat(num)}` === 'NaN') {
    return (flag ? '-' : '') + fixNum;
  }
  const fNum = fixNum.split('.');
  if (precision === 0) {
    fixNum = parseInt(fixNum, 10);
  } else if (precision > 0 && fNum[1]) {
    if (fNum[1].length > precision) {
      if (fNum[1].indexOf('999999999') > -1) {
        const s = parseFloat(fixNum).toFixed(precision + 1);
        fixNum = s.slice(0, s.length - 1);
      } else {
        fixNum = `${fNum[0]}.${fNum[1].slice(0, precision)}`;
      }
    } else {
      fixNum = parseFloat(fixNum).toFixed(precision);
    }
  } else {
    fixNum = parseFloat(fixNum).toFixed(precision);
  }
  if (fixNum.length >= 14 && fixNum.indexOf('.') > -1) {
    const arry = fixNum.split('.');
    if (arry[0].length > 14) {
      fixNum = `${arry[0].slice(0, 14)}+`;
    } else {
      fixNum = fixNum.slice(0, 13);
      if (fixNum.indexOf('.') === 12) {
        fixNum = fixNum.slice(0, 12);
      }
    }
  }
  return (flag ? '-' : '') + fixNum;
};
// 计算小数点后面的数量
export const getDigit = (num) => {
  const arr = String(num).split('.');
  if (arr.length < 2) {
    return 0;
  }
  return arr[1].length;
};
export function dateFormat (data) {
  if (!data) {
    return ''
  }
  if (data) {
    if (typeof data == 'number') {
      data = String(data)
    }
    if (data.length) {
      if (data.length == 10) {
        data = Number(data * 1000)
      } else if (data.length == 13) {
        data = Number(data)
      }
    }
    let date = new Date(data)
    let year = date.getFullYear()
    let month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    let minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    let seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
    return year + '-' + month + '-' + day
  } else {
    return '-'
  }
}
export const saveBlobAsFile = function (res, fileName) {
  let headers = res.headers
  let contentDisposition = ''
  if (headers['Content-Disposition'] !== undefined) {
    contentDisposition = headers['Content-Disposition'].replace(/["|']/g, '')
  } else {
    contentDisposition = headers['content-disposition'].replace(/["|']/g, '')
  }
  let matched = /filename=(.*)/g.exec(contentDisposition)
  let filename = fileName || decodeURI(matched[1])
  let blob = res.data
  let reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = (e) => {
    let a = document.createElement('a')
    a.download = filename
    a.href = e.target.result
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
export function getObjOption (data) {
  let arr = []
  for (let key in data) {
    arr.push({
      label: data[key],
      id: key
    })
  }
  return arr
}
