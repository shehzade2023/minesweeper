class Matrix
{
	#arr
	#cols
	#points
	#rows
	constructor(cols,rows,defaultState)
	{
		this.#arr=[]
		this.#cols=cols
		this.#rows=rows
		this.#points=[]
		for(const y of getRangeNumUntil(0,rows))
		{
			this.#arr.push([])
			for(const x of getRangeNumUntil(0,cols))
			{
				this.#arr[y].push(defaultState)
				this.#points.push(new Point(x,y))
			}
		}
	}
	get cols()
	{
		return this.#cols
	}
	get rows()
	{
		return this.#rows
	}
	#isPointValid(point)
	{
		return !([-1,this.#cols].includes(point.x)||[-1,this.#rows].includes(point.y))
	}
	#getPoints(cellState,flag)
	{
		return this
				.#points
				.filter
					(
						(point)=>
						{
							return this.hasState(cellState,point)==flag
						}
					)
	}
	getPoints(cellState)
	{
		return this.#getPoints(cellState,true)
	}
	getPointsNearCell(point)
	{
		const result=[]
		for(const y of getRangeNum(point.y-1,point.y+1))
		{
			for(const x of getRangeNum(point.x-1,point.x+1))
			{
				let currPoint=new Point(x,y)
				if(this.#isPointValid(currPoint)&&!point.equals(currPoint))
				{
					result.push(currPoint)
				}
			}
		}
		return result
	}
	getPointsNot(cellState)
	{
		return this.#getPoints(cellState,false)
	}
	getState(point)
	{
		return this.#arr[point.y][point.x]
	}
	hasState(state,point)
	{
		return this.#arr[point.y][point.x]==state
	}
	setState(state,point)
	{
		this.#arr[point.y][point.x]=state
	}
}