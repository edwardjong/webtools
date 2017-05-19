/**
 * @returns
 */

$(document).ready(function()
{
    /*
     * $("hidden").hide();
     * 
     * $("h1").click(function() { $(this).next().slideToggle(300);
     * $('div#hidden').hide(); });
     * 
     * function toggleDiv(divId) { $("#" + divId).toggle(); }
     */
});

function toggleDiv(divId)
{
    $("#" + divId).toggle();
}

function searchActive()
{
    var searchBar = document.getElementById('searchBar');

    if (searchBar.value == 'Search junkyard...')
    {
	searchBar.value = ''
	searchBar.placeholder = 'Search junkyard...'
    }
}

function searchInactive()
{
    var searchBar = document.getElementById('searchBar');
    if (searchBar.value == '')
    {
	searchBar.value = 'Search junkyard...'
	searchBar.placeholder = ''
    }
}

function loadDoc()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {

	var searchBar = document.getElementById(id = 'searchBar');
	if (this.readyState == 4 && this.status == 200)
	{
	    var json = JSON.parse(this.responseText)
	    var text = ""
	    for (var i = 0; i < json.length; i++)
	    {
		console.log(searchBar.value);

		var matches = (searchBar.value == "Search junkyard...")
			|| ((json[i].itemName.toUpperCase())
				.indexOf(searchBar.value.toUpperCase()) >= 0)
			|| ((json[i].nameExt.toUpperCase())
				.indexOf(searchBar.value.toUpperCase()) >= 0)
			|| ((json[i].type.toUpperCase())
				.indexOf(searchBar.value.toUpperCase()) >= 0)
			|| ((json[i].developer.toUpperCase())
				.indexOf(searchBar.value.toUpperCase()) >= 0)
			|| ((json[i].description.toUpperCase())
				.indexOf(searchBar.value.toUpperCase()) >= 0)
			|| ((json[i].profiel.toUpperCase())
				.indexOf(searchBar.value.toUpperCase()) >= 0) ? true
			: false;
		if (((matches) & (json[i].type != "funstuff")) ||
		    ((matches) & (searchBar.value == "funstuff")))
		{
		    text += "<div class=\"item-info-holder\">"
		    text += "<div class=\"image-holder position-img\">"

		    text += "<a href=\"#\" onClick=\"loadItem(" + json[i].id
			    + ")\">"
		    text += "<img src=\"" + json[i].plaatje + "\">"
		    text += "</a>"
		    text += "</div>"
		    text += "<a href=\"#\" onClick=\"loadItem(" + json[i].id
			    + ")\">"
		    text += "<h3><span><e>" + json[i].itemName + "  "
			    + json[i].nameExt + "</e></span></h3>"
		    text += "</a>"
		    text += "<h3><span><f>" + json[i].datum
			    + " </f></span></h3>"
		    text += "</div>"
		}
	    }

	    document.getElementById("main-content-items").innerHTML = text
	}
    };
    xhttp.open("GET", "/webtools/rest/jaxrs/items", true);
    xhttp.send();
}

