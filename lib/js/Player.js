'use strict';

qt.Player = class {

	constructor( character ) {

		this.character = 'kitty';
		this.room = null;
		this.moving = false;
		this.image = $( '<img>' ).attr( 'src', 'lib/img/' + this.character + '1.svg' );
		this.dom = $( '<div class="character">' ).append( this.image );
		this.lives = 9;
		this.item = null;
		this.speed = 100;

		var alt = true;

		setInterval( () => {

			this.image.attr( 'src', 'lib/img/' + this.character + ( alt ? '2' : '1' ) + '.svg' );
			alt = !alt;

		}, 300 );

	}

	pickup( item ) {

		if ( this.item ) return false;

		this.item = item;

		return true;

	}

	drop( room ) {

		this.item = null;

	}

	setRoom( room ) {

		this.tree = room.tree;
		this.room = room;
		room.dom.append( this.dom );

	}

	move( route ) {

		if ( route.length() === 0 ) return;
		if ( route.length() === 1 && route.rooms[ 0 ] === this.room ) return;

		if ( this.moving ) return;

		this.step = 0;
		this.route = route;
		this.moving = true;

		this.moveStep( this.route.rooms[ 0 ] );


	}

	finishMove( room ) {

		this.tree.stop( room, this );

		this.route = null;
		this.step = -1;
		this.moving = false;

	}

	moveStep( room ) {

		var delay = this.speed;

		if ( !this.tree.passable( room ) ) {

			return this.finishMove( room );

		}

		if ( room === this.room ) {

			delay = 0;

		} else {

			var rightwards = this.route.directions[ this.step ];

			if ( rightwards ) {

				if ( !room.path.rightOf( this.room.path ) ) {

					this.tree.action( this.room, this, false );

				}

				this.tree.action( room, this, true );

			} else {

				if ( !this.room.path.rightOf( room.path ) ) {

					this.tree.action( room, this, true );

				}

				this.tree.action( this.room, this, false );

			}

			this.setRoom( room );

		}

		this.step++;

		var nextRoom = this.route.rooms[ this.step ];

		if ( nextRoom ) {

			setTimeout( this.moveStep.bind( this, nextRoom ), delay );

		} else {

			this.finishMove( room );

		}

	}

};
