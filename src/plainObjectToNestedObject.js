function plainObjectToNestedObject(plain)
{
	function isNaturalInteger(str)
	{
		var n = ~~Number(str);
		return String(n) === str && n >= 0;
	}

	var obj = {};
	var keys=Object.keys(plain);
	keys.forEach(function(key)
	{
		var path = key.split(".");
		var prevLevel = null;
		var prevProp = null;
		var currentLevel = obj;
		for(var i = 0; i < path.length; i++)
		{
			prevLevel = currentLevel;
			prop = path[i];
			if(prop === "")
			{
				currentLevel = {};
				if(i < path.length - 1)
				{
					prevLevel.push(currentLevel);
				}
				else if(i === path.length - 1)
				{
					prevLevel.push(plain[key]);
				}
				i++;
			}
			else if(typeof currentLevel[prop] == "undefined")
			{
				currentLevel[prop] = (path[i+1] === "" || isNaturalInteger(path[i+1])) ? [] : {};
			}

			if(i < path.length - 1)
			{
				currentLevel = currentLevel[prop];
			}
			else if(i === path.length - 1)
			{
				currentLevel[prop] = plain[key];
				
			}
		}
	});
	return obj;
}

module.exports=plainObjectToNestedObject;