function * getRangeNum(startIndex,endIndex,step=1)
{
	for(let i=startIndex;i<=endIndex;i+=step)
	{
		yield i
	}
}
function * getRangeNumUntil(startIndex,endIndex,step=1)
{
	for(let i=startIndex;i<endIndex;i+=step)
	{
		yield i
	}
}
function getRandNumUntil(min,max)
{
	return Math.floor(Math.random()*(max-min))+min
}