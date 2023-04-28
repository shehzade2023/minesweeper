class Point
{
	constructor(x,y)
	{
		this.x=x
		this.y=y
	}
	static getRand(point1,point2)
	{
		return new Point(getRandNumUntil(point1.x,point2.x),getRandNumUntil(point1.y,point2.y))
	}
	equals(point)
	{
		return this.x==point.x&&this.y==point.y
	}
}