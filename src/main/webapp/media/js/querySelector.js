/**
 * 定义 document.querySelector 和 document.querySelectorAll，用来支持IE7
 */
(function () {
	var style = ""; 
	if(!document.createStyleSheet) {
		style = document.createElement("style");
	} 
		
    var select = function (selector, maxCount) {
			var
				all = document.all,
				l = all.length,
				i,
				resultSet = [];

			style.addRule(selector, "foo:bar");
			for (i = 0; i < l; i += 1) {
				if (all[i].currentStyle.foo === "bar") {
					resultSet.push(all[i]);
					if (resultSet.length > maxCount) {
						break;
					}
				}
			}
			style.removeRule(0);
			return resultSet;

		};

	//  be rly sure not to destroy a thing!
	if (document.querySelectorAll || document.querySelector) {
		return;
	}

	document.querySelectorAll = function (selector) {
		return select(selector, Infinity);
	};
	document.querySelector = function (selector) {
		return select(selector, 1)[0] || null;
	};
}());