const matchesUrlToBlock = require("../match_url");

describe('matchesUrlToBlock', () => {
    test('valid URLs should return `false`', () => {
        expect(matchesUrlToBlock('https://foo.bar')).toBe(false);
        expect(matchesUrlToBlock('https://google.com')).toBe(false);
        expect(matchesUrlToBlock('https://google.co.jp')).toBe(false);
    });
    
    test('fake URLs of GIMP should return `true`', () => {
        expect(matchesUrlToBlock('https://gіmp.org')).toBe(true);
        expect(matchesUrlToBlock('https://xn--gmp-jhd.org')).toBe(true);
    });
    
    test('fake URLs of Google should return `true`', () => { 
        expect(matchesUrlToBlock('https://ɢoogle.com')).toBe(true);
        expect(matchesUrlToBlock('https://xn--oogle-wmc.com')).toBe(true);
        expect(matchesUrlToBlock('https://ɢoogle.co.jp')).toBe(true);
        expect(matchesUrlToBlock('https://xn--oogle-wmc.co.jp')).toBe(true);
    });
});
