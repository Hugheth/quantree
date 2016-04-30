'use strict';

qt.Room = class {

	constructor( parent, options ) {

		_.extend( this, options );
		this.parent = parent;
		this.source = parent.source;
		this.corridors = [];

	}

	addCorridors( ...corridors ) {

		this.corridors.push( ...corridors );

	}

	icon() {

		if ( this.object ) {

			return $( '<img>' ).attr( 'src', 'lib/img/' + this.object + '.svg' );

		}

	}

	setPath( path ) {

		this.path = path;
		_.each( this.corridors, ( corridor, i ) => {

			corridor.setPath( path.add( i ) );

		} );

	}

	draw( rows, indent ) {

		if ( this.dom ) return this.dom;

		this.dom = $( '<div class="dot">' ).attr( 'name', this.path );

		if ( this.character ) {

			var cat = $( '<img>' ).attr( 'src', 'lib/img/' + this.character + '1.svg' );

			this.dom.append( $( '<div class="character">' ).append( cat ) );

			var alt = true;

			setInterval( () => {

				cat.attr( 'src', 'lib/img/' + this.character + ( alt ? '2' : '1' ) + '.svg' );
				alt = !alt;

			}, 300 );

		}

		this.dom.append( this.icon() );

		_.each( this.corridors, ( corridor, i ) => {

			corridor.draw( rows, indent + 1, i === 0 );

		} );

		return this.dom;

	}

	isLeft( other ) {

		return this.path.isLeft( other.path );

	}

	getTraits() {

		return qt.traits[ this.object ] || {};

	}

	passable() {

		return this.getTraits().passable !== false;

	}

};
