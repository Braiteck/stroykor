$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Основной слайдер на главной
	if ($('.main_slider .swiper').length) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			}
		})
	}


	// Страница проекта - Слайдер
	if ($('.project_info .slider .swiper').length) {
		new Swiper('.project_info .slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			}
		})
	}


	// Предложение
	if ($('.service_info .swiper').length) {
		new Swiper('.service_info .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			}
		})
	}


	// Статьи
	$('.articles .article, .project_info .places_nearby .item').mousemove(function (e) {
		let img = $(this).find('.thumb'),
			x = e.clientX,
			y = e.clientY

		img.css("top", y + 10 + 'px')
		img.css("left", x + 10 + 'px')
	})


	// Страница проекта - Выберите дом
	$('.project_info .choose_house .side .name').click(function (e) {
		e.preventDefault()

		$('.project_info .choose_house .side .name').removeClass('active')
		$(this).toggleClass('active')

		if ($(window).width() < 768) {
			$('.overlay').fadeIn(200)
		}
	})

	$('.project_info .choose_house .side .mob_close_btn').click(function (e) {
		e.preventDefault()

		$('.project_info .choose_house .side .name').removeClass('active')

		if ($(window).width() < 768) {
			$('.overlay').fadeOut(200)
		}
	})

	$(document).click(e => {
		if ($(e.target).closest('.side').length === 0) {
			$('.project_info .choose_house .side .name').removeClass('active')
		}
	})


	// Страница проекта - Планировки квартир
	$('.project_info .layouts .items .btn').click(function (e) {
		e.preventDefault()

		let index = $(this).index(),
			parent = $(this).closest('.tab_content')

		$('.project_info .layouts .items .btn').removeClass('active')
		$(this).addClass('active')

		$('.project_info .layouts .type_info > *').hide()
		$('.project_info .layouts .type_info > *').eq(index).fadeIn(300)

		$('.project_info .layouts .col_right > *').hide()
		$('.project_info .layouts .col_right > *').eq(index).fadeIn(300)
	})


	// Обьекты - фильтрация
	const objects = [],
		objectsRow = document.querySelectorAll('.objects .list_view .row'),
		categoriesBtns = document.querySelectorAll('.objects .categories .btn')

	if (objectsRow.length) {
		objectsRow.forEach((element, index) => {
			objects.push(
				new Isotope(element, {
					itemSelector: '.object',
					layoutMode: 'fitRows',
					// filter: '.filter1'
				})
			)

			element.setAttribute('data-index', index)
		})

		categoriesBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()
				e.stopPropagation()

				let index = parseInt(element.closest('.controls').nextElementSibling.querySelector('.row').getAttribute('data-index'))

				Array.from(element.closest('.categories').querySelectorAll('.btn')).forEach(el => el.classList.remove('active'))

				element.classList.add('active')

				objects[index].arrange({ filter: element.getAttribute('data-filter') })
			})
		})
	}


	// Обьекты
	$('.objects .controls .views .list_btn').click(function (e) {
		e.preventDefault()

		$('.objects .controls .views .btn').removeClass('active')
		$('.objects .map_view').hide()

		$(this).addClass('active')
		$('.objects .list_view').fadeIn(300)
	})

	$('.objects .controls .views .map_btn').click(function (e) {
		e.preventDefault()

		$('.objects .controls .views .btn').removeClass('active')
		$('.objects .list_view').hide()

		$(this).addClass('active')
		$('.objects .map_view').fadeIn(300)
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs button', function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				$activeTabContent = $(activeTab),
				level = $(this).data('level')

			$parent.find('.tabs:first button').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			$activeTabContent = $(locationHash),
			$parent = $activeTab.closest('.tabs_container'),
			level = $activeTab.data('level')

		$parent.find('.tabs:first button').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Кастомный select
	$('select').niceSelect()


	// Фильтр
	$areaRange = $('.filter_form #area_range').ionRangeSlider({
		type: 'double',
		min: 20,
		max: 100,
		from: 31,
		to: 71,
		step: 1,
		onChange: data => {
			$('.filter_form .area_range .from').text(data.from)
			$('.filter_form .area_range .to').text(data.to)
		},
		onUpdate: data => {
			$('.filter_form .area_range .from').text(data.from)
			$('.filter_form .area_range .to').text(data.to)
		}
	}).data('ionRangeSlider')


	$areaRange = $('.filter_form #area_range2').ionRangeSlider({
		type: 'double',
		min: 0,
		max: 10,
		from: 6,
		to: 7,
		step: 1,
		onChange: data => {
			$('.filter_form .area_range2 .from').text(data.from)
			$('.filter_form .area_range2 .to').text(data.to)
		},
		onUpdate: data => {
			$('.filter_form .area_range2 .from').text(data.from)
			$('.filter_form .area_range2 .to').text(data.to)
		}
	}).data('ionRangeSlider')


	$floorRange = $('.filter_form #floor_range').ionRangeSlider({
		type: 'double',
		min: 1,
		max: 10,
		from: 3,
		to: 10,
		step: 1,
		onChange: data => {
			$('.filter_form .floor_range .from').text(data.from)
			$('.filter_form .floor_range .to').text(data.to)
		},
		onUpdate: data => {
			$('.filter_form .floor_range .from').text(data.from)
			$('.filter_form .floor_range .to').text(data.to)
		}
	}).data('ionRangeSlider')


	$('.filter_form .views .btn').click(function (e) {
		e.preventDefault()

		$('.filter_form .views .btn').removeClass('active')
		$(this).addClass('active')

		if ($(this).hasClass('grid_btn')) {
			$('.apartments .list').removeClass('show')
			$('.apartments .row').addClass('show')
		}

		if ($(this).hasClass('list_btn')) {
			$('.apartments .row').removeClass('show')
			$('.apartments .list').addClass('show')
		}
	})


	$('.filter_form .reset_btn').click(function () {
		$areaRange.reset()
		$floorRange.reset()

		setTimeout(() => $('.filter_form select').niceSelect('update'))
	})


	// Добавить в избранное
	$('.apartments .list .apartment .favorite_btn').click(function (e) {
		e.preventDefault()

		$(this).addClass('active')
		$('header .favorite_btn').removeClass('hide').addClass('active')

		setTimeout(() => $('header .favorite_btn').addClass('hide'), 3000)
	})


	// Моб. аппартаменты
	$('.apartments .list .apartment .mob_toggle_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.apartment')

		if (!$(this).hasClass('active')) {
			$(this).addClass('active')

			$('.apartments .list .apartment .thumb').css('display', 'flex')
			$('.apartments .list .apartment .btns').css('display', 'flex')
		} else {
			$(this).removeClass('active')

			$('.apartments .list .apartment .thumb, .apartments .list .apartment .btns').hide()
		}
	})


	// Fix. modal
	$('.fixed_modal_btn').click(function (e) {
		e.preventDefault()

		let id = $(this).data('modal')

		$('.fixed_modal').removeClass('show')

		$('body').addClass('menu_open')
		$(id).addClass('show')

		$('.overlay').fadeIn(300)
	})

	$('.fixed_modal .close_btn, .overlay, .fixed_modal .ok_btn').click(function (e) {
		e.preventDefault()

		$('.fixed_modal').removeClass('show')
		$('body').removeClass('menu_open')

		$('.overlay').fadeOut(200)
	})


	// 3D тур
	$('.tour_btn').click(function (e) {
		e.preventDefault()

		$('body').addClass('menu_open')
		$('#tour_modal').addClass('show')

		$('.overlay').fadeIn(300)
	})

	$('#tour_modal .close_btn').click(function (e) {
		e.preventDefault()

		$('#tour_modal').removeClass('show')
		$('body').removeClass('menu_open')

		$('.overlay').fadeOut(200)
	})


	// Панорама
	$('.panorama_btn').click(function (e) {
		e.preventDefault()

		$('body').addClass('menu_open')
		$('#panorama_modal').addClass('show')

		$('.overlay').fadeIn(300)
	})

	$('#panorama_modal .close_btn').click(function (e) {
		e.preventDefault()

		$('#panorama_modal').removeClass('show')
		$('body').removeClass('menu_open')

		$('.overlay').fadeOut(200)
	})


	// Моб. меню
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('header').toggleClass('show')
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	Fancybox.defaults.template = {
		closeButton: '<svg><use xlink:href="images/sprite.svg#ic_close2"></use></svg>',
		spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
		main: null
	}

	// Всплывающие окна
	$('body').on('click', '.modal_btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('modal'),
			type: 'inline',
		}], {
			on: {
				reveal: () => {
					if ($('#project_modal.fancybox__content').length) {
						let tabIndex = $(this).data('index') || 0,
							$parent = $('#project_modal')

						$parent.find('.tabs button').removeClass('active')
						$parent.find('.tab_content').removeClass('active')

						$parent.find('.tabs button[data-content="#project_modal_tab' + (tabIndex + 1) + '"]').addClass('active')
						$('#project_modal_tab' + (tabIndex + 1)).addClass('active')

						// Всплывающее окно проекта - Проекты
						if ($('#project_modal .tabs .swiper').length) {
							new Swiper('#project_modal .tabs .swiper', {
								loop: false,
								speed: 500,
								watchSlidesProgress: true,
								slideActiveClass: 'active',
								slideVisibleClass: 'visible',
								spaceBetween: 0,
								slidesPerView: 'auto',
								navigation: {
									nextEl: '.project_tabs_swiper-button-next',
									prevEl: '.project_tabs_swiper-button-prev'
								}
							})
						}

						// Всплывающее окно проекта - Сдайдер
						if ($('#project_modal .tab_content .swiper').length) {
							new Swiper('#project_modal .tab_content .swiper', {
								loop: true,
								speed: 500,
								watchSlidesProgress: true,
								slideActiveClass: 'active',
								slideVisibleClass: 'visible',
								spaceBetween: 24,
								slidesPerView: 1,
								navigation: {
									nextEl: '.swiper-button-next',
									prevEl: '.swiper-button-prev'
								},
								preloadImages: false,
								lazy: {
									enabled: true,
									// checkInView: true,
									loadOnTransitionStart: true,
									loadPrevNext: true
								},
								on: {
									init: swiper => setTimeout(() => $(swiper.$el).find('.count .total').text(swiper.slides.length - 2)),
									activeIndexChange: swiper => setTimeout(() => $(swiper.$el).find('.count .current').text((swiper.realIndex + 1)))
								}
							})
						}
					}


					if ($('#construction_progress_modal.fancybox__content').length) {
						let tabIndex = $(this).data('index') || 0,
							$parent = $('#construction_progress_modal')

						$parent.find('.tabs button').removeClass('active')
						$parent.find('.tab_content').removeClass('active')

						$parent.find('.tabs button[data-content="#construction_progress_modal_tab' + (tabIndex + 1) + '"]').addClass('active')
						$('#construction_progress_modal_tab' + (tabIndex + 1)).addClass('active')

						// Всплывающее окно проекта - Проекты
						if ($('#construction_progress_modal .tabs .swiper').length) {
							new Swiper('#construction_progress_modal .tabs .swiper', {
								loop: false,
								speed: 500,
								watchSlidesProgress: true,
								slideActiveClass: 'active',
								slideVisibleClass: 'visible',
								spaceBetween: 0,
								slidesPerView: 'auto',
								navigation: {
									nextEl: '.project_tabs_swiper-button-next',
									prevEl: '.project_tabs_swiper-button-prev'
								}
							})
						}

						// Всплывающее окно проекта - Сдайдер
						if ($('#construction_progress_modal .tab_content .swiper').length) {
							new Swiper('#construction_progress_modal .tab_content .swiper', {
								loop: true,
								speed: 500,
								watchSlidesProgress: true,
								slideActiveClass: 'active',
								slideVisibleClass: 'visible',
								spaceBetween: 24,
								slidesPerView: 1,
								navigation: {
									nextEl: '.swiper-button-next',
									prevEl: '.swiper-button-prev'
								},
								preloadImages: false,
								lazy: {
									enabled: true,
									// checkInView: true,
									loadOnTransitionStart: true,
									loadPrevNext: true
								},
								on: {
									init: swiper => setTimeout(() => $(swiper.$el).find('.count .total').text(swiper.slides.length - 2)),
									activeIndexChange: swiper => setTimeout(() => $(swiper.$el).find('.count .current').text((swiper.realIndex + 1)))
								}
							})
						}
					}
				}
			}
		})
	})

	$('body').on('click', '.modal .close_btn', function (e) {
		e.preventDefault()

		Fancybox.close()
	})


	// Отправка форм
	$('.fixed_modal form.custom_submit').submit(function (e) {
		e.preventDefault()

		$('.fixed_modal').removeClass('show')

		$('body').addClass('menu_open')
		$('#success_modal').addClass('show')

		$('.overlay').fadeIn(300)
	})

	$(".apartments .row .apartment .favorite_btn svg").hover(
	  function() {
	    $( this ).find("use").attr("xlink:href", "images/sprite.svg#ic_favorite");
	  }, function() {
	    $( this ).find("use").attr("xlink:href", "images/sprite.svg#ic_favorite2");
	});

	if ($(window).width() < 768) {
		$('body').on('click', '.building_info .building .item .tooltip', function (e) {
			e.preventDefault()
			$("#booking_modal").addClass("show");
			$('.overlay').fadeIn(200)
		})
	}
})



$(window).on('load', () => {
	// Фикс. шапка
	headerInit = true,
		headerHeight = $('header').outerHeight()

	$('header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



$(window).scroll(() => {
	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!firstResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 320) $('meta[name=viewport]').attr('content', 'width=320, user-scalable=no')

			firstResize = true
		} else {
			firstResize = false
		}


		// Фикс. шапка
		headerInit = false
		$('.header_wrap').height('auto')

		setTimeout(() => {
			headerInit = true
			headerHeight = $('header').outerHeight()

			$('.header_wrap').height(headerHeight)

			headerInit && $(window).scrollTop() > headerHeight
				? $('header').addClass('fixed')
				: $('header').removeClass('fixed')
		}, 100)


		// Перезапись ширины окна
		WW = $(window).width()
	}
})