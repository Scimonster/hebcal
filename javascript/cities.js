/*
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

// name, latdeg, latmin, longdeg, longmin, Israel
var cities = {
	"Ashdod": [ 31, 48, 34, true ],
	"Atlanta": [ 33, 45, -84, false ],
	"Austin": [ 30, 16, -97, -45, false ],
	"Baghdad": [ 33, 14, 44, 22, false ],
	"Beer Sheva": [ 31, 15, 34, 47, true ],
	"Berlin": [ 52, 31, 13, 24, false ],
	"Baltimore": [ 39, 17, -76, -36, false ],
	"Bogota": [ 4, 36, -74, -5, false ],
	"Boston": [ 42, 20, -71, -4, false ],
	"Buenos Aires": [ -34, -37, -58, -24, false ],
	"Buffalo": [ 42, 53, -78, -52, false ],
	"Chicago": [ 41, 50, -87, -45, false ],
	"Cincinnati": [ 39, 6, -84, -31, false ],
	"Cleveland": [ 41, 30, -81, -41, false ],
	"Dallas": [ 32, 47, -96, -48, false ],
	"Denver": [ 39, 44, -104, -59, false ],
	"Detroit": [ 42, 20, -83, -2, false ],
	"Eilat": [ 29, 33, 34, 57, true ],
	"Gibraltar": [ 36, 8, -5, -21, false ],
	"Haifa": [ 32, 49, 34, 59, true ],
	"Hawaii": [ 19, 30, -155, -30, false ],
	"Houston": [ 29, 46, -95, -22, false ],
	"Jerusalem": [ 31, 47, 35, 14, true ],
	"Johannesburg": [ -26, -10, 28, 2, false ],
	"Kiev": [ 50, 28, 30, 29, false ],
	"La Paz": [ -16, -30, -68, -9, false ],
	"Livingston": [ 40, 17, -74, -18, false ],
	"London": [ 51, 30, 0, -10, false ],
	"Los Angeles": [ 34, 4, -118, -15, false ],
	"Miami": [ 25, 46, -80, -12, false ],
	"Melbourne": [ -37, -52, 145, 8, false ],
	"Mexico City": [ 19, 24, -99, -9, false ],
	"Montreal": [ 45, 30, -73, -36, false ],
	"Moscow": [ 55, 45, 37, 42, false ],
	"New York": [ 40, 43, -74, -1, false ],
	"Omaha": [ 41, 16, -95, -56, false ],
	"Ottawa": [ 45, 42, -75, -71, false ],
	"Panama City": [ 8, 58, -79, -32, false ],
	"Paris": [ 48, 52, 2, 20, false ],
	"Petach Tikvah": [ 32, 5, 34, 53, true ],
	"Philadelphia": [ 39, 57, -75, -10, false ],
	"Phoenix": [ 33, 27, -112, -4, false ],
	"Pittsburgh": [ 40, 26, -80, 0, false ],
	"Saint Louis": [ 38, 38, -90, -12, false ],
	"Saint Petersburg": [ 59, 53, 30, 15, false ],
	"San Francisco": [ 37, 47, -122, -25, false ],
	"Seattle": [ 47, 36, -122, -20, false ],
	"Sydney": [ -33, -55, 151, 17, false ],
	"Tel Aviv": [ 32, 5, 34, 46, true ],
	"Tiberias": [ 32, 58, 35, 32, true ],
	"Toronto": [ 43, 38, -79, -24, false ],
	"Vancouver": [ 49, 16, -123, -7, false ],
	"White Plains": [ 41, 2, -73, -45, false ],
	"Washington DC": [ 38, 55, -77, 0, false ]
};

exports.getCity = function getCity(city) {
	city = city.split(/\s+/).map(function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase()}).join(' ');
	return cities[city] || [ 0, 0, 0, 0, false ];
};

exports.listCities = function listCities() {
	return Object.keys(cities);
};

exports.addCity = function addCity(city, info) {
	cities[city] = info;
};

exports.getLocation = function getLocation(cityInfo) {
	return {
		lat: (cityInfo[0] * 60 + cityInfo[1]) / 60,
		long: (cityInfo[2] * 60 + cityInfo[3]) / 60
	};
};

exports.nearest = function nearest(lat, lon) {
	if (Array.isArray(lat)) {
		lat = (lat[0] * 60 + lat[1]) / 60;
	}
	if (Array.isArray(lon)) {
		lon = (lon[0] * 60 + lon[1]) / 60;
	}
	if (typeof lat != 'number') {
		throw new TypeError('incorrect lat type passed to nearest()');
	}
	if (typeof lon != 'number') {
		throw new TypeError('incorrect long type passed to nearest()');
	}

	return exports.listCities().map(function(city){
		var i = exports.getLocation(exports.getCity(city));
		return {
			name: city,
			dist: Math.sqrt( Math.pow(Math.abs(i.lat - lat), 2) + Math.pow(Math.abs(i.long - lon), 2) )
		};
	}).reduce(function(close,city){
		return close.dist < city.dist ? close : city;
	}).name;
};