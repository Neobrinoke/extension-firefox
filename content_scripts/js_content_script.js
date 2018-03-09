var nCount = 0; // Création du compteur pour le nombre d'erreur qui sera peut-être afficher
function js_content_script( request, sender, sendResponse )
{
	var messageResponse = ""; // Création d'une variable (string) content tous mes messages d'erreurs
	messageResponse += checkLangAttributeHtml(); // Ajout d'un message d'erreur via l'appel d'une fonction
	messageResponse += checkmetaCharSet();
	messageResponse += checkStyleAllElements();
	messageResponse += checkStyleTag();
	messageResponse += checkScriptTag();
	messageResponse += checkCenterTag();

	if( nCount > 0 ) // si le compteur d'erreur est supérieur à 0 ( au moins égale a 1 )
	{
		// On remonte le message 'il y a ..' au dessus de la liste des erreurs
		messageResponse = "Il y a " + nCount + " problème(s) sur ce site\n\n" + messageResponse;

		window.alert( messageResponse ); // Fait apparaitre un pop-up avec un message
	}
	else window.alert( "Aucun problème sur ce site" ); // Fait apparaitre un pop-up avec un message

	browser.runtime.onMessage.removeListener( js_content_script );
}

function checkLangAttributeHtml() // Fonction qui regarde si l'élément html possède un attribus lang
{
	// hasAttribute: retourne une value boolean
	if( document.documentElement.hasAttribute("lang") === false ) // si l'élément html possède pas d'attribus lang
	{
		nCount++; // ajoute + 1 a la variable nCount
		return "La balise <html> n'as pas d'attribu lang\n"; // Arrête l'éxecution de la fonction et retourne un message
	}
	return ""; // Arrête la fonction ici et retourne un message
}

function checkmetaCharSet()
{
	var elements = document.getElementsByTagName("meta");
	for( var i = 0; i < elements.length; i++ )
	{
		if( elements[i].hasAttribute("charset") === true )
			return "";
	}
	nCount++;
	return "Aucune balise <meta> avec l'attribu 'charset' de trouvé\n";
}

function checkStyleAllElements()
{
	var elements = document.getElementsByTagName("*");
	for( var i = 0; i < elements.length; i++ )
	{
		if( elements[i].hasAttribute("style") === true )
		{
			nCount++;
			return "Une balise possède un attribu style\n";
		}
	}
	return "";
}

function checkStyleTag()
{
	var elements = document.getElementsByTagName("style");
	if( elements.length > 0 )
	{
		nCount++;
		return "Une balise 'style' a été trouvé\n";
	}
	return "";
}

function checkScriptTag()
{
	var elements = document.getElementsByTagName("script");
	for( var i = 0; i < elements.length; i++ )
	{
		if( elements[i].hasAttribute("src") === false )
		{
			nCount++;
			return "Une balise 'script' contient du code en dur";
		}
	}
	return "";
}

function checkCenterTag()
{
	var elements = document.getElementsByTagName("center");
	if( elements.length > 0 )
	{
		nCount++;
		return "Une balise 'center' est utilisé";
	}
	return "";
}

browser.runtime.onMessage.addListener( js_content_script );