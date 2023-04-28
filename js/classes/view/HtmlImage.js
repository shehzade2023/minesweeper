class HtmlImage
{
	static size
	static get(name)
	{
		return window[`img-${new String(name).toLowerCase()}`]
	}
}