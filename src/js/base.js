var height = 115;
var dateTime =
	$('.countdown-block__timer')[0] &&
	$('.countdown-block__timer')
		.data('countdown')
		.split(',');

if (dateTime) {
	var times = {
		minutes: dateTime[2],
		seconds: dateTime[3]
	};
	$('#cd-days span').text(dateTime[0]);
	$('#cd-hours span').text(dateTime[1]);
}

$(document).ready(function() {
	$('.search-input__sort').click(function() {
		$(this)
			.find('ul')
			.toggleClass('show');
	});

	$('.collapse-block__header').click(function() {
		$(this)
			.parent()
			.toggleClass('collapse-block--show');
		$(this)
			.next()
			.slideToggle(200);
	});

	if (dateTime) {
		var counerOptions = {
			useEasing: true,
			useGrouping: true,
			separator: ',',
			decimal: '.',
			prefix: '$'
		};
		var counterPrice1 = new CountUp(
			'countdown-price-1',
			0,
			7887676,
			0,
			2,
			counerOptions
		);
		var counterPrice2 = new CountUp(
			'countdown-price-2',
			0,
			2318231,
			0,
			2,
			counerOptions
		);
		counterPrice1.start();
		counterPrice2.start();
		window.onscroll = function() {
			if (window.scrollY >= 130) {
				$('.header').addClass('mini');
			} else {
				$('.header').removeClass('mini');
			}
		};
		start();
	}
	$('.section-block--explore .navigation li').click(function() {
		var id = $(this).data('id');
		$('.section-block--explore .navigation li a').removeClass('active');
		$(this)
			.find('a')
			.addClass('active');
		$('.section-block--explore .inline-blocks').hide();
		$('#explore-' + id).show();
	});
	$('.navigation-block li').click(function(e) {
		e.preventDefault();
		$(this)
			.parent()
			.find('li')
			.removeClass('active');
		$(this).addClass('active');
	});
});

window.onscroll = function() {
	if (window.scrollY >= 468) {
		$('.section-block--about')
			.find('.navigation-block')
			.addClass('fixed');
	} else {
		$('.section-block--about')
			.find('.navigation-block')
			.removeClass('fixed');
	}
};

function start() {
	nextDigit();
	if (times.minutes >= 0) {
		setTimeout(function() {
			start();
		}, 1000);
	}
}

function nextDigit(name) {
	var m1 = times.minutes.toString()[0];
	var m2 = times.minutes.toString()[1];
	var s1 = times.seconds.toString()[0];
	var s2 = times.seconds.toString()[1];

	animateDigit('#seconds1', times.seconds >= 10 ? s1 : 0);
	animateDigit('#seconds2', times.seconds >= 10 ? s2 : s1);

	animateDigit('#minutes1', times.minutes >= 10 ? m1 : 0);
	animateDigit('#minutes2', times.minutes >= 10 ? m2 : m1);

	times.seconds--;

	if (times.seconds <= 0) {
		times.minutes--;
		times.seconds = 59;
	}
}

function animateDigit(el, number) {
	$(el)
		.find('div')
		.css({ transform: 'translateY(' + parseInt(number * -height) + 'px)' });
}
