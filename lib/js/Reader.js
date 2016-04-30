'use strict';

qt.Reader = class {

	constructor( json ) {

		this.json = json;

	}

	read() {

		var tree = new qt.Tree();
		tree.setRoot( this.readCorridor( tree, this.json ) );

		return tree;

	}

	readCorridor( parent, json ) {

		var corridor = new qt.Corridor( parent );
		corridor.addRooms( ..._.map( json, _.bind( this.readRoom, this, corridor ) ) );
		return corridor;

	}

	readRoom( parent, json ) {

		if ( _.isString( json ) ) {

			json = {
				object: json
			};

		}

		if ( _.isPlainObject( json ) ) {

			json = [ json, [] ];

		}

		var object = json[ 0 ];
		var room = new qt.Room( parent, object );

		room.addCorridors( ..._.map( json[ 1 ], _.bind( this.readCorridor, this, room ) ) );
		return room;

	}

};