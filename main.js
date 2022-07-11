$(".hamburger").on("click", (e) => {
  e.preventDefault();
  $(".fullscreen-menu").css("display", "flex");
});

$(".fullscreen-menu__close").on("click", (e) => {
  e.preventDefault();
  $(".fullscreen-menu").css("display", "none");
});

////////////////

$(".rev-switcher-link").on("click", (e) => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const datars = $this.attr("data-rs");
  const alias = findData(datars);
  const item = $this.closest(".rev-switcher-item");

  alias.addClass("active").siblings().removeClass("active");
  item.addClass("active").siblings().removeClass("active");
});
const findData = (datars) => {
  return $(".review").filter((n, item) => {
    const datarb = $(item).attr("data-rb");
    return datarb == datars;
  });
};
/////////////////

$(".team__btn").on("click", (e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const container = $this.closest(".team__list");
  const card = $this.closest(".team__card");

  if (card.hasClass("active")) {
    closeAll(container);
  } else {
    closeAll(container);
    open($this);
  }
});

const closeAll = (container) => {
  const items = container.find(".team__desc");
  const cards = container.find(".team__card");

  items.height(0);
  cards.removeClass("active");
};

const open = (link) => {
  const card = link.closest(".team__card");
  const desc = card.find(".team__desc");
  const content = card.find(".team__content");

  card.addClass("active");
  desc.height(content.height());
};

///////////////

const slider = $(".slider__list").bxSlider({
  pager: false,
  controls: false,
});

$(".slider__arrow--left").on("click", (e) => {
  e.preventDefault();
  slider.goToPrevSlide();
});
$(".slider__arrow--right").on("click", (e) => {
  e.preventDefault();
  slider.goToNextSlide();
});

//////////////////

$('.form').submit((e) => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");
  const mess = $('.modal__content');
  mess.css('color', 'black');

  const validate = (form, arr) => {
    arr.forEach((t) => {
      if (t.val().trim() == "") {
        t.addClass('input--error');
      } else {
        if (t.hasClass('input--error')) {
          t.removeClass('input--error');
        }
      }
    });

    const formErros = form.find('.input--error');
    return formErros.length == 0;
  }

  const isValid = validate(form, [name, phone, comment]);

  if (isValid) {
    const request = $.ajax({
      url: 'https://webdev-api.loftschool.com/sendmail',
      method: 'post',
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      }
    });

    request.done((data) => {
      mess.text(data.message);
    });

    request.fail((data) => {
      mess.text(data.responseJSON.message);
      mess.css('color', 'red');
    });

    request.always(() => {
      $.fancybox.open({
        src: '.modal',
        type: 'inline'
      });

    });
  }
});

$('.close').on('click', (e) => {
  e.preventDefault();
  $.fancybox.close();
});

////////////////////////// acco

$('.product__title').on('click', (e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const prod = $this.closest('.product');
  const prodOpened = prod.hasClass('active');
  const container = $this.closest('.products__menu')

  closeProducts(container);
  if (!prodOpened) {
    openProduct(prod);
  }
});

const openProduct = prod => {
  // debugger;
  const desc = prod.find('.product__desc');
  const width = descWidth(prod);
  const inner = desc.find('.product__desc-inner');
  const innerWidth = width - parseInt(inner.css('padding-left')) - parseInt(inner.css('padding-right'));

  prod.addClass('active');
  inner.width(innerWidth);
  desc.width(width);
};

const closeProducts = container => {
  const prods = container.find('.product')
  const desc = container.find('.product__desc');

  prods.removeClass('active');
  desc.width(0);
}

const descWidth = prod => {
  // debugger;
  const screenX = $(window).width();
  const container = prod.closest('.products__menu');
  const titles = container.find('.product__title');
  const titlesX = titles.width() * titles.length;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;


  return isMobile ? screenX - titlesX : 524;
};

/////////////////////// OPS

const sections = $('section');
const display = $('.maincontent');
const sideMenu = $('.fixed-menu');
const sideMenuItems = $('.fixed-menu__item');
let inScroll = false;

sections.first().addClass('active');

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) scroller().next();
  if (deltaY < 0) scroller().prev();
});

$(window).on('keydown', e => {
  const tag = e.target.tagName.toLowerCase();

  if (tag == 'input' || tag == 'textarea') return;

  if (e.keyCode == 40) {
    scroller().next();
  } else if (e.keyCode == 38) {
    scroller().prev();
  }
});

