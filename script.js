(function ($) {
    // var initHeight;
  
    function set_adaptive_width(item) { 
      var parentHeight = parseInt(item.parent().css("height"));
      // initHeight
      var parentPaddingTop = parseInt(item.parent().css("padding-top"));
      var parentPaddingBottom = parseInt(item.parent().css("padding-bottom"));
      var availableHeight = parentHeight - parentPaddingTop - parentPaddingBottom;
      var reinit = false;
  
      var storeTimeInterval = setInterval(function () {
      var currentWidth = item.outerWidth(true);
      var currentHeight = item.outerHeight(true);
      var limit = 30;
  
        if (currentHeight < availableHeight - limit) {
          item.css("width", currentWidth - limit + "px");
        } else if (!reinit && currentHeight > availableHeight) {
          item.parent().removeClass("do-reveal");
          item.css("width", "1000px");
          reinit = true;
        } else {
          clearInterval(storeTimeInterval);
          item.parent().addClass("do-reveal");
        }
      }, 10);
    }
  
    $(".js-adaptive-width").each(function (index) {
      set_adaptive_width($(this));
    });
  
    $(window).resize(function () {
      $(".js-adaptive-width").each(function (index) {
        set_adaptive_width($(this));
      });
    });
  })(jQuery);
  
  // function _gsapInitMobileMenuPanel(){
  //     gsap.set([".hamburger .long, .hamburger .short"], {transformOrigin:'center center', y:-8});
  //
  //
  // }
  //
  //
  // function _gsapCloseMobileMenuPanel(){
  //     gsap.to(".js-open-mobile .hamburger .long", {duration: .4, rotation: -225, y: 14,  ease:Elastic.easeOut.config(1, 0.6)})
  //     gsap.to(".js-open-mobile .hamburger .short", {duration: .4, rotation: 225, y: 2,  ease:Elastic.easeOut.config(1, 0.6)})
  //     gsap.from('.menu', {duration: .3, transformOrigin:'top left', scaleX : .05, scaleY:.08, x : 50, y : 20, ease:Elastic.easeOut.config(1, 0.6)});
  //
  //
  // }
  //
  // function _gsapOpenMobileMenuPanel(){
  //     gsap.to(".hamburger .long", {duration : .4, rotation : 0,  y:-8, ease:Elastic.easeOut.config(1, 0.6)});
  //     gsap.to(".hamburger .short", {duration : .4, rotation : 0,  y:-8, ease:Elastic.easeOut.config(1, 0.6)});
  //     gsap.to('.menu', {duration: .3, ease:Elastic.easeOut.config(1, 0.6)});
  //
  //
  // 
  // }
  
  (function ($) {
  
      var checkbox,
          vals,
          total,
          label,
          inputs,
          panel;
  
      checkbox = document.querySelectorAll('.js-ptc-default-label');
      panel = document.querySelectorAll('.js-ptc-value');
      vals = document.querySelectorAll('.js-ptc-value label');
      label = document.querySelectorAll('.js-ptc-default-label');
      inputs = document.querySelectorAll('.wpcf7 input[type="text"], .wpcf7 input[type="email"], .wpcf7 input[type="tel"]');
      total = [];
      if (!checkbox)
          return;
  
      if (!vals)
          return;
  
      /* Add Event Listener */
      checkbox.forEach(function (c) {
          c.addEventListener('click', function (e) {
              this.nextElementSibling.classList.toggle('js-hide');
              this.classList.toggle('js-ptc-open');
  
          });
      });
  
      /* Add Event Listener for every label */
  
      vals.forEach(function (el, i) {
          total[i] = [i];
          el.addEventListener('input', function (e) {
              if (this.childNodes[0].checked == true) {
                  total[i] = total[i] + 1;
              } else {
                  total[i] = total[i] - 1;
              }
              //update total
              var text = 'Add a location (' + total[i] + ')';
              label.textContent = text;
          })
      });
  
      inputs.forEach(function (input, i) {
          input.addEventListener('blur', function (e) {
  
              if (this.value == '') {
                  this.classList.remove('js-allright');
  
                  this.classList.add('js-mandatory');
              } else {
                  this.classList.remove('js-mandatory');
                  this.classList.add('js-allright');
              }
          });
      });
  
  })(jQuery);
  
  (function ($) {
    // let mouseCursor = document.querySelector("#cursor");
    // window.addEventListener("mousemove", cursor);
    // function cursor(e) {
    //   mouseCursor.style.top = e.clientY + "px";
    //   mouseCursor.style.left = e.clientX + "px";
    // }
    // $("a, button, .btn, input").hover(
    //   function () {
    //     mouseCursor.classList.add("is-hover");
    //   },
    //   function () {
    //     mouseCursor.classList.remove("is-hover");
    //   }
    // );
  })(jQuery);
  
   class Accordion {
      constructor(el) {
        this.el = el;
        this.country = this.el.dataset.country;
        this.btn = el.querySelector('.dc-accordion-btn');
        this.content = el.querySelector('.dc-accordion-list-overflow');
        this.active = false;
        this.cards = el.querySelectorAll('.dc-card');
        this.deliveryCenters = [];
  
        this.init();
      }
  
      init() {
          for (let i = 0; i < this.cards.length; i++) {
              this.deliveryCenters.push(new DeliverCenter(this.cards[i], this))
          }
      }
  
      toggle() {  
          console.log('toggle')
          if(this.active) {
              if (window.matchMedia("(min-width: 1000px)").matches) {
                  for (let i = 0; i < window.allCountryAccordions.length; i++) {
                      const item = window.allCountryAccordions[i];
                      item.close();
                      item.show();
                  }
              } else {
                  this.close();
              }
              this.el.parentNode.querySelector('.dc-accordion-back').classList.remove('is-active');
          }
          else {
              if (window.matchMedia("(min-width: 1000px)").matches) {
                  for (let i = 0; i < window.allCountryAccordions.length; i++) {
                      const item = window.allCountryAccordions[i];
                      if(item != this) {
                          item.hide();
                          item.close();
                      }
                  }
              }
              this.show();
              this.open();
              this.el.parentNode.querySelector('.dc-accordion-back').classList.add('is-active');
  
          }
         
  
        }
  
      open() {  
          this.btn.classList.add('is-active');
          this.update_height();
          this.active = true;
          document.querySelector('.map__country-tag[data-country="'+ this.country +'"]').classList.add('is-active');
  
          // for (let i = 0; i < window.allCountryAccordions.length; i++) {
          //     const item = window.allCountryAccordions[i];
          //     if(item.country != this.country) {
          //         item.el.style.display = 'none';
          //         document.querySelector('.map__country-tag[data-country="'+ item.country +'"]').classList.remove('is-active');
          //     } else {
          //         item.el.style.display = '';
          //         document.querySelector('.map__country-tag[data-country="'+ this.country +'"]').classList.add('is-active');
          //     }
          // }
  
      }
  
      close() {  
          this.btn.classList.remove('is-active');
          this.content.classList.remove('is-active');
          this.content.style.height = '0px';
          document.querySelector('.map__country-tag[data-country="'+ this.country +'"]').classList.remove('is-active');
          this.active = false;
  
          let centers = this.deliveryCenters;
          setTimeout(function(){
              for (let i = 0; i < centers.length; i++) {
                  const center = centers[i];
                  center.changeTab( center.tabs[0].dataset.dcTab);
              }
          }, 600);
  
          // for (let i = 0; i < window.allCountryAccordions.length; i++) {
          //     const item = window.allCountryAccordions[i];
          //     document.querySelector('.map__country-tag[data-country="'+ item.country +'"]').classList.remove('is-active');
          //     item.el.style.display = '';
          // }
      }
  
      show() {
          this.el.style.display = '';
      }
  
      hide() {
          this.el.style.display = 'none';
      }
  
      update_height() {
          this.content.classList.add('is-active');
          this.content.style.height = this.el.querySelector('.dc-accordion-list-inner').getBoundingClientRect().height +'px';
      }
    };
  
  
  class DeliverCenter {
      constructor(el, parentClass) {
          this.el = el;
          this.tabs = this.el.querySelectorAll('.dc-card-tab')
          this.contents = this.el.querySelectorAll('.dc-card-content')
          this.parent = parentClass;
  
          this.init();
      }
      
      init() {
          const el = this;
  
          for (let i = 0; i < this.tabs.length; i++) {
              const tab = this.tabs[i];
              tab.addEventListener('click', function(e){
                  el.changeTab(tab.dataset.dcTab);
              })
          }
      }
  
      changeTab(target) {
          for (let i = 0; i < this.tabs.length; i++) {
              const tab = this.tabs[i];
              if(tab.dataset.dcTab == target) {
                  tab.classList.add('is-active');
                  this.contents[i].classList.add('is-active');
              }
              else {
                  tab.classList.remove('is-active');
                  this.contents[i].classList.remove('is-active');
              }
          }
          if(this.parent.active) {
              this.parent.update_height()
          }
      }
  
      
  }
  
  
  //   Events /////////////////
  
  var accordions = document.querySelectorAll('.dc-accordion-list');
  
  if(accordions) {
      window.allCountryAccordions = []
      for (let i = 0; i < accordions.length; i++) {
          const newAccordion = new Accordion(accordions[i]);
          window.allCountryAccordions.push(newAccordion);
  
      }
      for (let i = 0; i < window.allCountryAccordions.length; i++) {
          const accordion = window.allCountryAccordions[i];
          accordion.btn.addEventListener('click', function(){
              accordion.toggle();
              
          })
          accordion.el.parentNode.querySelector('.dc-accordion-back').addEventListener('click', function(){
              for (let i = 0; i < window.allCountryAccordions.length; i++) {
                  const item = window.allCountryAccordions[i];
                      item.close();
                      item.show();
              }
              accordion.el.parentNode.querySelector('.dc-accordion-back').classList.remove('is-active');
          })
      }
  
  }
      
  
  (function ($) {
  
    $(".no-touch .floating-card:not(.js-parallax-hover)").hover(
      function () {
        $(this).find('.floating-card__text-overflow').css('height', $(this).find('.floating-card__text').outerHeight(true) + 'px');
        $(this).find('.floating-card__content').css('margin-top', $(this).find('.floating-card__text').outerHeight(true) * -1 + 'px');
      }, function () {
        $(this).find('.floating-card__text-overflow').css('height', '');
        $(this).find('.floating-card__content').css('margin-top', '');
  
      }
    );
  
  })(jQuery);
  
  (function($) {
  
      $('#getFooterExpertise').contents().appendTo('.get_footer_expertise');
      $('#getFooterInsight').contents().appendTo('.get_footer_insight');
      $('#getFooterProduct').contents().appendTo('.get_footer_product');
  
  })(jQuery);
  
  const translations = getTranslations();
  let keepInputFocus = false;
  let initHubspotOnce = 0;
  //  Events
  // ////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////
  
  //Detect when hubspot form is created in dom
  window.addEventListener("message", (event) => {
    if (
      event.data.type === "hsFormCallback" &&
      event.data.eventName === "onFormReady"
    ) {
      // Hubspot form created !
  
      let hbsptForms = document.querySelectorAll('.hbspt-form form');
      // initHubspotOnce++;
      // console.log("message" + initHubspotOnce);
      if (hbsptForms) {
          for (let i = 0; i < hbsptForms.length; i++) {
            const form = hbsptForms[i];
            if (!form.classList.contains('js-init')) {
              form.classList.add('js-init');
              let fileInputs = form.querySelectorAll("input[type='file']");
    
              let selectFields = form.querySelectorAll(".hs-fieldtype-select");
    
               // Fake Input File
              if (fileInputs) {
                for (let i = 0; i < fileInputs.length; i++) {
                  const fileInput = fileInputs[i];
                  constructFileInput(fileInput);
                }
              }
              // Fake Select input
              if (selectFields) {
                for (let i = 0; i < selectFields.length; i++) {
                  const select = selectFields[i].querySelector("select");
                  if (select.multiple) {
                    let pucesList = document.createElement("div");
                    pucesList.classList.add("js-filter");
    
                    select.parentNode.classList.add(".ptc-filter-form");
                    selectFields[i].appendChild(pucesList);
                  } else {
                    // ! UnComment to create custom autoComplete select field
                    // constructSelect(select);
                  }
                }
              }
            }
           
          }
        }
  
      // let fileInputs = document.querySelectorAll(".hbspt-form form input[type='file']");
      // let selectFields = document.querySelectorAll(".hbspt-form form .hs-fieldtype-select");
      // console.log(selectFields);
      // // Fake Input File
      // if (fileInputs) {
      //   for (let i = 0; i < fileInputs.length; i++) {
      //     const fileInput = fileInputs[i];
      //     constructFileInput(fileInput);
      //   }
      // }
      // // Fake Select input
      // if (selectFields) {
      //   for (let i = 0; i < selectFields.length; i++) {
      //     const select = selectFields[i].querySelector("select");
      //     if (select.multiple) {
      //       let pucesList = document.createElement("div");
      //       pucesList.classList.add("js-filter");
  
      //       select.parentNode.classList.add(".ptc-filter-form");
      //       selectFields[i].appendChild(pucesList);
      //     } else {
      //       constructSelect(select);
      //     }
      //   }
      // }
    }
  });
  
  //  Functions
  // ////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////
  
  function getTranslations() {
    let translationsAttribute = document.getElementById("ptcTranslations").dataset
      .translations;
    let ptcTranslations = translationsAttribute
      .trim()
      .replaceAll("{", "")
      .replaceAll("}", "")
      .replaceAll('"', "")
      .split(";")
      .filter((item) => item);
  
    for (let i = 0; i < ptcTranslations.length; i++) {
      ptcTranslations[i] = ptcTranslations[i].split(":");
    }
  
    let translations = [];
    for (let i = 0; i < ptcTranslations.length; i++) {
      translations[ptcTranslations[i][0]] = ptcTranslations[i][1];
    }
    return translations;
  }
  
  // Manage File Input
  //
  function constructFileInput(elem) {
    let fakeInput = document.createElement("input");
    let fakeBtn = document.createElement("div");
  
    fakeInput.type = "text";
    fakeBtn.classList.add("btn", "btn--link", "fake-btn");
    fakeBtn.innerText = translations["Select a file"];
    elem.parentNode.insertBefore(fakeInput, elem);
    elem.parentNode.insertBefore(fakeBtn, elem);
    fakeInput.placeholder = translations["No file chosen"];
  
    elem.addEventListener("change", function () {
      let fullPath = this.value;
      let startIndex =
        fullPath.indexOf("\\") >= 0
          ? fullPath.lastIndexOf("\\")
          : fullPath.lastIndexOf("/");
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
        filename = filename.substring(1);
      }
      fakeInput.value = filename;
    });
  }
  
  // Manage Select Fields
  //
  function constructSelect(elem) {
    preventAutofill(elem);
    const parent = elem.parentNode;
    const options = elem.querySelectorAll("option");
    const div = document.createElement("div");
    const input = document.createElement("input");
    elem.setAttribute('autocomplete', 'off');
    input.type = "text";
    preventAutofill(input);
  
    const ul = document.createElement("ul");
  
    div.classList.add("js-ptc-select");
    input.classList.add("js-ptc-select-label");
    ul.classList.add("js-ptc-select-list");
  
    input.addEventListener("click", function () {
      toggleSelectList(div);
    });
  
    parent.appendChild(div).appendChild(input);
  
    div.appendChild(ul); 
    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      if (opt.disabled && i == 0) {
        input.placeholder = opt.innerText;
      } else if(opt.value) {
        const li = document.createElement("li");
  
        li.classList.add("js-ptc-select-list-item");
        li.innerText = opt.innerText;
        li.setAttribute("data-v", opt.value);
  
        li.addEventListener("click", function () {
          // console.log("click");
          keepInputFocus = true;
          manageSelection(li);
        });
        ul.appendChild(li);
      }
    }
  
    // Change option on typing the input
    input.addEventListener("input", function () {
      openSelectList(div);
      filterSelectOptions(this, input.value);
    });
  
    // Change option on typing the input
    //
    input.addEventListener("blur", function (event) {
      setTimeout(function(){ 
        // console.log("blur");
  
        if(!keepInputFocus) {
          closeAllSelectList();
          let lastOptionWhenBlur = input.nextSibling.querySelector('.js-ptc-select-list-item-selected');
          if (lastOptionWhenBlur) {
            elem.value = lastOptionWhenBlur.dataset.v;
            input.value = lastOptionWhenBlur.dataset.v;
          }
          else {
            elem.value = '';
            input.value = '';
          }
        }
        else {
          keepInputFocus = false;
        }
      }, 300);
    });
  }
  
  function preventAutofill(field) {
    field.setAttribute("autocomplete", "off");
    field.setAttribute("onfocus", "this.removeAttribute('readonly')");
  
  }
  
  
  // Display, close and close ALL new select dropdowns
  //
  function toggleSelectList(newSelect) {
    let openAfter = false;
    if (!newSelect.classList.contains("is-active")) {
      openAfter = true;
    }
    closeAllSelectList();
    if (openAfter) {
      openSelectList(newSelect);
    }
  }
  
  function openSelectList(newSelect) {
    newSelect.classList.add("is-active");
    newSelect
      .querySelector(".js-ptc-select-list")
      .classList.add("js-ptc-select-show");
  }
  
  function closeSelectList(newSelect) {
    newSelect.classList.remove("is-active");
    newSelect
      .querySelector(".js-ptc-select-list")
      .classList.remove("js-ptc-select-show");
  }
  
  function closeAllSelectList() {
    for (let i = 0; i < document.querySelectorAll(".js-ptc-select").length; i++) {
      const newSelect = document.querySelectorAll(".js-ptc-select")[i];
      closeSelectList(newSelect);
    }
  }
  
  // Manage, add, remove Selection
  //
  function manageSelection(option) {
    const originSelect = option.parentNode.parentNode.parentNode.querySelector(
      "select"
    );
    if (!option.classList.contains("js-ptc-select-list-item-selected")) {
      removeAllSelection(option.parentNode);
      addSelection(option);
      originSelect.parentNode.querySelector(".js-ptc-select-label").value = option.innerText;
      originSelect.value = option.dataset.v;
      option.parentNode.parentNode.classList.add('has-value');
    } else {
      removeSelection(option);
      originSelect.parentNode.querySelector(".js-ptc-select-label").value = '';
      originSelect.value = "";
      option.parentNode.parentNode.classList.remove('has-value');
    }
  }
  
  function addSelection(option) {
    option.classList.add("js-ptc-select-list-item-selected");
  }
  function removeSelection(option) {
    option.classList.remove("js-ptc-select-list-item-selected");
  }
  function removeAllSelection(ul) {
    const options = ul.querySelectorAll(".js-ptc-select-list-item");
    for (let i = 0; i < options.length; i++) {
      options[i].classList.remove("js-ptc-select-list-item-selected");
    }
  }
  
  
  // Autocomplete Select
  //
  function filterSelectOptions(input, value) {
    const originSelect = input.parentNode.parentNode.querySelector(
      "select"
    );
    const options = input.nextSibling.querySelectorAll('li');
    
    // Show only Options that match the text input
    let matchValue = false;
    let visibleOptions = [];
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (!option.dataset.v.toLowerCase().includes(value.toLowerCase()) ) {
        option.style.display = "none";
      } else {
        option.style.display = "";
        visibleOptions.push(option)
        // Highlight matching string whatever the case
        let original_string = option.dataset.v;
        let valueIndex = original_string.toLowerCase().indexOf(value.toLowerCase());
        if (valueIndex >= 0) {
          let indexCorrector = (valueIndex == 0) ? 0 : 1;
          let newHTML = original_string.substring(0, valueIndex) + "<span>" + original_string.substring(valueIndex, valueIndex + value.length) + "</span>" + original_string.substring(valueIndex + value.length, original_string.length);
          option.innerHTML = newHTML;
        }
      }
    }
  
    //Replace Origin Select value, by the types of the input if value matches
    if(visibleOptions.length == 1) {  
            addSelection(visibleOptions[0])
            originSelect.value = visibleOptions[0].dataset.v;
    }
    else {
      removeAllSelection(input.nextSibling);
      originSelect.value = "";
    }
  
    matchValue = false;
  }
  var expand = (function ($) {
    var nbOfItem;
    var itemPos;
    var filtered = false;
    gridExpand();
  
    /* start of function */
  
    function gridExpand() {
      if ($(this).hasClass("leader__card")) {
        nbOfItem = $(".grid-expand .grid-expand__item").parent().length;
      } else {
        nbOfItem = $(".grid-expand .grid-expand__item").length;
      }
      var widthTotal = $(".grid-expand").outerWidth(true);
      var i;
  
      $(".grid-expand").on("click", ".grid-expand__item", function () {
        // receive updated number of item through filter
        nbOfItem = expand.nbOfItem;
        filtered = expand.filtered;
        var clickedItem = $(this);
        $(".grid-expand .grid-expand__item").removeClass("is-active");
        $(this).addClass("is-active");
        if ($(this).hasClass("leader__card")) {
          var currentItemWidth = $(this).parent().outerWidth(false);
        } else {
          //default
          var currentItemWidth = $(this).outerWidth(false);
        }
  
        var ElPerRow = Math.floor(widthTotal / currentItemWidth); // ex: 4 el per row
        var nbOfRow = Math.ceil(nbOfItem / ElPerRow); // ex: 3 rows
  
        if ($(this).hasClass("leader__card")) {
          itemPos = parseInt($(this).parent().index() / 2) + 1;
        } else {
          //default
          itemPos = parseInt($(this).index() / 2) + 1;
        }
  
        // if filtered do your stuff here
        if (filtered) {
          var parents = $(this)
            .closest(".our-offices__list")
            .find(".our-offices__country:visible");
          var parent = $(this).closest(".our-offices__country");
          itemPos = parents.index(parent) + 1;
        }
  
  
        for (i = 1; i <= nbOfRow; i++) {
        
          // ElPerRow * i));
  
          if (itemPos <= ElPerRow * i) {
            $(".grid-expand__desc").removeClass("show");
  
            if ($(this).hasClass("leader__card")) {
              $(this)
                .parent()
                .next(".grid-expand__desc")
                .toggleClass("show")
                .css("grid-row", i + 1 + "/ span 1");
            } else {
              $(this)
                .next(".grid-expand__desc")
                .toggleClass("show")
                .css("grid-row", i + 1 + "/ span 1");
            }
  
            break;
          }
        }
      });
    }
  
    $(window).resize(function () {
      gridExpand();
    });
  
    return { nbOfItem: nbOfItem, filtered: filtered };
    /* End of function */
  })(jQuery);
  
  (function($) {
      /* start */
      $('.js-contact-forms-wrapper > div.tabs li.tabs__item').click(function(e) {
          if (!$(this).hasClass('tabs__item--active')) {
              var tabSelected = $(this).data('formselected');
              $('.js-contact-forms-wrapper > div.tabs li.tabs__item').removeClass('tabs__item--active');
              $(this).addClass('tabs__item--active');
              $(".js-contact-forms-wrapper div.hbspt-form-container").removeClass('active');
              $('.js-contact-forms-wrapper div.hbspt-form-container[data-formid="' + tabSelected + '"]').addClass('active');
          }
      })
      /* end */
  })(jQuery);
  
  (function($) {
  
      $('body').on('click', 'a[href^="mailto:"]', function(e) {
          e.preventDefault();
          var mailto = $(this).attr('href');
          mailto = mailto.replace('mailto:', '');
          mailto = mailto.replaceAll('%', '');
          mailto = mailto.replaceAll('@', '');
          mailto = mailto.replaceAll('.', '');
          mailto = mailto.replaceAll('[at]', '@');
          mailto = mailto.replaceAll('[dot]', '.');
  
          document.location.href = "mailto:" + mailto;
      });
      /* End of function */
  })(jQuery);
  
  (function ($) {
  
  
    function centerMapOnContinent(item) {
      var continentWidth = item[0].getBoundingClientRect().width;
      var continentHeight = item[0].getBoundingClientRect().height;
      var continentOffsetX = item.offset().left;
      var continentOffsetY = item.offset().top;
      var svgWidth = map.width();
      var svgHeight = map.height();
      var svgOffsetX = map.offset().left;
      var svgOffsetY = map.offset().top;
      var centeredPosX = ($(window).width() / 2) - (continentOffsetX + (continentWidth / 2)) + currentPlanOffsetX;
      centeredPosX = centeredPosX - ($(window).width() / 6); //fix alignment on the left side of the screnn to reveal .map__aside panel
      var centeredPosY = (map.parents('.map__container').offset().top - (continentOffsetY + (continentHeight / 2))) + (map.parents('.map__container').height() / 2) + currentPlanOffsetY - 70;
  
      var trOriginX_px = (continentOffsetX - svgOffsetX) - currentPlanOffsetX + (continentWidth / 2);
      var trOriginY_px = (continentOffsetY - svgOffsetY) + (continentHeight / 2);
      var trOriginX = ((trOriginX_px / svgWidth) * 100);
      var trOriginY = ((trOriginY_px / svgHeight) * 100);
  
      mapPlan.css('transform', 'translate(' + centeredPosX + 'px, ' + centeredPosY + 'px)');
      if (!mapIsActive) {
        map.css('transform-origin', trOriginX + '% ' + trOriginY + '% ');
      }
      currentPlanOffsetX = centeredPosX;
      currentPlanOffsetY = centeredPosY;
  
    }
  
    // function setMapOverlays() {
    //   $(".map__continent-overlay").each(function () {
    //     var area = $(this).attr('data-area');
    //     var svgContinent = $('#' + area)
    //     $(this).css({
    //       'top': (svgContinent.offset().top - map.offset().top) + 'px',
    //       'left': (svgContinent.offset().left - map.offset().left) + 'px',
    //       'width': svgContinent[0].getBoundingClientRect().width + 'px',
    //       'height': svgContinent[0].getBoundingClientRect().height + 'px'
    //     });
    //   });
  
    // }
  
  
    function desactiveMap() {
      currentPlanOffsetX = 0;
      currentPlanOffsetY = 0;
      currentTrOriginX = 0;
      currentTrOriginY = 0;
      map.removeClass('is-active');
      continent.removeClass('is-active');
      continentOverlay.removeClass('is-active');
      $('a.map__country-tag').removeClass('is-active');
      $('#officeList').removeClass('is-active');
      mapPlan.css('transform', '');
      mapIsActive = false;
      detectScrollToDesactive = false;
      setTimeout(function () {
        map.css('transform-origin', '');
      }, 600);
      $('.map__marker').removeClass('do-hide is-active');
      $('.map__aside').removeClass('is-active');
      $('.dc-accordion-btn.is-active').trigger('click');
      $('.map-section__text').removeClass('do-hide');
    }
  
  
  
    function manageMapAsides( area ) {
      $('.map__aside:not([data-area="'+ area +'"])').removeClass('is-active');
      $('.map__aside[data-area="'+ area +'"]').addClass('is-active');
  
      for (let i = 0; i < window.allCountryAccordions.length; i++) {
        const accordion = window.allCountryAccordions[i];
        accordion.close();
        accordion.show();
      }
    }
  
  
  
  
  
    // Events //////////////////////////////////////////////////////////////////////////
  
  
  
  
    var mapIsActive = false;
    var scrollPosOnMapActive = 0;
    var detectScrollToDesactive = false;
  
    if ($('.map__container').length) {
      var mapPlan = $('#mapPlan')
      var map = $('#mapSVGblock');
      var continent = map.find('.continent')
      var continentOverlay = map.find('.map__continent-overlay')
      var currentPlanOffsetX = 0;
      var currentPlanOffsetY = 0;
      var currentTrOriginX = 0;
      var currentTrOriginY = 0;
  
  
      //init
      continentOverlay.each(function( index ) {
        map.find('#'+ $(this).attr('data-area')).addClass('is-available');
      });
  
      //events
  
  
      continent.on('click', function () {
        if (!$(this).hasClass('is-active')) {
          $('body, html').animate({ scrollTop: $('.map__section').offset().top + 0 }, '500', 'swing');
  
          continent.removeClass('is-active');
          continentOverlay.removeClass('is-active');
          map.addClass('is-active');
          $(this).addClass('is-active');
          $('.map__continent-overlay[data-area="' + $(this).attr('id') + '"]').addClass('is-active');
          $('#officeList').addClass('is-active');
          centerMapOnContinent($(this));
          manageMapAsides( $(this).attr('id') );
  
          mapIsActive = true;
  
          $('.map__marker:not([data-area="' + $(this).attr('id') + '"])').addClass('do-hide').removeClass('is-active');
          $('.map__marker[data-area="' + $(this).attr('id') + '"]').addClass('is-active').removeClass('do-hide');
  
          setTimeout(function () {
            detectScrollToDesactive = true;
            scrollPosOnMapActive = $(window).scrollTop();
            $('header').addClass('is-scrolled');
            $('header').addClass('is-small');
          }, 500);
        }
        $('.map-section__text').addClass('do-hide');
  
      });
  
  
    $(".map__country-tag").on("click",function(){
      var target = $(this).attr('data-country');
      $('.dc-accordion-btn[data-country="' + target + '"]').trigger('click');
    });
  
      $(document).on("click", function (event) {
        if (
          mapIsActive
          && !$(event.target).closest(continent).length
          && !$(event.target).closest('.office__list').length
          && !$(event.target).closest('.map__continent-overlay.is-active a.map__country-tag').length
          && !$(event.target).closest('.map__aside.is-active').length
          ) {
          desactiveMap();
        }
      });
  
  
  
      $(window).scroll(function () {
        if (mapIsActive && detectScrollToDesactive && Math.abs(scrollPosOnMapActive - $(window).scrollTop()) > $(window).height() / 1.8) {
          desactiveMap();
          $(".office__list").slick('slickUnfilter');
          var count = $('.office__list').slick('getSlick')['slideCount'];
          $('#officeCounter').html(count + ' office' + ((count > 1) ? 's' : '') + ' found');
        }
      });
    }
  
    // if ($('.map__continent-overlay').length) {
    //   setMapOverlays();
  
    //   $(window).resize(function () {
    //     setMapOverlays();
    //   });
  
    // }
  
  
  
  
  
    if (!Modernizr.touch) {
  
      // $('#mapSVGblock').addClass('is-disabled');
      // var timeoutId;
  
      // $("#mapAlert").hover(function () {
      //   var item = $("#mapAlert");
      //   timeoutId = window.setTimeout(function () {
      //     timeoutId = null; // EDIT: added this line
      //     item.addClass('is-hovered');
      //     $('#mapSVGblock').removeClass('is-disabled');
      //   }, 1500);
      // },
      //   function () {
      //     if (timeoutId) {
      //       window.clearTimeout(timeoutId);
      //       timeoutId = null;
      //     }
      //   });
  
    } else {
      // $("#mapAlert").addClass('is-hovered');
      // $('#mapSVGblock').removeClass('is-disabled');
    }
  
  
  
  
  })(jQuery);
  
  (function($) {
      /* start of function */
      /* End of function */
      var h = 0;
  
      var myfunct1 = function() {
          $(this).find("a.menu__link").addClass("is-hovered");
          $(this).find("> .sub-menu").css("height", $(this).find(".submenu__wrapper").outerHeight() + "px");
      };
  
      var myfunct2 = function() {
          $(this).find("a.menu__link").removeClass("is-hovered");
          $(this).find("> .sub-menu").css("height", "");
          // $('.js-top-searchbar .menu__link').removeClass('is-clicked');
      };
  
      //.hi:not(:has(.image))
      $("nav.menu .menu__list > li.menu-item-has-children").hover(myfunct1, myfunct2);
  })(jQuery);
  
  const menuIcons = document.querySelectorAll("header .menu__link--icon");
  let activeSubmenuIcon = false;
  
  function enableSubmenuIcon(el) {
    menuIcons.forEach.call(menuIcons, function (el) {
      el.classList.remove("is-hovered");
    });
    el.classList.add("is-hovered");
    let submenu = el.nextSibling;
    submenu.style.height =
      submenu.querySelector(".submenu__wrapper").offsetHeight + "px";
  
    //Auto focus search field if found in the submenu
    if (submenu.contains(document.getElementById("globalSearch"))) {
      document.getElementById("globalSearch").focus();
    }
    activeSubmenuIcon = true;
  }
  
  function disableSubmenuIcon() {
    for (let i = 0; i < menuIcons.length; i++) {
      const menuIcon = menuIcons[i];
      menuIcon.classList.remove("is-hovered");
      menuIcon.nextSibling.style.height = "0px";
      activeSubmenuIcon = false;
    }
    setTimeout(function () {
      document.getElementById("globalSearch").value = "";
    }, 500);
    activeSubmenuIcon = false;
  }
  
  for (let i = 0; i < menuIcons.length; i++) {
    const menuIcon = menuIcons[i];
    menuIcon.addEventListener("click", function () {
      if (!this.classList.contains("is-hovered")) {
        enableSubmenuIcon(this);
      } else {
        disableSubmenuIcon();
      }
    });
  }
  
  // Hide SubmenuIcon if hover another menu element
  const menuItems = document.querySelectorAll(
    ".menu__list-item:not(.menu-item--icon)"
  );
  for (let i = 0; i < menuItems.length; i++) {
    const menuItem = menuItems[i];
    menuItem.addEventListener("mouseover", function (event) {
      if (activeSubmenuIcon) {
        disableSubmenuIcon();
      }
    });
  }
  
  // Hide SubmenuIcon if press escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeSubmenuIcon) {
      disableSubmenuIcon();
    }
  });
  
  // Hide SubmenuIcon if scroll
  window.addEventListener("scroll", function (event) {
    if (activeSubmenuIcon) {
      disableSubmenuIcon();
    }
  });
  
  var specifiedElement = document.getElementById("a");
  
  // Hide SubmenuIcon if click outside the menu
  document.addEventListener("click", function (event) {
    if (activeSubmenuIcon) {
      var element = document.querySelector("header");
      var isClickInside = element.contains(event.target);
  
      if (!isClickInside) {
        disableSubmenuIcon();
      }
    }
  });
  
  const langTrigger = document.querySelector('#languageBtn')
  const langModule = langTrigger.parentNode; 
  const langList = langModule.querySelector('#languageList'); 
  let isLangMobileMenuActive = false; 
  
  function openLangMobileMenu () {
    langModule.classList.add('is-active');
    langList.parentNode.style.height = langList.offsetHeight + 'px';
    isLangMobileMenuActive = true;
  }
  function closeLangMobileMenu () {
    langModule.classList.remove('is-active');
        langList.parentNode.style.height = '';
        isLangMobileMenuActive = false;
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    langTrigger.addEventListener('click', function(event) {
      if( !isLangMobileMenuActive ) {
        openLangMobileMenu();
      } else {
        closeLangMobileMenu();
      }
    })
  });
  
  // Hide Lang Mobile Menu if click outside
  document.addEventListener("click", function (event) {
    if (isLangMobileMenuActive) {
      var element = langModule;
      var isClickInside = element.contains(event.target);
  
      if (!isClickInside) {
        closeLangMobileMenu();
      }
    }
  });
  
  (function ($) {
  
      function displayMenyOnLoad(el) {
          var header = document.querySelector(el);
          if (window.pageYOffset > header.offsetHeight) {
              header.classList.add('is-small');
          }
      }
      // fix body scroll
      //
      var bodyPos;
      function fixBodyScroll() {
          bodyPos = $(window).scrollTop();
          $("body").addClass('noScroll').css('top', -bodyPos + 'px');
      }
  
      // Unfix body scroll
      //
      function unfixBodyScroll() {
          $("body").removeClass('noScroll').css('top', '');
          $('html, body').animate({
              scrollTop: bodyPos
          }, 0);
      }
  
      function hideMenuOnScroll(el) {
  
          var header = document.querySelector(el);
          var position_precedente_du_scroll_vertical = window.pageYOffset;
  
          window.onscroll = function () {
  
              var position_actuelle_du_scroll_vertical = window.pageYOffset;
              header.classList.remove('is-small-on-load');
  
              /* Dectect if scroll up, le faire apparaitre */
              if (position_precedente_du_scroll_vertical > position_actuelle_du_scroll_vertical) {
                  /* Detect if scroll position = 0 , le faire apparaitre */
                  if (position_actuelle_du_scroll_vertical == 0) {
                      header.classList.remove('is-small');
                  }
                  /* Faire quelques choses */
                  header.classList.remove('is-scrolled');
  
              } else {
                  if (position_actuelle_du_scroll_vertical > header.offsetHeight) {
                      header.classList.add('is-scrolled');
                      header.classList.add('is-small');
                  }
              }
              /* Detect if scroll position < 100 (= header height)  pour ensuite le faire disparait */
              position_precedente_du_scroll_vertical = position_actuelle_du_scroll_vertical
          }
      }
  
      function showMobilePanel(event) {
          event.preventDefault();
          var header = document.querySelector('.header');
          var body = document.querySelector('body');
  
          if (header.classList.contains('js-open-mobile')) {
              unfixBodyScroll();
              if (typeof _gsapCloseMobileMenuPanel == 'function') {
                  _gsapCloseMobileMenuPanel();
              }
  
          } else {
              fixBodyScroll();
              if (typeof _gsapOpenMobileMenuPanel == 'function') {
                  _gsapOpenMobileMenuPanel();
  
              }
  
          }
          header.classList.toggle('js-open-mobile');
          body.classList.toggle('js-open-mobile');
  
      }
  
      function toggleHamburgerMenu(el) {
          var ham = document.querySelector(el);
          ham.onclick = showMobilePanel;
      }
  
      window.addEventListener('DOMContentLoaded', function (e) {
          if (typeof _gsapInitMobileMenuPanel == 'function') {
              _gsapInitMobileMenuPanel();
          }
  
          displayMenyOnLoad('header');
          hideMenuOnScroll('header');
          toggleHamburgerMenu('.hamburger');
      });
  
  })(jQuery);
  
  // (function ($) {
  //   var officesSlider = $(".office__list");
  //   var filtersApplied = false;
  
  //   officesSlider.slick({
  //     slide: ".office",
  //     infinite: false,
  //     slidesToShow: 4,
  //     slidesToScroll: 4,
  //     speed: 300,
  //     arrows: true,
  //     centerMode: false,
  //     variableWidth: true,
  //     nextArrow:
  //       '<div class="office__slider-arrow slider-arrow--next"><svg class="svg-use svg--arrow"><use xlink:href="#icon-arrow-right"></use></svg></div>',
  //     prevArrow:
  //       '<div class="office__slider-arrow slider-arrow--prev"><svg class="svg-use svg--arrow"><use xlink:href="#icon-arrow-left"></use></svg></div>',
  //     responsive: [
  //       {
  //         breakpoint: 1300,
  //         settings: {
  //           slidesToShow: 3,
  //           slidesToScroll: 2,
  //         },
  //       },
  //       {
  //         breakpoint: 900,
  //         settings: {
  //           slidesToShow: 2,
  //           slidesToScroll: 1,
  //         },
  //       },
  //       {
  //         breakpoint: 600,
  //         settings: {
  //           variableWidth: false,
  //           slidesToShow: 1.1,
  //           slidesToScroll: 1,
  //         },
  //       },
  //     ],
  //   });
  
  //   function unfilterOffices() {
  //     $(".office__list").slick("slickUnfilter");
  //     var count = $(".office__list").slick("getSlick")["slideCount"];
  //     $("#officeCounter").html(
  //       count + " office" + (count > 1 ? "s" : "") + " found"
  //     );
  //     $(".office__list").slick("slickGoTo", 0);
  //   }
  
  //   function filterOffices(filter) {
  //     $(".office__filter-list .tabs__item").removeClass("tabs__item--active");
  //     $('.office__filter-list .tabs__link[filter="' + filter + '"]')
  //       .parent()
  //       .addClass("tabs__item--active");
  
  //     unfilterOffices();
  
  //     if (filter === "all") {
  //       filtersApplied = false;
  //     } else {
  //       $(".office__list").slick(
  //         "slickFilter",
  //         $('.office[data-area="' + filter + '"]')
  //       );
  //       var count = $(".office__list").slick("getSlick")["slideCount"];
  //       $("#officeCounter").html(
  //         count + " office" + (count > 1 ? "s" : "") + " found"
  //       );
  //       filtersApplied = true;
  //     }
  //     $(".office__list").slick("slickGoTo", 0);
  //   }
  
  //   function filterOfficesByCountry(filter) {
  //     unfilterOffices();
  //     if (filter === "all") {
  //       filtersApplied = false;
  //     } else {
  //       $(".office__list").slick(
  //         "slickFilter",
  //         $('.office[data-country="' + filter + '"]')
  //       );
  //       var count = $(".office__list").slick("getSlick")["slideCount"];
  //       $("#officeCounter").html(
  //         count + " office" + (count > 1 ? "s" : "") + " found"
  //       );
  //       filtersApplied = true;
  //     }
  //   }
  
  //   var filter = "all";
  
  //   $("a.filterOffices, #mapSVG .continent").on("click", function () {
  //     $("a.map__country-tag").removeClass("is-active");
  //     if ($(this).parents("#mapSVG").length) {
  //       filter = $(this).attr("id");
  //     } else if ($(this).hasClass("filterOffices")) {
  //       filter = $(this).attr("filter");
  //     }
  //     filterOffices(filter);
  //   });
  
  //   $(".map__continent-overlay").on("click", "a.map__country-tag", function (e) {
  //     var country = $(this).attr("data-country");
  //     $("a.map__country-tag").removeClass("is-active");
  //     $(this).addClass("is-active");
  //     filterOfficesByCountry(country);
  //   });
  
  //   if ($(".map__container").length) {
  //     $(document).on("click", function (event) {
  //       // if (!$('.map__container').is(':visible')) {
  //       if (
  //         filtersApplied &&
  //         !$(event.target).closest(".continent").length &&
  //         !$(event.target).closest(".office__list").length &&
  //         !$(event.target).closest(
  //           ".map__continent-overlay.is-active a.map__country-tag"
  //         ).length &&
  //         !$(event.target).closest(".tabs__link.filterOffices").length
  //       ) {
  //         filterOffices("all");
  //         filtersApplied = false;
  //       }
  //       // }
  //     });
  //   }
  // })(jQuery);
  
  var filter = (function($, Expand) {
  
      var continentalFilter = document.querySelector('.continental');
      var continents = document.querySelectorAll('.continental li');
  
      var countryItems = document.querySelectorAll('.grid-expand > a');
      //	console.log(continentalFilter);
  
      continents.forEach(function(c) {
          c.addEventListener('click', function(e) {
  
              //set variable in expand object.
              removeActiveFilterClass();
              c.classList.add('active');
  
              countryItems.forEach(function(ci) {
                  ci.style.opacity = 1;
              });
  
              var id = e.target.id;
              var tg = toggleContinents(id);
  
              // Only for OFFICES Section
              if (tg) {
                  var count = $('.grid-expand .grid-expand__item[style*="display: block"]').length
                  Expand.nbOfItem = count;
  
              }
  
          });
      });
  
      countryItems.forEach(function(c) {
          c.addEventListener('click', function(e) {
  
              setOpacityTo(countryItems);
  
              c.style.opacity = 1;
  
          });
      });
  
      function setOpacityTo(elements) {
          elements.forEach(function(e) {
              e.style.opacity = .5;
          });
      }
  
      function removeActiveFilterClass() {
          continents.forEach(function(c) {
              c.classList.remove('active');
          });
      }
  
      function toggleContinents(id) {
          var all = document.querySelectorAll('[data-continental]');
  
          if (id == 'world') {
              Expand.filtered = false;
              all.forEach(function(i) {
                  i.style.display = "block";
  
              });
          } else {
              Expand.filtered = true;
              all.forEach(function(i) {
                  i.style.display = "none";
  
              });
  
              var show = document.querySelectorAll('[data-continental="' + id + '"]');
              show.forEach(function(s) {
                  s.style.display = "block";
              });
  
          }
  
          return true;
  
      }
  
      /* End of function */
  })(jQuery, expand);
  
  (function ($) {
      /* Accordion hey */
      var title;
  
      title = document.querySelectorAll('.js-our-values-titles ');
  
      // if (window.matchMedia("(max-width: 720px)").matches) {
  
      title.forEach(function (el, i) {
  
          // el.nextElementSibling.classList.add('js-hide');
  
          el.addEventListener('click', function (e) {
              this.nextElementSibling.classList.toggle('js-hide');
          });
      });
      // }
  })(jQuery);
  
  (function ($) {
      var winScrollTop;
  
      function getVars() {
          winScrollTop = $(window).scrollTop();
      }
  
      function parallaxInitItems() {
          $(".js-parallax").each(function () {
              var item = $(this);
              var initTransformValue = item.css('transform');
              var initPosX;
              var initPosY;
  
              if (initTransformValue != 'none' && initTransformValue != '' && initTransformValue != null) {
                  var initTransformValueString = item.css('transform').replace('(', '').replace(')', '').replace(' ', '').replace('matrix3d', '');;
                  initPosX = parseFloat(initTransformValueString.split(',')[4]);
                  initPosY = parseFloat(initTransformValueString.split(',')[5]);
              } else {
                  initPosX = 0;
                  initPosY = 0;
              }
              item.attr('x', initPosX).attr('y', initPosY);
              $(this).parent().css({ 'transform': 'perspective(200px)', 'perspective-origin': 'center center', 'transform-style': 'preserve-3d' })
          });
      }
  
      function parallaxMoveItems() {
          $(".js-parallax").each(function () {
              // console.log($(this));
              var item = $(this);
              var getPosX = (item.attr('x'))
                  ? parseFloat(item.attr('x'))
                  : 0;
              var getPosY = (item.attr('y'))
                  ? parseFloat(item.attr('y'))
                  : 0;
              var getPosZ = (item.attr('pz'))
                  ? parseFloat(item.attr('pz'))
                  : 0;
              var getDistance = (item.attr('pd'))
                  ? parseFloat(item.attr('pd'))
                  : 1;
              var parallaxMove = .05 * getDistance;
              var eWindowTop = (($(this).offset().top) - winScrollTop) + ($(this).height() / 2);
              var eWindowLeft = (($(this).offset().left)) + ($(this).width() / 2);
              var mouseDistanceY_to_elem = event.clientY - eWindowTop;
              var mouseDistanceX_to_elem = event.clientX - eWindowLeft;
  
              //Calc final position
              var newPosX = (getPosX) + (mouseDistanceX_to_elem * parallaxMove);
              var newPosY = getPosY + (mouseDistanceY_to_elem * parallaxMove);
              //console.log(mouseDistanceX_to_elem, getDistance);
              item.css('transform', 'translate3d(' + newPosX + 'px,' + newPosY + 'px,' + (
                  getPosZ * 10) + 'px)  ');
          });
      }
  
      $(document).ready(function () {
          getVars();
          parallaxInitItems();
      });
  
      $(window).on('load', function () {
          getVars();
      });
  
      $(window).scroll(function () {
          getVars();
      });
  
      $(window).resize(function () {
          getVars();
      });
  
      $(document).mousemove(function (event) {
          parallaxMoveItems();
      });
  })(jQuery);
  
  (function ($) {
      $(".s7reasons__item").on("click", function () {
          var toClose = false;
          if ($(this).attr('class').indexOf("js-s7reasons-open") < 0) {
              toClose = true;
          }
          $(".s7reasons__item").removeClass('js-s7reasons-open');
          $(".s7reasons__item").find('.s7reasons__overflow ').css('height', '');
  
          if (toClose) {
              $(this).addClass('js-s7reasons-open');
              $(this).find('.s7reasons__overflow ').css('height', $(this).find('.s7reasons__content').outerHeight(true) + 'px');
          }
      });
  
      /* end */
  
  })(jQuery);
  
  (function($) {
  
      function scrollToAnchor(dest) {
          var scrollDest = $(dest).offset().top;
          $('body, html').animate({
              scrollTop: scrollDest - 100
          }, '500', 'swing');
      }
  
      $("body").on("click", "[href^='#']", function(event) {
          event.preventDefault();
          scrollToAnchor($(this).attr('href'))
      });
      if (location.hash) {
          setTimeout(function() {
              window.scrollTo(0, 0);
          }, 1);
      }
  
      var url = window.location.href;
      var parsed_by_id_url = url.split('#');
      const remove_first = parsed_by_id_url.shift()
  
      if (parsed_by_id_url && parsed_by_id_url.length) {
  
          $(window).on('load', function() {
              setTimeout(function() {
                  scrollToAnchor($('#' + parsed_by_id_url[0]))
              }, 100);
          });
      }
  
  })(jQuery);
  
  
  (function ($) {
    // var initHeight; 
    var initScrollPos = $(window).scrollTop();
  
  
    function remove_on_scroll() {
      $(".js-remove-on-scroll").each(function (index) {
        var scrollmove = Math.abs(initScrollPos - $(window).scrollTop());
        if (!$(this).hasClass('do-hide') && scrollmove > $(window).height() / 2) {
          $(this).addClass('do-hide');
        }
        else if ($(window).scrollTop() < 10) {
          $(this).removeClass('do-hide');
        }
  
      })
    }
  
    $(window).scroll(function () {
      remove_on_scroll();
    });
  
  })(jQuery);
  
  // HTML Template: //////////////////////////////
  //  <parent class="js-scroll-fix-container">
  //    <element class="js-scroll-fix"></element>
  //    Rest of content...
  //  </parent>
  ////////////////////////////////////////////////
  const parents = document.querySelectorAll(".js-scroll-fix-container");
  let menuHeight = document.querySelector("header").offsetHeight;
  let placeholder = document.createElement("div");
  
  function makeItScrollFix(parent, element) {
    let scrollLimit = parent.offsetTop - window.scrollY - menuHeight;
  
    // Detect if parent container enter the given limit. IF yes, make element scroll-fixed
    if (scrollLimit > 0) {
      element.style.position = "";
      placeholder.style.display = "none";
      element.style.top = "";
      element.style.left = "";
      isScrollFixed = false;
    } else if (scrollLimit <= 0) {
      element.style.position = "fixed";
      placeholder.style.display = "block";
      element.style.top = menuHeight + "px";
      element.style.left = element.offsetLeft + "px";
      element.style.zIndex = 10;
      isScrollFixed = true;
    }
  
    // If element is scroll-fixed and the parent container totally scrolled,
    // keep the element fixed on the bottom of his parent
    if (
      isScrollFixed &&
      parent.offsetTop + parent.offsetHeight - window.scrollY <=
        element.offsetTop + element.offsetHeight
    ) {
      element.style.top =
        parent.offsetTop +
        parent.offsetHeight -
        window.scrollY -
        element.offsetHeight +
        "px";
    }
  }
  
  if (parents !== null) {
    // Calculate new sizes on window resize
    window.addEventListener("resize", function () {
      menuHeight = document.querySelector("header").offsetHeight;
    });
  
    for (i = 0; i < parents.length; i++) {
      const parent = parents[i];
      const element = parent.querySelector(".js-scroll-fix");
      element.style.display = "block";
      let isScrollFixed = false;
  
      element.parentNode.insertBefore(placeholder, element);
  
      window.addEventListener("DOMContentLoaded", (event) => {
        placeholder.style.width = element.offsetWidth + "px";
         placeholder.style.display = "none";
      });
      makeItScrollFix(parent, element);
  
      window.addEventListener("scroll", function () {
        makeItScrollFix(parent, element);
      });
  
      // Calculate new sizes on window resize
      window.addEventListener("resize", function () {
          // element.style.width = placeholder.offsetWidth + "px";
          // element.style.left = placeholder.offsetLeft + "px";
          // element.style.width = "";
          // element.style.left = ""
  
      });
  
      // Scroll to top of parent container if click a link inside the scroll fix element
      document.addEventListener("DOMContentLoaded", function () {
        let links = element.querySelectorAll("a");
        for (i = 0; i < links.length; i++) {
          links[i].addEventListener("click", function () {
            scroll({
              top: parent.offsetTop - menuHeight,
              behavior: "smooth",
            });
          });
        }
      });
    }
  }
  
  (function ($) {
    var selects, multiple;
  
  
      selects = document.querySelectorAll("select");
  
  
    var formhbspt = document.querySelector(".post-type-archive-partner .hbspt-form-container");
    if(formhbspt){
      selects = document.querySelectorAll("#filter select");
  
    }
  
  
    if (selects) {
      selects.forEach(function (select, i) {
        forceDisabledOptions(select);
        createCustomSelectHtml(select);
      });
    }
    if ( document.querySelector(".js-ptc:not(.ptc-filter-form)" ) ) {
      //addFilterButtonTo(".js-ptc:not(.ptc-filter-form)");
    }
  
    // // Using Hubspot Form
    // window.addEventListener("message", (event) => {
    //   if (
    //     event.data.type === "hsFormCallback" &&
    //     event.data.eventName === "onFormReady"
    //   ) {
    //     // Hubspot Form is created !
    //     let selectFields = document.querySelectorAll(
    //       ".hbspt-form form .hs-fieldtype-select"
    //     );
    //     if (selectFields) {
    //       for (let i = 0; i < selectFields.length; i++) {
    //         const select = selectFields[i].querySelector("select");
    //         if (select.multiple) {
    //           forceDisabledOptions(select);
    //           createCustomSelectHtml(select);
    //         }
    //       }
    //     }
    //   }
    // });
  
    //
    function forceDisabledOptions(select) {
      var selectOptions = select.options;
      //Loop through these options using a for loop.
      for (var opt, j = 0; (opt = selectOptions[j]); j++) {
        let value = opt.value;
        if (value.startsWith("__")) {
          opt.disabled = true;
          opt.innerHTML = value.replace("__", "");
          opt.value = value.replace("__", "");
        }
      }
    }
    function createCustomSelectHtml(select) {
      var listItem;
      var optionLength = select.length;
      var multiple = select.multiple; // true or false
  
      var div = document.createElement("div");
      var label = "";
  
      // generate select div
      div.setAttribute("class", "js-ptc-select");
  
      if (multiple) {
        div.setAttribute("data-type", "multiple");
      }
  
      select.after(div);
  
      if (select.hasChildNodes()) {
        var divWrapper = document.createElement("div");
        var list = document.createElement("ul");
        list.setAttribute("class", "js-ptc-select-list");
  
        div.appendChild(list);
  
        [].forEach.call(select, function (opt, i) {
          // generate label by using the disabled option text
          if (i == 0 && opt.disabled == true) {
            label = document.createElement("label");
            label.setAttribute("class", "js-ptc-select-label");
            label.innerHTML = opt.innerText;
  
            label.addEventListener("click", openCloseSelect.bind(event, label));
            div.insertBefore(label, list);
          } else if (i == 0 && opt.value == "") {
            //generate label with first text option ex : --location
            // specific for wpcf7
            label = document.createElement("label");
            label.setAttribute("class", "js-ptc-select-label");
            label.innerHTML = opt.innerText;
  
            label.addEventListener("click", openCloseSelect.bind(event, label));
            div.insertBefore(label, list);
          } else if (i == 0 && opt.value != "") {
            // generate label with default text
            // specific for wpcf7
            label = document.createElement("label");
            label.setAttribute("class", "js-ptc-select-label");
            label.innerHTML = "Add a location";
  
            label.addEventListener("click", openCloseSelect.bind(event, label));
            div.insertBefore(label, list);
  
            // add to the list item
            listItem = document.createElement("li");
            listItem.setAttribute("data-v", opt.value);
            listItem.innerHTML = opt.innerText;
            listItem.addEventListener("click", handleSelection.bind(event, opt));
            list.appendChild(listItem);
  
            if (opt.selected === true) {
              listItem.setAttribute(
                "class",
                "js-ptc-select-list-item js-ptc-select-list-item-selected"
              );
              handlePuce(opt.value, opt.innerText);
            } else {
              listItem.setAttribute("class", "js-ptc-select-list-item");
            }
          } else if (opt.innerText) {
            // if option has value
  
            listItem = document.createElement("li");
            listItem.setAttribute("data-v", opt.value);
            listItem.innerHTML = opt.innerText;
  
            //check if option have selected  attribute
            if (opt.selected === true) {
              listItem.setAttribute(
                "class",
                "js-ptc-select-list-item js-ptc-select-list-item-selected"
              );
              handlePuce(opt.value, opt.innerText);
            } else {
              listItem.setAttribute("class", "js-ptc-select-list-item");
            }
  
            // add eventListener before to add in DOM
            listItem.addEventListener("click", handleSelection.bind(event, opt));
  
            // add lists to DOM
            list.appendChild(listItem);
          }
        });
      }
    }
  
    /* handel selection start */
    function handleSelection(opt) {
      if (opt) {
        event.stopPropagation();
        event.target.classList.toggle("js-ptc-select-list-item-selected");
        //target select before on same level
        var s = opt.closest("select");
        var l = event.target.parentNode.parentNode.querySelector("label"); // label
        var o = s.querySelector('option[value="' + opt.value + '"]');
        var a = event.target.dataset.v;
        var t = event.target.textContent;
  
        if (o.selected == true) {
          o.selected = false;
          handlePuce(a, t, false);
        } else {
          o.selected = true;
          handlePuce(a, t, true);
        }
        var evt = new Event("change");
        s.dispatchEvent(evt);
        toggleClearButton();
      } else {
        var filters = document.querySelector(".ptc-filter-form");
        var s = filters.querySelectorAll("select");
        var listItems = filters.querySelectorAll(".js-ptc-select-list-item");
  
        for (let i = 0; i < s.length; i++) {
          var select = s[i];
          var o = select.querySelectorAll("option");
          for (let i = 0; i < o.length; i++) {
            var opt = o[i];
            opt.selected = false;
          }
  
          var evt = new Event("change");
          select.dispatchEvent(evt);
        }
  
        for (var i = 0; i < listItems.length; i++) {
          listItems[i].classList.remove("js-ptc-select-list-item-selected");
          handlePuce(listItems[i].dataset.v, listItems[i].textContent, false);
        }
  
        toggleClearButton();
      }
      // attach and event to be used in ajax jobs ptc website
  
      /*
          if (l.children.length) {
              var span = l.querySelector('span');
          } else {
              var $span = document.createElement("span");
              var span = l.appendChild($span);
          }
  
          var nth = "(" + (
          s.selectedOptions.length - 1) + ")";
          span.textContent = nth;
  
          */
    }
  
    function toggleClearButton() {
      var puceCount = $(".ptc-filter-form").parent().find(".js-ptc-select-puce")
        .length;
      var btnClear =
        '<span id="clearFilters"class="js-ptc-select-clear">Clear</span>';
      $(".ptc-filter-form").parent().find(".js-ptc-select-clear").remove();
  
      if (puceCount > 1) {
        $(".ptc-filter-form").parent().append(btnClear);
      }
      var btnClearElement = document.querySelector("#clearFilters"); // select > options
      if (btnClearElement) {
        btnClearElement.addEventListener("click", function (e) {
          removeAllFilters();
        });
      }
    }
  
    function removeAllFilters() {
      handleSelection();
    }
  
    /* open and close select */
    function openCloseSelect(label) {
      if (label) {
        if (!label.parentNode.classList.contains("is-active")) {
          $(".js-ptc-select").removeClass("is-active");
          $(".js-ptc-select-list").removeClass("js-ptc-select-show");
          label.parentNode.classList.add("is-active");
          label.nextSibling.classList.add("js-ptc-select-show");
        } else {
          $(".js-ptc-select").removeClass("is-active");
          $(".js-ptc-select-list").removeClass("js-ptc-select-show");
        }
      }
    }
  
    // add or remove puce
    function handlePuce(attribute, text, add = true) {
      // create a puce for every selected item
      if (add == true) {
        var puce = document.createElement("span");
        puce.setAttribute("class", "js-ptc-select-puce");
        puce.setAttribute("id", attribute);
        puce.textContent = text;
  
        puce.addEventListener("click", function (e) {
          var toRemove = document.querySelector(
            'option[value="' + this.id + '"]'
          ); // select > options
          document
            .querySelector('li[data-v="' + this.id + '"]')
            .classList.toggle("js-ptc-select-list-item-selected"); // ul > li
          toRemove.selected = false; // remove selected option
          var se = document
            .querySelector('option[value="' + attribute + '"]')
            .closest("select");
          var evt = new Event("change");
          se.dispatchEvent(evt);
  
          this.remove(); // delete current puce
          toggleClearButton();
        });
        if (document.querySelectorAll(".wpcf7").length) {
          if (event) {
            var x =
              event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
            x.querySelector(".js-filter").appendChild(puce);
          } else {
            document.querySelector(".js-filter").appendChild(puce);
          }
        }/* else if (document.querySelectorAll(".hbspt-form").length) {
          // do nothing
        }*/ else {
          document.querySelector(".js-filter").appendChild(puce);
        }
      } else {
        var target = document.querySelector("#" + attribute);
        if (target) {
          target.parentNode.removeChild(target);
        }
      }
    }
  
    // if click everywhere else
    window.addEventListener("click", function (event) {
      if (event.target.className !== "js-ptc-select-label") {
        var elements = document.querySelectorAll(".js-ptc-select");
  
        elements.forEach(function (el, i) {
          var t = el.addEventListener("click", function (e) {
            this.contains(e.target);
          });
        });
  
        if (typeof t == "undefined") {
          var closeAll = document.querySelectorAll(".js-ptc-select-list");
          closeAll.forEach(function (el) {
            el.classList.remove("js-ptc-select-show");
            el.parentNode.classList.remove("is-active");
          });
        }
      }
    });
  
    function addFilterButtonTo(el) {
      var button = document.createElement("button");
      button.setAttribute("class", "js-ptc-select-button btn btn--secondary");
      button.textContent = "Filter";
  
      var form = document.querySelector(el);
      form.appendChild(button);
    }
  
    /* handle selection end */
  })(jQuery);
  
  (function ($) {
  
      var slider = $(".slider-1__container");
  
      var nav = [];
      var ico = [];
      var slug = [];
  
      // get title from data-label to generate de navigation
  
      $label = document.querySelectorAll('[data-label]');
  
      $label.forEach(function (i, el, x) {
          nav.push(i.dataset.label);
          ico.push(i.dataset.icon);
          slug.push(i.dataset.slug);
      });
  
      slider.slick({
          dots: true,
          infinite: false,
          vertical: false,
          arrows: false,
          customPaging: function (slider, i) {
              var thumb = $(slider.$slides[i]).data();
  
              return '<a id="' + slug[i] + '">' + '<img class="style-svg" width="60" src="' + ico[i] + '" />' + nav[i] + '</a>';
          },
  
          appendDots: $(".slider-1__nav"),
          adaptiveHeight: true,
          speed: 500,
          fade: true,
          cssEase: 'linear',
          responsive: [
              {
                  breakpoint: 1000,
                  settings: {
                      fade: false,
  
                  }
              }
          ]
      });
  
      // On wheel sur la section du slider
  
      // slider.on('wheel', handler);
  
      function handler(e) {
          e.preventDefault();
  
          if (e.originalEvent.deltaY < 0) {
              $(this).slick('slickPrev');
  
          } else {
              $(this).slick('slickNext');
  
          }
  
          if (e.originalEvent.deltaY < 0 && $(this).slick('slickCurrentSlide') == 0) {
              $(this).off("wheel");
          } else { }
      }
  
      $(window).on('load', function () {
          var url = window.location.href;
  
          if (url.split('#')[1] == 'services-ptc' && url.split('#')[2].length) {
              $('#' + url.split('#')[2]).trigger("click");
          }
      });
  })(jQuery);
  
  (function($) {
  
      var slider = $(".slider-2__container");
  
      var nav = [];
  
      // get title from data-label to generate de navigation
  
      $label = document.querySelectorAll('[data-label]');
  
      $label.forEach(function(i, el, x) {
          nav.push(i.dataset.label)
      });
  
      slider.slick({
          dots: true,
          infinite: false,
          vertical: false,
  
          arrows: false,
          customPaging: function(slider, i) {
              var thumb = $(slider.$slides[i]).data();
  
              return '<a>' + nav[i] + '</a>';
          },
  
          appendDots: $(".slider-2__nav"),
          adaptiveHeight: true,
          speed: 500,
          fade: true,
          cssEase: 'linear'
      });
  
      // On wheel sur la section du slider
  
      // slider.on('wheel', handler);
  
      function handler(e) {
          e.preventDefault();
  
          if (e.originalEvent.deltaY < 0) {
              $(this).slick('slickPrev');
  
          } else {
              $(this).slick('slickNext');
  
          }
  
          if (e.originalEvent.deltaY < 0 && $(this).slick('slickCurrentSlide') == 0) {
              $(this).off("wheel");
          } else {}
      }
  
  })(jQuery);
  
  (function ($) {
  
      var slider = $(".slider-3__container");
  
      var nav = [];
  
      // get title from data-label to generate de navigation
  
      $label = document.querySelectorAll('[data-label]');
  
      $label.forEach(function (i, el, x) {
          nav.push(i.dataset.label)
      });
  
  
      constructSlider();
  
      window.addEventListener("resize", function(){
          if (window.matchMedia('(min-width: 1200px)').matches) {
              if(slider.slick('getSlick').unslicked) {
                  constructSlider();
              }
          } 
      });
  
      function constructSlider() {
          slider.slick({
              dots: true,
              infinite: false,
              vertical: false,
      
              arrows: false,
              customPaging: function (slider, i) {
                  var thumb = $(slider.$slides[i]).data();
      
                  return '<a>' + nav[i] + '</a>';
              },
      
              appendDots: $(".slider-3__nav"),
              adaptiveHeight: true,
              speed: 500,
              fade: true,
              cssEase: 'linear',
              swipe: false,
              responsive: [
                  {
                      breakpoint: 1200,
                      settings: "unslick"
                  }
              ]
          });
  
      }
  
      function handler(e) {
          e.preventDefault();
  
          if (e.originalEvent.deltaY < 0) {
              $(this).slick('slickPrev');
  
          } else {
              $(this).slick('slickNext');
  
          }
  
          if (e.originalEvent.deltaY < 0 && $(this).slick('slickCurrentSlide') == 0) {
              $(this).off("wheel");
          } else { }
      }
  
  })(jQuery);
  
  (function ($) {
  
      if ($("#articlesSlider")) {
  
          var a1 = $("#articlesSlider .js-slider-articles.s1 ");
          var a2 = $("#articlesSlider .js-slider-articles.s2 ");
  
          //	console.log('slider 1', a1);
          //	console.log('slider 2', a2);
  
          a1.slick({
              dots: false,
              arrows: false,
              // infinite: false,
              centerMode: false,
              speed: 300,
              slidesToShow: 2,
              // initialSlide: 1,
              mobileFirst: false,
              swipe: false,
              responsive: [
                  {
                      breakpoint: 1500,
                      settings: {
                          swipe: true,
                      }
                  },
                  {
                      breakpoint: 900,
                      settings: {
                          slidesToShow: 1.3,
                          swipe: true,
                          initialSlide: 1,
                          infinite: false
  
                      }
                  }
              ]
          });
  
          a2.slick({
              dots: false,
              arrows: false,
              // infinite: false,
              speed: 300,
              slidesToShow: 1,
              variableWidth: true,
              initialSlide: 2,
              mobileFirst: false,
              swipe: false,
              responsive: [
                  {
                      breakpoint: 720,
                      settings: "unslick"
                  }
              ]
          });
  
          $('.js-articles-next').on('click', function (e, slick, currentSlide) {
              e.preventDefault();
              a1.slick('slickPrev');
              a2.slick('slickPrev');
  
          });
  
          $('.js-articles-prev').on('click', function (e, slick, currentSlide) {
              e.preventDefault();
              a1.slick('slickNext');
              a2.slick('slickNext');
  
          });
  
      }
  })(jQuery);
  
  (function ($) {
  
      if ($("#cardlistSlider")) {
  
          var cls = $("#cardlistSlider .js-slider-card-list ");
  
  
          //	console.log('slider 1', a1);
          //	console.log('slider 2', a2);
  
          cls.slick({
              dots: false,
              arrows: false,
              // infinite: false,
          //	centerMode: true,
              centerPadding: '80px',
              speed: 300,
              slidesToShow: 3,
              // initialSlide: 1,
              mobileFirst: false,
              swipe: false,
              responsive: [
                  {
                      breakpoint: 1500,
                      settings: {
                          swipe: true,
                      }
                  },
                  {
                      breakpoint: 1300,
                      settings: {
                          slidesToShow: 2.2,
                          swipe: true,
                          // initialSlide: 1, 
                          infinite: false
  
                      }
                  },
                  {
                      breakpoint: 900,
                      settings: {
                          slidesToShow: 1.3,
                          swipe: true,
                          // initialSlide: 1,
                          infinite: false
  
                      }
                  },
                  {
                      breakpoint: 700,
                      settings: {
                          slidesToShow: 1.1,
                          swipe: true,
                          // initialSlide: 1,
                          infinite: false
  
                      }
                  }
              ]
          });
  
  
  
          $('.js-cardlist-next').on('click', function (e, slick, currentSlide) {
              e.preventDefault();
              cls.slick('slickPrev');
  
  
          });
  
          $('.js-cardlist-prev').on('click', function (e, slick, currentSlide) {
              e.preventDefault();
              cls.slick('slickNext');
  
  
          });
  
      }
  })(jQuery);
  
  (function ($) {
      if ($(".js-slider-career")) {
          var career = $(".js-slider-career ");
  
          career.slick({
              dots: true,
              arrows: false,
              infinite: false,
              vertical: true,
              autoplay: true,
              appendDots: '.js-slider-dots',
              responsive: [
                  {
                      breakpoint: 900,
                      settings: {
                          vertical: false,
  
                      }
                  }
              ]
          });
  
      }
  
  })(jQuery);
  
  (function ($) {
    if ($(".logos__slider")) {
      var logos = $(".logos__slider");
  
      logos.slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        nextArrow:
          '<div class="logos__slider-arrow slider-arrow--next"><svg class="svg-use svg--arrow"><use xlink:href="#icon-arrow-right"></use></svg></div>',
        prevArrow:
          '<div class="logos__slider-arrow slider-arrow--prev"><svg class="svg-use svg--arrow"><use xlink:href="#icon-arrow-left"></use></svg></div>',
        responsive: [
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      });
    }
  })(jQuery);
  
  
  
  const mediaQuery = window.matchMedia('(max-width: 1199px)');
  
  if(document.querySelector('.slider-3')){
  
    const slider = document.querySelector('.slider-3');
    const sliderAccordionTrigger = slider.querySelectorAll('.slider-3__label')
    let isAccordionActive = false;
    let extensionSize = 0;
    
    for (let i = 0; i < sliderAccordionTrigger.length; i++) {
      const accordion = sliderAccordionTrigger[i];
      const overflow = accordion.parentNode.querySelector('.slider-3__accordion');
      accordion.addEventListener('click', function(){
        if (mediaQuery.matches) {
          let reference = accordion;
          for (let i = 0; i < sliderAccordionTrigger.length; i++) {
            const accordion = sliderAccordionTrigger[i];
            if (reference != accordion) {
              closeAccordion(accordion);
            }
          }
          if (!accordion.classList.contains('is-active')) {
            openAccordion(accordion);
          } 
          else {
            closeAccordion(accordion);
          }
         } 
        //  else {
        //   for (let i = 0; i < sliderAccordionTrigger.length; i++) {
        //     const accordion = sliderAccordionTrigger[i];
        //     if (accordion.classList.contains('is-active')) {
        //       closeAccordion(accordion);
        //     }
        //   }
        //  }
      })
    }
    window.addEventListener("resize", function () {
      for (let i = 0; i < sliderAccordionTrigger.length; i++) {
        const accordion = sliderAccordionTrigger[i];
        if (mediaQuery.matches) {
          if (accordion.classList.contains("is-active")) {
            const overflow = accordion.parentNode.querySelector(
              ".slider-3__accordion"
            );
            overflow.style.height =
              overflow.querySelector(".slider-3__content").offsetHeight +
              "px";
          }
        }
      }
    });
  
  }
  
  
  
  
  function openAccordion(item) {
    const overflow = item.parentNode.querySelector('.slider-3__accordion');
    extensionSize = overflow.querySelector('.slider-3__content').offsetHeight;
    item.classList.add('is-active');
    overflow.style.height= overflow.querySelector('.slider-3__content').offsetHeight + 'px';
    isAccordionActive = true;
    setTimeout(() => {
    window.scroll({
      top: item.getBoundingClientRect().top + window.scrollY - document.querySelector('header').offsetHeight, 
      left: 0, 
      behavior: 'smooth' 
    });
    }, 480);
  }
  
  function closeAccordion(item) {
    const overflow = item.parentNode.querySelector('.slider-3__accordion');
  
    item.classList.remove('is-active');
    overflow.style.height= '';
    isAccordionActive = false;
  }
  
  
  
  
  (function($) {
  
      var slider = $(".slider-radius__list");
  
      var nav = [];
  
      // get title from data-label to generate de navigation
  
      $label = document.querySelectorAll('.slider-radius__list [data-label]');
  
      $label.forEach(function(i, el, x) {
          nav.push(i.dataset.label)
      });
  
      slider.slick({
          dots: true, infinite: false,
          // vertical:false,
  
          // arrows:false,
          customPaging: function(slider, i) {
              var thumb = $(slider.$slides[i]).data();
              return '<a>' + nav[i] + '</a>';
          },
  
          appendDots: $(".slider-radius__nav"),
          adaptiveHeight: true,
          speed: 500,
          fade: true,
          cssEase: 'linear'
      });
  
      // On wheel sur la section du slider
  
      // slider.on('wheel', handler);
  
      function handler(e) {
          e.preventDefault();
  
          if (e.originalEvent.deltaY < 0) {
              $(this).slick('slickPrev');
  
          } else {
              $(this).slick('slickNext');
  
          }
  
          if (e.originalEvent.deltaY < 0 && $(this).slick('slickCurrentSlide') == 0) {
              $(this).off("wheel");
          } else {}
      }
  
      var items = document.querySelectorAll('.slider-radius__nav li');
      //var step = 360/items.length;   amount to add to theta each time (degrees)
      var step = (Math.PI) / items.length;
      var r = 150;
      var theta = -1; // slice angle that will be increased each loop;
      var arr = [];
      items.forEach(function(item, i) {
  
          var x = Math.round(0.5 * r * Math.cos(theta));
          var y = Math.round(r * Math.sin(theta));
          arr.push([x, y]);
  
          item.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
          item.setAttribute('data-posx', x);
          item.setAttribute('data-posy', y);
          item.setAttribute('indx', i);
  
          theta += step;
  
      });
  
  })(jQuery);
  
  (function ($) {
  
      if ($(".js-slider-service")) {
  
          var career1 = $(".slider-service__list");
          // var career1 = $(".js-slider-service.s1 ");
          // var career2 = $(".js-slider-service.s2 ");
  
          career1.slick({
              dots: false,
              arrows: true,
              infinite: false,
              speed: 300,
              slidesToShow: 1,
              variableWidth: true,
              responsive: [
                  {
                      breakpoint: 1100,
                      settings: {
                          adaptiveHeight: true,
                          slidesToShow: 2,
                          slidesToScroll: 1,
                          variableWidth: false,
  
                      }
                  },
                  {
                      breakpoint: 700,
                      settings: {
                          adaptiveHeight: true,
                          slidesToShow: 1.1,
                          slidesToScroll: 1,
                          variableWidth: false,
  
  
                      }
                  }
              ]
          });
  
          $('.js-next').on('click', function (e) {
              e.preventDefault();
              career1.slick('slickNext');
  
          });
  
          $('.js-prev').on('click', function (e) {
              e.preventDefault();
              career1.slick('slickPrev');
  
          });
  
      }
  
  })(jQuery);
  
  (function ($) {
  
      function detectDisabledSliderArrows(slider) {
          var ghostNext = slider.parent().find('.js-next');
          var ghostPrev = slider.parent().find('.js-prev');
          var arrowNext = slider.find('.slick-next');
          var arrowPrev = slider.find('.slick-prev');
  
          if (arrowPrev.hasClass('slick-disabled')) {
              ghostPrev.addClass('is-disabled');
          }
          else {
              ghostPrev.removeClass('is-disabled');
          }
  
          if (arrowNext.hasClass('slick-disabled')) {
              ghostNext.addClass('is-disabled');
          }
          else {
              ghostNext.removeClass('is-disabled');
          }
      }
  
      if ($(".sub-slider").length) {
  
          $(".sub-slider ").each(function () {
              var slider = $(this);
              slider.on('init', function (event, slick, direction) {
                  detectDisabledSliderArrows(slider);
              });
  
              slider.slick({
                  dots: false,
                  arrows: true,
                  infinite: false,
                  speed: 300,
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  variableWidth: true,
                  adaptiveHeight: true,
  
                  responsive: [
                      {
                          breakpoint: 900,
                          settings: {
                              slidesToShow: 1,
  
                          }
                      }
                  ]
              });
  
  
  
              slider.parent().find('.js-next').on('click', function (e) {
                  var arrowNext = slider.find('.slick-next');
                  e.preventDefault();
                  arrowNext.trigger("click");
                  detectDisabledSliderArrows(slider);
  
              });
  
              slider.parent().find('.js-prev').on('click', function (e) {
                  var arrowPrev = slider.find('.slick-prev');
                  e.preventDefault();
                  arrowPrev.trigger("click");
                  detectDisabledSliderArrows(slider);
              });
          });
  
  
  
          // sub.on('edge', function (event, slick, direction) {
          // 	console.log('edge was hit')
          // });
  
          // sub.on('afterChange', function (event, slick, currentSlide, nextSlide) {
          // 	console.log('change');
          // 	console.log(currentSlide, slick.slideCount);
          // 	if (currentSlide == slick.slideCount) {
          // 		$(this).find('.js-next').addClass('is-disabled');
          // 		console.log('end');
  
          // 	}
          // 	else if (currentSlide < slick.slideCount && currentSlide > 0) {
          // 		$(this).find('.js-next').removeClass('is-disabled');
          // 		$(this).find('.js-next').removeClass('is-disabled');
          // 	}
          // 	else if (currentSlide == 0) {
          // 		$(this).find('.js-prev').addClass('is-disabled');
          // 		console.log('start');
  
          // 	}
          // });
  
          // sub.find('.js-next').on('click', function (e) {
          // 	console.log('cli');
          // 	e.preventDefault();
          // 	sub.find('slick-next').trigger("click");
  
          // });
  
          // sub.find('.js-prev').on('click', function (e) {
          // 	console.log('cli');
          // 	e.preventDefault();
          // 	sub.find('slick-prev').trigger("click");
  
          // });
  
      }
  
  })(jQuery);
  
  (function ($) {
  
      if ($("#useCaseSlider")) {
  
          var uc1 = $("#useCaseSlider .js-slider-articles--usecase.s1 ");
          var uc2 = $("#useCaseSlider .js-slider-articles--usecase.s2 ");
  
          uc1.slick({
              dots: false,
              arrows: false,
              // infinite: false,
              centerMode: false,
              speed: 300,
              slidesToShow: 1,
              // initialSlide: 1,
              mobileFirst: false,
              swipe: false,
              responsive: [
                  {
                      breakpoint: 1500,
                      settings: {
                          swipe: true,
                      }
                  },
                  {
                      breakpoint: 900,
                      settings: {
                          slidesToShow: 1.3,
                          swipe: true,
                          initialSlide: 1,
                          infinite: false
  
                      }
                  }
              ]
          });
  
          uc2.slick({
              dots: false,
              arrows: false,
              // infinite: false,
              speed: 300,
              slidesToShow: 1,
              variableWidth: true,
              initialSlide: 1,
              mobileFirst: false,
              swipe: false,
              responsive: [
                  {
                      breakpoint: 720,
                      settings: "unslick"
                  }
              ]
          });
  
          $('.js-usecases-next').on('click', function (e, slick, currentSlide) {
              e.preventDefault();
              uc1.slick('slickPrev');
              uc2.slick('slickPrev');
          });
  
          $('.js-usecases-prev').on('click', function (e, slick, currentSlide) {
              e.preventDefault();
              uc1.slick('slickNext');
              uc2.slick('slickNext');
  
          });
  
          //   uc1.on('beforeChange', function(event, slick, currentSlide, nextSlide){
          //     uc2.slick('slickGoTo', currentSlide + 1);
  
          //   });
  
      }
  
  })(jQuery);
  
  // (function($) {
  //
  // 	var slider = $(".wp-block-gallery .blocks-gallery-grid");
  //
  // 	$('.wp-block-gallery .blocks-gallery-grid').slick(
  //
  //   );
  //
  // })(jQuery);
  (function ($) {
   
      function initSolutionAccordion(item, index) { 
        var btn = item.find('.js-solution-accordion-btn')
  
        btn.click(function () {
            toggleSolutionAccordions(item, index);
        })
      }
  
  
      function toggleSolutionAccordions(item, index) {
          $(".js-solution-accordion").each(function (i) {
              if(i !== index) {
                  switchSolutionAccordion($(this), 0);
              }
              else {
                  switchSolutionAccordion($(this), 1);
              }
            });
  
            setTimeout(() => {
              console.log(item.position().top, item.offset().top);
  
              window.scroll({
                top: item.offset().top - (document.querySelector('header').offsetHeight * 2), 
                left: 0, 
                behavior: 'smooth' 
              });
              console.log('change scroll pos');
              }, 600);
      }
    
      function switchSolutionAccordion(item, indexToActive = 0) {
          var overflows = item.find('.js-solution-accordion-overflow');
          overflows.each(function( i ) {
              var $this = $(this);
              var h = $(this).find('.js-solution-accordion-inner').outerHeight(true);
              $(this).css("height", h +"px" );
  
              if(i == indexToActive) {
                  $(this).addClass('is-active');
              }
              else {
                  setTimeout(function(){
                      $this.css("height", '0px' );
                      $this.removeClass('is-active');
                  }, 100)
              }
              setTimeout(function(){
                  $this.css("height", '' );
              }, 800)          
            });
      }
    
  
      $(".js-solution-accordion").each(function (i) {
        initSolutionAccordion($(this), i);
      });
    
   
    })(jQuery);
    
  (function($) {
  
      //TEMPLATE HTML
      /*
      <div class="video-card">
      <div class="js-player">
      <iframe
          src="https://player.vimeo.com/video/56282283?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media"
          allowfullscreen
          allowtransparency
          allow="autoplay"
      ></iframe>
      </div>
      </div>
      */
  
      //END TEMPLATE HTML
  
      const players = Plyr.setup('.js-player', {
          controls: ['play-large'],
          // muted: true,
          vimeo: {
              // muted: true
          }
      });
  
      const wp_content_players = Plyr.setup('.wp-block-embed__wrapper', {
          controls: [
              'play-large',
              'progress',
              'current-time',
              'mute',
              'volume',
              'fullscreen'
          ],
          muted: false,
          vimeo: {
              muted: false
          }
      });
  
      $.fn.isVideoVisible = function() {
          var elementTop = this.offset().top;
          var elementBottom = elementTop + this.outerHeight();
          var elementCenter = elementTop + (this.outerHeight() / 2);
  
          var viewportTop = $(window).scrollTop();
          var viewportBottom = viewportTop + $(window).height();
          var limit = $(window).height() * 0.49;
          return elementCenter > viewportTop && elementCenter < viewportBottom;
      };
  
      // function auto_play_videos(item, index = 0) {
      //   var index = $('.video-card .plyr').index(item.find('.plyr'));
  
      // 	if (item.isVideoVisible()) {
      // 		if (!item.hasClass('is-playing')) {
      // 			players[index].play();
      // 		}
      // 	} else {
      // 		if (item.hasClass('is-playing')) {
      // 			players[index].pause();
      // 		}
      // 	}
      // }
  
      if ($('.video-card').length) {
          $('.video-card').append('<div class="video-card__full"></div>')
  
          $(window).on('resize scroll', function() {
              $('.video-card').each(function(index) {
                  // auto_play_videos($(this), index);
              });
          });
  
          $(window).on('load', function() {
              $('.video-card').each(function(index) {
  
                  players[index].on('play', event => {
                      $(this).addClass('is-playing');
                  });
  
                  players[index].on('pause', event => {
                      $(this).removeClass('is-playing');
                  });
  
                  players[index].on('enterfullscreen', event => {
                      // console.log('fillscr');
                  });
              });
          });
  
      }
  
      if ($('.wp-block-embed.is-type-video').length) {
          $('.wp-block-embed.is-type-video').each(function(index) {
              wp_content_players[index].on('play', event => {
                  $(this).muted = false;
                  $(this).volume = 1;
                  $(this).controls = ['play-large', 'play', 'volume', 'fullscreen', 'progress'];
              });
  
          });
      }
  
      //Fullscreen video:
      $(".video-card__full").on("click", function() {
          var indexVideo = $('.video-card .plyr').index($(this).parent().find('.plyr'));
          players[indexVideo].fullscreen.enter();
          players[indexVideo].controls = ['play-large', 'play', 'volume', 'fullscreen', 'progress'];
  
      });
  
  })(jQuery);
  
  (function ($) {
    $(".wp-block-gallery").append("<div class='wp-block-gallery__nav'></div>");;
    $(".wp-block-gallery").each(function (index) {
      var item = $(this);
      // console.log(index);
      $(this).find('.blocks-gallery-grid, .wp-block-gallery__nav').attr('index', index);
      $(this).find('.blocks-gallery-item').each(function () {
        item.find('.wp-block-gallery__nav').append($(this).clone());
      });
  
      $(this).find('.blocks-gallery-grid[index=' + index + ']').slick({
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        easing: 'linear',
        pauseOnHover: false,
        pauseOnHover: false,
        asNavFor: '.wp-block-gallery__nav[index=' + index + ']'
      });
  
  
      $(this).find('.wp-block-gallery__nav[index=' + index + ']').slick({
        infinite: true,
        autoplay: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows: false,
        easing: 'linear',
        pauseOnHover: false,
        centerMode: true,
        asNavFor: '.blocks-gallery-grid[index=' + index + ']',
        responsive: [
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 5,
  
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
  
            }
          }
        ]
      });
    });
  
  
    // $('body').find(".wp-block-gallery__nav").each(function () {
    //   // $(this).on('afterChange', function (slick, currentSlide) {
    //   //   if ($(this).parent().find('.blocks-gallery-grid').length) {
    //   //     console.log(currentSlide['currentSlide']);
    //   //     $(this).parent().find('.blocks-gallery-grid').slick('slickGoTo', currentSlide['currentSlide']);
    //   //   }
    //   // });
    //   $(this).on('beforeChange', function (slick, currentSlide, nextSlide) {
    //     if ($(this).parent().find('.blocks-gallery-grid').length) {
    //       $(this).parent().find('.blocks-gallery-grid').slick('slickGoTo', nextSlide);
    //     }
    //   });
    // });
  
  })(jQuery);
  