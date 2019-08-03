var CleanCSS = require('clean-css');
var CleanCSS = new CleanCSS({level: {2: {all: true}}});
var Csso = require('csso');
var Crass = require('crass');
var Sqwish = require('sqwish');
var Uglifycss = require('uglifycss');
var CssPurge = require('css-purge');
var MoreCss = require('more-css');
var Cssmin = require('ycssmin').cssmin

var input = 'a{font-weight:bold;}';
var output = CleanCSS.minify(input);

//console.log(output);

const Cssnano = require('cssnano');

const cssnano = (css) => {
  return Cssnano.process(css).then((result) => result.css)
}

const cleancss = (css) => {
  return CleanCSS.minify(css).styles
}

const csso = (css) => {
  return Csso.minify(css).css;
}

const crass = (css) => {
  var parsed = Crass.parse(css);
  var optimized = parsed.optimize({o1: true});
  return optimized.toString();
}

const sqwish = (css) => {
  return Sqwish.minify(css, true);
}

const uglifycss = (css) => {
  return Uglifycss.processString(css)
}

const csspurge = (css) => {
  var retval;
  CssPurge.purgeCSS(css, {}, function(error, result){
    if (error)
      console.log(error)
    else
      retval = result;
  });
  return retval;
}

const cssmin = (css) => {
  return Cssmin(css)
}

var fs = require('fs');
var bootstrap = fs.readFileSync('./bootstrap.css', "utf8");
var _960 = fs.readFileSync('./bootstrap.css', "utf8");
var animate = fs.readFileSync('./animate.css', 'utf8');

const engines = (async(n, css) => {
  var x;
  x = (((function() {
    switch (n) {
      case 0:
        //x = await cssnano(css);
        return x
      case 1:
        return cleancss(css);
      case 2:
        return csso(css);
      case 3:
        return crass(css);
      case 4:
        return sqwish(css);
      case 5:
        return uglifycss(css);
      // case 6:
      //   return csspurge(css);
      case 6:
        return cssmin(css);
    }
  })()));
  return x
});

var min = Infinity
var minstr = ""
const max_minify = async (depth, cdepth, minifier, str, css) => {
  if (depth < cdepth) return
  str += minifier + ' '

  css = engines(minifier, css)

  if (Buffer.byteLength(css, 'utf8') < min) {
    min = Buffer.byteLength(css, 'utf8')
    minstr = str
    console.log(str)
  }
  for (var i = 0; i < 7; ++i) {
    max_minify(depth, cdepth + 1, i, str, css)
  }
}

max_minify(2, 0, 0, "", animate)




//console.log(engines(1, _960))
// for (var i = 0; i < 8; ++i) {
//
//   engines(i, animate)
// }
