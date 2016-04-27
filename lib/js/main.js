window.qt = {

	levels: {}

};

qt.traits = {

	cage1: {
		passable: true
	},
	cage2: {
		passable: false
	}

};

qt.Tree = class {

	constructor( root ) {

		this.root = root;
		this.root.setPath( new qt.Path() );

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

	constructor( rooms ) {

		this.rooms = rooms;

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

	constructor( data, corridors ) {

		_.extend( this, data );
		this.corridors = corridors;

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

	add( ...parts ) {

		return new qt.Path( ...this.parts.concat( ...parts ) );

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

	return new qt.Tree( qt.generateCorridor( json ) );

};

qt.generateCorridor = json => {

	return new qt.Corridor( _.map( json, qt.generateRoom ) );

};

qt.generateRoom = json => {

	if ( _.isString( json ) ) {

		json = {
			object: json
		};

	}

	if ( _.isPlainObject( json ) ) {

		json = [ json, [] ];

	}

	var object = json[ 0 ];
	var corridors = _.map( json[ 1 ], qt.generateCorridor );

	return new qt.Room( object, corridors );

};
