let menu = (function (options) {

  let buttonOpen = document.querySelector(options.buttonOpen);
  let buttonClose = document.querySelector(options.buttonClose);
  let menu = document.querySelector(options.menu);
  let body = document.querySelector('body');

  let _toggleMenu = function (e) {
    menu.classList.toggle('overlay--open');
    body.classList.toggle('body-active-menu');
  }

  let addListeners = function () {
    buttonOpen.addEventListener('click', _toggleMenu);

    // Делегирование  

    menu.addEventListener('click', function (e) {
      target = e.target;
      if (target.classList.contains('overlay-menu__link')) {
        _toggleMenu();
      }
    });

    buttonClose.addEventListener('click', _toggleMenu);
  }

  return {
    open: addListeners
    // close: close
  };
})({
  buttonOpen: '#open',
  buttonClose: '#close',
  menu: '#overlay'
});

menu.open();


// Вертикальный аккордеон

let teamAccordeon = () => {
  let linkFour = document.querySelectorAll('.team__acco-link');

  linkFour.forEach(function (accoName) {
    accoName.addEventListener('click', function (e) {
      e.preventDefault();
      let accoActive = document.querySelector('.team__acco-item.team__acco-active');

      if (accoActive) {
        let teamAccordeonDetails = accoActive.querySelector('.team__acco-text');

        teamAccordeonDetails.style.height = '0px';
        accoActive.classList.remove('team__acco-active');
      }


      if (!accoActive || accoActive.querySelector('.team__acco-link') !== e.target) {
        let accoItem = e.target.closest('.team__acco-item');
        accoItem.classList.add('team__acco-active');

        let accoItemInfo = accoItem.querySelector('.team__acco-text');
        accoItemInfo.style.height = accoItemInfo.scrollHeight + 'px';

      }

      if (accoActive) {
        let teamAccordeonDetails = accoActive.querySelector('.team__acco-text');

        teamAccordeonDetails.style.height = '0px';
        accoActive.classList.remove('team__acco-active');
      }
    })
  })
};

teamAccordeon();


// Горизонтальный аккордеон

let calcWidth = () => {
  let windowWidth = window.innerWidth;

  let links = document.querySelectorAll('.menu__acco-trigger__text');
  let linksWidth = parseFloat(getComputedStyle(links[0]).width);

  let reqWidth = windowWidth - linksWidth * links.length;
  return reqWidth > 550 ? 550 : reqWidth;
};

let menuAccordeon = () => {
  let linkFive = document.querySelectorAll('.menu__acco-trigger__text');



  linkFive.forEach(function (menuName) {
    menuName.addEventListener('click', function (e) {
      e.preventDefault();
      let menuActive = document.querySelector('.menu__acco-item.menu__acco-active');

      if (menuActive) {
        let menuAccordeonContent = menuActive.querySelector('.menu__acco-content');

        menuAccordeonContent.style.width = '0px';
        menuActive.classList.remove('menu__acco-active');
      }

      if (!menuActive || menuActive.querySelector('.menu__acco-text') !== e.target) {
        let menuItem = e.target.closest('.menu__acco-item');
        menuItem.classList.add('menu__acco-active');

        let menuItemInfo = menuItem.querySelector('.menu__acco-content');
        menuItemInfo.style.width = 'px';
      }
      if (menuActive) {
        let menuAccordeonContent = menuActive.querySelector('.menu__acco-content');

        menuAccordeonContent.style.width = '0px';
        menuActive.classList.remove('menu__acco-active');
      }
    })
  })
};

menuAccordeon();


/*Слайдер */

const slide = (function () {
  const left = document.querySelector('.slider__btn-prev');
  const right = document.querySelector('.slider__btn-next');
  const slider = document.querySelector('.slider__list');
  const computed = getComputedStyle(slider);
  let sliderWidth = parseInt(computed.width);


  window.addEventListener('resize', function () {
    currentRight = 0;
    slider.style.right = currentRight;
    sliderWidth = parseInt(computed.width);
  }, true);

  var sliderItemsCounter = slider.children.length;

  let moveSlide = function (direction) {
    direction.addEventListener('click', function (e) {
      e.preventDefault();

      let currentRight = parseInt(computed.right);

      if (currentRight < (sliderItemsCounter - 1) * sliderWidth && direction == right) {
        slider.style.right = currentRight + sliderWidth + 'px';

      }

      if (currentRight > 0 && direction == left) {
        slider.style.right = currentRight - sliderWidth + 'px';

      }

      if (currentRight == (sliderItemsCounter - 1) * sliderWidth && direction == right) {
        slider.style.right = 0;
      }

      if (currentRight == 0 && direction == left) {
        slider.style.right = (sliderItemsCounter - 1) * sliderWidth + 'px';
      }
    });
  }

  let addListenersThree = function () {
    moveSlide(right);
    moveSlide(left);
  }

  return { init: addListenersThree }
})();

