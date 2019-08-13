'use strict';
//Ждем загрузки всей необходимой информации
window.onload = function() {
    //Убираем картинку заглушку 
    let container = document.querySelector('#container');
    container.classList.add('booted_up');
    //Активируем начальную анимацию
    eventObject.activateAnimation();
    //Запускаем слайдер через 2 секунды
    setTimeout(() => {
        //Скрываем блок анимации
        eventObject.hideBlock();
        //Создаем слайдер
        let slider = multiSlider('.slider', dataSliderItems);
        swipe(slider);
        //Активируем слайдер
        eventObject.activateSlider();
        //Активируем первый слайд
        let item = document.querySelector('.slider__item');
        item.classList.add('active');

    }, 2000);   
};
//Объект с событиями
let eventObject = {
    activateAnimation() {
        let divAnimation = document.querySelector('.container .animation');
        divAnimation.classList.add('active');
    },
    hideBlock() {
        let divHideBlock = document.querySelector('.container .animation .hide_block');
        divHideBlock.classList.add('active_hide');
    },
    activateSlider() {
        let divSlider = document.querySelector('.container .slider');
        divSlider.classList.add('active_slider');
    }
};
//Объект для создания компонентов слайда, группировки компонентов и слайдов
let sliderItemsObject = {
    //Метод для создания слайда
    createSliderItem(url_img, array, url_lable, url_price) {
        let sliderItem = document.createElement('div');
        sliderItem.classList.add('slider__item');

        function createImage(url_img) {
            let divImage = document.createElement('div');
            divImage.style.backgroundImage = `url(${url_img})`;
            divImage.classList.add('slider_image');
            return divImage;
        };
        function createShadow() {
            let divShadow = document.createElement('div');
            divShadow.classList.add('slider_shadow');
            return divShadow;
        }

        function createRadioInputs(radioname, radiourlsimg, imgurl){
            let divBlockInputs = document.createElement('div');
            divBlockInputs.classList.add('slider_inputs');
            for(let i = 0; i < radiourlsimg.length; i++) {
                let wrapperInput = document.createElement('lable');
                let radioInput = document.createElement('input');
                let radioImg = document.createElement('img');

                radioImg.setAttribute('src', 'P_Fitbit/'+radiourlsimg[i]+'.png');
                radioImg.addEventListener('click', resetRadio);
                radioImg.addEventListener('click', () => {
                    radioImg.setAttribute('src', 'P_Fitbit/'+imgurl[i]+'_on.png');
                    let divImage = sliderItem.querySelector('.slider_image');
                    divImage.style.backgroundImage = `url(P_Fitbit/${imgurl[i]}.png)`;
                });

                radioInput.setAttribute('type', 'radio');
                radioInput.setAttribute('name', radioname);
                wrapperInput.appendChild(radioInput);
                wrapperInput.appendChild(radioImg);
                divBlockInputs.appendChild(wrapperInput);
            }
            return divBlockInputs;
        };
        //Вспомогательная функция addEventListener
        function resetRadio(){
            let itemActive = document.querySelectorAll('.slider__item.active .slider_inputs lable');
                    itemActive.forEach((lable) => {
                        let img = lable.querySelector('img');
                        let src = img.getAttribute('src');
                        let str = src.substr(0, src.lastIndexOf('_'));
                        img.setAttribute('src', str+'_off.png');
                    });
        };

        function createLable(url_lable) {
            let divLable = document.createElement('div');
            divLable.style.backgroundImage = `url(${url_lable})`;
            divLable.classList.add('slider_lable');
            return divLable;
        };

        function createprice(url_price) {
            let divprice = document.createElement('div');
            divprice.style.backgroundImage = `url(${url_price})`;
            divprice.classList.add('slider_price');
            return divprice;
        };

        function createItem(url_img, array, url_lable, url_price) {
            sliderItem.appendChild(createImage('P_Fitbit/'+url_img+'.png'));
            let hideBlockSwipe = document.createElement('div');
            hideBlockSwipe.classList.add('block_hide_swipe');
            sliderItem.appendChild(hideBlockSwipe);
            hideBlockSwipe.appendChild(createShadow());
            hideBlockSwipe.appendChild(createRadioInputs(...array));
            hideBlockSwipe.appendChild(createLable('P_Fitbit/'+url_lable+'.png'));
            hideBlockSwipe.appendChild(createprice('P_Fitbit/'+url_price+'.png'));
            return sliderItem;
        }
        return createItem(url_img, array, url_lable, url_price);
    },
    //Метод для создания слайдов
    createSliderItems(array) {
        let arrayItems = []; 
        array.forEach(item => {
            let createdItem = this.createSliderItem(...item);
            arrayItems.push(createdItem);
        });
        return arrayItems;
    },
    //Метод для дабавления слайдов в слайдер
    addSlidesToSlider(data, container) {
        let Items = this.createSliderItems(data);
        Items.forEach(item => {
            container.appendChild(item);
        });
    }
};
//Информация о слайдах
let dataSliderItems = [['P_Versa_Pink',
                    ['P_Versa', ['P_Versa_Pink_on', 'P_Versa_Grey_off', 'P_Versa_Black_off'], ['P_Versa_Pink', 'P_Versa_Grey', 'P_Versa_Black']],
                    'P_Versa_lockup',
                    'P_Versa_price'],
                    //
                    ['P_Charge3_Lilac',
                    ['P_Charge3', ['P_Charge3_Lilac_on', 'P_Charge3_Black_off', 'P_Charge3_Blue_off'], ['P_Charge3_Lilac', 'P_Charge3_Black', 'P_Charge3_Blue']],
                    'P_Charge3_lockup',
                    'P_Charge3_price'],
                    //
                    ['P_HR_White',
                    ['P_HR', ['P_HR_White_on', 'P_HR_Lilac_off', 'P_HR_Black_off'], ['P_HR_White', 'P_HR_Lilac', 'P_HR_Black']],
                    'P_Versa_lockup',
                    'P_Versa_price']
                ];
