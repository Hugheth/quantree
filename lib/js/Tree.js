'use strict';

qt.Tree = class {

	constructor() {

		this.tree = this;
		this.path = new qt.Path();
		this.players = {};

	}

	setRoot( root ) {

		this.root = root;
		root.setPath( this.path );

	}

	addPlayer( player ) {

		this.players[ player.character ] = player;

	}

	draw() {

		if ( this.dom ) {

			return this.dom;

		}

		this.dom = $( '<div class="tree">' );
		this.dom.append( this.root.draw( [], 0 ) );

		return this.dom;

	}

	getTraits( room ) {

		return qt.traits[ room.object ];

	}

	trigger( room ) {

		var traits = this.getTraits( room );
		if ( traits && traits.trigger ) {

			traits.trigger( room );

		}

	}

	passable( room, player, rightwards ) {

		var traits = this.getTraits( room );
		if ( traits && traits.passable ) {

			return traits.passable( room, player, rightwards ) !== false;

		}

		return true;

	}

	action( room, player, rightwards ) {

		var traits = this.getTraits( room );
		if ( traits && traits.action ) {

			return traits.action( room, player, rightwards ) !== false;

		}

		return true;

	}

	stop( room, player, rightwards ) {

		if ( !room.object ) {

			if ( player.item ) {

				room.setObject( player.item );
				player.drop();

			}
			return true;

		}

		var traits = this.getTraits( room );
		if ( traits && traits.stop ) {

			return traits.stop( room, player, rightwards ) !== false;

		}

		return true;

	}

};
