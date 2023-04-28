function runNewGame()
{
	game.setOptions(window.level.value)
	game.run()
	canvas.setsize(game.matrixCols*HtmlImage.size,game.matrixRows*HtmlImage.size)
	canvas.draw()
	window['img-flag'].width=HtmlImage.size
	window['img-flag'].height=HtmlImage.size
	window['span-flag-count'].textContent=game.flagCount
}
const game=new Game()
const canvas=new Canvas('canvas-field')
runNewGame()