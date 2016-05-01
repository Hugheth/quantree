'use strict';

qt.Reader = class {

	constructor( json ) {

		this.json = json;

	}

	read() {

		var tree = new qt.Tree();

		tree.addPlayer( new qt.Player( 'kitty' ) );
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

			json = [ {
					object: json
				},
				[]
			];

		} else if ( _.isPlainObject( json ) ) {

			json = [ json, [] ];

		}

		if ( _.isString( json[ 0 ] ) ) {

			json[ 0 ] = {
				object: json[ 0 ]
			};

		}

		if ( json[ 0 ].trigger ) {

			json[ 0 ].trigger = _.map( json[ 0 ].trigger, qt.Path.fromString );

		}

		var object = json[ 0 ];
		var room = new qt.Room( parent, object );

		room.addCorridors( ..._.map( json[ 1 ], _.bind( this.readCorridor, this, room ) ) );
		return room;

	}

};
