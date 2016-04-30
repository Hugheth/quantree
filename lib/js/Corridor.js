'use strict';

qt.Corridor = class {

	constructor( parent ) {

		this.parent = parent;
		this.source = parent.source;
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

	draw( rows, indent, firstCorridor ) {

		if ( this.dom ) {

			return this.dom;

		}

		this.row = $( '<div class="row">' );
		rows.push( this.row );

		var first = true;

		for ( var x = 1; x < indent; x++ ) {

			this.row.append( '<div class="bar">' );

		}

		if ( indent ) {

			if ( firstCorridor ) {

				this.row.append( '<div class="hline">' );

			} else {

				this.row.append( '<div class="hbline">' );

			}

		}

		_.each( this.rooms, room => {

			if ( !first ) {

				this.row.append( '<div class="line">' );

			} else {


				first = false;

			}

			var dot = room.draw( rows, indent );
			this.row.append( dot );

		} );

		return rows;

	}

};
