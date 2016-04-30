window.qt = {

	levels: {}

};

qt.traits = {

	cage1: {
		passable: false
	},
	cage2: {
		passable: true
	}

};

qt.Tree = class {

	constructor() {

		this.source = this;
		this.path = new qt.Path();

	}

	setRoot( root ) {

		this.root = root;
		root.setPath( this.path );

	}

	draw() {

		if ( this.dom ) {

			return this.dom;

		}

		this.dom = $( '<div class="tree">' );
		this.dom.append( this.root.draw( [], 0 ) );

		return this.dom;

	}

};

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

qt.Path = class {

	constructor( ...parts ) {

		this.parts = parts;

	}

	room( base ) {

		var output = base;

		if ( base instanceof qt.Tree ) {

			output = base.root;

		}

		_.each( this.parts, part => {

			if ( _.isString( part ) ) {

				var roomIndex = part.charCodeAt( 0 ) - 97;
				output = output.rooms[ roomIndex ];
				if ( !output ) {

					return false;

				}

			} else {

				output = output.corridors[ part ];
				if ( !output ) {

					return false;

				}

			}

		} );

		return output;

	}

	isLeft( path ) {

		return this.last() < path.last();

	}

	last() {

		return _.last( this.parts );

	}

	add( ...parts ) {

		return new qt.Path( ...this.parts.concat( ...parts ) );

	}

	isRoot() {

		return this.length() === 1 && this.parts[ 0 ] === 'a';

	}

	length() {

		return this.parts.length;

	}

	isAncestorOf( path ) {

		if ( path.length() < this.length() ) {

			return false;

		}

		var isAncestor = true;

		_.each( this.parts, ( part, i ) => {

			if ( part !== path.parts[ i ] ) {

				isAncestor = false;
				return false;

			}

		} );

		return isAncestor;

	}

	toString() {

		return this.parts.join( '/' );

	}

};

qt.Path.fromString = string => {

	return new qt.Path( ..._.map( string.split( '/' ), part => {

		var partNum = parseInt( part, 10 );
		return isFinite( partNum ) ? partNum : part;

	} ) );

};

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

$( function() {

	$( '#tree' ).on( 'click', '.dot', function() {

		var path = qt.Path.fromString( $( this ).attr( 'name' ) );
		var room = path.room( tree );

		var img = $( this ).children( 'img' );
		if ( img.length ) {

			if ( img.attr( 'src' ) === 'lib/img/lever2.svg' ) {

				img.attr( 'src', 'lib/img/lever1.svg' );

				_.each( room.trigger, trigger => {

					var triggerRoom = trigger.room( tree );
					triggerRoom.dom.children( 'img' ).attr( 'src', 'lib/img/cage1.svg' );

				} );

			} else {

				img.attr( 'src', 'lib/img/lever2.svg' );

				_.each( room.trigger, trigger => {

					var triggerRoom = trigger.room( tree );
					triggerRoom.dom.children( 'img' ).attr( 'src', 'lib/img/cage2.svg' );

				} );

			}

		}

	} );

	window.tree = qt.generateTree( qt.levels.one );
	$( '#tree' ).append( tree.draw() );

} );

qt.generateTree = json => {

	var tree = new qt.Tree();
	tree.setRoot( qt.generateCorridor( tree, json ) );

	return tree;

};

qt.generateCorridor = ( parent, json ) => {

	var corridor = new qt.Corridor( parent );
	corridor.addRooms( ..._.map( json, _.partial( qt.generateRoom, corridor ) ) );
	return corridor;

};

qt.generateRoom = ( parent, json ) => {

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

	room.addCorridors( ..._.map( json[ 1 ], _.partial( qt.generateCorridor, room ) ) );
	return room;

};
