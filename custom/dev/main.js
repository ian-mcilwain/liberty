"use strict";

// var mapStyles = [{
// 	featureType: "landscape.man_made",
// 	elementType: "geometry",
// 	stylers: [{
// 		color: "#f7f1df"
// 	}]
// }, {
// 	featureType: "landscape.natural",
// 	elementType: "geometry",
// 	stylers: [{
// 		color: "#d0e3b4"
// 	}]
// }, {
// 	featureType: "landscape.natural.terrain",
// 	elementType: "geometry",
// 	stylers: [{
// 		visibility: "off"
// 	}]
// }, {
// 	featureType: "poi",
// 	elementType: "labels",
// 	stylers: [{
// 		visibility: "off"
// 	}]
// }, {
// 	featureType: "poi.business",
// 	elementType: "all",
// 	stylers: [{
// 		visibility: "off"
// 	}]
// }, {
// 	featureType: "poi.medical",
// 	elementType: "geometry",
// 	stylers: [{
// 		color: "#fbd3da"
// 	}]
// }, {
// 	featureType: "poi.park",
// 	elementType: "geometry",
// 	stylers: [{
// 		color: "#bde6ab"
// 	}]
// }, {
// 	featureType: "road",
// 	elementType: "geometry.stroke",
// 	stylers: [{
// 		visibility: "off"
// 	}]
// }, {
// 	featureType: "road",
// 	elementType: "labels",
// 	stylers: [{
// 		visibility: "off"
// 	}]
// }, {
// 	featureType: "road.highway",
// 	elementType: "geometry.fill",
// 	stylers: [{
// 		color: "#ffe15f"
// 	}]
// }, {
// 	featureType: "road.highway",
// 	elementType: "geometry.stroke",
// 	stylers: [{
// 		color: "#efd151"
// 	}]
// }, {
// 	featureType: "road.arterial",
// 	elementType: "geometry.fill",
// 	stylers: [{
// 		color: "#ffffff"
// 	}]
// }, {
// 	featureType: "road.local",
// 	elementType: "geometry.fill",
// 	stylers: [{
// 		color: "black"
// 	}]
// }, {
// 	featureType: "transit.station.airport",
// 	elementType: "geometry.fill",
// 	stylers: [{
// 		color: "#cfb2db"
// 	}]
// }, {
// 	featureType: "water",
// 	elementType: "geometry",
// 	stylers: [{
// 		color: "#a2daf2"
// 	}]
// }];



var mapStyles = [
	{
		"featureType": "administrative.country",
		"elementType": "geometry",
		"stylers": [
			{
				"visibility": "simplified"
			},
			{
				"hue": "#ff0000"
			}
		]
	}
];

var app = {};


app.init = function () {
	app.mobileMenu();
	app.filter();
	app.smoothScroll();
	if ($("#map").length != 0) {
		app.initialMap();
		app.locationLink()
	}
	app.testimonialSlider();
	app.awardsSlider();
	app.fileUpload();
	app.faqDisplay();
	// 	app.ourTeam();

};

app.mobileMenu = function () {
	$('.hamburger').click(function () {
		$(this).toggleClass('open');
		$(this).parent().parent().parent().toggleClass('open');
	});
}

// Resources filter tabs
app.filter = function () {
	var $filters = $('.resourceTags li [data-filter]'),
		$boxes = $('.resource[data-category]');

	$filters.on('click', function (e) {
		e.preventDefault();
		var $this = $(this);
		$filters.removeClass('active');
		$this.addClass('active');

		var $filterTag = $this.attr('data-filter');

		if ($filterTag == 'all') {
			$boxes.parent().removeClass('is-animated').fadeOut().promise().done(function () {
				$boxes.parent().addClass('is-animated').fadeIn();
			});
		} else {
			$boxes.parent().removeClass('is-animated').fadeOut().promise().done(function () {
				$boxes.filter('[data-category = "' + $filterTag + '"]').parent().addClass('is-animated').fadeIn();
			});
		}
	});
};

app.ourTeam = function () {
	$(".teamMember:first").addClass("active")

	$(".teamMember").click(function () {
		$(".active").removeClass("active");
		$(this).addClass("active");

	})
}

