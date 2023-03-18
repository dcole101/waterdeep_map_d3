function isMobile() {
	if (/android|iphone|ipad|ipod|mobi|mini|tablet/i.test(navigator.userAgent) )
		return (true);
	else
		return (false);
}

function generateBuildingTxt(building) {
	var txt = "";
	txt += `<p><strong>Controlling Guild</strong>: ${building.guild}</p>`;
	txt += `<p><strong>Ward</strong>: ${building.ward}</p>`;
	txt += `<p><strong>Owner</strong>: ${building.owner}</p>`;
	txt += `<p>${building.txt}</p>`;
	return txt;
}

function setPoints(mode) {

	if ((viewPoints == 0) || ((viewPoints == 1) && (mode == 2)))
	{
		dot.remove();
		$("[id^='circ']").remove();
		var x=y=0;
		var nbrGrp=into=0;

		var Ptv1 = $('#ptv1').prop('checked');
		var Ptv2 = $('#ptv2').prop('checked');
		var Ptv3 = $('#ptv3').prop('checked');
		var Ptv4 = $('#ptv4').prop('checked');
		var Ptv5 = $('#ptv5').prop('checked');
		var Ptv6 = $('#ptv6').prop('checked');
		var Ptv7 = $('#ptv7').prop('checked');
		var Ptv8 = $('#ptv8').prop('checked');
		var Ptv9 = $('#ptv9').prop('checked');

		for (var i=0; i<groupe.length; i++)
		{
			into=0;

			if (bilang == 1)
			{
				if (lang == 1)
				{
					nameP = nameS = groupe[i].name1;
					txtP = txtS = generateBuildingTxt(groupe[i]);
				}
				else
				{
					nameP = groupe[i].name0;
					nameS = groupe[i].name1;
					txtP = generateBuildingTxt(groupe[i]);
					txtS = generateBuildingTxt(groupe[i]);
				}
			}
			else
			{
				nameP = nameS = groupe[i].name;
				txtP = txtS = generateBuildingTxt(groupe[i]);
			}

			if (nameP == "GROUP")
				nbrGrp++;

			switch(nbrGrp) {
				case (1): if (Ptv1==1) into=1; break;
				case (2): if (Ptv2==1) into=1; break;
				case (3): if (Ptv3==1) into=1; break;
				case (4): if (Ptv4==1) into=1; break;
				case (5): if (Ptv5==1) into=1; break;
				case (6): if (Ptv6==1) into=1; break;
				case (7): if (Ptv7==1) into=1; break;
				case (8): if (Ptv8==1) into=1; break;
				case (9): if (Ptv9==1) into=1; break;
			}
			if (into)
			{
	 			x= groupe[i].x;
				if (x != 0)
				{
					y= groupe[i].y;

					var guildColour = guildToColour(groupe[i].guild);
					var strokeColour = "#000000";
					dot = map.circle(x,y).attr({fill: guildColour, stroke: strokeColour, "stroke-width": dotTrait, r: 0, cursor: "pointer"});
					dot.stop().attr(200).animate({r:dotWidth}, 1000, "elastic");
					dot.node.id = 'circ'+i;
					var descr = "<h2>"+nameP+"</h2>";
					if (nameP != nameS) descr += "<h3>[ "+nameS+" ]</h3>";
					dot.node.name = descr;
					if (txtP != "") descr = txtP; else descr = txtS;
					dot.node.text = descr;

					dot.click(function(){$('#txt').html(this.node.name+this.node.text); showDescr();});
				}
			}
		}
		if (mode != 2)
			viewPoints = 1;
	}
	else
	{
		$("[id^='circ']").remove();
		if (mode != 2)
			viewPoints = 0;
	}

	if (mode == 1)
		$('#menu').toggle();
}

function toogleZones() {
	if (viewZones == 0)
	{
		$("[id^='zone']").animate({"fill-opacity":0.5}, 300);
		viewZones = 1;
	}
	else
	{
		$("[id^='zone']").animate({"fill-opacity":0}, 300);
		viewZones = 0;
	}
}