slide.init();


/* Функционал формы */

const overlay = (function () {
  let body = document.querySelector('body');
  let link = document.createElement('a');

  link.classList.add('modal__window-close');
  link.setAttribute('href', '#');

  let openOverlay = function (modalId, content) {
    let overlay = document.querySelector(modalId);
    let innerOverlay = overlay.querySelector('.modal__content');

    if (content) {
      innerOverlay.innerHTML = content;
      innerOverlay.appendChild(link);
    }

    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeOverlay(modalId);
    })

    overlay.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target === overlay) {
        closeOverlay(modalId);
      }
    })

    document.addEventListener('keydown', function (e) {
      if (e.keyCode == 27) closeOverlay(modalId);
    });

    overlay.classList.add('modal__window-notActive');
    body.classList.add('body-active-menu');
  }

  let closeOverlay = function (modalId) {
    let overlay = document.querySelector(modalId);

    overlay.classList.remove('modal__window-notActive');
    body.classList.remove('body-active-menu');
  }

  let setContent = function (modalId, content) {
    let overlay = document.querySelector(modalId);
    let innerOverlay = overlay.querySelector('modal__content');

    if (content) {
      innerOverlay.innerHTML = content;
      innerOverlay.appendChild(link);
    }
  }

  return {
    open: openOverlay,
    close: closeOverlay,
    setContent: setContent
  }
})();


// Функция отправки запроса на сервер

var ajaxForm = function (form) {
  var formData = new FormData();
  formData.append('name', form.elements.name.value);
  formData.append('phone', form.elements.phone.value);
  formData.append('comment', form.elements.comment.value);
  formData.append('to', 'dyonay@inbox.ru');

  let url = 'https://webdev-api.loftschool.com/sendmail';

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open("POST", url);
  xhr.setRequestHeader('X-Requested-With', "XMLHttpRequest");
  xhr.send(formData);

  return xhr;
}

// Функция обработки ответа с сервера

var submitForm = function (e) {
  e.preventDefault();
  var form = e.target;
  let request = ajaxForm(form);;

  request.addEventListener('load', () => {
    if (request.status >= 400) {
      let content = 'Ошибка соединения с сервером, попробуйте позже';
      overlay.open('#modal__window', `${content}. Ошибка ${request.status}`)
    } else if (request.response.status) {
      let content = request.response.message;
      overlay.open('#modal__window', content);
    } else {
      let content = request.response.message;
      overlay.open('#modal__window', content);
    }
  });
}

let myForm = document.querySelector('#order-form');
myForm.addEventListener('submit', submitForm);
// -----------------------------One Page Scroll (OPS) ----------------------

var md = new MobileDetect(window.navigator.userAgent), //Подключаем модуль определения устройства
  isMobile = md.mobile(); // в переменную isMobile попадет либо true либо false

let OnePageScroll = function () {
  const sections = $(".section");
  const visible = $("#content");
  let inscroll = false;

  let performTransition = function (sectionEq) {
    //функция которая прокручивает через translateY к неужной секции
    // if (inscroll) return
    if (!inscroll) {
      inscroll = true;

      let position = sectionEq * -100 + "%";

      sections
        .eq(sectionEq)
        .addClass("is-active")
        .siblings()
        .removeClass("is-active");

      visible.css({
        transform: `translateY(${position})`,
        "-webkit-transform": `translateY(${position})`
      });

      setTimeout(function () {
        //Делаем задержку в 1s, пока функция setTimeout не выполнится inscroll будет равен true
        inscroll = false;

        $(".points__item")
          .eq(sectionEq)
          .addClass("active")
          .siblings()
          .removeClass("active");
      }, 1000); // подождать пока завершится инерция на тачпадах
    }
  };

  // разрешаем свайп на мобильниках

  // клики по кнопкам навигации
  $("[data-scroll-to]").on("click", e => {
    e.preventDefault();
    performTransition(parseInt($(e.target).data("scroll-to")));
  });
};

OnePageScroll();

/* ---------------- Настройка Video ---------------- */

let video;
let durationControl; 
let soundControl;
let intervalId;

