class TopMatrix extends Matrix
{
	#flagCount
	#isOpenedCellCount
	constructor(cols,rows,flagCount)
	{
		super(cols,rows,'DEFAULT')
		this.#flagCount=flagCount
		this.#isOpenedCellCount=0
	}
	get flagCount()
	{
		return this.#flagCount
	}
	get isOpenedCellCount()
	{
		return this.#isOpenedCellCount
	}
	decFlagCount()
	{
		--this.#flagCount
	}
	getFirstNotFlaggedCellPoint()
	{
		return this.getPointsNot('FLAG')[0]
	}
	getFlagCountNearCell(point)
	{
		return this
				.getPointsNearCell(point)
				.filter
					(
						(point)=>
						{
							return this.hasState('FLAG',point)
						}
					)
				.length
	}
	incOpenedCellCount()
	{
		++this.#isOpenedCellCount
	}
	incFlagCount()
	{
		++this.#flagCount
	}
}