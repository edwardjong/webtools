/**
 * @returns
 */

$(document)
	.ready(
		function()
		{
		    /*
		     * $("hidden").hide();
		     * 
		     * $("h1").click(function() {
		     * $(this).next().slideToggle(300); $('div#hidden').hide();
		     * });
		     * 
		     * function toggleDiv(divId) { $("#" + divId).toggle(); }
		     */		       
		    
		    // define variables
		    var navOffset, scrollPos = 0;

		    // add utility wrapper elements for positioning
		    jQuery("nav").wrap('<div class="nav-placeholder"></div>');
		    jQuery("nav").wrapInner('<div class="nav-inner"></div>');
		    jQuery(".nav-inner").wrapInner(
			    '<div class="nav-inner-most"></div>');

		    // function to run on page load and window resize
		    function stickyUtility()
		    {
			// only update navOffset if it is not currently using
			// fixed position
			if (!jQuery("nav").hasClass("fixed"))
			{
			    navOffset = jQuery("nav").offset().top;
			}

			// apply matching height to nav wrapper div to avoid
			// awkward content jumps
			jQuery(".nav-placeholder").height(
				jQuery("nav").outerHeight());

		    } // end stickyUtility function

		    // run on page load
		    stickyUtility();

		    // run on window resize
		    jQuery(window).resize(function()
		    {
			stickyUtility();
		    });

		    // run on scroll event
		    jQuery(window).scroll(function()
		    {
			scrollPos = jQuery(window).scrollTop();

			if (scrollPos >= navOffset)
			{
			    jQuery("nav").addClass("fixed");
			} else
			{
			    jQuery("nav").removeClass("fixed");
			}

		    });
		});

		    var itemNameSaved, nameExtSaved;

		    function toggleDiv(divId)
		    {
			$("#" + divId).toggle();
		     // $("#divId").toggle();
		        console.log(divId);
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

			    var searchBar = document
				    .getElementById('searchBar');

			    if (this.readyState == 4 && this.status == 200)
			    {
				var json = JSON.parse(this.responseText)
				var text = ""
				for (var i = 0; i < json.length; i++)
				{
				    console.log(searchBar.value);

				    var matches = (searchBar.value == "Search junkyard...")
					    || ((json[i].itemName.toUpperCase())
						    .indexOf(searchBar.value
							    .toUpperCase()) >= 0)
					    || ((json[i].nameExt.toUpperCase())
						    .indexOf(searchBar.value
							    .toUpperCase()) >= 0)
					    || ((json[i].type.toUpperCase())
						    .indexOf(searchBar.value
							    .toUpperCase()) >= 0)
					    || ((json[i].developer
						    .toUpperCase())
						    .indexOf(searchBar.value
							    .toUpperCase()) >= 0)
					    || ((json[i].description
						    .toUpperCase())
						    .indexOf(searchBar.value
							    .toUpperCase()) >= 0)
					    || ((json[i].profiel.toUpperCase())
						    .indexOf(searchBar.value
							    .toUpperCase()) >= 0) ? true
					    : false;
				    if (((matches) & (json[i].type != "funstuff"))
					    || ((matches) & (searchBar.value == "funstuff")))
				    {
					text += "<div class=\"item-info-holder mobile-collapse\">"
					text += "<div class=\"image-holder position-img mobile-collapse\">"

					text += "<a href=\"#\" onClick=\"loadItem("
						+ json[i].id + ")\">"
					text += "<img src=\"" + json[i].plaatje
						+ "\">"
					text += "</a>"
					text += "</div>"
					text += "<a href=\"#\" onClick=\"loadItem("
						+ json[i].id + ")\">"
					text += "<h3><span><e>"
						+ json[i].itemName + "  "
						+ json[i].nameExt
						+ "</e></span></h3>"
					text += "</a>"
					text += "<h3><span><f>" + json[i].datum
						+ " </f></span></h3>"
					text += "</div>"
				    }
				}

				document.getElementById("main-content-items").innerHTML = text
			    }
			};
			xhttp.open("GET", "/webtools/rest/jaxrs/items", true); // RESTful
										// webservice
										// JAX-RS
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
				text += "<thead><tr><th colspan=\"3\">"
					+ json.itemName + " " + json.nameExt
					+ "</th>"
				text += "</tr><tr><th>"
				text += "<div class=\"image-holder position-img\">"

				text += "<img src=\"" + json.plaatje + "\">"

				text += "</a>"
				text += "</div>"

				text += "<th rowspan=\"2\">" + json.profiel
					+ "</th>"
				text += "<thead><tr><th colspan=\"3\"><b>Developer : </b>"
					+ json.developer + "</th>"
				text += "<thead><tr><th colspan=\"3\"><b>Description : </b>"
					+ json.description + "</th>"
				text += "<thead><tr><th colspan=\"3\"><b>Type : </b>"
					+ json.type + "</th>"
				text += "<thead>"
					+ "<tr>  +"
					+ "<th colspan=\"3\"><b>Download/Play : </b>"
					+
					// "<a href=\" + json.doc + \"> " +
					"<a href=\" " + json.doc + " \"> " + ""
					+ "" + "DOC, PDF, MP4, HTML etc."
					+ "</a>" + "</th>" + "</tr>"
					+ "</thead>"
				// console.log(json.itemName, json.nameExt);
				itemNameSaved = json.itemName;
				nameExtSaved = json.nameExt;

				text += "</tr></tbody></table>"
				text += "<div id =\"admin-bar\">"
				text += "<button id=\"btnChangeItem\">Change</button>"
				text += "<button id=\"btnDeleteItem\">Delete</button>"
				text += "</div>"

				document.getElementById("main-content-items").innerHTML = text
				document
					.getElementById("btnChangeItem")
					.setAttribute("onClick",
						"formFillItem(" + json.id + ")");
				document.getElementById("btnDeleteItem")
					.setAttribute("onClick",
						"retireItem(" + json.id + ")");
			    }
			};
			xhttp.open("GET", "/webtools/rest/jaxrs/item/" + id,
				true); // RESTful webservice JAX-RS
			xhttp.send();
		    }

		    function formFillItem(id)
		    {
			var html = new XMLHttpRequest();
			html.open("get", "/webtools/itemForm.html", true); // RESTful
									    // webservice
									    // JAX-RS
			html.onreadystatechange = function()
			{
			    if (this.readyState == 4 && this.status == 200)
			    {
				document.getElementById("main-content-items").innerHTML = this.responseText;
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function()
				{
				    if (this.readyState == 4
					    && this.status == 200)
				    {
					var item = JSON
						.parse(this.responseText);
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
				xhttp.open("GET", "/webtools/rest/jaxrs/item/"
					+ id, true); // RESTful webservice JAX-RS
							 
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
			var description = document
				.getElementById("description").value;
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
				    document
					    .getElementById("main-content-items").innerHTML = "Item "
					    + itemNameSaved
					    + " "
					    + nameExtSaved
					    + " changed to "
					    + itemName + " " + nameExt;
				} else
				{

				    document
					    .getElementById("main-content-items").innerHTML = "Item "
					    + itemName
					    + " "
					    + nameExt
					    + " added"
				}
			    }
			};

			xhttp.open("POST", "/webtools/rest/jaxrs/item", true); // RESTful webservice JAX-RS
			xhttp.setRequestHeader("Content-Type",
				"application/json");
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
			xhttp.open("get", "/webtools/itemForm.html", true); // RESTful webservice JAX-RS
			xhttp.send();
		    }

		    function uploadOnChange(e, divName)
		    {
			var filename = e.value;
			console.log(filename);
			var lastIndex = filename.lastIndexOf("\\");
			if (lastIndex >= 0)

			{
			    filename = filename.substring(lastIndex + 1);
			}
			document.getElementById(divName).value = "Images/"
				+ filename;
			console.log(e.value);
		    }

		    function retireItem(id)
		    {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function()
			{
			    if (this.readyState == 4 && this.status == 204)
			    {
				document.getElementById("main-content-items").innerHTML = "Item "
					+ itemNameSaved
					+ " "
					+ nameExtSaved
					+ " deleted"
			    }
			};
			xhttp.open("DELETE", "/webtools/rest/jaxrs/item/" + id,
				true); // RESTful webservice JAX-RS

			xhttp.send();
		    }


