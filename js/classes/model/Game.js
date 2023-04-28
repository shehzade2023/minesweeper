class Game
{
	#bottomMatrix
	#matrixCols
	#matrixMineCount
	#matrixRows
	#pointsToCanvas
	#state
	#topMatrix
	get flagCount()
	{
		return this.#topMatrix.flagCount
	}
	get matrixCols()
	{
		return this.#topMatrix.cols
	}
	get matrixRows()
	{
		return this.#topMatrix.rows
	}
	get state()
	{
		return this.#state
	}
	#getClosedCellCount(point)
	{
		return this.#topMatrix.getPointsNot('OPENED').length
	}
	#getDefaultCellPointsNearCell(point)
	{
		return this
				.#bottomMatrix
				.getPointsNearCell(point)
				.filter
					(
						(point)=>
						{
							return this.#topMatrix.hasState('DEFAULT',point)
						}
					)
	}
	#initMatrixOptions(cols,rows,mineCount)
	{
		this.#matrixCols=cols
		this.#matrixRows=rows
		this.#matrixMineCount=mineCount
	}
	#isFlagCountNearCellEqualsNum(point)
	{
		return this.#topMatrix.getFlagCountNearCell(point)==this.#bottomMatrix.getState(point)
	}
	#isWon()
	{
		return this.#getClosedCellCount()==this.#matrixMineCount
	}
	#moveMineToFirstNonFlaggedCell(point)
	{
		const newPoint=this.#topMatrix.getFirstNotFlaggedCellPoint()
		this.#bottomMatrix.decNumsNearMine(point)
		this.#bottomMatrix.setState(this.#bottomMatrix.getMineCountNearCell(point),point)
		this.#bottomMatrix.setState('MINE',newPoint)
		this.#bottomMatrix.incNumsNearMine(newPoint)
	}
	#openDefaultCellsNearCell(point)
	{
		this
			.#getDefaultCellPointsNearCell(point)
			.forEach
				(
					(point)=>
					{
						this.leftMouseButtonHandler(point,/*isRecursive:*/true)
					}
				)
	}
	#setNonFlagToFlagsWithNotMines()
	{
		this
			.#topMatrix
			.getPoints('FLAG')
			.forEach
				(
					(point)=>
					{
						if(!this.#bottomMatrix.hasState('MINE',point))
						{
							this.#topMatrix.setState('NON_FLAG',point)
						}
					}
				)
	}
	#setOpenedStateToMinesExludingFlags()
	{
		this
			.#bottomMatrix
			.getPoints('MINE')
			.forEach
				(
					(point)=>
					{
						if(!this.#topMatrix.hasState('FLAG',point))
						{
							this.#topMatrix.setState('OPENED',point)
						}
					}
				)
	}
	get points()
	{
		return this.#pointsToCanvas
	}
	set points(points)
	{
		this.#pointsToCanvas=points
	}
	getMatrixState(point)
	{
		return (this.#topMatrix.hasState('OPENED',point)?this.#bottomMatrix:this.#topMatrix).getState(point)
	}
	isOver()
	{
		return ['WON','LOST'].includes(this.#state)
	}
	leftMouseButtonHandler(point,isRecursive=false)
	{
		switch(this.#topMatrix.getState(point))
		{
			case 'OPENED':
				if(!isRecursive&&this.#isFlagCountNearCellEqualsNum(point))
				{
					this.#openDefaultCellsNearCell(point)
				}
				break
			case 'DEFAULT':
				this.#topMatrix.setState('OPENED',point)
				this.#topMatrix.incOpenedCellCount()
				this.#pointsToCanvas.push(point)
				switch(this.#bottomMatrix.getState(point))
				{
					case 'MINE':
						if(this.#topMatrix.isOpenedCellCount==1)
						{
							this.#moveMineToFirstNonFlaggedCell(point)
						}
						else
						{
							this.#bottomMatrix.setState('BANG',point)
							this.#setOpenedStateToMinesExludingFlags()
							this.#setNonFlagToFlagsWithNotMines()
							this.#state='LOST'
						}
						break
					case 0:
						this.#openDefaultCellsNearCell(point)
						break
					default:
						if(this.#isWon())
						{
							this.#state='WON'
						}
				}
		}
	}
	rightMouseButtonHandler(point)
	{
		this.#pointsToCanvas.push(point)
		switch(this.#topMatrix.getState(point))
		{
			case 'DEFAULT':
				if(this.#topMatrix.flagCount>0)
				{
					this.#topMatrix.setState('FLAG',point)
					this.#topMatrix.decFlagCount()
				}
				break
			case 'FLAG':
				this.#topMatrix.setState('DEFAULT',point)
				this.#topMatrix.incFlagCount()
				this.#topMatrix.incOpenedCellCount()
		}
	}
	run()
	{
		this.#bottomMatrix=new BottomMatrix(this.#matrixCols,this.#matrixRows,this.#matrixMineCount)
		this.#bottomMatrix.mine()
		this.#bottomMatrix.incNumsNearMines()
		this.#topMatrix=new TopMatrix(this.#matrixCols,this.#matrixRows,this.#matrixMineCount)
		this.#pointsToCanvas=this.#topMatrix.getPoints('DEFAULT')
		this.#state='RUN'
	}
	setOptions(level)
	{
		switch(level)
		{
			case 'NOVICE':
				this.#initMatrixOptions(9,9,10)
				HtmlImage.size=63
				break	
			case 'AMATEUR':
				this.#initMatrixOptions(16,16,40)
				HtmlImage.size=37
				break	
			case 'PRO':
				this.#initMatrixOptions(30,16,99)
				HtmlImage.size=37
		}
	}
}