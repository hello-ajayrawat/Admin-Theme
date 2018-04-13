"use-strict";

;(function(){

  // #GLOBAL

  function attachClickEventOnArrayItems(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].addEventListener('click', fn);
    }
  }

  function removeClassFromArrayItems(arr, cn) {
    for(var i = 0; i < arr.length; i++) {
      arr[i].classList.remove(cn);
      console.log('removed');
    }
  }


  /**
   * ------------------------------------------------------------------------
   * #NAVBAR
   * ------------------------------------------------------------------------
   */
  (function(){

    // Navbar toggle
  	var cNavbarLeftHeader = document.querySelector('.navbar-left__header'),
  			cNavbarLeftMenu = document.querySelector('.navbar-left__menu')
  			cNavbarLeftToggler = document.querySelector('.navbar-left__toggler');

    cNavbarLeftToggler.addEventListener('click', function(){
      cNavbarLeftMenu.classList.toggle('open');
      cNavbarLeftMenu.classList.toggle('stick');
    });

    // Nvaber dropdown toggle
    var cNavbarDropdowns = document.querySelectorAll('.navbar-left__menu-item.--has-dropdown');

    function cNavbarDropdownToggler(e) {
      for(var i = 0; i < cNavbarDropdowns.length; i++) {
        cNavbarDropdowns[i].classList.remove('open')
      }

      this.classList.toggle('open');
      this.querySelector('.sub-menu').classList.toggle('show');
    }

    attachClickEventOnArrayItems(cNavbarDropdowns, cNavbarDropdownToggler);
    
    // on hover navigation collapse toggle
    cNavbarLeftMenu.addEventListener('mouseover', function(){
      if(this.classList.contains('stick')) {
        return false;
      } else {
        this.classList.add('open');
      }
    });

    cNavbarLeftMenu.addEventListener('mouseout', function(){
      if(this.classList.contains('stick')) {
        return false;
      } else {
        this.classList.remove('open');
      }
    });

  })();


  /**
   * ------------------------------------------------------------------------
   * #DROPDOWN
   * ------------------------------------------------------------------------
   */
  (function(){
    var cDropdowns = document.getElementsByClassName('dropdown'),
        cDropdownTogglers = document.getElementsByClassName('dropdown-toggler'),
        cDropdownMenus = document.getElementsByClassName('dropdown-menu'),
        cDropdownItem = document.getElementsByClassName('dropdown-item');

    function dropDownMenuToggler(e) {
      for (var i = 0; i < cDropdownMenus.length; i++) {
        if (this === cDropdownTogglers[i]) {
          cDropdownMenus[i].classList.toggle('show');

          // check position of dropdown and apply position styles accordingly
          if (cDropdowns[i].classList.contains('--pos-tl')) {
            const elemProps = cDropdownTogglers[i].getBoundingClientRect();
            const elemStyle = getComputedStyle(cDropdownTogglers[i]);
            console.log(elemStyle.marginBottom);
            cDropdownMenus[i].setAttribute('style', 'position: absolute; top: 0; left: 0; transform: translate3d(' + elemProps.x + 'px, ' + (elemProps.height + cDropdownTogglers.marginTop) + 'px, 0px);');
          } else if (cDropdowns[i].classList.contains('--pos-tr')) {
            const elemProps = cDropdownMenus[i].getBoundingClientRect();
            cDropdownMenus[i].setAttribute('style', 'transform: translate3d(' + 0 + ', -' +elemProps.height + 'px, 0px); top: auto; right: 0; bottom: 0; left: auto;');
          } else if (cDropdowns[i].classList.contains('--pos-bl')) {
            const elemProps = cDropdownMenus[i].getBoundingClientRect();
            cDropdownMenus[i].setAttribute('style', 'transform: translate3d(' + 0 + ', ' +elemProps.height + 'px, 0px); top: 0; right: auto; bottom: auto; left: 0;');
          } else if (cDropdowns[i].classList.contains('--pos-br')) {
            const elemProps = cDropdownMenus[i].getBoundingClientRect();
            cDropdownMenus[i].setAttribute('style', 'transform: translate3d(' + 0 + ', ' +elemProps.height + 'px, 0px); top: 0; right: 0; bottom: auto; left: auto;');
          }
        } else {
          cDropdownMenus[i].classList.remove('show');
        }
      }
    }

    function hideDropdown() {
      this.parentNode.classList.remove('show');
    }

    attachClickEventOnArrayItems(cDropdownItem, hideDropdown);

    attachClickEventOnArrayItems(cDropdownTogglers, dropDownMenuToggler);

    // clicked outside dropdown menu handler
    function clickedOutsideDropdownMenu() {
      document.addEventListener('click', function(e){
        if (!e.target.classList.contains('dropdown-toggler')) {
          for (var i = 0; i < cDropdownMenus.length; i++) {
            cDropdownMenus[i].classList.remove('show');
          }
        }
      });
    }

    clickedOutsideDropdownMenu();
  })();


  /**
   * ------------------------------------------------------------------------
   * #ALERTS
   * ------------------------------------------------------------------------
   */

  (function(){
    var cAlerts = document.getElementsByClassName('alert'),
        cAlertCloseButtons = document.getElementsByClassName('alert-close');

    function hideAlert() {
      this.parentNode.outerHTML = "";
    }

    attachClickEventOnArrayItems(cAlertCloseButtons, hideAlert);

  })();

})();