const scroll = secNum => {
  if (inScroll) return;

  inScroll = true;
  const pos = secNum * -100;

  display.css({ transform: `translateY(${pos}%)` })

  changeMenuTheme(secNum);
  chengeActiveClass(sections, secNum, 'active');
  chengeActiveClass(sideMenuItems, secNum, 'fixed-menu__item--active');
  setTimeout(() => { inScroll = false; }, 500);
};

const scroller = () => {
  const activeSection = sections.filter('.active');
  const next = activeSection.next();
  const prev = activeSection.prev();

  return {
    next() {
      if (next.length) scroll(next.index());
    },
    prev() {
      if (prev.length) scroll(prev.index());
    }
  }
};

const chengeActiveClass = (items, num, activeClass) => {
  items.eq(num).addClass(activeClass).siblings().removeClass(activeClass);
};

const changeMenuTheme = secNum => {
  const section = sections.eq(secNum);
  const theme = section.attr('data-sidemenu');

  if (theme == 'black') {
    sideMenu.addClass('fixed-menu--black');
  } else {
    sideMenu.removeClass('fixed-menu--black');
  }
};

$('[data-to]').on('click', e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const target = $this.attr('data-to');
  const section = $(`[data-section=${target}]`);
  scroll(section.index());
  $(".fullscreen-menu").css("display", "none");
});

$('body').swipe({
  swipe: function (e, dir) {
    if (dir == 'up') scroller().next();
    if (dir == 'down') scroller().prev();
  }
})

//////////////// youtube

let player;
const playerContainer = $('.player');
const splash = $('.player__splash');

let eventsInit = () => {
  $('.controls__start-btn').on('click', e => {
    if (playerContainer.hasClass('play')) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  splash.on('click', e => {
    player.playVideo();
  });

  $('.controls__playback').on('click', e => {
    const bar = $(e.currentTarget);
    const clickX = e.originalEvent.layerX;
    const btnX = (clickX / bar.width()) * 100;
    const seek = (player.getDuration() / 100) * btnX;

    $('.controls__playback-bar--yello').width(clickX);
    $('.controls__playback-point').css('left', `${btnX}%`);
    player.seekTo(seek);
  });

  $('.controls__sound').on('click', e => {
    const bar = $(e.currentTarget);
    const clickX = e.originalEvent.layerX;
    const vol = Math.round((clickX / bar.width()) * 100);

    $('.controls__sound-bar--yello').width(clickX);
    $('.controls__sound-point').css('left', `calc(${vol}% - 7.5px)`);
    player.setVolume(vol);
  });

  $('.controls__speaker-btn').on('click', e => {
    if (player.isMuted()) {
      player.unMute()
      $(e.currentTarget).css('fill', 'white');
    } else {
      player.mute();
      $(e.currentTarget).css('fill', 'red');
    }
  });
};

const onPlayerReady = () => {
  const durationSec = player.getDuration();
  let interval;
  if (typeof interval != "undefined") {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    const complitedSec = player.getCurrentTime();
    const complited = complitedSec / durationSec;
    const complitedPx = $('.controls__playback-bar').width() * complited;

    $('.controls__playback-bar--yello').width(complitedPx);
    $('.controls__playback-point').css('left', `${complited * 100}%`);
  }, 1000);
};

const onPlayerStateChange = e => {
  switch (e.data) {
    case 1:
      splash.css('display', 'none');
      playerContainer.addClass('play');
      $('.controls__start-btn').css('fill', 'red');
      break;
    case 2:
      playerContainer.removeClass('play');
      $('.controls__start-btn').css('fill', 'white');
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytb', {
    height: '392',
    width: '662',
    videoId: 'wRBH9xc4V_w',
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
};

eventsInit();

///////////////// map

let myMap;

const initMap = () => {
  myMap = new ymaps.Map('map', {
    center: [55.755, 37.64],
    zoom: 15,
    controls: []
  });

  var myPlacemark = new ymaps.Placemark(
    [55.756, 37.63], {}, {
    iconLayout: 'default#image',
    iconImageHref: './img/marker.png',
    iconImageSize: [58, 73],
    iconImageOffset: [-3, -42]
  });

  myMap.geoObjects.add(myPlacemark); 

  myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(initMap);