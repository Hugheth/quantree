'use strict';

qt.Router = class {

	constructor( source ) {

		this.source = source;

	}

	routes( dest ) {

		var current = this.source;
		var path = current.path;
		var lengthen = false;

		while ( current !== dest && !path.isRoot() ) {

			if ( !lengthen ) {


			}

			if ( lengthen ) {


			} else {


			}


		}

	}

	passable( a, b ) {

		if ( a.isLeft( b ) ) {

			return b.passable();

		} else {

			return a.passable();

		}

	}

};
