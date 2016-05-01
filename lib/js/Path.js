'use strict';

qt.Path = class {

	constructor( ...parts ) {

		this.parts = parts;

	}

	room( base ) {

		var output = base;

		if ( base instanceof qt.Tree ) {

			output = base.root;

		}

		_.each( this.parts, part => {

			if ( _.isString( part ) ) {

				var roomIndex = part.charCodeAt( 0 ) - 97;
				output = output.rooms[ roomIndex ];
				if ( !output ) {

					return false;

				}

			} else {

				output = output.corridors[ part ];
				if ( !output ) {

					return false;

				}

			}

		} );

		return output;

	}

	isRoom() {

		return _.isString( this.last() );

	}

	up() {

		return new qt.Path( ...this.parts.slice( 0, this.parts.length - 2 ) );

	}

	left() {

		var last = this.last();
		if ( last === 'a' ) {

			return this.up();

		} else {

			var path = new qt.Path( ...this.parts.slice( 0, this.parts.length - 1 ) );
			path.parts.push( String.fromCharCode( last.charCodeAt( 0 ) - 1 ) );
			return path;

		}

	}

	right() {

		var path = new qt.Path( ...this.parts.slice( 0, this.parts.length - 1 ) );
		path.parts.push( String.fromCharCode( this.last().charCodeAt( 0 ) + 1 ) );
		return path;

	}

	down( corridor ) {

		return new qt.Path( ...this.parts.concat( corridor, 'a' ) );

	}

	last() {

		return _.last( this.parts );

	}

	add( ...parts ) {

		return new qt.Path( ...this.parts.concat( ...parts ) );

	}

	isRoot() {

		return this.length() === 1 && this.parts[ 0 ] === 'a';

	}

	length() {

		return this.parts.length;

	}

	isBelow( path ) {

		var isBelow = true;

		_.each( path.parts, ( part, i ) => {

			if ( this.parts[ i ] !== part ) {

				isBelow = false;
				return false;

			}

		} );

		return isBelow;

	}

	isAncestorOf( path ) {

		if ( path.length() < this.length() ) {

			return false;

		}

		var isAncestor = true;

		_.each( this.parts, ( part, i ) => {

			// a/1/c is an ancestor of a/1/f/2/a
			// a/1/c/2/a is not an ancestor a/1/f/2/a
			if ( i === this.parts.length - 1 && _.isString( part ) && part < path.parts[ i ] ) {

				return;

			}

			if ( part !== path.parts[ i ] ) {

				isAncestor = false;
				return false;

			}

		} );

		return isAncestor;

	}

	rightOf( path ) {

		if ( !path.isAncestorOf( this ) ) return false;

		return path.last() < this.parts[ path.length() - 1 ];

	}

	equals( path ) {

		return this.toString() === path.toString();

	}

	toString() {

		return this.parts.join( '/' );

	}

};

qt.Path.fromString = string => {

	return new qt.Path( ..._.map( string.split( '/' ), part => {

		var partNum = parseInt( part, 10 );
		return isFinite( partNum ) ? partNum : part;

	} ) );

};
