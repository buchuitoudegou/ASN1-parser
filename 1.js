{ SEQUENCE:
   { SEQUENCE:
      { '[0]': { INTEGER: <Buffer 02> },
        INTEGER:
         <Buffer 0b 3c 3b 60 1a 18 f5 9e e2 b6 bb 05 60 5e f2 c0 30 0d 06 09 2a 86 48 86 f7 0d 01 01 0b 05 00 30 70 31 0b 30 09 06 03 55 04 06 13 02 55 53 31 15 30 13 ... 1377 more bytes>,
        SEQUENCE:
         { 'OBJECT IDENTIFIER': { d: 'sha256WithRSAEncryption', c: 'PKCS #1' },
           NULL: '' },
        SEQUENCE38:
         { SET:
            { SEQUENCE:
               { 'OBJECT IDENTIFIER': { d: 'countryName', c: 'X.520 DN component' },
                 PrintableString: 'US' } },
           SET13:
            { SEQUENCE:
               { 'OBJECT IDENTIFIER': { d: 'organizationName', c: 'X.520 DN component' },
                 PrintableString: 'DigiCert Inc' } },
           SET36:
            { SEQUENCE:
               { 'OBJECT IDENTIFIER': { d: 'organizationalUnitName', c: 'X.520 DN component' },
                 PrintableString: 'www.digiczert.com' } },
           SET63:
            { SEQUENCE:
               { 'OBJECT IDENTIFIER': { d: 'commonName', c: 'X.520 DN component' },
                 PrintableString: 'DigiCert SHA2 High Assurance Server CA' } } },
        SEQUENCE152: { UTCTime: {}, UTCTime15: {} },
        SEQUENCE184:
         { SET:
            { SEQUENCE:
               { 'OBJECT IDENTIFIER': { d: 'countryName', c: 'X.520 DN component' },
                 PrintableString: 'US' } },
           SET13:
            { SEQUENCE:
               { 'OBJECT IDENTIFIER': { d: 'stateOrProvinceName', c: 'X.520 DN component' },
                 PrintableString: 'California' } },
           SET34:
            { SEQUENCE:
               { 'OBJECT IDENTIFIER': { d: 'localityName', c: 'X.520 DN component' },
                 PrintableString: 'Menlo Park' } },
           SET55:
            { SEQUENCE:
               { 'OBJECT IDENTIFIER': { d: 'organizationName', c: 'X.520 DN component' },
                 PrintableString: 'Facebook, Inc.' } },
           SET80:
            { SEQUENCE:
               { 'OBJECT IDENTIFIER': { d: 'commonName', c: 'X.520 DN component' },
                 UTF8String: '*.facebook.com' } } },
        SEQUENCE291:
         { SEQUENCE:
            { 'OBJECT IDENTIFIER': { d: 'ecPublicKey', c: 'ANSI X9.62 public key type' },
              'OBJECT IDENTIFIER9': { d: 'prime256v1', c: 'ANSI X9.62 named elliptic curve' } },
           'BIT STRING':
            <Buffer 00 04 88 03 ce c8 8e aa 8c e8 90 57 a6 e3 76 d0 15 c2 56 c0 e3 a0 ff 70 9c 5d ab 49 5e b4 a8 2d 77 d2 82 d3 ae 07 ce 43 75 24 d5 db f5 47 a2 c5 0b 1e ... 16 more bytes> },
        '[3]':
         { SEQUENCE:
            { SEQUENCE:
               { 'OBJECT IDENTIFIER': { d: 'authorityKeyIdentifier', c: 'X.509 extension' },
                 'OCTET STRING':
                  <Buffer 30 16 80 14 51 68 ff 90 af 02 07 75 3c cc d9 65 64 62 a2 12 b8 59 72 3b> },
              SEQUENCE33:
               { 'OBJECT IDENTIFIER': { d: 'subjectKeyIdentifier', c: 'X.509 extension' },
                 'OCTET STRING':
                  <Buffer 04 14 c0 fd 74 f5 7d cb c6 27 f1 03 d3 62 a2 45 d7 84 1c 15 21 08> },
              SEQUENCE64:
               { 'OBJECT IDENTIFIER': { d: 'subjectAltName', c: 'X.509 extension' },
                 'OCTET STRING':
                  <Buffer 30 81 bc 82 0e 2a 2e 66 61 63 65 62 6f 6f 6b 2e 63 6f 6d 82 0e 2a 2e 78 78 2e 66 62 63 64 6e 2e 6e 65 74 82 0b 2a 2e 66 62 73 62 78 2e 63 6f 6d 82 0e ... 141 more bytes> },
              SEQUENCE266:
               { 'OBJECT IDENTIFIER': { d: 'keyUsage', c: 'X.509 extension' },
                 BOOLEAN: '',
                 'OCTET STRING': <Buffer 03 02 07 80> },
              SEQUENCE282:
               { 'OBJECT IDENTIFIER': { d: 'extKeyUsage', c: 'X.509 extension' },
                 'OCTET STRING':
                  <Buffer 30 14 06 08 2b 06 01 05 05 07 03 01 06 08 2b 06 01 05 05 07 03 02> },
              SEQUENCE313:
               { 'OBJECT IDENTIFIER': { d: 'cRLDistributionPoints', c: 'X.509 extension' },
                 'OCTET STRING':
                  <Buffer 30 6c 30 34 a0 32 a0 30 86 2e 68 74 74 70 3a 2f 2f 63 72 6c 33 2e 64 69 67 69 63 65 72 74 2e 63 6f 6d 2f 73 68 61 32 2d 68 61 2d 73 65 72 76 65 72 2d ... 60 more bytes> },
              SEQUENCE432:
               { 'OBJECT IDENTIFIER': { d: 'certificatePolicies', c: 'X.509 extension' },
                 'OCTET STRING':
                  <Buffer 30 43 30 37 06 09 60 86 48 01 86 fd 6c 01 01 30 2a 30 28 06 08 2b 06 01 05 05 07 02 01 16 1c 68 74 74 70 73 3a 2f 2f 77 77 77 2e 64 69 67 69 63 65 72 ... 19 more bytes> },
              SEQUENCE510:
               { 'OBJECT IDENTIFIER': { d: 'authorityInfoAccess', c: 'PKIX private extension' },
                 'OCTET STRING':
                  <Buffer 30 75 30 24 06 08 2b 06 01 05 05 07 30 01 86 18 68 74 74 70 3a 2f 2f 6f 63 73 70 2e 64 69 67 69 63 65 72 74 2e 63 6f 6d 30 4d 06 08 2b 06 01 05 05 07 ... 69 more bytes> },
              SEQUENCE644:
               { 'OBJECT IDENTIFIER': { d: 'basicConstraints', c: 'X.509 extension' },
                 BOOLEAN: '',
                 'OCTET STRING': <Buffer 30 00> },
              SEQUENCE658:
               { 'OBJECT IDENTIFIER': undefined,
                 'OCTET STRING':
                  <Buffer 04 82 01 6a 01 68 00 76 00 a4 b9 09 90 b4 18 58 14 87 bb 13 a2 cc 67 70 0a 3c 35 98 04 f9 1b df b8 e3 77 cd 0e c8 0d dc 10 00 00 01 60 57 9c 41 e8 00 ... 316 more bytes> } } } },
     SEQUENCE1438:
      { 'OBJECT IDENTIFIER': { d: 'sha256WithRSAEncryption', c: 'PKCS #1' },
        NULL: '' },
     'BIT STRING':
      <Buffer 00 6b b4 bb 16 43 f8 84 57 5e 51 56 2c fb e4 9d 19 17 03 b2 74 f0 dc 95 28 6e f4 33 6b c3 8b 6c 45 d9 80 7c aa 56 60 a3 15 bc 62 28 95 f3 a2 29 c2 d3 ... 207 more bytes> } }