// документ полностью загружен
$().ready(function(){

    video = document.getElementById("player"); 

    // вешаем обработчик события onclick на тег video
    video.addEventListener('click', playStop);

    // обработчики событий для кнопок play
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length;i++){
        playButtons[i].addEventListener('click',playStop);
    }

    // обработчик событий для кнопки динамик
    let micControl = document.getElementById("mic");
    micControl.addEventListener('click',soundOf)
    
    // обработчики событий для ползунка продолжительности видео
    durationControl = document.getElementById("durationLevel");  
    durationControl.addEventListener('mousedown', stopInterval);   
    // durationControl.addEventListener('click',setVideoDuration);
    durationControl.addEventListener('mouseup', setVideoDuration); 

    durationControl.min = 0;
    durationControl.value = 0;    

    // обработчики событий для ползунка громокости
    soundControl = document.getElementById("micLevel");    
    // soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('mouseup', changeSoundVolume); 

    // задаем максимальные и минимальные значения громокости
    soundControl.min = 0;
    soundControl.max = 10;
    // присваиваем ползунку максимальное значение
    soundControl.value = soundControl.max;

    //обрабатываем окончание видео
    video.addEventListener('ended', function () {
        $(".video__player-svg").toggleClass("video__player-active");
        video.currentTime = 0;
    }, false);
});

/*
 Воспроизведение видео
*/
function playStop(){
    // показывает или скрывает белую кнопку play
    $(".video__player-svg").toggleClass("video__player-active");  
    // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
    durationControl.max = video.duration;

    // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
    if (video.paused){
        // video.webkitRequestFullScreen(); //возможность открыть в полноэкранном режиме
        // запускаем видео
        video.play();
        intervalId = setInterval(updateDuration,1000/66)
        
    }else{
        // video.webkitExitFullscreen(); //выйти из полноэкранного режима
        // останавливаем видео
        video.pause();  
        clearInterval(intervalId);
        
    }
}

function stopInterval(){
    video.pause();
    clearInterval(intervalId);
}

/*
    Реализует возможность перемотки нашего видео
*/
function setVideoDuration(){
    if (video.paused){
        video.play();
    }else{
        video.pause();  
    }
    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration,1000/66);
}


/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration(){    
    durationControl.value = video.currentTime;
    // console.log(video.currentTime)
}


/*
    Управление звуком
*/
function soundOf(){    
    /*
        Делаем проверку уровня громкости. 
        Если у нас нашего видео есть звук, то мы его выключаем. 
        Предварительно запомнив текущую позицию громкости в переменную soundLevel
    */
    if (video.volume === 0){
        video.volume = soundLevel;
        soundControl.value = soundLevel*10;
    }else{
        /*
            Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
            Хранится в перменной soundLevel
        */
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }    
}

/*
    Управление звуком видео
*/
function changeSoundVolume(){
    /*
        Св-во volume может принимать значения от 0 до 1
        Делим на 10 для того что бы, была возможность более точной регулировки видео. 
         video.volume 0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9  1 
   soundControl.value 0   1   2   3   4   5   6   7   8   9  10
        */
   
    video.volume = soundControl.value/10; 
    console.log(video.volume) 
}


/* ----------------------- Настройка Интерактивной карты --------------------- */

ymaps.ready(init);

var placemarks = [
    {
        latitude: 55.74078225,
        longitude: 37.58122118,
        hintContent: '<div class="map__hint">ул. Плющиха, д. 6</div>',
        balloonContent: [
            '<div class="map__balloon">CHOCCO №1</div>'
        ]
    },
    {
        latitude: 55.75831065,
        longitude: 37.58242281,
        hintContent: '<div class="map__hint">Высотка на Кудринской площади</div>',
        balloonContent: [
          '<div class="map__balloon">CHOCCO №2</div>'
        ]
    },
    {
        latitude: 55.74824241,
        longitude: 37.60456713,
        hintContent: '<div class="map__hint">Большой знаменский переулок</div>',
        balloonContent: [
          '<div class="map__balloon">CHOCCO №3</div>'
        ]
    },
    {
        latitude: 55.75710403,
        longitude: 37.62276148,
        hintContent: '<div class="map__hint">ул. Никольская</div>',
        balloonContent: [
          '<div class="map__balloon">CHOCCO №4</div>'
        ]
    }
],
    geoObjects= [];

function init() {
    var map = new ymaps.Map('map', {
        center: [55.75173885, 37.59903328],
        zoom: 13,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    for (var i = 0; i < placemarks.length; i++) {
            geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
            {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent.join('')
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '../img/map/3.svg',
                iconImageSize: [46, 57],
                iconImageOffset: [-23, -57],
                iconImageClipRect: [[415, 0], [461, 57]]
            });
    }

    var clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                size: [100, 100],
                offset: [-50, -50]
            }
        ],
        clusterIconContentLayout: null
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
}
