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

	isLeft( path ) {

		return this.last() < path.last();

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

	isAncestorOf( path ) {

		if ( path.length() < this.length() ) {

			return false;

		}

		var isAncestor = true;

		_.each( this.parts, ( part, i ) => {

			if ( part !== path.parts[ i ] ) {

				isAncestor = false;
				return false;

			}

		} );

		return isAncestor;

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
