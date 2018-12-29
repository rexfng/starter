function parseHash(hashString) {
    var hash = {};
    var pairs = (hashString[0] === '#' ? hashString.substr(1) : hashString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        hash[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return hash;
}

module.exports = parseHash