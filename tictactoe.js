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
		this.debugFlag = config.debugFlag || false;
		this.board = [];
		// trying to get board to initialize properly
		for(i=1;i<10;i++){
			this.board[i] = 0;
		}
		this.boardStatus();
		this.debug('board array populated');

		this.player = 1;
		this.counter = 0;
		this.feedback = '';

		this.setupBoard();
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
			var sq = $('<button id="'+i+'"/>')
				.addClass(i)
				.text('')
				.height(width);
			$(".ttt-board").append(sq);
		}


		// create feedback
		var el = '<div class="ttt-feedback"/>';
		this.boardContainer.append(el);

		this.debug('Setup complete');

	},

	/* 
	 * 
	*/
	getMove : function(square) {
		// square chosen
		this.debug('\nMove detected at square '+square+', currently set to '+this.board[square]);
		if(this.isMoveValid(square)) {
			this.board[square] = this.player;
			this.updateBoard();
			if(!this.isGameOver(this.counter)){
				this.player = this.nextTurn(this.player);
			} else {
				this.endGame();
			}
		} else {
			// this.feedback('Invalid move');
			alert('invalid move');
		}
		this.boardStatus();
		this.debug('... awaiting next move');
	},

	/* 
	 * jquery-1.6.1.min.js
	*/
	isMoveValid : function(square) {
		return (this.board[square] > 0) ? false : true;
	},

	/* 
	 * 
	*/
	updateBoard : function() {
		// square chosen
		// this.debug('Board status');
		for(i=1;i<10;i++){
			// this.debug('sq '+i+': '+this.board[i]);
			if(this.board[i]===1) {
				$('form button[id="'+i+'"]').addClass('x');
			}
			if(this.board[i]===2) {
				$('form button[id="'+i+'"]').addClass('o');
			}
		}
	},

	/* 
	 * Flip to next player's turn
	*/
	nextTurn : function(player) {
		this.counter++;
		this.debug("counter at "+this.counter);
		$('form').toggleClass('o');
		return (player===2) ? 1 : 2;
	},

	/* 
	 * 
	*/
	isGameOver : function(counter) {
		// There are eight winning conditions - check for each of them
		this.debug("Checking for game over (counter at "+counter+")");
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
		if(this.counter===8){
			console.log('Stalemate!');
			return true;
		}
		return false;
		// is board full?
	},

	/* 
	 * 
	*/
	feedback: function(msg) {
		$('.ttt-feedback').text('Hello!');
	},

	/* 
	 * 
	*/
	boardStatus: function() {
		var boardState = '';
		for(i=1;i<10;i++){
			boardState+=this.board[i]+'_';
		}
		this.debug('Board: '+boardState);
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
		alert('The Game Is Over! Click OK to play again.');
		this.resetGame();
	},

	/* 
	 * 
	*/
	resetGame : function() {
		for(i=1;i<10;i++){
			this.board[i] = 0;
			$('form button[id="'+i+'"]').attr('class','');
		}
		$('form').removeClass('o');
		this.counter = 0;
		this.player = 1;
		this.debug('Board reset');
	}

}


