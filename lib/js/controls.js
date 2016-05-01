'use strict';

$( function() {

	$( '#tree' ).on( 'click', '.dot', function() {

		var path = qt.Path.fromString( $( this ).attr( 'name' ) );
		var room = path.room( tree );

		var router = new qt.Router( room.tree.players.kitty.room );
		var route = router.route( room );

		room.tree.players.kitty.move( route );

	} );

	window.tree = new qt.Reader( qt.levels.one ).read();
	$( '#tree' ).append( tree.draw() );

} );
