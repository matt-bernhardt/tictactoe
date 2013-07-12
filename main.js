$( document ).ready(function() {

	var game = app.ttt;
	game.initialize();

	$('form.ttt-board button').click(function() {
		// stop button from submitting form
		event.preventDefault();

		var play = $(this).attr('id');
		game.getMove(play);
	})
});
