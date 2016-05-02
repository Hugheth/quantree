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

			player.damage( 2 );

		},

		trigger: ( room ) => {

			room.setObject( 'spikes2' );

		}

	},

	spikes2: {

		trigger: ( room ) => {

			room.setObject( 'spikes1' );

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

	},

	weight1: {

		stop: ( room, player ) => {

			if ( player.pickup( room.object ) ) {

				room.setObject( null );

			}

		}

	},

	catnip1: {

		action: ( room, player ) => {

			room.setObject( null );
			player.catnip += 3;

		}

	},

	button1: {

		stop: ( room, player ) => {

			if ( player.item === 'weight1' ) {

				player.drop();
				room.setObject( 'button2' );
				_.each( room.trigger, triggerPath => {

					var triggerRoom = triggerPath.room( room.tree );

					room.tree.trigger( triggerRoom );

				} );

			}

		}

	},

	button2: {

		stop: ( room, player ) => {

			if ( player.pickup( 'weight1' ) ) {

				room.setObject( 'button1' );
				_.each( room.trigger, triggerPath => {

					var triggerRoom = triggerPath.room( room.tree );

					room.tree.trigger( triggerRoom );

				} );

			}

		}

	},

	heart1: {

		action: ( room, player, rightwards ) => {

			player.setLives( 9 );
			room.setObject( null );

		}

	},

	milk1: {

		stop: ( room, player, rightwards ) => {

			if ( player.pickup( 'milk1' ) ) {

				room.setObject( null );

			}

		}

	},

	bowl1: {

		stop: ( room, player, rightwards ) => {

			if ( player.item === 'milk1' ) {

				room.setObject( 'bowl2' );
				player.drop();

			}

		}


	},

	string1: {

		stop: ( room, player, rightwards ) => {

			if ( player.pickup( 'string1' ) ) {

				room.setObject( null );

			}

		}

	},

	stairs1: {

		action: ( room, player, rightwards ) => {

			var nextRoom = player.route.rooms[ player.step + 1 ];
			if ( player.route.rooms[ player.step ] !== room ) {

				nextRoom = player.route.rooms[ player.step ];

			}

			var ancestor = true;

			if ( nextRoom ) {

				ancestor = room.path.isAncestorOf( nextRoom.path );

			}

			room.setOpen( ancestor );

		}

	}

};