function affichePoint(search) {
	dot.remove();
	$("[id^='circ']").remove();
	var x = y = 0;
	viewPoints = 0;

	for (var i=0; i<groupe.length; i++)
	{
		if (bilang == 1)
		{
			if (lang == 1)
			{
				nameP = nameS = groupe[i].name1;
				txtP = txtS = generateBuildingTxt(groupe[i]);
			}
			else
			{
				nameP = groupe[i].name0;
				nameS = groupe[i].name1;
				txtP = generateBuildingTxt(groupe[i]);
				txtS = generateBuildingTxt(groupe[i]);
			}
		}
		else
		{
			nameP = nameS = groupe[i].name;
			txtP = txtS = generateBuildingTxt(groupe[i]);
		}

		if (nameP == search || nameS == search)
		{
			x= groupe[i].x;
			y= groupe[i].y;
			var descr = "<h2>"+nameP+"</h2>";
			if (nameP != nameS) descr += "<h3>[ "+nameS+" ]</h3>";
			if (txtP != "") descr += txtP; else descr += txtS;

			$('#txt').html(descr);
			showDescr();
			break;
		}
	}
	if (x != 0)
	{
		var guildColour = guildToColour(groupe[i].guild);
		var strokeColour = "#000000";
		dot = map.circle(x,y).attr({fill: guildColour, stroke: strokeColour, "stroke-width": dotTrait, r: 0, cursor: "pointer"});
		dot.stop().attr(200).animate({r:dotWidth}, 1000, "elastic");
		dot.click(function(){$('#txt').html(descr); showDescr();});
	}
	/* centre sur le point cherché */
	zoom=zoomPoint;
	resize(0);
	offsetX = (x/ratio - screenW/2);
	offsetY = (y/ratio - screenH/2);
	moveMap();
}

function guildToColour(guild) {
	if (guild == "None") return "#FFFFFF";
	if (guild == "Carlstown Blasting Company (Carleton)") return "#ff0e00";
	if (guild == "The Silverware Laureates (Laurier)") return "#f8b800";
	if (guild == "The Riders of the Westernreach (Western)") return "#ab3fdd";
	if (guild == "Blades of the Trentarian (Trent)") return "#58bb43";
	if (guild == "United Travellers Monastery (UTM)") return "#4a5c81";
	if (guild == "The Northern Corporation (Algonquin)") return "#0cff00";
	if (guild == "New Guildtown (Brock)") return "#967ac1";
	return "#FFFFFF";
}

function unshowDescr() {
	$('#descr').slideToggle(250);
}

function showDescr() {
	if ($('#descr').is(":hidden"))
		$('#descr').slideToggle(250);
}

function clearSearch() {
	if ( $("#search").val() == LgSearch)
	{
		$("#search").val('');
		$("#search").removeClass('txtgris')
		$('#search-icon').hide();
		$('#del-icon').show();
	}
}

function setSearch(force) {
	$("#search").val(LgSearch);
	$("#search").addClass('txtgris')
	$('#search-icon').show();
	$('#del-icon').hide();
	setPoints(0);
	unshowDescr();
}

function toggleMenu() {
	$('#menu').toggle();
}

$(function() {
	$('#search').autocomplete({
		source: availableLieux,
		select: function( event, ui ) { affichePoint(ui.item.label);}
	});
});

function test() {
	$('#menu').toggle();
	$('#txt').html(LgTest);
	showDescr();
}

function trajet(mode) {
	if (mode == 1)
		$('#menu').toggle();
	else
		$('#menu').hide();
	$('#txt').html(LgStartTra);
	showDescr();
	drawing = 1;
}

$(document).keyup(function(e) {
	if (e.keyCode === 27 && drawing)
	{
		$("[id^='line']").remove();
		$('#txt').html("");
		showDescr();
		drawing = distance = 0;
	}
});

$(document).keydown(function(e) {

	if(e.ctrlKey && e.keyCode == 'A'.charCodeAt(0)) {
		e.preventDefault();
		setPoints(0);
	}
	else if(e.ctrlKey && e.keyCode == 'D'.charCodeAt(0)) {
		e.preventDefault();
		trajet(0);
	}
	else if (e.keyCode == 107) setZoom(zoomStrong);	// + = zoom+
	else if (e.keyCode == 109) setZoom(-zoomStrong)	// - = zoom-
	else if (zoom > 1)
	{
		switch (e.which) {
			case 37: // fleche gauche
				offsetX = offsetX - moveStep; moveMap(); break;
			case 38: // fleche haut
				offsetY = offsetY - moveStep; moveMap(); break;
			case 39: // fleche droite
			 	offsetX = offsetX + moveStep; moveMap(); break;
			case 40: // fleche bas
			 	offsetY = offsetY + moveStep; moveMap(); break;
		}
	}
});

