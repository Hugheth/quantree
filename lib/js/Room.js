'use strict';

qt.Room = class {

	constructor( parent, options ) {

		_.extend( this, options );
		this.parent = parent;
		this.tree = parent.tree;
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

	setObject( object ) {

		this.object = object || '';
		this.dom.children( 'img' ).remove();

		if ( object ) {

			this.dom.prepend( this.icon() );

		}

	}

	setPath( path ) {

		this.path = path;
		_.each( this.corridors, ( corridor, i ) => {

			corridor.setPath( path.add( i ) );

		} );

	}

	setOpen( open ) {

		_.each( this.corridors, ( corridor, i ) => {

			corridor.setOpen( open );

		} );

	}

	draw( rows, indent ) {

		if ( this.dom ) return this.dom;

		this.dom = $( '<div class="dot">' ).attr( 'name', this.path );

		if ( this.character ) {

			this.tree.players[ this.character ].setRoom( this );

		}

		this.dom.append( this.icon() );

		_.each( this.corridors, ( corridor, i ) => {

			corridor.draw( rows, indent + 1, i === 0 );

		} );

		return this.dom;

	}

	highlight( rightwards ) {

		this.dom.removeClass( "highlight bluelight" ).addClass( rightwards ? 'highlight' : 'bluelight' );

	}

	isLeft( other ) {

		return this.path.isLeft( other.path );

	}

};