app.faqDisplay = function () {
	$(".faqItem h2 a").click(function (e) {
		e.preventDefault();
		$('.activeLink').removeClass("activeLink");
		$(this).addClass("activeLink");
		var displayContent = $(this).parent().parent().find(".faqContent").html();
		$(".faqDisplay .container").html(displayContent);
		var aTag = $(".faqDisplay .container");
		$('html,body').animate({ scrollTop: aTag.offset().top - 100 }, 'slow');
	});
}

app.fileUpload = function () {
	$('.hs_upload_resume .input').append("<div class='fileUpload'><p class='title'>Upload Resume +</p><p class='resumeFileName'><p></div>")
	$('.hs_upload_resume .input input').change(function () {
		// console.log($(this).val());
		var path = $(this).val();
		var shortPath = path.substr(12);
		console.log(shortPath);
		$(".resumeFileName").html(shortPath);
	});
}

app.testimonialSlider = function () {
	$('.testimonialSlider').slick({
		centerMode: true,
		centerPadding: '200px',
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		responsive: [
			{
				breakpoint: 1070,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '0px',
					slidesToShow: 1
				}
			}
		]
	});
}

app.awardsSlider = function () {
	$('.awardsSlider').slick({
		centerMode: true,
		centerPadding: '200px',
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1070,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '200px',
					slidesToShow: 1
				}
			},
			{
				breakpoint: 600,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '0',
					slidesToShow: 1
				}
			}
		]
	});
}

app.initialMap = function () {
	console.log("mapping");
	var b = {
		scrollwheel: false,
		zoom: 17,
		center: new google.maps.LatLng(43.445169, -80.475321),
		styles: mapStyles
	};
	var c = document.getElementById("map");
	var d = new google.maps.Map(c, b);
	var a = new google.maps.Marker({
		position: new google.maps.LatLng(43.445169, -80.479321),
		map: d,
		title: "Snazzy!"
	})
	var transitLayer = new google.maps.TransitLayer();
	transitLayer.setMap(map);
};

app.arthurMap = function () {
	var b = {
		scrollwheel: false,
		zoom: 17,
		center: new google.maps.LatLng(43.837047, -80.547750),
		styles: mapStyles
	};
	var c = document.getElementById("map");
	var d = new google.maps.Map(c, b);
	var a = new google.maps.Marker({
		position: new google.maps.LatLng(43.837047, -80.551750),
		map: d,
		title: "Snazzy!"
	})
};
app.bramptonMap = function () {
	var b = {
		scrollwheel: false,
		zoom: 17,
		center: new google.maps.LatLng(43.722415, -79.694737),
		styles: mapStyles
	};
	var c = document.getElementById("map");
	var d = new google.maps.Map(c, b);
	var a = new google.maps.Marker({
		position: new google.maps.LatLng(43.722415, -79.698737),
		map: d,
		title: "Snazzy!"
	})
};
app.cambridgeMap = function () {
	var b = {
		scrollwheel: false,
		zoom: 17,
		center: new google.maps.LatLng(43.408006, -80.324368),
		styles: mapStyles
	};
	var c = document.getElementById("map");
	var d = new google.maps.Map(c, b);
	var a = new google.maps.Marker({
		position: new google.maps.LatLng(43.408006, -80.328368),
		map: d,
		title: "Snazzy!"
	})
};
app.guelphMap = function () {
	var b = {
		scrollwheel: false,
		zoom: 17,
		center: new google.maps.LatLng(43.548839, -80.276628),
		styles: mapStyles
	};
	var c = document.getElementById("map");
	var d = new google.maps.Map(c, b);
	var a = new google.maps.Marker({
		position: new google.maps.LatLng(43.548839, -80.280628),
		map: d,
		title: "Snazzy!"
	})
};
app.londonMap = function () {
	var b = {
		scrollwheel: false,
		zoom: 17,
		center: new google.maps.LatLng(42.949662, -81.224200),
		styles: mapStyles
	};
	var c = document.getElementById("map");
	var d = new google.maps.Map(c, b);
	var a = new google.maps.Marker({
		position: new google.maps.LatLng(42.949662, -81.228200),
		map: d,
		title: "Snazzy!"
	})
};
app.mississaugaMap = function () {
	var b = {
		scrollwheel: false,
		zoom: 17,
		center: new google.maps.LatLng(43.607160, -79.581412),
		styles: mapStyles
	};
	var c = document.getElementById("map");
	var d = new google.maps.Map(c, b);
	var a = new google.maps.Marker({
		position: new google.maps.LatLng(43.607160, -79.585412),
		map: d,
		title: "Snazzy!"
	})
};
app.stcatherinesMap = function () {
	var b = {
		scrollwheel: false,
		zoom: 17,
		center: new google.maps.LatLng(43.158302, -79.242095),
		styles: mapStyles
	};
	var c = document.getElementById("map");
	var d = new google.maps.Map(c, b);
	var a = new google.maps.Marker({
		position: new google.maps.LatLng(43.158302, -79.246095),
		map: d,
		title: "Snazzy!"
	})
};
app.stratfordMap = function () {
	var b = {
		scrollwheel: false,
		zoom: 17,
		center: new google.maps.LatLng(43.371887, -80.974396),
		styles: mapStyles
	};
	var c = document.getElementById("map");
	var d = new google.maps.Map(c, b);
	var a = new google.maps.Marker({
		position: new google.maps.LatLng(43.371887, -80.978396),
		map: d,
		title: "Snazzy!"
	})
};
app.waterlooMap = function () {
	var b = {
		scrollwheel: false,
		zoom: 17,
		center: new google.maps.LatLng(43.502635, -80.530541),
		styles: mapStyles
	};
	var c = document.getElementById("map");
	var d = new google.maps.Map(c, b);
	var a = new google.maps.Marker({
		position: new google.maps.LatLng(43.502635, -80.534541),
		map: d,
		title: "Snazzy!"
	})
};
app.woodstockMap = function () {
	var b = {
		scrollwheel: false,
		zoom: 17,
		center: new google.maps.LatLng(43.134116, -80.729730),
		styles: mapStyles
	};
	var c = document.getElementById("map");
	var d = new google.maps.Map(c, b);
	var a = new google.maps.Marker({
		position: new google.maps.LatLng(43.134116, -80.733730),
		map: d,
		title: "Snazzy!"
	})
};


