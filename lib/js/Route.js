'use strict';

qt.Route = class {

	constructor() {

		this.rooms = [];
		this.directions = [];

	}

	addRoom( room, rightwards ) {

		this.rooms.push( room );
		this.directions.push( rightwards );

	}

	popRoom() {

		this.rooms.pop();
		this.directions.pop();

	}

	length() {

		return this.rooms.length;

	}

};
