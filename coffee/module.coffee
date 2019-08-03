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

cssnano = (css) ->
  Cssnano.process(css).then (result) ->
    result.css
    return

cleancss = (css) ->
  CleanCSS.minify(css).styles

csso = (css) ->
  Csso.minify(css).css

crass = (css) ->
  parsed = Crass.parse(css)
  optimized = parsed.optimize(o1: true)
  optimized.toString()

sqwish = (css) ->
  Sqwish.minify css, true

uglifycss = (css) ->
  Uglifycss.processString css

csspurge = (css) ->
  retval = undefined
  CssPurge.purgeCSS css, {}, (error, result) ->
    if error
      console.log error
    else
      retval = result
    return
  retval

cssmin = (css) ->
  Cssmin css

fs = require('fs')
bootstrap = fs.readFileSync('./bootstrap.css', 'utf8')
_960 = fs.readFileSync('./bootstrap.css', 'utf8')
animate = fs.readFileSync('./animate.css', 'utf8')

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

max_minify = (depth, cdepth, minifier, str, css) ->
  i = undefined
  if depth < cdepth
    return
  str += minifier + ' '
  css = engines(minifier, css)
  if Buffer.byteLength(css, 'utf8') < min
    min = Buffer.byteLength(css, 'utf8')
    console.log min
    console.log minstr
    minstr = str
  i = 0
  while i <= 5
    max_minify depth, cdepth + 1, i, str, css
    ++i
  return

max_minify 5, 0, 0, '', animate