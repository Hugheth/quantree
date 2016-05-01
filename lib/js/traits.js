'use strict';

qt.traits = {

	cage1: {

		passable: ( room, player, rightwards ) => {

			return false;

		},

		trigger: ( room ) => {

			room.setObject( 'cage2' );

		}

	},

	cage2: {

		trigger: ( room ) => {

			room.setObject( 'cage1' );

		}

	},

	padlock1: {

		passable: ( room, player, rightwards ) => {

			return player.item === 'key1';

		},

		action: ( room, player, rightwards ) => {

			room.setObject( null );
			player.drop();

		}

	},

	padlock2: {

		passable: ( room, player, rightwards ) => {

			return player.item === 'key2';

		},

		action: ( room, player, rightwards ) => {

			room.setObject( null );
			player.drop();

		}

	},

	spikes1: {

		action: ( room, player, rightwards ) => {

			console.log( 'lose health' );

		}

	},

	lever1: {

		action: ( room, player, rightwards ) => {

			if ( rightwards ) {

				room.setObject( 'lever2' );
				_.each( room.trigger, triggerPath => {

					var triggerRoom = triggerPath.room( room.tree );

					room.tree.trigger( triggerRoom );

				} );

			}

		}
	},

	lever2: {

		action: ( room, player, rightwards ) => {

			if ( !rightwards ) {

				room.setObject( 'lever1' );
				_.each( room.trigger, triggerPath => {

					var triggerRoom = triggerPath.room( room.tree );

					room.tree.trigger( triggerRoom );

				} );

			}

		}
	},

	key1: {

		stop: ( room, player ) => {

			if ( player.pickup( room.object ) ) {

				room.setObject( null );

			}

		}

	},

	key2: {

		stop: ( room, player ) => {

			if ( player.pickup( room.object ) ) {

				room.setObject( null );

			}

		}

	}

};
