$( function () {

	$( '#tree' ).on( 'click', '.dot', function () {

		var img = $( this ).children( 'img' );
		if ( img.length ) {

			if ( img.attr( 'src' ) === 'lib/img/lever2.svg' ) {

				img.attr( 'src', 'lib/img/lever1.svg' );

			} else {

				img.attr( 'src', 'lib/img/lever2.svg' );

			}

		}

	} );

	window.qt = {



	};

} );