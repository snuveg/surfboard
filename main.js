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

$(".team__name").on("click", (e) => {
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