function loadItem(id)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
	if (this.readyState == 4 && this.status == 200)
	{
	    var json = JSON.parse(this.responseText);
	    var text = ""

	    text += "<table id=\"table-example-1\">"
	    text += "<thead><tr><th colspan=\"3\">" + json.itemName + " "
		    + json.nameExt + "</th>"
	    text += "</tr><tr><th>"
	    text += "<div class=\"image-holder position-img\">"

	    text += "<img src=\"" + json.plaatje + "\">"

	    text += "</a>"
	    text += "</div>"

	    text += "<th rowspan=\"2\">" + json.profiel + "</th>"
	    text += "<thead><tr><th colspan=\"3\"><b>Developer : </b>"
		    + json.developer + "</th>"
	    text += "<thead><tr><th colspan=\"3\"><b>Description : </b>"
		    + json.description + "</th>"
	    text += "<thead><tr><th colspan=\"3\"><b>Type : </b>" + json.type
		    + "</th>"
	    text += "<thead>" + "<tr>  +"
		    + "<th colspan=\"3\"><b>Download/Play : </b>" +
		    // "<a href=\" + json.doc + \"> " +
		    "<a href=\" " + json.doc + " \"> " + "" + ""
		    + "DOC, PDF, MP4, HTML etc." + "</a>" + "</th>" + "</tr>"
		    + "</thead>"
	    // console.log(json);

	    text += "</tr></tbody></table>"
	    text += "<div id =\"admin-bar\">"
	    text += "<button id=\"btnChangeItem\">Change</button>"
	    text += "<button id=\"btnDeleteItem\">Delete</button>"
	    text += "</div>"

	    document.getElementById("main-content-items").innerHTML = text
	    document.getElementById("btnChangeItem").setAttribute("onClick",
		    "formFillItem(" + json.id + ")");
	    document.getElementById("btnDeleteItem").setAttribute("onClick",
		    "retireItem(" + json.id + ")");
	}
    };
    xhttp.open("GET", "/webtools/rest/jaxrs/item/" + id, true);
    xhttp.send();
}

function formFillItem(id)
{
    var html = new XMLHttpRequest();
    html.open("get", "/webtools/itemForm.html", true);
    html.onreadystatechange = function()
    {
	if (this.readyState == 4 && this.status == 200)
	{
	    document.getElementById("main-content-items").innerHTML = this.responseText;
	    var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function()
	    {
		if (this.readyState == 4 && this.status == 200)
		{
		    var item = JSON.parse(this.responseText);
		    document.getElementById("itemId").value = id;
		    document.getElementById("itemName").value = item.itemName;
		    document.getElementById("nameExt").value = item.nameExt;
		    document.getElementById("datum").value = item.datum;
		    document.getElementById("developer").value = item.developer;
		    document.getElementById("description").value = item.description;
		    document.getElementById("type").value = item.type;
		    document.getElementById("profiel").value = item.profiel;
		    document.getElementById("plaatje").value = item.plaatje;
		    document.getElementById("doc").value = item.doc;
		}
	    };
	    xhttp.open("GET", "/webtools/rest/jaxrs/item/" + id, true);
	    xhttp.send();
	}
    }
    html.send();
}

function formSubmit()
{
    var itemName = document.getElementById("itemName").value;
    var nameExt = document.getElementById("nameExt").value;
    var datum = document.getElementById("datum").value;
    var developer = document.getElementById("developer").value;
    var description = document.getElementById("description").value;
    var type = document.getElementById("type").value;
    var profiel = document.getElementById("profiel").value;
    var plaatje = document.getElementById("plaatje").value;
    var doc = document.getElementById("doc").value;
    var itemId = document.getElementById("itemId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
	if (this.readyState == 4 && this.status == 204)
	{
	    if (itemId != "0")
	    {
		document.getElementById("main-content-items").innerHTML = "Item changed"
	    } else
	    {
		document.getElementById("main-content-items").innerHTML = "Item added"
	    }
	}
    };

    xhttp.open("POST", "/webtools/rest/jaxrs/item", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(
    {
	id : itemId,
	itemName : itemName,
	nameExt : nameExt,
	datum : datum,
	developer : developer,
	description : description,
	type : type,
	profiel : profiel,
	plaatje : plaatje,
	doc : doc
    }));

}

function getItemForm()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
	document.getElementById("main-content-items").innerHTML = this.responseText
    }
    xhttp.open("get", "/webtools/itemForm.html", true);
    xhttp.send();
}

function uploadOnChange(e, divName)
{
    var filename = e.value;
    var lastIndex = filename.lastIndexOf("\\");
    if (lastIndex >= 0)

    {
	filename = filename.substring(lastIndex + 1);
    }
    document.getElementById(divName).value = "Images/" + filename;
    console.log(e.value);
}

function retireItem(id)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
	if (this.readyState == 4 && this.status == 204)
	{
	    document.getElementById("main-content-items").innerHTML = "Item deleted"
	}
    };
    xhttp.open("DELETE", "/webtools/rest/jaxrs/item/" + id, true);
    xhttp.send();
}