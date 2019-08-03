var CleanCSS, Crass, CssPurge, Cssmin, Cssnano, Csso, MoreCss, Sqwish, Uglifycss, _960, animate, bootstrap, cleancss, crass, cssmin, cssnano, csso, csspurge, engines, fs, max_minify, min, minstr, sqwish, uglifycss;

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

cssnano = function(css) {
  return Cssnano.process(css).then(function(result) {
    result.css;
  });
};

cleancss = function(css) {
  return CleanCSS.minify(css).styles;
};

csso = function(css) {
  return Csso.minify(css).css;
};

crass = function(css) {
  var optimized, parsed;
  parsed = Crass.parse(css);
  optimized = parsed.optimize({
    o1: true
  });
  return optimized.toString();
};

sqwish = function(css) {
  return Sqwish.minify(css, true);
};

uglifycss = function(css) {
  return Uglifycss.processString(css);
};

csspurge = function(css) {
  var retval;
  retval = void 0;
  CssPurge.purgeCSS(css, {}, function(error, result) {
    if (error) {
      console.log(error);
    } else {
      retval = result;
    }
  });
  return retval;
};

cssmin = function(css) {
  return Cssmin(css);
};

fs = require('fs');

bootstrap = fs.readFileSync('./bootstrap.css', 'utf8');

_960 = fs.readFileSync('./bootstrap.css', 'utf8');

animate = fs.readFileSync('./animate.css', 'utf8');

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
    } catch (error1) {
      return css;
    }
  })());
};

min = 2e308;

minstr = '';

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
    console.log(min);
    console.log(minstr);
    minstr = str;
  }
  i = 0;
  while (i <= 5) {
    max_minify(depth, cdepth + 1, i, str, css);
    ++i;
  }
};

max_minify(5, 0, 0, '', animate);
