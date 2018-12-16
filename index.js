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
    let data = buffer.slice(nextBegin, nextBegin + len);
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
    let date = '20';
    for (let i = 0; i < 13; i += 2) {
      if (i == 12) {
        break;
      }
      let b1 = data[i];
      let b2 = data[i + 1];
      b1 = b1 & 0X0F;
      b2 = b2 & 0X0F;
      date += String(b1 * 10 + b2) + '-';
    }
    date += 'UTC';
    obj[tag] = date;
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

function formatCert(asn1) {
  let obj = {
    'version': '',
    'serial number': '',
    'name of algorithm of signature': '',
    'param of signature': 'NULL',
    'issuer': {},
    'validity': {},
    'subject': {},
    'name of algorithm of subject public key': '',
    'param of algorithm of subject public key' : 'NULL',
    'subject public key': '',
    'name of signature algorithm': '',
    'param of signature algorithm': 'NULL',
    'signature value': ''
  };
  // layer1
  const asn1_1 = asn1['SEQUENCE'];
  let tbsCert = {};
  const keys = Object.keys(asn1_1);
  for (let i in keys) {
    if (i == 0) {
      tbsCert = asn1_1[keys[i]];
    } else if (i == 1) {
      obj['name of signature algorithm'] = asn1_1[keys[i]]['OBJECT IDENTIFIER']['d'];
    } else if (i == 2) {
      let str = '';
      asn1_1[keys[i]].forEach(val => {
        str += val.toString(16);
      });
      obj['signature value'] = str;
    }
  }
  // layer2
  const tbsKeys = Object.keys(tbsCert);
  for (let i in tbsKeys) {
    if (i == 0) {
      const version = tbsCert[tbsKeys[i]]['INTEGER'];
      obj['version'] = 'v' + (version[0] + 1);
    } else if (i == 1) {
      let str = '';
      tbsCert[tbsKeys[i]].forEach(val => {
        str += val.toString(16);
      });
      obj['serial number'] = str;
    } else if (i == 2) {
      obj['name of algorithm of signature'] = tbsCert[tbsKeys[i]]['OBJECT IDENTIFIER']['d'];
    } else if (i == 3) {
      const issuer = tbsCert[tbsKeys[i]];
      for (let key in issuer) {
        let newKey = issuer[key]['SEQUENCE']['OBJECT IDENTIFIER']['d'];
        let newValue = issuer[key]['SEQUENCE']['PrintableString'];
        obj['issuer'][newKey] = newValue;
      }
    } else if (i == 4) {
      const utcTime = tbsCert[tbsKeys[i]];
      let from = utcTime[Object.keys(utcTime)[0]];
      let to = utcTime[Object.keys(utcTime)[1]];
      obj['validity'] = {
        'from' : from,
        'to': to
      };
    } else if (i == 5) {
      const subject = tbsCert[tbsKeys[i]];
      for (let key in subject) {
        let newKey = subject[key]['SEQUENCE']['OBJECT IDENTIFIER']['d'];
        let newValue = '';
        if ('PrintableString' in subject[key]['SEQUENCE']) {
          newValue = subject[key]['SEQUENCE']['PrintableString'];
        } else if ('UTF8String' in subject[key]['SEQUENCE']) {
          newValue = subject[key]['SEQUENCE']['UTF8String'];
        }
        obj['subject'][newKey] = newValue;
      }
    } else if (i == 6) {
      const publicKeyType = tbsCert[tbsKeys[i]]['SEQUENCE'];
      const publicKeyString = tbsCert[tbsKeys[i]]['BIT STRING'];
      obj['name of algorithm of subject public key'] = publicKeyType[Object.keys(publicKeyType)[1]]['d'];
      let str = '';
      publicKeyString.forEach(val => {
        str += val.toString(16);
      });
      obj['subject public key'] = str;
    }
  }
  return obj;
}


let content = fs.readFileSync('./assets/wikipedia.cer');
const result = decodeCert(content, 0, content.length);
console.dir(formatCert(result[0]), { depth: null });