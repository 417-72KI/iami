const punycode = require('punycode/');

function matchesUrlToBlock(_url) {  
    const url = new URL(_url);
    // console.log(url);
    if(url.protocol === 'chrome') { return false; }

    // Decode Punycoded host.
    const decodedHost = punycode.toUnicode(url.hostname);
    // Detect `ɢoogle` (fake domain of google)
    // ref: https://gigazine.net/news/20161122-google-is-not-google/
    if(decodedHost.includes('ɢoogle') || url.hostname.includes('xn--oogle-wmc')) { return true; }
    // console.log(decodedHost);
    return decodedHost.includes('і');
}

module.exports = matchesUrlToBlock;
