let userInfo = getUserInfo();

function getUserInfo() {
    $.getJSON('https://api.ipdata.co?api-key=0b23480bf0183c335414591d11fae1a158d2b46233076447899639f5',
        function (userInfosIp) {
            userInfo = userInfosIp;
        });
}

function initUserInfo() {
    if (userInfo === null || userInfo === undefined)
        return getUserInfo();
}

function getUserInfoField(field) {
    initUserInfo();
    return userInfo[field];
}

function getUserIpAddress() {
    return getUserInfoField('ip');
}

function getUserCity() {
    return getUserInfoField('city');
}

function getUserRegion() {
    return getUserInfoField('region');
}

function getUserCountryName() {
    return getUserInfoField('country_name');
}

function getUserCountryCode() {
    return getUserInfoField('country_code');
}

function getUserContinentName() {
    return getUserInfoField('continent_name');
}

function getUserContinentCode() {
    return getUserInfoField('continent_code');
}

function getUserLatitude() {
    return getUserInfoField('latitude');
}

function getUserLongitude() {
    return getUserInfoField('longitude');
}

function getUserCallingCode() {
    return getUserInfoField('calling_code');
}

function getUserCountryFlag() {
    return getUserInfoField('flag');
}

function getUserCountryFlagEmoji() {
    return getUserInfoField('emoji_flag');
}

function getUserInternetProvider() {
    return getUserInfoField('asn')['name'];
}

function getUserLanguage() {
    return getUserInfoField('languages')[0];
}

function getUserCurrencyName() {
    return getUserInfoField('currency')['name'];
}

function getUserCurrencyCode() {
    return getUserInfoField('currency')['code'];
}

function getUserCurrencySymbol() {
    return getUserInfoField('currency')['symbol'];
}

function getUserCurrencyPlural() {
    return getUserInfoField('currency')['plural'];
}

function getUserTimeZoneName() {
    return getUserInfoField('time_zone')['name'];
}

function getUserTimeZoneAbbr() {
    return getUserInfoField('time_zone')['abbr'];
}

function getUserTimeZoneOffset() {
    return getUserInfoField('time_zone')['offset'];
}

function getUserTimeZoneTimeAccess() {
    return getUserInfoField('time_zone')['current_time'];
}

function getUserUseTor() {
    return getUserInfoField('threat')['is_tor'];
}

function getUserUseProxy() {
    return getUserInfoField('threat')['is_proxy'];
}

function getUserIsAnonymous() {
    return getUserInfoField('threat')['is_anonymous'];
}

function getUserIsAtacker() {
    return getUserInfoField('threat')['is_known_attacker'];
}

function getUserIsAbuser() {
    return getUserInfoField('threat')['is_known_abuser'];
}

function getUserIsBogon() {
    return getUserInfoField('threat')['is_bogon'];
}


