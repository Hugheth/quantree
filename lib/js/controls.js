'use strict';

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

	window.tree = new qt.Reader( qt.levels.one ).read();
	$( '#tree' ).append( tree.draw() );

} );