$(document).on('wheel', function(e) {
	if (e.originalEvent.deltaY > 0)
		setZoom(-zoomLite);
	else
		setZoom(zoomLite);
});

function setZoom(sens) {
	var exRatioX = ((realWidth/zoom/2) +offsetX)/realWidth;
	var exRatioY = ((realHeight/zoom/2)+offsetY)/realHeight;

	if (sens > 0 && zoom < zoomMax)
		resize(sens);
	else if (sens < 0 && zoom > 1)
		resize(sens);

	if (zoom > 1)
	{
		offsetX = (exRatioX * realWidth)  - (realWidth/zoom/2);
		offsetY = (exRatioY * realHeight) - (realHeight/zoom/2);
	}
	moveMap();
}

function resize(z) {
	if (z > 0)
		zoom = zoom * Math.abs(z);
	else if (z < 0)
		zoom = zoom / Math.abs(z);

	if (zoom <= 1)
		zoom = 1;

	realWidth  = screenW * zoom;
 	realHeight = screenH * zoom;
	ratio = Math.max(drawWidth/realWidth, drawHeight/realHeight);
	tailleX=parseInt(drawWidth/ratio);
	tailleY=parseInt(drawHeight/ratio);

	map.setSize(realWidth, realHeight);

	var img = $("#map").css('background-image').replace(/url\(\"|\"\)$/ig, "");
	var bgImgWidth = img.width;
	var bgImgHeight = img.height;
	$("#map").css('background-size', tailleX+'px '+tailleY+'px');
}

function moveMap() {
	if (zoom == 1)
	{
		offsetX = (tailleX - realWidth)/2;
		offsetY = (tailleY - realHeight)/2;
	}
	else
	{
		if (offsetX < -(screenW/2)) 	offsetX = -screenW/2;
		else if (offsetX > (tailleX-screenW/2)) offsetX = (tailleX-screenW/2);

		if (offsetY < -(screenH/2)) 	offsetY = -screenH/2;
		else if (offsetY > (tailleY-screenH/2)) offsetY = (tailleY-screenH/2);
	}

	$("#map").css('background-position', -offsetX+'px ' + -offsetY+'px');
	map.setViewBox(offsetX*ratio, offsetY*ratio, drawWidth, drawHeight, false);
}

function drawLine(x, y)
{
	line = map.path("M"+oldX+","+oldY+" L"+x+","+y);
	line.attr ("stroke", "#0000FF");
	line.attr ("stroke-width", 8);
	line.attr ("stroke-linecap", 'round');
	line.node.id = 'line'+idT;
	idT++;
	distance = distance + Math.sqrt((x-oldX)*(x-oldX) + (y-oldY)*(y-oldY)) / factorKm;

	var texte = LgEndTra+LgDist;

	if (carte == "L" || carte == "N" || carte == "W" || carte == "B")
	{
		var distEUR = (distance*1000).toFixed(0);
		var distUS  = (distEUR*3.281).toFixed(0);
		texte += distEUR + " m / " + distUS + " feet</p>" + LgDuree;

		dureeM = Math.round (distEUR / 90);		// 90 m/min
		if (dureeM <= 1)
			texte += dureeM+LgMinute;
		else if (dureeM > 1)
			texte += dureeM+LgMinutes;
		texte += "</p>";
	}
	else
	{
		var distEUR = distance.toFixed(1);
		var distUS  = (distEUR*0.621).toFixed(1);
		texte += distEUR + " km / " + distUS + " miles</p>" + LgDuree;

		var dureeJ = Math.floor (distEUR / 36);		// 36 km/h
		var dureeH = Math.round (distEUR % 36 * 8 / 36);
	 	if (dureeJ == 1)
			texte += dureeJ+LgJour;
		else if (dureeJ > 1)
 			texte += dureeJ+LgJours;
		if (dureeH <= 1)
			texte += dureeH+LgHeure;
		else if (dureeH > 1)
			texte += dureeH+LgHeures;
		texte += LgMarche+"</p>";
	}
	$('#txt').html(texte);
	showDescr();

	oldX = x;
	oldY = y;
}
