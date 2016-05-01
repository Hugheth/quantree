'use strict';

qt.Corridor = class {

	constructor( parent ) {

		this.parent = parent;
		this.tree = parent.tree;
		this.rooms = [];

	}

	addRooms( ...rooms ) {

		this.rooms.push( ...rooms );

	}

	setPath( path ) {

		this.path = path;
		_.each( this.rooms, ( room, i ) => {

			room.setPath( path.add( String.fromCharCode( i + 97 ) ) );

		} );

	}

	setOpen( open ) {

		if ( open ) {

			this.dom.slideDown( 200 );

		} else {

			this.dom.slideUp( 200 );

		}

		if ( !open ) {

			_.each( this.rooms, ( room, i ) => {

				room.setOpen( open );

			} );

		}

	}

	draw( rows, indent, firstCorridor ) {

		if ( this.dom ) {

			return this.dom;

		}

		this.dom = $( '<div class="row">' );
		rows.push( this.dom );

		var first = true;

		for ( var x = 1; x < indent; x++ ) {

			this.dom.append( '<div class="bar">' );

		}

		if ( indent ) {

			if ( firstCorridor ) {

				this.dom.append( '<div class="hline">' );

			} else {

				this.dom.append( '<div class="hbline">' );

			}

		}

		_.each( this.rooms, room => {

			if ( !first ) {

				this.dom.append( '<div class="line">' );

			} else {


				first = false;

			}

			var dot = room.draw( rows, indent );
			this.dom.append( dot );

		} );

		return rows;

	}

};
