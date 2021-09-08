class Responsecompression {
  static encrypt(c) {
    var s = Buffer.from(JSON.stringify({ ...c })).toString("base64");
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i = 1; i < data.length; i++) {
      currChar = data[i];
      if (dict[phrase + currChar] != null) {
        phrase += currChar;
      } else {
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        dict[phrase + currChar] = code;
        code++;
        phrase = currChar;
      }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    return out;
  }
  static MainDecrypt(b) {
    var data = b;
    var dict = {};
    var currChar = String.fromCharCode(data[0]);
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i = 1; i < data.length; i++) {
      var currCode = data[i];
      if (currCode < 256) {
        phrase = String.fromCharCode(data[i]);
      } else {
        phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
      }
      out += phrase;
      currChar = phrase[0];
      dict[code] = oldPhrase + currChar;
      code++;
      oldPhrase = phrase;
    }
    return out;
  }
  static decrypt(d) {
    return JSON.parse(
      Buffer.from(this.MainDecrypt(d).toString(), "base64").toString("utf-8")
    );
  }
  static middleware(req, res, next) {
    if (req.headers["x-is-comprised"]) {
      req.body = JSON.parse(this.decrypt(req.body));
    }
    return next();
  }
}
module.exports = Responsecompression;