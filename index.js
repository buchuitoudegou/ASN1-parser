const fs = require('fs');
const oids = require('./oids');

const types = {
  0X30: 'SEQUENCE',
  0XA0: '[0]',
  0X02: 'INTEGER',
  0X31: 'SET',
  0X06: 'OBJECT IDENTIFIER',
  0X13: 'PrintableString',
  0X17: 'UTCTime',
  0X05: 'NULL',
  0X03: 'BIT STRING',
  0XA3: '[3]',
  0X04: 'OCTET STRING',
  0X01: 'BOOLEAN',
  0X82: '[2]',
  0X86: '[6]',
  0X0C: 'UTF8String'
}

const LONG_SIGN = 0X82;
const USELESS_SIGN = 0X81;

function decodeCert(buffer, begin, end) {
  let obj = {};
  
  let nextBegin = begin;
  const tag = types[buffer[begin]];
  // console.log(tag);
  nextBegin ++;
  obj[tag] = {};
  let len = buffer[begin + 1];
  nextBegin ++;
  if (len == LONG_SIGN) {
    let view = [];
    view.push(buffer.slice(begin + 2, begin + 3));
    view.push(buffer.slice(begin + 3, begin + 4));
    len = Buffer.concat(view).readUInt16BE(0);
    nextBegin += 2;
  } else if (len == USELESS_SIGN) {
    len = buffer.slice(begin + 2, begin + 3).readUInt8(0);
    nextBegin ++;
  }
  if (tag == 'INTEGER') {
    let data = buffer.slice(nextBegin, end);
    obj[tag] = data;
  } else if (tag == 'OBJECT IDENTIFIER') {
    // console.log('bb');
    let data = buffer.slice(nextBegin, end);
    const V1V2 = Number(data[0]);
    const V1 = Math.floor(V1V2 / 40);
    const V2 = V1V2 - V1 * 40;
    let idx = 1;
    const V = [];
    V.push(V1, V2);
    for (; idx < len;) {
      let temp = [];
      while (true) {
        let b1 = data[idx];
        idx ++;
        let flag = false;
        const judge = 0X7F;
        const result = b1 | judge;
        if (result === 0XFF) {
          temp.push(b1 & 0X7F);
        } else {
          temp.push(b1);
          flag = true;
        }
        if (flag) {
          break;
        }
      }
      let pow = temp.length - 1;
      let num = 0;
      for (let i in temp) {
        num += temp[i] * 128 ** pow;
        pow --;
      }
      V.push(num);
    }
    let str = '';
    V.forEach((val, idx) => {
      if (idx != V.length - 1) {
        str += String(val);
        str += '.';
      } else {
        str += String(val);
      }
    });
    obj[tag] = oids[str];
    
  } else if (tag == 'PrintableString' || tag == '[2]' || tag == '[6]'
  || tag == 'UTF8String') {
    let data = buffer.slice(nextBegin, end);
    data = data.toString();
    obj[tag] = data;
  } else if (tag == 'UTCTime') {
    let data = buffer.slice(nextBegin, end);
    let date = '';
    for (let i = 0; i < data.length; i += 2) {
      if (i == data.length - 1) {
        break;
      }
      let b1 = data[i];
      let b2 = data[i + 1];
      b1 = b1 & 0X0F;
      b2 = b2 & 0X0F;
      date += String(b1 * 10 + b2) + '-';
    }
    date += 'UTC';
  } else if (tag == 'BOOLEAN') {
    obj[tag] = '';
  } else if (tag == 'BIT STRING') {
    obj[tag] = buffer.slice(nextBegin, end);
  } else if (tag == 'OCTET STRING') {
    obj[tag] = buffer.slice(nextBegin, end);
  } else if (tag == 'NULL') {
    obj[tag] = '';
  } else {
    for (let i = 0; i < len;) {
      const result = decodeCert(buffer, nextBegin + i, nextBegin + len);
      const r1 = result[0];
      const key = Object.keys(r1)[0];
      if (key in obj[tag]) {
        obj[tag][key + `${i}`] = r1[key];
      } else {
        obj[tag][key] = r1[key];
      }
      i += result[1];
    }
  }
  return [obj, nextBegin - begin + len];
}

let content = fs.readFileSync('./facebook.cer');
// content = content.slice(192, 192 + 2 + 105);

const result = decodeCert(content, 0, content.length);
console.log(result[0]);