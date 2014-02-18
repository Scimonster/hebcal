# generate client files
# requires browserify, uglifyjs, exorcist, and node (of course)
HEADER="/*
	Hebcal - A Jewish Calendar Generator
	Copyright (C) 1994-2004  Danny Sadinoff
	Portions Copyright (c) 2002 Michael J. Radwin. All Rights Reserved.

	https://github.com/hebcal/hebcal

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program. If not, see <http://www.gnu.org/licenses/>.

	Danny Sadinoff can be reached at 
	danny@sadinoff.com

	Michael Radwin has made significant contributions as a result of
	maintaining hebcal.com.

	The JavaScript code was completely rewritten in 2014 by Eyal Schachter
 */
;"
mapcode="console.log(require('fs').readFileSync(f).toString().replace(/\\/home\\/eyal\\/git\\/hebcal\\/javascript\\//g,'').replace(/\\/usr\\/lib\\//g,''))"
srccode="console.log(';'+require('fs').readFileSync(f).toString().replace(map,f+'.map'))"
echo "Starting client.js"
browserify --debug client.js | exorcist client.js.map > client.browser.js
echo "f='client.browser.js',map='client.js.map';$srccode" | node > client.browser.js~
mv client.browser.js~ client.browser.js
echo "f='client.js.map';$mapcode" | node > client.browser.js.map
mv client.js.map /tmp
uglifyjs -m -v --preable "$HEADER" --in-source-map client.browser.js.map --source-map client.min.js.map client.browser.js > client.min.js
echo "Starting client.noloc.js"
browserify --debug client.noloc.src.js | exorcist client.noloc.src.js.map > client.noloc.js
echo "f='client.noloc.js',map='client.noloc.src.js.map';$srccode" | node > client.noloc.js~
mv client.noloc.js~ client.noloc.js
echo "f='client.noloc.src.js.map';$mapcode" | node > client.noloc.js.map
mv client.noloc.src.js.map /tmp
uglifyjs -m -v --preable "$HEADER" --in-source-map client.noloc.js.map --source-map client.noloc.min.js.map client.noloc.js > client.noloc.min.js