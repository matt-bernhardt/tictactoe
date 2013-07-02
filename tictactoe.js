/*
 * Namespace
 */
window.app = window.app || {};

/*
 * Tic Tac Toe object
 */
window.app.ttt = {

/**
 * Initialize
 * Read in config element, set defaults
 */
	initialize : function(config) {
		config = config || {};
		this.boardContainer = config.boardElement || $("#gameboard");
		this.debugFlag = config.debugFlag || true;
		this.board = [];
		this.player = 1;
		this.counter = 0;

		// build out array
		for(i=1;i<10;i++){
			this.board[i] = '';
		}
		this.debug('board array populated');

		this.setupBoard();
//		while(this.counter < 2) {
//			this.player = this.nextTurn(this.player);
//		};
//		this.endGame();
	}, 


	/* 
	 * Build out UI within specified container
	*/
	setupBoard : function() {
		var i = 0;

		// create board
		var el = $('<form class="ttt-board"/>');
		this.boardContainer.append(el);
		var width = $('.ttt-board').width()/3;
		this.debug('width is '+width);

		// cells
		for(i=1;i<10;i++){
			var sq = $('<button class="'+i+'"/>')
				.addClass(i)
				.text('')
				.height(width);
			$(".ttt-board").append(sq);
		}


		// create feedback
		var el = '<div class="ttt-feedback"/>';
		this.boardContainer.append(el);

	},

	/* 
	 * 
	*/
	getMove : function(square) {
		// square chosen
		this.debug('played '+square);
		this.board[square] = this.player;
		this.updateBoard();
		if(!this.isGameOver(this.counter)){
			this.player = this.nextTurn(this.player);
		} else {
			this.endGame();
		}
	},

	/* 
	 * 
	*/
	updateBoard : function() {
		// square chosen
		console.log('Board status');
		for(i=1;i<10;i++){
			console.log('sq '+i+': '+this.board[i]);
			if(this.board[i]===1) {
				$('form button[class="'+i+'"]').addClass('x');
			}
			if(this.board[i]===2) {
				$('form button[class="'+i+'"]').addClass('o');
			}
		}
	},

	/* 
	 * Flip to next player's turn
	*/
	nextTurn : function(player) {
		this.counter++;
		return (player===2) ? 1 : 2;
	},

	/* 
	 * 
	*/
	isGameOver : function(counter) {
		// There are eight winning conditions - check for each of them
		if(this.board[1] > 0){
			if(
				(this.board[1] === this.board[2] && this.board[1] === this.board[3]) ||
				(this.board[1] === this.board[4] && this.board[1] === this.board[7])
			)
			{			
				console.log('Player '+this.board[1]+' wins!');
				return true;
			}
		}
		if(this.board[5] > 0){
			if(
				(this.board[1] === this.board[5] && this.board[1] === this.board[9]) ||
				(this.board[2] === this.board[5] && this.board[2] === this.board[8]) ||
				(this.board[3] === this.board[5] && this.board[3] === this.board[7]) ||
				(this.board[4] === this.board[5] && this.board[4] === this.board[6])
			)
			{			
				console.log('Player '+this.board[1]+' wins!');
				return true;
			}
		}
		if(this.board[9] > 0){
			if(
				(this.board[7] === this.board[8] && this.board[7] === this.board[9]) ||
				(this.board[3] === this.board[6] && this.board[3] === this.board[9])
			)
			{			
				console.log('Player '+this.board[1]+' wins!');
				return true;
			}
		}
		return false;
		// is board full?
	},

	/* 
	 * 
	*/
	debug : function(msg) {
		if(this.debugFlag){
			console.log(msg);
		}
	},

	endGame : function() {
		alert('The Game Is Over!');
	}
}