app.locationLink = function () {
	$(".locationLink").click(function (b) {
		b.preventDefault();
		$(".locationLinkActive").removeClass("locationLinkActive");
		$(this).addClass("locationLinkActive");
		var a = $(this).data("location");
		if (a == "arthur") {
			app.arthurMap();
			$(".locationBoxActive").removeClass("locationBoxActive");
			$("." + a).addClass("locationBoxActive")
		} else {
			if (a == "brampton") {
				app.bramptonMap();
				$(".locationBoxActive").removeClass("locationBoxActive");
				$("." + a).addClass("locationBoxActive")
			} else {
				if (a == "cambridge") {
					app.cambridgeMap();
					$(".locationBoxActive").removeClass("locationBoxActive");
					$("." + a).addClass("locationBoxActive")
				} else {
					if (a == "guelph") {
						app.guelphMap();
						$(".locationBoxActive").removeClass("locationBoxActive");
						$("." + a).addClass("locationBoxActive")
					} else {
						if (a == "kitchener") {
							app.initialMap();
							$(".locationBoxActive").removeClass("locationBoxActive");
							$("." + a).addClass("locationBoxActive")
						} else {
							if (a == "london") {
								app.londonMap();
								$(".locationBoxActive").removeClass("locationBoxActive");
								$("." + a).addClass("locationBoxActive")
							} else {
								if (a == "stcatherines") {
									app.stcatherinesMap();
									$(".locationBoxActive").removeClass("locationBoxActive");
									$("." + a).addClass("locationBoxActive")
								} else {
									if (a == "mississauga") {
										app.mississaugaMap();
										$(".locationBoxActive").removeClass("locationBoxActive");
										$("." + a).addClass("locationBoxActive")
									} else {
										if (a == "stratford") {
											app.stratfordMap();
											$(".locationBoxActive").removeClass("locationBoxActive");
											$("." + a).addClass("locationBoxActive")
										} else {
											if (a == "waterloo") {
												app.waterlooMap();
												$(".locationBoxActive").removeClass("locationBoxActive");
												$("." + a).addClass("locationBoxActive")
											} else {
												if (a == "woodstock") {
													app.woodstockMap();
													$(".locationBoxActive").removeClass("locationBoxActive");
													$("." + a).addClass("locationBoxActive")
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	})
};

app.smoothScroll = function () {
	$('a[href*=#]:not([href=#])').click(function () {

		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			|| location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - 40
				}, 1000);
				return false;
			}

		}
	});
}

$(window).load(function () {
	app.init();
});