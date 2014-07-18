var FormValidator	= require("./formValidator.js");
var datepicker		= core.require("./apps/common/widgets/datepicker/datepicker.js");
var timepicker		= core.require("./apps/common/widgets/timepicker/timepicker.js");
var formUtils		= {};



// Checar se o tipo de input é válido no navegador
formUtils.isTypeSupported = function(type)
{
	var i = document.createElement("input");
	i.setAttribute("type", type);
	return i.type !== "text";
}





// Converter todos os campos no formulário em um objeto
formUtils.formToObject = function(el)
{
	//Check if the numebr on String is equal to it's representation and it's bigger than 0
	function isNaturalInteger(str)
	{
		var n = ~~Number(str);
		return String(n) === str && n >= 0;
	}

	var obj = {};
	$(el).find("input,select,textarea").each(function(index, field)
	{
		if(!field.name) return;
		var path = field.name.replace(/\]/g, "").split("[");
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
					if (field.type == "checkbox" || field.type == "radio")
					{
						if (field.checked)
						{
							prevLevel.push(field.value);
						}
					}
					else
					{
						prevLevel.push(field.value);
					}
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
				if (field.type == "checkbox" || field.type == "radio")
				{
					if (field.checked)
					{
						currentLevel[prop] = field.value;
					}
				}
				else
				{
					currentLevel[prop] = field.value;
				}
			}
		}
	});
	return obj;
}






// Aplica máscara genérica no campo
formUtils.mask = function(input, mask)
{
	$(input).mask(mask);
	return input;
}






// Aplica máscara de telefone brasileiro no campo
formUtils.mask.brazillianPhone = function(input)
{
	var that = $(input);
	that.change(function()
	{
		that.unmask();
		phone = that.val().replace(/\D/g, '');
		if(phone.length > 10)
		{
			that.mask("(99) 99999-999?9");
		}
		else
		{
			that.mask("(99) 9999-9999?9");
		}
	}).change();
	return input;
}






// Aplica máscara de dinheiro no campo
formUtils.mask.money = function(input)
{
	var that = $(input);

	var empty = that.val() == "";

	that.each(function()
	{
		var val = this.value;
		if(val.indexOf(",") < 0)
		{
			this.value = val + ",00";
		}
	});

	that.maskMoney(
	{
		affixesStay:	true,
		prefix:			"R$ ",
		thousands:		".",
		decimal:		","
	}).maskMoney("mask");

	if(empty)
	{
		that.val("");
	}

	return input;
}






// Limita a digitação de números no campo de texto
formUtils.numericInput = function(input)
{
	$(input).keyup(function()
	{ 
		this.value = this.value.replace(/[^0-9\.]/g,'');
	});
	return input;
}






// Validação
var validator = new FormValidator();
validator.defaults = 
{
	eachValidField: function(field)
	{
		$(field).parents(".form-group").removeClass("has-error");
	},
	eachInvalidField: function(field)
	{
		$(field).parents(".form-group").addClass("has-error");
	}
}
formUtils.validate = function(form, options)
{
	return validator.test(form, options);
}






/***************************************************************/
/*    Inicializador Automático de Campos, Plugins e Widgets    */
/***************************************************************/

formUtils.initInput = function(el)
{
	el = $(el);

	el.each(function()
	{
		if(this.dataset.inited) return;

		this.dataset.inited = true;

		if(this.dataset.value)
			this.value = this.dataset.value;
		if(this.dataset.mask)
			if(this.dataset.mask == "brazillian-phone")
				formUtils.mask.brazillianPhone(this);
			else if(this.dataset.mask == "numeric")
				formUtils.numericInput(this);
			else if(this.dataset.mask == "money")
				formUtils.mask.money(this);
			else
				formUtils.mask(this, this.dataset.mask);
		if(this.dataset.type)
			switch(this.dataset.type)
			{
				case "date":
					datepicker(this, {selectClass: "form-control"});
					break;
				case "time":
					timepicker(this, {selectClass: "form-control"});
					break;
			}
	});
}


module.exports = formUtils;