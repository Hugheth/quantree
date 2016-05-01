'use strict';

qt.Router = class {

	constructor( tree ) {

		this.tree = tree;

	}

	route( dest ) {

		var current = this.tree;
		var path = current.path;
		var rightwards = false;
		var destPath = dest.path;

		var route = new qt.Route();

		if ( !destPath.rightOf( path ) ) {

			route.addRoom( current, false );

		}

		while ( !path.equals( destPath ) ) {

			if ( !rightwards && path.isAncestorOf( destPath ) ) {

				rightwards = true;

				if ( !destPath.rightOf( path ) ) {

					route.popRoom();

				}

			}

			if ( !rightwards ) {

				path = path.left();

			} else {

				if ( path.last() === destPath.parts[ path.length() - 1 ] ) {

					path = path.down( destPath.parts[ path.length() ] );

				} else {

					path = path.right();

				}

			}

			route.addRoom( path.room( dest.tree ), rightwards );

		}

		return route;

	}

};
