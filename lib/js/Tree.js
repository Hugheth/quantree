'use strict';

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