//Слайдер
let multiSlider = (function () {
    return function (selector, data) {
        let mainContainer = document.querySelector(selector),
          sliderWrapper = mainContainer.querySelector('.slider__wrapper');
          //Создаем слайды
          sliderItemsObject.addSlidesToSlider(data, sliderWrapper);

        let sliderItems = sliderWrapper.querySelectorAll('.slider__item'),
          sliderControl = mainContainer.querySelectorAll('.slider__control'),
          wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width),
          itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width),
          positionLeftItem = 0,
          transform = 0,
          step = itemWidth / wrapperWidth *100,
          items = [];
          sliderWrapper.style.transform = 'translateY(' + 0 + '%)';
  
          // Наполняем массив слайдами запоминаем их позицию
          sliderItems.forEach((item, index) => {
              items.push({item: item, position: index, transform: 0});
          });
          //Объект с метадами для определения max and min position
          let position = {
              getItemMin: function() {
                  let indexItem = 0;
                  items.forEach((item, index) =>{
                      if(item.position < items[indexItem].position){
                          indexItem = index;
                      }
                  });
                  return indexItem;
              },
              getItemMax: function() {
                  let indexItem = 0;
                  items.forEach((item, index) => {
                      if(item.position > items[indexItem].position){
                          indexItem = index;
                      }
                  });
                  return indexItem;
              },
              getMin: function() {
                  return items[position.getItemMin()].position;
              },
              getMax: function() {
                  return items[position.getItemMax()].position;
              }
          };
          //Функция для прокрутки слайдов
          let transformItem = function(direction) {
            //Анимаия исчезновения информации при прокрутке слайдера
            let slider = document.querySelector('.slider__item.active .block_hide_swipe');
            slider.style.display = 'none';
            setTimeout(() => slider.style.display = 'block', 500);
            //
            let nextItem;
               if(direction === 'right') {
                  positionLeftItem++;
                  //Проверка эта позиция элемента последняя 
                  if(positionLeftItem > position.getMax()){
                      //Берем индекс элемента с минимальной позицией
                      nextItem = position.getItemMin();
                      //Назначаем этому элементу максимальную позицию + 1;
                      items[nextItem].position = position.getMax() + 1;
                      //По количеству элементов в слайдере узнаем на сколько % надо передвинуть элемент,
                      //записываем в свойство transform на сколько мы передвинули  его
                      items[nextItem].transform += items.length * 100;
                      //Передвигаем элемент
                      items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
                  }
                  transform -= step;//transform запоминает на сколько мы передвинули обертку слайдера
              };
              //Меняем активный слайд
              if(direction === 'left') {
                  positionLeftItem--;
                  if(positionLeftItem < position.getMin()) {
                      nextItem = position.getItemMax();
                      items[nextItem].position = position.getMin() - 1;
                      items[nextItem].transform -= items.length * 100;
                      items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
                  }
                  transform += step;
              }
              items.forEach(itemNode => {
                if(itemNode.item.classList.contains('active')){
                    itemNode.item.classList.remove('active');
                }
                if(direction === 'left') {
                    if(itemNode.position == positionLeftItem) {
                        itemNode.item.classList.add('active');
                    }
                }
                if(direction === 'right') {
                    if(itemNode.position == positionLeftItem) {
                        itemNode.item.classList.add('active');
                    }
                }
              });
              //Передвигаем обертку
              sliderWrapper.style.transform = 'translateX(' + transform + '%)';
          };
          
          //Функция обработчик для addEventListener
          let controlClick = function(e){
              let direction = this.classList.contains('slider__control_right') ? 'right' : 'left';
              e.preventDefault();
              transformItem(direction);
          };
          //Вешаем addEventListener на стрелочки слайдера для прокрутки
          let hangHandler = function() {
              sliderControl.forEach((item) => {
                  item.addEventListener('click', controlClick);
              });
          };
  
          //Инициализация
          hangHandler();
          //Возвращаем объект с методами для функции которая будет обрабатывать swipe
          return {
              right() {
                  transformItem('right');
              },
              left() {
                  transformItem('left');
              }
          };
    }
  }());
//Функции для обработки свайпов (swipe)
  let swipe = (function() {
      return function(slider) {
      let touchstartX = 0;
      let touchendX = 0;
  
      let gesuredZone = document.querySelector('.slider__wrapper');
  
      gesuredZone.addEventListener('touchstart', function(e) {
          touchstartX = e.changedTouches[0].screenX;
      }, false);
  
      gesuredZone.addEventListener('touchend', function(e) {
          touchendX = e.changedTouches[0].screenX;
          handleGesure();
      }, false); 
  
      function handleGesure() {
          if (touchendX < touchstartX) {
              slider.right();
          }
          if (touchendX > touchstartX) {
              slider.left();
          }
      }
  }
  }());