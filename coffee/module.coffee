fs = require('fs')
Csso = require('csso')
Crass = require('crass')
Sqwish = require('sqwish')
MoreCss = require('more-css')
Uglifycss = require('uglifycss')
Cssmin = require('ycssmin').cssmin
CleanCSS = require('clean-css')
CleanCSS = new CleanCSS(level: 2: all: true)

readFilesSync = (dir) ->
  files = []
  fs.readdirSync(dir).forEach (filename) ->
    files.push(
      [filename, fs.readFileSync  dir + '/' + filename]
    )
  return files

files = readFilesSync './css'

# Minifiers
cleancss = (css) ->
  CleanCSS.minify(css).styles

csso = (css) ->
  Csso.minify(css).css

crass = (css) ->
  parsed = Crass.parse(css)
  optimized = parsed.optimize(o1: true)
  optimized.toString()

sqwish = (css) ->
  Sqwish.minify css, false

uglifycss = (css) ->
  Uglifycss.processString css

# Minifier Routing
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

max_minify = (css, depth, verbose = false) ->
  minSize = 2e308
  minSeq = ''
  minCss = ''

  helper = (cdepth, minifier, seq, css) ->
    css = engines minifier, css
    seq += minifier + ' '
    size = Buffer.byteLength css, 'utf8'

    if size < minSize
      minSize = size
      minSeq = seq
      minCss = css
      fs.writeFileSync 'fil.txt', minCss

      if verbose
        console.log minSize
        console.log minSeq

    for i in [0 .. 5]
      return if depth < cdepth + 1
      helper cdepth + 1, i, seq, css

  for i in [0 .. 5]
    helper 0, i, '', css


# lol = (css) ->
#   a = await crass css
#   b = await sqwish a
#   c = await csso b
#   d = await crass c
#   e = await sqwish d
#   f = await cleancss e
#
# console.log Buffer.byteLength b
#
# lol bootstrap

max_minify files[4][1], 4, true

# for x in files
#   console.log x[0]
#   max_minify x[1], 4, true

 # max_minify files[0]['960.css'], 5, true
