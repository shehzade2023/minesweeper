class MouseHandlerer
{
	static LEFT_CLICK=1
	static RIGHT_CLICK=3
	static contextMenuHandler()
	{
		window.event.preventDefault()
	}
	static mouseUpHandler()
	{
		if(game.state=='RUN')
		{
			const point=new Point(Math.floor(window.event.offsetX/HtmlImage.size),Math.floor(window.event.offsetY/HtmlImage.size))
			game.points=[]
			switch(window.event.which)
			{
				case MouseHandlerer.LEFT_CLICK:
					game.leftMouseButtonHandler(point)
					break
				case MouseHandlerer.RIGHT_CLICK:
					game.rightMouseButtonHandler(point)
					window['span-flag-count'].textContent=game.flagCount
			}
			canvas.draw()
			if(game.isOver())
			{
				alert(game.state)
			}
		}
	}
}