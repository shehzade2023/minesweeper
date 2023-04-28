class BottomMatrix extends Matrix
{
	#mineCount
	constructor(cols,rows,mineCount)
	{
		super(cols,rows,0)
		this.#mineCount=mineCount
	}
	#opWithNumsNearMine(point,type)
	{
		this
			.getPointsNearCell(point)
			.forEach
				(
					(innerPoint)=>
					{
						if(!this.hasState('MINE',innerPoint))
						{
							const num=this.getState(innerPoint)
							this.setState(type=='INC'?num+1:num-1,innerPoint)
						}
					}
				)
	}
	decNumsNearMine(point)
	{
		this.#opWithNumsNearMine(point,'DEC')
	}
	getMineCountNearCell(point)
	{
		return this
				.getPointsNearCell(point)
				.filter
					(
						(point)=>
						{
							return this.hasState('MINE',point)
						}
					)
				.length
	}
	incNumsNearMine(point)
	{
		this.#opWithNumsNearMine(point,'INC')
	}
	incNumsNearMines()
	{
		this
			.getPoints('MINE')
			.forEach
				(
					(point)=>
					{
						this.incNumsNearMine(point)
					}
				)
	}
	mine()
	{
		const mid={cols:Math.floor(this.cols/2),rows:Math.floor(this.rows/2)}
		const commonPoint=new Point(mid.cols,mid.rows)
		const quarterPoints=
			[
				[new Point(0,0),commonPoint],
				[new Point(mid.cols,0),new Point(this.cols,mid.rows)],
				[new Point(0,mid.rows),new Point(mid.cols,this.rows)],
				[commonPoint,new Point(this.cols,this.rows)]
			]
		for(let i=0;i<this.#mineCount;)
		{
			const point=Point.getRand(...quarterPoints[i%quarterPoints.length])
			if(!this.hasState('MINE',point))
			{
				this.setState('MINE',point)
				console.log(point)
				++i
			}
		}
	}
}