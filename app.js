var CleanCSS, Crass, CssPurge, Cssmin, Cssnano, Csso, MoreCss, Sqwish, Uglifycss, _960, animate, bootstrap, cleancss, crass, cssmin, csso, engines, fs, max_minify, min, mincss, minstr, sqwish, uglifycss;

CleanCSS = require('clean-css');

CleanCSS = new CleanCSS({
  level: {
    2: {
      all: true
    }
  }
});

Csso = require('csso');

Crass = require('crass');

Sqwish = require('sqwish');

Uglifycss = require('uglifycss');

CssPurge = require('css-purge');

MoreCss = require('more-css');

Cssmin = require('ycssmin').cssmin;

Cssnano = require('cssnano');

fs = require('fs');

// Files
bootstrap = fs.readFileSync('./bootstrap.css', 'utf8');

_960 = fs.readFileSync('./bootstrap.css', 'utf8');

animate = fs.readFileSync('./animate.css', 'utf8');

// Minifiers
cleancss = (css) => {
  return CleanCSS.minify(css).styles;
};

csso = (css) => {
  return Csso.minify(css).css;
};

crass = (css) => {
  var optimized, parsed;
  parsed = Crass.parse(css);
  optimized = parsed.optimize({
    o1: true
  });
  return optimized.toString();
};

sqwish = (css) => {
  return Sqwish.minify(css, true);
};

uglifycss = (css) => {
  return Uglifycss.processString(css);
};

cssmin = (css) => {
  return Cssmin(css);
};

// Minifier routing
engines = function(n, css) {
  return ((function() {
    try {
      switch (n) {
        case 0:
          return cleancss(css);
        case 1:
          return csso(css);
        case 2:
          return sqwish(css);
        case 3:
          return crass(css);
        case 4:
          return uglifycss(css);
        case 5:
          return cssmin(css);
      }
    } catch (error) {
      return css;
    }
  })());
};

min = 2e308;

minstr = '';

mincss = '';

max_minify = function(depth, cdepth, minifier, str, css) {
  var i;
  i = void 0;
  if (depth < cdepth) {
    return;
  }
  str += minifier + ' ';
  css = engines(minifier, css);
  if (Buffer.byteLength(css, 'utf8') < min) {
    min = Buffer.byteLength(css, 'utf8');
    minstr = str;
    mincss = css;
    console.log(minstr)
  }
  i = 0;
  while (i <= 5) {
    max_minify(depth, cdepth + 1, i, str, css);
    ++i;
  }
  return mincss;
};

console.log(max_minify(5, 0, 0, '', animate));
