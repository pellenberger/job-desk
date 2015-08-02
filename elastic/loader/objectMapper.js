;
(function () {

  exports.mapjobs = function (data) {
    return {
      "fingerprint": data.FINGERPRINT,
      "title": {
        "de": data.BEZEICHNUNG,
        "fr": '[FR] ' + data.BEZEICHNUNG,
        "it": '[IT] ' + data.BEZEICHNUNG,
        "en": '[EN] ' + data.BEZEICHNUNG
      },
      "description": {
        "de": data.BESCHREIBUNG,
        "fr": '[FR] ' + data.BESCHREIBUNG,
        "it": '[IT] ' + data.BESCHREIBUNG,
        "en": '[EN] ' + data.BESCHREIBUNG
      },
      "iscoMajorGroup": data.ISCO_08_GROUP1,
      "iscoGroupLevel2": data.ISCO_08_GROUP2,
      "locations": [
        {
          "coords": {
            "lon": data.LAT,
            "lat": data.LON
          },
          "zip": data.ARBEITSORT_PLZ,
          "remarks": {
            "de": data.ARBEITSORT_TEXT,
            "fr": '[FR] ' + data.ARBEITSORT_TEXT,
            "it": '[IT] ' + data.ARBEITSORT_TEXT,
            "en": '[EN] ' + data.ARBEITSORT_TEXT
          }
        }
      ],
      "fulltime": data.FULLTIME,
      "externalSource": data.EXTERN,
      "onlineSince": data.ONLINE_SEIT,
      "quotaFrom": data.PENSUM_VON,
      "quotaTo": data.PENSUM_BIS,
      "availableNow": data.AB_SOFORT_B,
      "permanentJob": data.UNBEFRISTET_B,
      "startDate": data.STELLENANTRITT,
      "endDate": data.VERTRAGSDAUER,
      "languages": [
        {
          "languageCode": data.SK1_SPRACHE_CODE,
          "writtenCode": data.SK1_MUENDLICH_CODE,
          "spokenCode": data.SK1_SCHRIFTLICH_CODE
        },
        {
          "languageCode": data.SK2_SPRACHE_CODE,
          "writtenCode": data.SK2_MUENDLICH_CODE,
          "spokenCode": data.SK2_SCHRIFTLICH_CODE
        },
        {
          "languageCode": data.SK3_SPRACHE_CODE,
          "writtenCode": data.SK3_MUENDLICH_CODE,
          "spokenCode": data.SK3_SCHRIFTLICH_CODE
        },
        {
          "languageCode": data.SK4_SPRACHE_CODE,
          "writtenCode": data.SK4_MUENDLICH_CODE,
          "spokenCode": data.SK4_SCHRIFTLICH_CODE
        },
        {
          "languageCode": data.SK5_SPRACHE_CODE,
          "writtenCode": data.SK5_MUENDLICH_CODE,
          "spokenCode": data.SK5_SCHRIFTLICH_CODE
        }
      ],
      "application": {
        "written": data.BEWER_SCHRIFTLICH_B,
        "electronical": data.BEWER_ELEKTRONISCH_B,
        "electronicalAddress": data.KP_EMAIL,
        "phone": data.BEWER_TELEFONISCH_B,
        "phoneNumber": data.KP_TELEFON_NR,
        "personal": data.BEWER_PERSOENLICH_B
      },
      "company": {
        "name": data.UNT_NAME,
        "address": {
          "street": data.UNT_STRASSE + ' ' + data.UNT_HAUS_NR,
          "streetAppendix": '',
          "zip": data.UNT_PLZ,
          "location": data.UNT_ORT,
          "country": data.UNT_LAND
        },
        "poAddress": {
          "poBox": data.UNT_POSTFACH,
          "zip": data.UNT_POSTFACH_PLZ,
          "location": data.UNT_POSTFACH_ORT
        },
        "phone": data.UNT_TELEFON,
        "eMail": data.UNT_EMAIL,
        "url": data.UNT_URL
      },
      "contact": {
        "gender": data.KP_ANREDE_CODE,
        "firstName": data.KP_VORNAME,
        "lastName": data.KP_NAME,
        "phone": data.KP_TELEFON_NR,
        "eMail": data.KP_EMAIL
      }
    };
  };

  exports.maplocations = function (data) {
    return {
      name: data.Ortschaftsname,
      zip: data.PLZ,
      additionalNumber: data.Zusatzziffer,
      municipalityName: data.Gemeindename,
      canton: data['Kantonskürzel'],
      geoLocation: {
        lon: data.E,
        lat: data.N
      }
    };
  };

  exports.mapcodes = function (data) {
    return {
      domain: data.DOMAIN,
      sequence: data.ORDERS,
      code: data.CODE,
      text: {
        de: data.TEXT_DE,
        fr: data.TEXT_FR,
        it: data.TEXT_IT,
        de: '[EN] ' + data.TEXT_DE
      }
    };
  };
}());