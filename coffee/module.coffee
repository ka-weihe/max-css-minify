CleanCSS = require('clean-css')
CleanCSS = new CleanCSS(level: 2: all: true)
Csso = require('csso')
Crass = require('crass')
Sqwish = require('sqwish')
Uglifycss = require('uglifycss')
CssPurge = require('css-purge')
MoreCss = require('more-css')
Cssmin = require('ycssmin').cssmin
Cssnano = require('cssnano');
fs = require('fs')

# Files
bootstrap = fs.readFileSync('./bootstrap.css', 'utf8')
_960 = fs.readFileSync('./bootstrap.css', 'utf8')
animate = fs.readFileSync('./animate.css', 'utf8')

# Minifiers
cleancss = (css) =>
  CleanCSS.minify(css).styles

csso = (css) =>
  Csso.minify(css).css

crass = (css) =>
  parsed = Crass.parse(css)
  optimized = parsed.optimize(o1: true)
  optimized.toString()

sqwish = (css) =>
  Sqwish.minify css, true

uglifycss = (css) =>
  Uglifycss.processString css

cssmin = (css) =>
  Cssmin css

# Minifier routing
engines = (n, css) ->
  return (
    try switch n
      when 0 then cleancss css
      when 1 then csso css
      when 2 then sqwish css
      when 3 then crass css
      when 4 then uglifycss css
      when 5 then cssmin css
    catch 
      css)

min = 2e308
minstr = ''
mincss = ''

max_minify = (depth, cdepth, minifier, str, css) =>
  i = undefined
  if depth < cdepth
    return
  str += minifier + ' '
  css = engines(minifier, css)
  if Buffer.byteLength(css, 'utf8') < min
    min = Buffer.byteLength(css, 'utf8')
    minstr = str
    mincss = css
  i = 0
  while i <= 5
    max_minify depth, cdepth + 1, i, str, css
    ++i
  return mincss

console.log (max_minify 5, 0, 0, '', animate)