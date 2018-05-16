/* begin begin Back to Top button  */
(function() {
  'use strict';

  function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add('back-to-top--show');
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove('back-to-top--show');
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  }

  var goTopBtn = document.querySelector('#back-to-top');

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);
})();
/* end begin Back to Top button  */

(function() {
  var Instafeed;

  Instafeed = (function() {
    function Instafeed(params, context) {
      var option, value;
      this.options = {
        target: 'instafeed',
        get: 'popular',
        resolution: 'thumbnail',
        sortBy: 'none',
        links: true,
        mock: false,
        useHttp: false
      };
      if (typeof params === 'object') {
        for (option in params) {
          value = params[option];
          this.options[option] = value;
        }
      }
      this.context = context != null ? context : this;
      this.unique = this._genKey();
    }

    Instafeed.prototype.hasNext = function() {
      return typeof this.context.nextUrl === 'string' && this.context.nextUrl.length > 0;
    };

    Instafeed.prototype.next = function() {
      if (!this.hasNext()) {
        return false;
      }
      return this.run(this.context.nextUrl);
    };

    Instafeed.prototype.run = function(url) {
      var header, instanceName, script;
      if (typeof this.options.clientId !== 'string') {
        if (typeof this.options.accessToken !== 'string') {
          throw new Error("Missing clientId or accessToken.");
        }
      }
      if (typeof this.options.accessToken !== 'string') {
        if (typeof this.options.clientId !== 'string') {
          throw new Error("Missing clientId or accessToken.");
        }
      }
      if ((this.options.before != null) && typeof this.options.before === 'function') {
        this.options.before.call(this);
      }
      if (typeof document !== "undefined" && document !== null) {
        script = document.createElement('script');
        script.id = 'instafeed-fetcher';
        script.src = url || this._buildUrl();
        header = document.getElementsByTagName('head');
        header[0].appendChild(script);
        instanceName = "instafeedCache" + this.unique;
        window[instanceName] = new Instafeed(this.options, this);
        window[instanceName].unique = this.unique;
      }
      return true;
    };

    Instafeed.prototype.parse = function(response) {
      var anchor, childNodeCount, childNodeIndex, childNodesArr, e, eMsg, fragment, header, htmlString, httpProtocol, i, image, imageObj, imageString, imageUrl, images, img, imgHeight, imgOrient, imgUrl, imgWidth, instanceName, j, k, len, len1, len2, node, parsedLimit, reverse, sortSettings, targetEl, tmpEl;
      if (typeof response !== 'object') {
        if ((this.options.error != null) && typeof this.options.error === 'function') {
          this.options.error.call(this, 'Invalid JSON data');
          return false;
        } else {
          throw new Error('Invalid JSON response');
        }
      }
      if (response.meta.code !== 200) {
        if ((this.options.error != null) && typeof this.options.error === 'function') {
          this.options.error.call(this, response.meta.error_message);
          return false;
        } else {
          throw new Error("Error from Instagram: " + response.meta.error_message);
        }
      }
      if (response.data.length === 0) {
        if ((this.options.error != null) && typeof this.options.error === 'function') {
          this.options.error.call(this, 'No images were returned from Instagram');
          return false;
        } else {
          throw new Error('No images were returned from Instagram');
        }
      }
      if ((this.options.success != null) && typeof this.options.success === 'function') {
        this.options.success.call(this, response);
      }
      this.context.nextUrl = '';
      if (response.pagination != null) {
        this.context.nextUrl = response.pagination.next_url;
      }
      if (this.options.sortBy !== 'none') {
        if (this.options.sortBy === 'random') {
          sortSettings = ['', 'random'];
        } else {
          sortSettings = this.options.sortBy.split('-');
        }
        reverse = sortSettings[0] === 'least' ? true : false;
        switch (sortSettings[1]) {
          case 'random':
            response.data.sort(function() {
              return 0.5 - Math.random();
            });
            break;
          case 'recent':
            response.data = this._sortBy(response.data, 'created_time', reverse);
            break;
          case 'liked':
            response.data = this._sortBy(response.data, 'likes.count', reverse);
            break;
          case 'commented':
            response.data = this._sortBy(response.data, 'comments.count', reverse);
            break;
          default:
            throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.");
        }
      }
      if ((typeof document !== "undefined" && document !== null) && this.options.mock === false) {
        images = response.data;
        parsedLimit = parseInt(this.options.limit, 10);
        if ((this.options.limit != null) && images.length > parsedLimit) {
          images = images.slice(0, parsedLimit);
        }
        fragment = document.createDocumentFragment();
        if ((this.options.filter != null) && typeof this.options.filter === 'function') {
          images = this._filter(images, this.options.filter);
        }
        if ((this.options.template != null) && typeof this.options.template === 'string') {
          htmlString = '';
          imageString = '';
          imgUrl = '';
          tmpEl = document.createElement('div');
          for (i = 0, len = images.length; i < len; i++) {
            image = images[i];
            imageObj = image.images[this.options.resolution];
            if (typeof imageObj !== 'object') {
              eMsg = "No image found for resolution: " + this.options.resolution + ".";
              throw new Error(eMsg);
            }
            imgWidth = imageObj.width;
            imgHeight = imageObj.height;
            imgOrient = "square";
            if (imgWidth > imgHeight) {
              imgOrient = "landscape";
            }
            if (imgWidth < imgHeight) {
              imgOrient = "portrait";
            }
            imageUrl = imageObj.url;
            httpProtocol = window.location.protocol.indexOf("http") >= 0;
            if (httpProtocol && !this.options.useHttp) {
              imageUrl = imageUrl.replace(/https?:\/\//, '//');
            }
            imageString = this._makeTemplate(this.options.template, {
              model: image,
              id: image.id,
              link: image.link,
              type: image.type,
              image: imageUrl,
              width: imgWidth,
              height: imgHeight,
              orientation: imgOrient,
              caption: this._getObjectProperty(image, 'caption.text'),
              likes: image.likes.count,
              comments: image.comments.count,
              location: this._getObjectProperty(image, 'location.name')
            });
            htmlString += imageString;
          }
          tmpEl.innerHTML = htmlString;
          childNodesArr = [];
          childNodeIndex = 0;
          childNodeCount = tmpEl.childNodes.length;
          while (childNodeIndex < childNodeCount) {
            childNodesArr.push(tmpEl.childNodes[childNodeIndex]);
            childNodeIndex += 1;
          }
          for (j = 0, len1 = childNodesArr.length; j < len1; j++) {
            node = childNodesArr[j];
            fragment.appendChild(node);
          }
        } else {
          for (k = 0, len2 = images.length; k < len2; k++) {
            image = images[k];
            img = document.createElement('img');
            imageObj = image.images[this.options.resolution];
            if (typeof imageObj !== 'object') {
              eMsg = "No image found for resolution: " + this.options.resolution + ".";
              throw new Error(eMsg);
            }
            imageUrl = imageObj.url;
            httpProtocol = window.location.protocol.indexOf("http") >= 0;
            if (httpProtocol && !this.options.useHttp) {
              imageUrl = imageUrl.replace(/https?:\/\//, '//');
            }
            img.src = imageUrl;
            if (this.options.links === true) {
              anchor = document.createElement('a');
              anchor.href = image.link;
              anchor.appendChild(img);
              fragment.appendChild(anchor);
            } else {
              fragment.appendChild(img);
            }
          }
        }
        targetEl = this.options.target;
        if (typeof targetEl === 'string') {
          targetEl = document.getElementById(targetEl);
        }
        if (targetEl == null) {
          eMsg = "No element with id=\"" + this.options.target + "\" on page.";
          throw new Error(eMsg);
        }
        targetEl.appendChild(fragment);
        header = document.getElementsByTagName('head')[0];
        header.removeChild(document.getElementById('instafeed-fetcher'));
        instanceName = "instafeedCache" + this.unique;
        window[instanceName] = void 0;
        try {
          delete window[instanceName];
        } catch (_error) {
          e = _error;
        }
      }
      if ((this.options.after != null) && typeof this.options.after === 'function') {
        this.options.after.call(this);
      }
      return true;
    };

    Instafeed.prototype._buildUrl = function() {
      var base, endpoint, final;
      base = "https://api.instagram.com/v1";
      switch (this.options.get) {
        case "popular":
          endpoint = "media/popular";
          break;
        case "tagged":
          if (!this.options.tagName) {
            throw new Error("No tag name specified. Use the 'tagName' option.");
          }
          endpoint = "tags/" + this.options.tagName + "/media/recent";
          break;
        case "location":
          if (!this.options.locationId) {
            throw new Error("No location specified. Use the 'locationId' option.");
          }
          endpoint = "locations/" + this.options.locationId + "/media/recent";
          break;
        case "user":
          if (!this.options.userId) {
            throw new Error("No user specified. Use the 'userId' option.");
          }
          endpoint = "users/" + this.options.userId + "/media/recent";
          break;
        default:
          throw new Error("Invalid option for get: '" + this.options.get + "'.");
      }
      final = base + "/" + endpoint;
      if (this.options.accessToken != null) {
        final += "?access_token=" + this.options.accessToken;
      } else {
        final += "?client_id=" + this.options.clientId;
      }
      if (this.options.limit != null) {
        final += "&count=" + this.options.limit;
      }
      final += "&callback=instafeedCache" + this.unique + ".parse";
      return final;
    };

    Instafeed.prototype._genKey = function() {
      var S4;
      S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return "" + (S4()) + (S4()) + (S4()) + (S4());
    };

    Instafeed.prototype._makeTemplate = function(template, data) {
      var output, pattern, ref, varName, varValue;
      pattern = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/;
      output = template;
      while (pattern.test(output)) {
        varName = output.match(pattern)[1];
        varValue = (ref = this._getObjectProperty(data, varName)) != null ? ref : '';
        output = output.replace(pattern, function() {
          return "" + varValue;
        });
      }
      return output;
    };

    Instafeed.prototype._getObjectProperty = function(object, property) {
      var piece, pieces;
      property = property.replace(/\[(\w+)\]/g, '.$1');
      pieces = property.split('.');
      while (pieces.length) {
        piece = pieces.shift();
        if ((object != null) && piece in object) {
          object = object[piece];
        } else {
          return null;
        }
      }
      return object;
    };

    Instafeed.prototype._sortBy = function(data, property, reverse) {
      var sorter;
      sorter = function(a, b) {
        var valueA, valueB;
        valueA = this._getObjectProperty(a, property);
        valueB = this._getObjectProperty(b, property);
        if (reverse) {
          if (valueA > valueB) {
            return 1;
          } else {
            return -1;
          }
        }
        if (valueA < valueB) {
          return 1;
        } else {
          return -1;
        }
      };
      data.sort(sorter.bind(this));
      return data;
    };

    Instafeed.prototype._filter = function(images, filter) {
      var filteredImages, fn, i, image, len;
      filteredImages = [];
      fn = function(image) {
        if (filter(image)) {
          return filteredImages.push(image);
        }
      };
      for (i = 0, len = images.length; i < len; i++) {
        image = images[i];
        fn(image);
      }
      return filteredImages;
    };

    return Instafeed;

  })();

  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define([], factory);
    } else if (typeof module === 'object' && module.exports) {
      return module.exports = factory();
    } else {
      return root.Instafeed = factory();
    }
  })(this, function() {
    return Instafeed;
  });

}).call(this);

'use strict';

/**
 * jsOnlyLightbox 0.5.6
 * Copyright © 2014 Felix Hagspiel - http://jslightbox.felixhagspiel.de
 *
 * @license MIT
 * - Free for use in both personal and commercial projects
 */
/* exported Lightbox */
function Lightbox() {

  /**
   * Constants
   */
  var _const_name = 'jslghtbx';
  var _const_class_prefix = _const_name;
  var _const_id_prefix = _const_name;
  var _const_dataattr = 'data-' + _const_name;
  /**
   * Private vars
   */
  var CTX = this,
    isIE8 = false,
    isIE9 = false,
    body = document.getElementsByTagName('body')[0],
    template = '<div class="' + _const_name + '-contentwrapper" id="' + _const_name + '-contentwrapper" ></div>',
    imgRatio = false, // ratio of current image
    currGroup = false, // current group
    currThumbnail = false, // first clicked thumbnail
    currImage = {}, // currently shown image
    currImages = [], // images belonging to current group
    isOpen = false, // check if box is open
    animationEl, // reference to animation-element
    animationInt, // animation-interval
    animationChildren = [], // childs to animate
    animationTimeout, // timeout until animation starts
    // controls
    nextBtn = false,
    prevBtn = false,
    // resize-vars
    maxWidth,
    maxHeight,
    newImgWidth,
    newImgHeight;

  /*
   *   Public attributes
   */
  CTX.opt = {};
  CTX.box = false;
  CTX.wrapper = false;
  CTX.thumbnails = [];

  /**
   * Extends thumbnails.push to add click handlers to dynamically loaded thumbs
   */
  CTX.thumbnails.push = function () {
    for (var i = 0, l = arguments.length; i < l; i++) {
      clckHlpr(arguments[i]);
    }
    return Array.prototype.push.apply(this, arguments);
  };

  /**
   * Private methods
   */

  /**
   * Get correct height in IE8
   * @return {number}
   */
  function getHeight() {
    return window.innerHeight || document.documentElement.offsetHeight;
  }

  /**
   * Get correct width in IE8
   * @return {number}
   */
  function getWidth() {
    return window.innerWidth || document.documentElement.offsetWidth;
  }

  /**
   * Adds eventlisteners cross browser
   * @param {Object}   el       The element which gets the listener
   * @param {String}   e        The event type
   * @param {Function} callback The action to execute on event
   * @param {Boolean}  capture      The capture mode
   */
  function addEvent(el, e, callback, capture) {
    if (el.addEventListener) {
      el.addEventListener(e, callback, capture || false);
    }
    else
      if (el.attachEvent) {
        el.attachEvent('on' + e, callback);
      }
  }

  /**
   * Checks if element has a specific class
   * @param  {Object}  el        [description]
   * @param  {String}  className [description]
   * @return {Boolean}           [description]
   */
  function hasClass(el, className) {
    if (!el || !className) {
      return;
    }
    return (new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className));
  }

  /**
   * Removes class from element
   * @param  {Object} el
   * @param  {String} className
   * @return {Object}
   */
  function removeClass(el, className) {
    if (!el || !className) {
      return;
    }
    el.className = el.className.replace(new RegExp('(?:^|\\s)' + className + '(?!\\S)'), '');
    return el;
  }

  /**
   * Adds class to element
   * @param  {Object} el
   * @param  {String} className
   * @return {Object}
   */
  function addClass(el, className) {
    if (!el || !className) {
      return;
    }
    if (!hasClass(el, className)) {
      el.className += ' ' + className;
    }
    return el;
  }

  /**
   * Checks if obj is set
   * @param  {Object} obj
   * @return {Boolean}
   */
  function isset(obj) {
    return typeof obj !== 'undefined';

  }

  /**
   * Get attribute value cross-browser. Returns the attribute as string if found,
   * otherwise returns false
   * @param  {Object} obj
   * @param  {String} attr
   * @return {boolean || string}
   */
  function getAttr(obj, attr) {
    if (!obj || !isset(obj)) {
      return false;
    }
    var ret;
    if (obj.getAttribute) {
      ret = obj.getAttribute(attr);
    }
    else
      if (obj.getAttributeNode) {
        ret = obj.getAttributeNode(attr).value;
      }
    if (isset(ret) && ret !== '') {
      return ret;
    }
    return false;
  }

  /**
   * Checks if element has attribute cross-browser
   * @param  {Object}  obj
   * @param  {String}  attr
   * @return {Boolean}
   */
  function hasAttr(obj, attr) {
    if (!obj || !isset(obj)) {
      return false;
    }
    var ret;
    if (obj.getAttribute) {
      ret = obj.getAttribute(attr);
    }
    else
      if (obj.getAttributeNode) {
        ret = obj.getAttributeNode(attr).value;
      }
    return typeof ret === 'string';

  }

  /**
   * Adds clickhandlers to thumbnails
   * @param  {Object} i
   */
  function clckHlpr(i) {
    addEvent(i, 'click', function (e) {
      stopPropagation(e);
      preventDefault(e);
      currGroup = getAttr(i, _const_dataattr + '-group') || false;
      currThumbnail = i;
      openBox(i, false, false, false);
    }, false);
  }

  /**
   * Stop event propagation cross browser
   * @param  {Object} e
   */
  function stopPropagation(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    else {
      e.returnValue = false;
    }
  }

  /**
   * Prevent default cross browser
   * @param  {Object} e
   */
  function preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    else {
      e.returnValue = false;
    }
  }


  /**
   * Get thumbnails by group
   * @param  {String} group
   * @return {Object}       Array containing the thumbnails
   */
  function getByGroup(group) {
    var arr = [];
    for (var i = 0; i < CTX.thumbnails.length; i++) {
      if (getAttr(CTX.thumbnails[i], _const_dataattr + '-group') === group) {
        arr.push(CTX.thumbnails[i]);
      }
    }
    return arr;
  }

  /**
   * Get the position of thumbnail in group-array
   * @param  {Object} thumbnail
   * @param  {String} group
   * @return {number}
   */
  function getPos(thumbnail, group) {
    var arr = getByGroup(group);
    for (var i = 0; i < arr.length; i++) {
      // compare elements
      if (getAttr(thumbnail, 'src') === getAttr(arr[i], 'src') &&
        getAttr(thumbnail, _const_dataattr + '-index') === getAttr(arr[i], _const_dataattr + '-index') &&
        getAttr(thumbnail, _const_dataattr) === getAttr(arr[i], _const_dataattr)) {

        return i;
      }
    }
  }

  /**
   * Preloads next and prev images
   */
  function preload() {
    if (!currGroup) {
      return;
    }
    var prev = new Image();
    var next = new Image();
    var pos = getPos(currThumbnail, currGroup);
    if (pos === (currImages.length - 1)) {
      // last image in group, preload first image and the one before
      prev.src = getAttr(currImages[currImages.length - 1], _const_dataattr) || currImages[currImages.length - 1].src;
      next.src = getAttr(currImages[0].src, _const_dataattr) || currImages[0].src;
    }
    else
      if (pos === 0) {
        // first image in group, preload last image and the next one
        prev.src = getAttr(currImages[currImages.length - 1], _const_dataattr) || currImages[currImages.length - 1].src;
        next.src = getAttr(currImages[1], _const_dataattr) || currImages[1].src;
      }
      else {
        // in between, preload prev & next image
        prev.src = getAttr(currImages[pos - 1], _const_dataattr) || currImages[pos - 1].src;
        next.src = getAttr(currImages[pos + 1], _const_dataattr) || currImages[pos + 1].src;
      }
  }

  /**
   * Starts the loading animation
   */
  function startAnimation() {
    if (isIE8) {
      return;
    }
    // stop any already running animations
    stopAnimation();
    var fnc = function () {
      addClass(CTX.box, _const_class_prefix + '-loading');
      if (!isIE9 && typeof CTX.opt.loadingAnimation === 'number') {
        var index = 0;
        animationInt = setInterval(function () {
          addClass(animationChildren[index], _const_class_prefix + '-active');
          setTimeout(function () {
            removeClass(animationChildren[index], _const_class_prefix + '-active');
          }, CTX.opt.loadingAnimation);
          index = index >= animationChildren.length ? 0 : index += 1;
        }, CTX.opt.loadingAnimation);
      }
    };
    // set timeout to not show loading animation on fast connections
    animationTimeout = setTimeout(fnc, 500);
  }

  /**
   * Stops the animation
   */
  function stopAnimation() {
    if (isIE8) {
      return;
    }
    // hide animation-element
    removeClass(CTX.box, _const_class_prefix + '-loading');
    // stop animation
    if (!isIE9 && typeof CTX.opt.loadingAnimation !== 'string' && CTX.opt.loadingAnimation) {
      clearInterval(animationInt);
      // do not use animationChildren.length here due to IE8/9 bugs
      for (var i = 0; i < animationChildren.length; i++) {
        removeClass(animationChildren[i], _const_class_prefix + '-active');
      }
    }
  }

  /**
   * Initializes the control arrows
   */
  function initControls() {
    if (!nextBtn) {
      // create & append next-btn
      nextBtn = document.createElement('span');
      addClass(nextBtn, _const_class_prefix + '-next');

      // add custom images
      if (CTX.opt.nextImg) {
        var nextBtnImg = document.createElement('img');
        nextBtnImg.setAttribute('src', CTX.opt.nextImg);
        nextBtn.appendChild(nextBtnImg);
      }
      else {
        addClass(nextBtn, _const_class_prefix + '-no-img');
      }
      addEvent(nextBtn, 'click', function (e) {
        stopPropagation(e); // prevent closing of lightbox
        CTX.next();
      }, false);
      CTX.box.appendChild(nextBtn);
    }
    addClass(nextBtn, _const_class_prefix + '-active');
    if (!prevBtn) {
      // create & append next-btn
      prevBtn = document.createElement('span');
      addClass(prevBtn, _const_class_prefix + '-prev');

      // add custom images
      if (CTX.opt.prevImg) {
        var prevBtnImg = document.createElement('img');
        prevBtnImg.setAttribute('src', CTX.opt.prevImg);
        prevBtn.appendChild(prevBtnImg);
      }
      else {
        addClass(prevBtn, _const_class_prefix + '-no-img');
      }
      addEvent(prevBtn, 'click', function (e) {
        stopPropagation(e); // prevent closing of lightbox
        CTX.prev();
      }, false);
      CTX.box.appendChild(prevBtn);
    }
    addClass(prevBtn, _const_class_prefix + '-active');
  }

  /**
   * Moves controls to correct position
   */
  function repositionControls() {
    if (CTX.opt.responsive && nextBtn && prevBtn) {
      var btnTop = (getHeight() / 2) - (nextBtn.offsetHeight / 2);
      nextBtn.style.top = btnTop + 'px';
      prevBtn.style.top = btnTop + 'px';
    }
  }

  /**
   * Sets options and defaults
   * @param {Object} opt
   */
  function setOpt(opt) {
    // set options
    if (!opt) {
      opt = {};
    }

    /**
     * Sets the passed value per default to true if not given
     * @param {Object || String || Number || Boolean || ...} val
     * @returns {Boolean}
     */
    function setTrueDef(val) {
      return typeof val === 'boolean' ? val : true;
    }

    CTX.opt = {
      // options
      boxId: opt.boxId || false,
      controls: setTrueDef(opt.controls),
      dimensions: setTrueDef(opt.dimensions),
      captions: setTrueDef(opt.captions),
      prevImg: typeof opt.prevImg === 'string' ? opt.prevImg : false,
      nextImg: typeof opt.nextImg === 'string' ? opt.nextImg : false,
      hideCloseBtn: opt.hideCloseBtn || false,
      closeOnClick: typeof opt.closeOnClick === 'boolean' ? opt.closeOnClick : true,
      nextOnClick: setTrueDef(opt.nextOnClick),
      loadingAnimation: opt.loadingAnimation === undefined ? true : opt.loadingAnimation,
      animElCount: opt.animElCount || 4,
      preload: setTrueDef(opt.preload),
      carousel: setTrueDef(opt.carousel),
      animation: typeof opt.animation === 'number' || opt.animation === false ? opt.animation : 400,
      responsive: setTrueDef(opt.responsive),
      maxImgSize: opt.maxImgSize || 0.8,
      keyControls: setTrueDef(opt.keyControls),
      hideOverflow: opt.hideOverflow || true,
      // callbacks
      onopen: opt.onopen || false,
      onclose: opt.onclose || false,
      onload: opt.onload || false,
      onresize: opt.onresize || false,
      onloaderror: opt.onloaderror || false,
      onimageclick: typeof opt.onimageclick === 'function' ? opt.onimageclick : false
    };

    // load box in custom element
    if (CTX.opt.boxId) {
      CTX.box = document.getElementById(CTX.opt.boxId);
      // set class if missing
      var classes = CTX.box.getAttribute('class');
      if (classes.search(_const_class_prefix + ' ') < 0) {
        CTX.box.setAttribute('class', classes + ' ' + _const_class_prefix);
      }
    }
    // create box element if no ID is given and element is not there
    else
      if (!CTX.box) {
        // check if there already exists a jslghtbx-div
        var newEl = document.getElementById(_const_id_prefix);
        if (!newEl) {
          newEl = document.createElement('div');
        }
        newEl.setAttribute('id', _const_id_prefix);
        newEl.setAttribute('class', _const_class_prefix);
        CTX.box = newEl;
        body.appendChild(CTX.box);
      }
    CTX.box.innerHTML = template;
    if (isIE8) {
      addClass(CTX.box, _const_class_prefix + '-ie8');
    }
    CTX.wrapper = document.getElementById(_const_id_prefix + '-contentwrapper');

    // init regular closebutton
    if (!CTX.opt.hideCloseBtn) {
      var closeBtn = document.createElement('span');
      closeBtn.setAttribute('id', _const_id_prefix + '-close');
      closeBtn.setAttribute('class', _const_class_prefix + '-close');
      closeBtn.innerHTML = 'X';
      CTX.box.appendChild(closeBtn);
      addEvent(closeBtn, 'click', function (e) {
        stopPropagation(e);
        CTX.close();
      }, false);
    }

    // close lightbox on background-click by default / if true
    if (!isIE8 && CTX.opt.closeOnClick) {
      addEvent(CTX.box, 'click', function (e) {
        stopPropagation(e);
        CTX.close();
      }, false);
    }

    // set loading animation
    if (typeof CTX.opt.loadingAnimation === 'string') {
      // set loading GIF
      animationEl = document.createElement('img');
      animationEl.setAttribute('src', CTX.opt.loadingAnimation);
      addClass(animationEl, _const_class_prefix + '-loading-animation');
      CTX.box.appendChild(animationEl);
    }
    else
      if (CTX.opt.loadingAnimation) {
        // set default animation time
        CTX.opt.loadingAnimation = typeof CTX.opt.loadingAnimation === 'number' ? CTX.opt.loadingAnimation : 200;
        // create animation elements
        animationEl = document.createElement('div');
        addClass(animationEl, _const_class_prefix + '-loading-animation');
        var i = 0;
        while (i < CTX.opt.animElCount) {
          animationChildren.push(animationEl.appendChild(document.createElement('span')));
          i++;
        }
        CTX.box.appendChild(animationEl);
      }

    // add resize-eventhandlers
    if (CTX.opt.responsive) {
      addEvent(window, 'resize', function () {
        CTX.resize();
      }, false);
      addClass(CTX.box, _const_class_prefix + '-nooverflow'); // hide scrollbars on prev/next
    }
    else {
      removeClass(CTX.box, _const_class_prefix + '-nooverflow');
    }

    // add keyboard event handlers
    if (CTX.opt.keyControls) {
      addEvent(document, 'keydown', function (e) {
        if (isOpen) {
          stopPropagation(e); // prevent closing of lightbox
          if (e.keyCode === 39) {
            // show next img on right cursor
            CTX.next();
          }
          else
            if (e.keyCode === 37) {
              // show prev img on left cursor
              CTX.prev();
            }
            else
              if (e.keyCode === 27) {
                // close lightbox on ESC
                CTX.close();
              }
        }
      }, false);
    }
  }

  /**
   * Opens the lightbox. Either @param el and @param group must be given,
   * but not both together!
   * @param  {Object || String}   el      an image element or a link to an image
   * @param  {String}   group       the name of an image group
   * @param  {Function} cb          A private callback
   * @param  {Object} event
   */
  function openBox(el, group, cb, event) {
    if (!el && !group) {
      return false;
    }
    // save images from group
    currGroup = group || currGroup || getAttr(el, _const_dataattr + '-group');
    if (currGroup) {
      currImages = getByGroup(currGroup);
      if (typeof el === 'boolean' && !el) {
        // el is set to false, load first image of group
        el = currImages[0];
      }
    }

    // create new img-element
    currImage.img = new Image();

    // set el as current thumbnail
    currThumbnail = el;

    // get correct image-source
    var src;
    if (typeof el === 'string') {
      // string with img-src given
      src = el;
    }
    else
      if (getAttr(el, _const_dataattr)) {
        // image-source given
        src = getAttr(el, _const_dataattr);
      }
      else {
        // no image-source given
        src = getAttr(el, 'src');
      }
    // clear old image ratio for proper resize-values
    imgRatio = false;

    // add init-class on opening, but not at prev/next
    if (!isOpen) {
      if (typeof CTX.opt.animation === 'number') {
        addClass(currImage.img, _const_class_prefix + '-animate-transition ' + _const_class_prefix + '-animate-init');
      }
      isOpen = true;

      // execute open callback
      if (CTX.opt.onopen) {
        CTX.opt.onopen(currImage);
      }
    }

    // hide overflow by default / if set

    CTX.box.setAttribute('style', 'padding-top: 0');
    CTX.wrapper.innerHTML = '';
    CTX.wrapper.appendChild(currImage.img);
    // set animation class
    if (CTX.opt.animation) {
      addClass(CTX.wrapper, _const_class_prefix + '-animate');
    }
    // set caption
    var captionText = getAttr(el, _const_dataattr + '-caption');
    if (captionText && CTX.opt.captions) {
      var caption = document.createElement('p');
      caption.setAttribute('class', _const_class_prefix + '-caption');
      caption.innerHTML = captionText;
      CTX.wrapper.appendChild(caption);
    }

    addClass(CTX.box, _const_class_prefix + '-active');

    // show wrapper early to avoid bug where dimensions are not
    // correct in IE8
    if (isIE8) {
      addClass(CTX.wrapper, _const_class_prefix + '-active');
    }
    if (CTX.opt.controls && currImages.length > 1) {
      initControls();
      repositionControls();
    }

    /**
     * Onerror-handler for the image
     */
    currImage.img.onerror = function (imageErrorEvent) {
      if (CTX.opt.onloaderror) {
        // if `event` is false, error happened on opening the box
        imageErrorEvent._happenedWhile = event ? event : false;
        CTX.opt.onloaderror(imageErrorEvent);
      }
    };
    /**
     * Onload-handler for the image
     */
    currImage.img.onload = function () {
      // store original width here
      currImage.originalWidth = this.naturalWidth || this.width;
      currImage.originalHeight = this.naturalHeight || this.height;
      // use dummyimage for correct dimension calculating in older IE
      if (isIE8 || isIE9) {
        var dummyImg = new Image();
        dummyImg.setAttribute('src', src);
        currImage.originalWidth = dummyImg.width;
        currImage.originalHeight = dummyImg.height;
      }
      // interval to check if image is ready to show
      var checkClassInt = setInterval(function () {
        if (hasClass(CTX.box, _const_class_prefix + '-active')) {
          addClass(CTX.wrapper, _const_class_prefix + '-wrapper-active');
          // set animation
          if (typeof CTX.opt.animation === 'number') {
            addClass(currImage.img, _const_class_prefix + '-animate-transition');
          }
          if (cb) {
            cb();
          }
          // stop Animation
          stopAnimation();
          // clear animation timeout
          clearTimeout(animationTimeout);
          // preload previous and next image
          if (CTX.opt.preload) {
            preload();
          }
          // set clickhandler on image to show next image
          if (CTX.opt.nextOnClick) {
            // add cursor pointer
            addClass(currImage.img, _const_class_prefix + '-next-on-click');
            addEvent(currImage.img, 'click', function (e) {
              stopPropagation(e);
              CTX.next();
            }, false);
          }
          // set custom clickhandler on image
          if (CTX.opt.onimageclick) {
            addEvent(currImage.img, 'click', function (e) {
              stopPropagation(e);
              CTX.opt.onimageclick(currImage);
            }, false);
          }
          // execute onload callback
          if (CTX.opt.onload) {
            CTX.opt.onload(event);
          }
          // stop current interval
          clearInterval(checkClassInt);
          // resize the image
          CTX.resize();
        }
      }, 10);
    };

    // set src
    currImage.img.setAttribute('src', src);

    // start loading animation
    startAnimation();
  }

  /*
   *   Public methods
   */

  /**
   * Init-function, must be called once
   * @param  {Object} opt Custom options
   */
  CTX.load = function (opt) {
    // check for IE8
    if (navigator.appVersion.indexOf('MSIE 8') > 0) {
      isIE8 = true;
    }

    // check for IE9
    if (navigator.appVersion.indexOf('MSIE 9') > 0) {
      isIE9 = true;
    }

    // set options
    setOpt(opt);

    // Find all elements with `data-jslghtbx` attribute & add clickhandlers
    var arr = document.querySelectorAll('[' + _const_dataattr + ']');
    for (var i = 0; i < arr.length; i++) {
      if (hasAttr(arr[i], _const_dataattr)) {
        // set index to get proper position in getPos()
        arr[i].setAttribute(_const_dataattr + '-index', i);
        CTX.thumbnails.push(arr[i]);
      }
    }

  };

  /**
   * Public caller for openBox()
   * @param  {Object || string} el  Image element or a link
   * @param  {String} group
   */
  CTX.open = function (el, group) {
    // if image and group are given, set group to false
    // to prevent errors
    if (el && group) {
      group = false;
    }
    openBox(el, group, false, false);
  };

  /**
   * Calculates the new image size and resizes it
   */
  CTX.resize = function () {
    if (!currImage.img) {
      return;
    }
    maxWidth = getWidth();
    maxHeight = getHeight();
    var boxWidth = CTX.box.offsetWidth;
    var boxHeight = CTX.box.offsetHeight;
    if (!imgRatio && currImage.img && currImage.img.offsetWidth && currImage.img.offsetHeight) {
      imgRatio = currImage.img.offsetWidth / currImage.img.offsetHeight;
    }

    // Height of image is too big to fit in viewport
    if (Math.floor(boxWidth / imgRatio) > boxHeight) {
      newImgWidth = boxHeight * imgRatio;
      newImgHeight = boxHeight;
    }
    // Width of image is too big to fit in viewport
    else {
      newImgWidth = boxWidth;
      newImgHeight = boxWidth / imgRatio;
    }
    // decrease size with modifier
    newImgWidth = Math.floor(newImgWidth * CTX.opt.maxImgSize);
    newImgHeight = Math.floor(newImgHeight * CTX.opt.maxImgSize);

    // check if image exceeds maximum size
    if (CTX.opt.dimensions && newImgHeight > currImage.originalHeight ||
      CTX.opt.dimensions && newImgWidth > currImage.originalWidth) {
      newImgHeight = currImage.originalHeight;
      newImgWidth = currImage.originalWidth;
    }

    // reposition controls after timeout
    setTimeout(repositionControls, 200);

    // execute resize callback
    if (CTX.opt.onresize) {
      CTX.opt.onresize(currImage);
    }
  };

  /**
   * Loads the next image
   */
  CTX.next = function () {
    if (!currGroup) {
      return;
    }
    // get position of next image
    var pos = getPos(currThumbnail, currGroup) + 1;
    if (currImages[pos]) {
      currThumbnail = currImages[pos];
    }
    else
      if (CTX.opt.carousel) {
        currThumbnail = currImages[0];
      }
      else {
        return;
      }
    if (typeof CTX.opt.animation === 'number') {
      removeClass(currImage.img, _const_class_prefix + '-animating-next');
      setTimeout(function () {
        var cb = function () {
          setTimeout(function () {
            addClass(currImage.img, _const_class_prefix + '-animating-next');
          }, CTX.opt.animation / 2);
        };
        openBox(currThumbnail, false, cb, 'next');
      }, CTX.opt.animation / 2);
    }
    else {
      openBox(currThumbnail, false, false, 'next');
    }
  };

  /**
   * Loads the prev image
   */
  CTX.prev = function () {
    if (!currGroup) {
      return;
    }
    // get position of prev image
    var pos = getPos(currThumbnail, currGroup) - 1;
    if (currImages[pos]) {
      currThumbnail = currImages[pos];
    }
    else
      if (CTX.opt.carousel) {
        currThumbnail = currImages[currImages.length - 1];
      }
      else {
        return;
      }
    // animation stuff
    if (typeof CTX.opt.animation === 'number') {
      removeClass(currImage.img, _const_class_prefix + '-animating-prev');
      setTimeout(function () {
        var cb = function () {
          setTimeout(function () {
            addClass(currImage.img, _const_class_prefix + '-animating-next');
          }, CTX.opt.animation / 2);
        };
        openBox(currThumbnail, false, cb, 'prev');
      }, CTX.opt.animation / 2);
    }
    else {
      openBox(currThumbnail, false, false, 'prev');
    }
  };

  /**
   * Closes the box
   */
  CTX.close = function () {
    // restore Defaults
    currGroup = false;
    currThumbnail = false;
    var _currImage = currImage;
    currImage = {};
    currImages = [];
    isOpen = false;
    removeClass(CTX.box, _const_class_prefix + '-active');
    removeClass(CTX.wrapper, _const_class_prefix + '-wrapper-active');
    removeClass(nextBtn, _const_class_prefix + '-active');
    removeClass(prevBtn, _const_class_prefix + '-active');
    CTX.box.setAttribute('style', 'padding-top: 0px');

    // stop animtation
    stopAnimation();

    // Hide Lightbox if iE8
    if (isIE8) {
      CTX.box.setAttribute('style', 'display: none');
    }

    // show overflow by default / if set
    if (!CTX.opt || !isset(CTX.opt.hideOverflow) || CTX.opt.hideOverflow) {
      body.setAttribute('style', 'overflow: auto');
    }

    // execute close callback
    if (CTX.opt.onclose) {
      CTX.opt.onclose(_currImage);
    }
  };
}


var navToggle = document.querySelector('.page-header__toggler');
var navMain = document.querySelector('.main-nav');

navMain.removeAttribute("style");

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    navToggle.classList.add('page-header__toggler--opened')
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    navToggle.classList.remove('page-header__toggler--opened');
  }
});

(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.MediaBox = factory();
    }
}(this, function () {
    "use strict";

    var MediaBox = function (element) {
        if (!this || !(this instanceof MediaBox)) {
            return new MediaBox(element);
        }

        if (!element) {
            return false;
        }

        this.selector = element instanceof NodeList ? element : document.querySelectorAll(element);
        this.root     = document.querySelector('body');
        this.run();
    };

    MediaBox.prototype = {
        run: function () {
            Array.prototype.forEach.call(this.selector, function (el) {
                el.addEventListener('click', function (e) {
                    e.preventDefault();

                    var link = this.parseUrl(el.getAttribute('href'));
                    this.render(link);
                    this.events();
                }.bind(this), false);
            }.bind(this));

            this.root.addEventListener('keyup', function (e) {
                if ((e.keyCode || e.which) === 27) {
                    this.close(this.root.querySelector('.mediabox-wrap'));
                }
            }.bind(this), false);
        },
        template: function (s, d) {
            var p;

            for (p in d) {
                if (d.hasOwnProperty(p)) {
                    s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
                }
            }
            return s;
        },
        parseUrl: function (url) {
            var service = {},
                matches;

            if (matches = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)) {
                service.provider = "youtube";
                service.id       = matches[2];
            } else if (matches = url.match(/https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/)) {
                service.provider = "vimeo";
                service.id       = matches[3];
            } else {
                service.provider = "Unknown";
                service.id       = '';
            }

            return service;
        },
        render: function (service) {
            var embedLink,
                lightbox;

            if (service.provider === 'youtube') {
                embedLink = 'https://www.youtube.com/embed/' + service.id;
            } else if (service.provider === 'vimeo') {
                embedLink = 'https://player.vimeo.com/video/' + service.id;
            } else {
                throw new Error("Invalid video URL");
            }

            lightbox = this.template(
                '<div class="mediabox-wrap" role="dialog" aria-hidden="false"><div class="mediabox-content" role="document" tabindex="0"><span id="mediabox-esc" class="mediabox-close" aria-label="close" tabindex="1"></span><iframe src="{embed}?autoplay=1" frameborder="0" allowfullscreen></iframe></div></div>', {
                    embed: embedLink
                });

            this.lastFocusElement = document.activeElement;
            this.root.insertAdjacentHTML('beforeend', lightbox);
            document.body.classList.add('stop-scroll');
        },
        events: function () {
            var wrapper = document.querySelector('.mediabox-wrap');
            var content = document.querySelector('.mediabox-content');

            wrapper.addEventListener('click', function (e) {
                if (e.target && e.target.nodeName === 'SPAN' && e.target.className === 'mediabox-close' || e.target.nodeName === 'DIV' && e.target.className === 'mediabox-wrap' || (e.target.className === 'mediabox-content' && e.target.nodeName !== 'IFRAME')) {
                    this.close(wrapper);
                }
            }.bind(this), false);

            document.addEventListener('focus', function(e) {
                if (content && !content.contains(e.target)) {
                    e.stopPropagation();
                    content.focus();
                }
            }, true);

            content.addEventListener('keypress', function(e) {
                if (e.keyCode === 13) {
                    this.close(wrapper);
                }
            }.bind(this), false);
        },
        close: function (el) {
            if (el === null) return true;
            var timer = null;

            if (timer) {
                clearTimeout(timer);
            }

            el.classList.add('mediabox-hide');

            timer = setTimeout(function() {
                var el = document.querySelector('.mediabox-wrap');
                if (el !== null) {
                    document.body.classList.remove('stop-scroll');
                    this.root.removeChild(el);
                    this.lastFocusElement.focus();
                }
            }.bind(this), 500);
        }
    };

    return MediaBox;
}));

MediaBox('.mediabox');

//document.body.onload = function(){
//  setTimeout(function() {
//    var preloader = document.getElementById('loader');
//    if( !preloader.classList.contains('done') )
//    {
//      preloader.classList.add('done');
//    }
//  }, 1000)
//};

var searchLink = document.querySelector(".page-header__search");
var searchPopup = document.querySelector(".search-popup");
var close = searchPopup.querySelector(".search-popup__btn");

searchLink.addEventListener("click", function(event) {
  event.preventDefault();
  searchPopup.classList.remove("search-popup--closed");
  searchPopup.classList.add("search-popup--opened");
});

close.addEventListener("click", function(event) {
  event.preventDefault();
  searchPopup.classList.remove("search-popup--opened");
  searchPopup.classList.add("search-popup--closed");
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (searchPopup.classList.contains("search-popup--opened")) {
      searchPopup.classList.remove("search-popup--opened");
      searchPopup.classList.add("search-popup--closed");
    }
  }
});

window.onscroll = function() {myFunction()};

var nav = document.querySelector('.page-header');
var sticky = nav.offsetTop + 200;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    nav.classList.add("page-header--fixed");
  } else {
    nav.classList.remove("page-header--fixed");
  }
}

var dropdown = document.querySelectorAll('.dropdown');
var dropdownArray = Array.prototype.slice.call(dropdown,0);

dropdownArray.forEach(function(el) {
  var button = el.querySelector('span.main-nav__toggler'),
    menu = el.querySelector('.dropdown-menu');


  button.onclick = function(event) {
    if(!menu.hasClass('main-nav__sublist--opened')) {
      menu.classList.add('main-nav__sublist--opened');
      menu.classList.remove('main-nav__sublist--closed');
      event.preventDefault();
    }
    else {
      menu.classList.remove('main-nav__sublist--opened');
      menu.classList.add('main-nav__sublist--closed');
      event.preventDefault();
    }
  };
});

Element.prototype.hasClass = function(className) {
  return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.tabby = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//

	var tabby = {}; // Object for public APIs
	var supports = 'querySelector' in document && 'addEventListener' in root && 'classList' in document.createElement('_') && 'onhashchange' in root; // Feature test
	var settings, tab;

	// Default settings
	var defaults = {
		selectorToggle: '[data-tab]',
		selectorToggleGroup: '[data-tabs]',
		selectorContent: '[data-tabs-pane]',
		selectorContentGroup: '[data-tabs-content]',
		toggleActiveClass: 'active',
		contentActiveClass: 'active',
		initClass: 'js-tabby',
		stopVideo: true,
		callback: function () {}
	};


	//
	// Methods
	//

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function () {

		// Variables
		var extended = {};
		var deep = false;
		var i = 0;
		var length = arguments.length;

		// Check if a deep merge
		if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		var merge = function (obj) {
			for ( var prop in obj ) {
				if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
					// If deep merge and property is an object, merge properties
					if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
						extended[prop] = extend( true, extended[prop], obj[prop] );
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for ( ; i < length; i++ ) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;

	};

	/**
	 * Get the closest matching element up the DOM tree.
	 * @private
	 * @param  {Element} elem     Starting element
	 * @param  {String}  selector Selector to match against
	 * @return {Boolean|Element}  Returns null if not match found
	 */
	var getClosest = function ( elem, selector ) {

		// Element.matches() polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches =
				Element.prototype.matchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector ||
				Element.prototype.oMatchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				function(s) {
					var matches = (this.document || this.ownerDocument).querySelectorAll(s),
						i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) {}
					return i > -1;
				};
		}

		// Get closest match
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( elem.matches( selector ) ) return elem;
		}

		return null;

	};

	/**
	 * Escape special characters for use with querySelector
	 * @public
	 * @param {String} id The anchor ID to escape
	 * @author Mathias Bynens
	 * @link https://github.com/mathiasbynens/CSS.escape
	 */
	var escapeCharacters = function ( id ) {

			// Remove leading hash
			if ( id.charAt(0) === '#' ) {
				id = id.substr(1);
			}

			var string = String(id);
			var length = string.length;
			var index = -1;
			var codeUnit;
			var result = '';
			var firstCodeUnit = string.charCodeAt(0);
			while (++index < length) {
				codeUnit = string.charCodeAt(index);
				// Note: there’s no need to special-case astral symbols, surrogate
				// pairs, or lone surrogates.

				// If the character is NULL (U+0000), then throw an
				// `InvalidCharacterError` exception and terminate these steps.
				if (codeUnit === 0x0000) {
					throw new InvalidCharacterError(
						'Invalid character: the input contains U+0000.'
					);
				}

				if (
					// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
					// U+007F, […]
					(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
					// If the character is the first character and is in the range [0-9]
					// (U+0030 to U+0039), […]
					(index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
					// If the character is the second character and is in the range [0-9]
					// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
					(
						index === 1 &&
						codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
						firstCodeUnit === 0x002D
					)
				) {
					// http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
					result += '\\' + codeUnit.toString(16) + ' ';
					continue;
				}

				// If the character is not handled by one of the above rules and is
				// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
				// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
				// U+005A), or [a-z] (U+0061 to U+007A), […]
				if (
					codeUnit >= 0x0080 ||
					codeUnit === 0x002D ||
					codeUnit === 0x005F ||
					codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
					codeUnit >= 0x0041 && codeUnit <= 0x005A ||
					codeUnit >= 0x0061 && codeUnit <= 0x007A
				) {
					// the character itself
					result += string.charAt(index);
					continue;
				}

				// Otherwise, the escaped character.
				// http://dev.w3.org/csswg/cssom/#escape-a-character
				result += '\\' + string.charAt(index);

			}

			return '#' + result;

		};

	/**
	 * Stop YouTube, Vimeo, and HTML5 videos from playing when leaving the slide
	 * @private
	 * @param  {Element} content The content container the video is in
	 * @param  {String} activeClass The class asigned to expanded content areas
	 */
	var stopVideos = function ( content, settings ) {

		// Check if stop video enabled
		if ( !settings.stopVideo ) return;

		// Only run if content container is closed
		if ( content.classList.contains( settings.contentActiveClass ) ) return;

		// Check if the video is an iframe or HTML5 video
		var iframe = content.querySelector( 'iframe');
		var video = content.querySelector( 'video' );

		// Stop the video
		if ( iframe ) {
			var iframeSrc = iframe.src;
			iframe.src = iframeSrc;
		}
		if ( video ) {
			video.pause();
		}

	};

	/**
	 * Add focus to tab
	 * @private
	 * @param  {node}   tab      The content to bring into focus
	 * @param  {object} settings Options
	 */
	var adjustFocus = function ( tab, settings ) {

		if ( tab.hasAttribute( 'data-tab-no-focus' ) ) return;

		// If tab is closed, remove tabindex
		if ( !tab.classList.contains( settings.contentActiveClass ) ) {
			if ( tab.hasAttribute( 'data-tab-focused' ) ) {
				tab.removeAttribute( 'tabindex' );
			}
			return;
		}

		// Get current position on the page
		var position = {
			x: root.pageXOffset,
			y: root.pageYOffset
		};

		// Set focus and reset position to account for page jump on focus
		tab.focus();
		if ( document.activeElement.id !== tab.id ) {
			tab.setAttribute( 'tabindex', '-1' );
			tab.setAttribute( 'data-tab-focused', true );
			tab.focus();
		}
		root.scrollTo( position.x, position.y );

	};

	/**
	 * Toggle tab toggle active state
	 * @private
	 * @param  {Node}   toggle   The toggle element
	 * @param  {Object} settings
	 */
	var toggleToggles = function ( toggle, settings ) {

		// Variables
		var toggleGroup = getClosest( toggle, settings.selectorToggleGroup ); // The parent for the toggle group
		if ( !toggleGroup ) return;
		var toggles = toggleGroup.querySelectorAll( settings.selectorToggle ); // The toggles in the group
		var toggleList;

		// Show or hide each toggle
		// @todo Start here
		forEach(toggles, function (item) {

			// If this is the selected toggle, activate it
			if ( item.hash === toggle.hash ) {

				// Add active class
				item.classList.add( settings.toggleActiveClass );

				// If toggle is a list item, activate <li> element, too
				toggleList = getClosest( item, 'li' );
				if ( toggleList ) {
					toggleList.classList.add( settings.toggleActiveClass );
				}

				return;

			}

			// Otherwise, deactivate it
			item.classList.remove( settings.toggleActiveClass );
			toggleList = getClosest( item, 'li' );
			if ( toggleList ) {
				toggleList.classList.remove( settings.toggleActiveClass );
			}

		});

	};

	/**
	 * Toggle tab active state
	 * @private
	 * @param  {String} tabID    The ID of the tab to activate
	 * @param  {Object} settings
	 */
	var toggleTabs = function ( tabID, settings ) {

		// Variables
		var tab = document.querySelector( escapeCharacters( tabID ) ); // The selected tab
		if ( !tab ) return;
		var tabGroup = getClosest( tab, settings.selectorContentGroup ); // The parent for the tab group
		if ( !tabGroup ) return;
		var tabs = tabGroup.querySelectorAll( settings.selectorContent ); // The tabs in the group

		// Show or hide each tab
		forEach(tabs, function (tab) {

			// If this is the selected tab, show it
			if ( tab.id === tabID.substring(1) ) {
				tab.classList.add( settings.contentActiveClass );
				adjustFocus( tab, settings );
				return;
			}

			// Otherwise, hide it
			tab.classList.remove( settings.contentActiveClass );
			stopVideos( tab, settings );
			adjustFocus( tab, settings );

		});

	};

	/**
	 * Show a tab and hide all others
	 * @public
	 * @param  {Element} toggle The element that toggled the show tab event
	 * @param  {String}  tabID The ID of the tab to show
	 * @param  {Object}  options
	 */
	tabby.toggleTab = function ( tabID, toggle, options ) {

		// Selectors and variables
		var localSettings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var tabs = document.querySelectorAll( escapeCharacters( tabID ) ); // Get tab content

		// Toggle visibility of the toggles and tabs
		toggleTabs( tabID, localSettings );
		if ( toggle ) {
			toggleToggles(toggle, localSettings);
		}

		// Run callbacks after toggling tab
		localSettings.callback( tabs, toggle );

	};

	/**
	 * Handle has change event
	 * @private
	 */
	var hashChangeHandler = function (event) {

		// Get hash from URL
		var hash = root.location.hash;

		// If clicked tab is cached, reset it's ID
		if ( tab ) {
			tab.id = tab.getAttribute( 'data-tab-id' );
			tab = null;
		}

		// If there's a URL hash, activate tab with matching ID
		if ( !hash ) return;
		var toggle = document.querySelector( settings.selectorToggle + '[href*="' + hash + '"]' );
		tabby.toggleTab( hash, toggle );

	};

	/**
	 * Handle toggle click events
	 * @private
	 */
	var clickHandler = function (event) {

		// Don't run if right-click or command/control + click
		if ( event.button !== 0 || event.metaKey || event.ctrlKey ) return;

		// Check if event target is a tab toggle
		var toggle = getClosest( event.target, settings.selectorToggle );
		if ( !toggle || !toggle.hash ) return;

		// Don't run if toggle points to currently open tab
		if ( toggle.hash === root.location.hash ) {
			event.preventDefault();
			return;
		}

		// Get the tab content
		tab = document.querySelector( toggle.hash );

		// If tab content exists, save the ID as a data attribute and remove it (prevents scroll jump)
		if ( !tab ) return;
		tab.setAttribute( 'data-tab-id', tab.id );
		tab.id = '';

	};

	/**
	 * Handle content focus events
	 * @private
	 */
	var focusHandler = function (event) {

		// Only run if the focused content is in a tab
		tab = getClosest( event.target, settings.selectorContent );
		if ( !tab ) return;

		// Don't run if the content area is already open
		if ( tab.classList.contains( settings.contentActiveClass ) ) return;

		// Store tab ID to variable and remove it from the tab
		var hash = tab.id;
		tab.setAttribute( 'data-tab-id', hash );
		tab.setAttribute( 'data-tab-no-focus', true );
		tab.id = '';

		// Change the hash
		location.hash = hash;

	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	tabby.destroy = function () {
		if ( !settings ) return;
		document.documentElement.classList.remove( settings.initClass );
		document.removeEventListener('click', clickHandler, false);
		document.removeEventListener('focus', focusHandler, true);
		root.removeEventListener('hashchange', hashChangeHandler, false);
		settings = null;
		tab = null;
	};

	/**
	 * Initialize Tabby
	 * @public
	 * @param {Object} options User settings
	 */
	tabby.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		tabby.destroy();

		// Merge user options with defaults
		settings = extend( defaults, options || {} );

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// Listen for all click events
		document.addEventListener('click', clickHandler, false);
		document.addEventListener('focus', focusHandler, true);
		root.addEventListener('hashchange', hashChangeHandler, false);

		// If URL has a hash, activate hashed tab by default
		hashChangeHandler();

	};


	//
	// Public APIs
	//

	return tabby;

});
var tns=function(){function e(){for(var e,t,n,i=arguments[0]||{},a=1,r=arguments.length;a<r;a++)if(null!==(e=arguments[a]))for(t in e)n=e[t],i!==n&&void 0!==n&&(i[t]=n);return i}function t(e){return["true","false"].indexOf(e)>=0?JSON.parse(e):e}function n(e,t,n){return n&&localStorage.setItem(e,t),t}function i(){var e=window.tnsId;return window.tnsId=e?e+1:1,"tns"+window.tnsId}function a(){var e=document,t=e.body;return t||(t=e.createElement("body"),t.fake=!0),t}function r(e){var t="";return e.fake&&(t=P.style.overflow,e.style.background="",e.style.overflow=P.style.overflow="hidden",P.appendChild(e)),t}function o(e,t){e.fake&&(e.remove(),P.style.overflow=t,P.offsetHeight)}function s(e){var t=document.createElement("style");return e&&t.setAttribute("media",e),document.querySelector("head").appendChild(t),t.sheet?t.sheet:t.styleSheet}function l(e,t,n,i){"insertRule"in e?e.insertRule(t+"{"+n+"}",i):e.addRule(t,n,i)}function c(e){return("insertRule"in e?e.cssRules:e.rules).length}function u(e,t){return Math.atan2(e,t)*(180/Math.PI)}function f(e,t){var n=!1,i=Math.abs(90-Math.abs(e));return i>=90-t?n="horizontal":i<=t&&(n="vertical"),n}function d(e,t){return e.className.indexOf(t)>=0}function v(e,t){d(e,t)||(e.className+=" "+t)}function h(e,t){d(e,t)&&(e.className=e.className.replace(t,""))}function p(e,t){return e.hasAttribute(t)}function m(e,t){return e.getAttribute(t)}function y(e){return void 0!==e.item}function g(e,t){if(e=y(e)||e instanceof Array?e:[e],"[object Object]"===Object.prototype.toString.call(t))for(var n=e.length;n--;)for(var i in t)e[n].setAttribute(i,t[i])}function b(e,t){e=y(e)||e instanceof Array?e:[e],t=t instanceof Array?t:[t];for(var n=t.length,i=e.length;i--;)for(var a=n;a--;)e[i].removeAttribute(t[a])}function x(e){e.style.cssText=""}function T(e){p(e,"hidden")||g(e,{hidden:""})}function E(e){p(e,"hidden")&&b(e,"hidden")}function C(e){return e.offsetWidth>0&&e.offsetHeight>0}function w(e){return"boolean"==typeof e.complete?e.complete:"number"==typeof e.naturalWidth?0!==e.naturalWidth:void 0}function N(e){for(var t=document.createElement("fakeelement"),n=(e.length,0);n<e.length;n++){var i=e[n];if(void 0!==t.style[i])return i}return!1}function O(e,t){var n=!1;return/^Webkit/.test(e)?n="webkit"+t+"End":/^O/.test(e)?n="o"+t+"End":e&&(n=t.toLowerCase()+"end"),n}function D(e,t){for(var n in t){var i=("touchstart"===n||"touchmove"===n)&&W;e.addEventListener(n,t[n],i)}}function k(e,t){for(var n in t){var i=["touchstart","touchmove"].indexOf(n)>=0&&W;e.removeEventListener(n,t[n],i)}}function A(){return{topics:{},on:function(e,t){this.topics[e]=this.topics[e]||[],this.topics[e].push(t)},off:function(e,t){if(this.topics[e])for(var n=0;n<this.topics[e].length;n++)if(this.topics[e][n]===t){this.topics[e].splice(n,1);break}},emit:function(e,t){this.topics[e]&&this.topics[e].forEach(function(e){e(t)})}}}function M(e,t,n,i,a,r,o){function s(){r-=l,u+=f,e.style[t]=n+u+c+i,r>0?setTimeout(s,l):o()}var l=Math.min(r,10),c=a.indexOf("%")>=0?"%":"px",a=a.replace(c,""),u=Number(e.style[t].replace(n,"").replace(i,"").replace(c,"")),f=(a-u)/r*l;setTimeout(s,l)}Object.keys||(Object.keys=function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}),function(){"use strict";"remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)})}();var P=document.documentElement,I=!1;try{var S=Object.defineProperty({},"passive",{get:function(){I=!0}});window.addEventListener("test",null,S)}catch(e){}var W=!!I&&{passive:!0},H=navigator.userAgent,L=!0,z={};try{z=localStorage,z.tnsApp&&z.tnsApp!==H&&["tC","tSP","tMQ","tTf","tTDu","tTDe","tADu","tADe","tTE","tAE"].forEach(function(e){z.removeItem(e)}),z.tnsApp=H}catch(e){L=!1}localStorage||(z={});var B=document,R=window,j={ENTER:13,SPACE:32,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40},q=t(z.tC)||n("tC",function(){var e=document,t=a(),n=r(t),i=e.createElement("div"),s=!1;t.appendChild(i);try{for(var l,c=["calc(10px)","-moz-calc(10px)","-webkit-calc(10px)"],u=0;u<3;u++)if(l=c[u],i.style.width=l,10===i.offsetWidth){s=l.replace("(10px)","");break}}catch(e){}return t.fake?o(t,n):i.remove(),s}(),L),G=t(z.tSP)||n("tSP",function(){var e,t,n=document,i=a(),s=r(i),l=n.createElement("div"),c=n.createElement("div");return l.style.cssText="width: 10px",c.style.cssText="float: left; width: 5.5px; height: 10px;",e=c.cloneNode(!0),l.appendChild(c),l.appendChild(e),i.appendChild(l),t=c.offsetTop!==e.offsetTop,i.fake?o(i,s):l.remove(),t}(),L),F=t(z.tMQ)||n("tMQ",function(){var e,t=document,n=a(),i=r(n),s=t.createElement("div"),l=t.createElement("style"),c="@media all and (min-width:1px){.tns-mq-test{position:absolute}}";return l.type="text/css",s.className="tns-mq-test",n.appendChild(l),n.appendChild(s),l.styleSheet?l.styleSheet.cssText=c:l.appendChild(t.createTextNode(c)),e=window.getComputedStyle?window.getComputedStyle(s).position:s.currentStyle.position,n.fake?o(n,i):s.remove(),"absolute"===e}(),L),U=t(z.tTf)||n("tTf",N(["transform","WebkitTransform","MozTransform","msTransform","OTransform"]),L),X=t(z.tTDu)||n("tTDu",N(["transitionDuration","WebkitTransitionDuration","MozTransitionDuration","OTransitionDuration"]),L),V=t(z.tTDe)||n("tTDe",N(["transitionDelay","WebkitTransitionDelay","MozTransitionDelay","OTransitionDelay"]),L),Y=t(z.tADu)||n("tADu",N(["animationDuration","WebkitAnimationDuration","MozAnimationDuration","OAnimationDuration"]),L),K=t(z.tADe)||n("tADe",N(["animationDelay","WebkitAnimationDelay","MozAnimationDelay","OAnimationDelay"]),L),Q=t(z.tTE)||n("tTE",O(X,"Transition"),L),J=t(z.tAE)||n("tAE",O(Y,"Animation"),L);F||(G=!1);var Z=function(t){function n(){return R.innerWidth||B.documentElement.clientWidth||B.body.clientWidth}function a(e){var t;do{t=e.clientWidth,e=e.parentNode}while(!t);return t}function r(e){var n=t[e];return!n&&gt&&yt.indexOf(e)>=0&&gt.forEach(function(t){mt[t][e]&&(n=!0)}),n}function o(e,n){n=n?n:xt;var i,a={slideBy:"page",edgePadding:!1,autoHeight:!0};if(!tt&&e in a)i=a[e];else if("items"===e&&o("fixedWidth"))i=Math.floor(pt/(o("fixedWidth")+o("gutter")));else if("autoHeight"===e&&"outer"===kt)i=!0;else if(i=t[e],gt&&yt.indexOf(e)>=0)for(var r=0,s=gt.length;r<s;r++){var l=gt[r];if(!(n>=l))break;e in mt[l]&&(i=mt[l][e])}return"slideBy"===e&&"page"===i&&(i=o("items")),i}function y(e){return q?q+"("+100*e+"% / "+qt+")":100*e/qt+"%"}function N(e,t,n){var i="";if(e){var a=e;t&&(a+=t),i=n?"margin: 0px "+(pt%(n+t)+t)/2+"px":lt?"margin: 0 "+e+"px 0 "+a+"px;":"padding: "+a+"px 0 "+e+"px 0;"}else if(t&&!n){var r="-"+t+"px",o=lt?r+" 0 0":"0 "+r+" 0";i="margin: 0 "+o+";"}return i}function O(e,t,n){return e?(e+t)*qt+"px":q?q+"("+100*qt+"% / "+n+")":100*qt/n+"%"}function P(e,t,n){var i="";if(lt){if(i="width:",e)i+=e+t+"px";else{var a=tt?qt:n;i+=q?q+"(100% / "+a+")":100/a+"%"}i+=ln+";"}return i}function I(e){var t="";if(e!==!1){t=(lt?"padding-":"margin-")+(lt?"right":"bottom")+": "+e+"px;"}return t}function S(e){e=e||R.event,clearTimeout(Ct),Ct=setTimeout(function(){if(st){var t=n();xt!==t&&(xt=t,W(),"outer"===kt&&en.emit("outerResized",Qe(e)))}},100)}function W(){var e=bt,t=Kt,n=Ot,i=sn;if(pt=a(ct),ot=a(ut),gt&&H(),e!==bt||Pt){var r=It,s=Lt,u=Pt,f=Mt,d=At,v=rn;if(Ot=o("items"),Dt=o("slideBy"),rn=o("disable"),sn=!!rn||!!on&&ht<=Ot,Ot!==n&&(Zt=qt-Ot,si()),rn!==v&&$(rn),sn!==i&&(sn&&(Kt=tt?jt:0),L()),e!==bt&&(St=o("speed"),Mt=o("edgePadding"),At=o("gutter"),Pt=o("fixedWidth"),rn||Pt===u||pe(),(Lt=o("autoHeight"))!==s&&(Lt||(ut.style.height=""))),It=!sn&&o("arrowKeys"),It!==r&&(It?D(B,vn):k(B,vn)),mn){var h=Dn,p=kn;Dn=!sn&&o("controls"),kn=o("controlsText"),Dn!==h&&(Dn?E(An):T(An)),kn!==p&&(Cn.innerHTML=kn[0],wn.innerHTML=kn[1])}if(yn){var m=Pn;Pn=!sn&&o("nav"),Pn!==m&&(Pn?(E(In),Ke()):T(In))}if(xn){var y=ti;ti=!sn&&o("touch"),ti!==y&&tt&&(ti?D(ft,hn):k(ft,hn))}if(Tn){var g=ri;ri=!sn&&o("mouseDrag"),ri!==g&&tt&&(ri?D(ft,pn):k(ft,pn))}if(bn){var b=Un,x=Kn,C=Jn,w=Yn;if(sn?Un=Kn=Jn=!1:(Un=o("autoplay"),Un?(Kn=o("autoplayHoverPause"),Jn=o("autoplayResetOnVisibility")):Kn=Jn=!1),Yn=o("autoplayText"),Xn=o("autoplayTimeout"),Un!==b&&(Un?(Qn&&E(Qn),jn||Gn||De()):(Qn&&T(Qn),jn&&ke())),Kn!==x&&(Kn?D(ft,fn):k(ft,fn)),Jn!==C&&(Jn?D(B,dn):k(B,dn)),Qn&&Yn!==w){var A=Un?1:0,M=Qn.innerHTML,S=M.length-w[A].length;M.substring(S)===w[A]&&(Qn.innerHTML=M.substring(0,S)+Yn[A])}}if(!F){if(sn||Mt===f&&At===d||(ut.style.cssText=N(Mt,At,Pt)),tt&&lt&&(Pt!==u||At!==d||Ot!==n)&&(ft.style.width=O(Pt,At,Ot)),lt&&(Ot!==n||At!==d||Pt!=u)){var W=P(Pt,At,Ot)+I(At);zt.removeRule(c(zt)-1),l(zt,"#"+an+" > .tns-item",W,c(zt))}Pt||Kt!==t||ye(0)}Kt!==t&&(en.emit("indexChanged",Qe()),ye(0),Qt=Kt),Ot!==n&&(ne(),se(),ee(),navigator.msMaxTouchPoints&&re())}lt||rn||(ae(),Ve(),pe()),z(!0),ee()}function H(){bt=0,gt.forEach(function(e,t){xt>=e&&(bt=t+1)})}function L(){var e="tns-transparent";if(sn){if(!Nt){if(Mt&&(ut.style.margin="0px"),jt)for(var t=jt;t--;)tt&&v(vt[t],e),v(vt[qt-t-1],e);Nt=!0}}else if(Nt){if(Mt&&!Pt&&F&&(ut.style.margin=""),jt)for(var t=jt;t--;)tt&&h(vt[t],e),h(vt[qt-t-1],e);Nt=!1}}function z(e){Pt&&Mt&&(sn||pt<=Pt+At?"0px"!==ut.style.margin&&(ut.style.margin="0px"):e&&(ut.style.cssText=N(Mt,At,Pt)))}function $(e){var t=vt.length;if(e){if(zt.disabled=!0,ft.className=ft.className.replace(nn.substring(1),""),x(ft),Ht)for(var n=jt;n--;)tt&&T(vt[n]),T(vt[t-n-1]);if(lt&&tt||x(ut),!tt)for(var i=Kt,a=Kt+ht;i<a;i++){var r=vt[i];x(r),h(r,nt),h(r,rt)}}else{if(zt.disabled=!1,ft.className+=nn,lt||ae(),pe(),Ht)for(var n=jt;n--;)tt&&E(vt[n]),E(vt[t-n-1]);if(!tt)for(var i=Kt,a=Kt+ht;i<a;i++){var r=vt[i],o=i<Kt+Ot?nt:rt;r.style.left=100*(i-Kt)/Ot+"%",v(r,o)}}}function _(){if(Bt&&!rn){var e=Kt,t=Kt+Ot;for(Mt&&(e-=1,t+=1);e<t;e++)[].forEach.call(vt[e].querySelectorAll(".tns-lazy-img"),function(e){var t={};t[Q]=function(e){e.stopPropagation()},D(e,t),d(e,"loaded")||(e.src=m(e,"data-src"),v(e,"loaded"))})}}function ee(){if(Lt&&!rn){for(var e=[],t=Kt,n=Kt+Ot;t<n;t++)[].forEach.call(vt[t].querySelectorAll("img"),function(t){e.push(t)});0===e.length?ie():te(e)}}function te(e){e.forEach(function(t,n){w(t)&&e.splice(n,1)}),0===e.length?ie():setTimeout(function(){te(e)},16)}function ne(){_(),oe(),de(),Ke(),le()}function ie(){for(var e,t=[],n=Kt,i=Kt+Ot;n<i;n++)t.push(vt[n].offsetHeight);e=Math.max.apply(null,t),ut.style.height!==e&&(X&&ve(St),ut.style.height=e+"px")}function ae(){Et=[0];for(var e,t=vt[0].getBoundingClientRect().top,n=1;n<qt;n++)e=vt[n].getBoundingClientRect().top,Et.push(e-t)}function re(){ct.style.msScrollSnapPointsX="snapInterval(0%, "+100/Ot+"%)"}function oe(){for(var e=Kt+Math.min(ht,Ot),t=qt;t--;){var n=vt[t];t>=Kt&&t<e?p(n,"tabindex")&&(g(n,{"aria-hidden":"false"}),b(n,["tabindex"]),v(n,En)):(p(n,"tabindex")||g(n,{"aria-hidden":"true",tabindex:"-1"}),d(n,En)&&h(n,En))}}function se(){if(!tt){for(var e=Kt+Math.min(ht,Ot),t=qt;t--;){var n=vt[t];t>=Kt&&t<e?(v(n,"tns-moving"),n.style.left=100*(t-Kt)/Ot+"%",v(n,nt),h(n,rt)):n.style.left&&(n.style.left="",v(n,rt),h(n,nt)),h(n,it)}setTimeout(function(){[].forEach.call(vt,function(e){h(e,"tns-moving")})},300)}}function le(){if(Pn&&(Ln=Hn!==-1?Hn:Kt%ht,Hn=-1,Ln!==zn)){var e=Mn[zn],t=Mn[Ln];g(e,{tabindex:"-1","aria-selected":"false"}),g(t,{tabindex:"0","aria-selected":"true"}),h(e,Bn),v(t,Bn)}}function ce(e){return"button"===e.nodeName.toLowerCase()}function ue(e){return"true"===e.getAttribute("aria-disabled")}function fe(e,t,n){e?t.disabled=n:t.setAttribute("aria-disabled",n.toString())}function de(){if(Dn&&!Wt&&!Ht){var e=Nn?Cn.disabled:ue(Cn),t=On?wn.disabled:ue(wn),n=Kt===Jt,i=!Wt&&Kt===Zt;n&&!e&&fe(Nn,Cn,!0),!n&&e&&fe(Nn,Cn,!1),i&&!t&&fe(On,wn,!0),!i&&t&&fe(On,wn,!1)}}function ve(e,t){e=e?e/1e3+"s":"",t=t||ft,t.style[X]=e,tt||(t.style[Y]=e),lt||(ut.style[X]=e)}function he(){var e;if(lt)if(Pt)e=-(Pt+At)*Kt+"px";else{var t=U?qt:Ot;e=100*-Kt/t+"%"}else e=-Et[Kt]+"px";return e}function pe(e){e||(e=he()),ft.style[Ut]=Xt+e+Vt}function me(e,t,n,i){for(var a=e,r=e+Ot;a<r;a++){var o=vt[a];i||(o.style.left=100*(a-Kt)/Ot+"%"),X&&ve(St,o),at&&V&&(o.style[V]=o.style[K]=at*(a-e)/1e3+"s"),h(o,t),v(o,n),i&&Rt.push(o)}}function ye(e,t){isNaN(e)&&(e=St),jn&&!C(ft)&&(e=0),X&&ve(e),li(e,t)}function ge(e,t){Ft&&si(),(Kt!==Qt||t)&&(en.emit("indexChanged",Qe()),en.emit("transitionStart",Qe()),jn&&e&&["click","keydown"].indexOf(e.type)>=0&&ke(),$t=!0,ye())}function be(e){return e.toLowerCase().replace(/-/g,"")}function xe(e){if(tt||$t){if(en.emit("transitionEnd",Qe(e)),!tt&&Rt.length>0)for(var t=0;t<Ot;t++){var n=Rt[t];n.style.left="",X&&ve(0,n),at&&V&&(n.style[V]=n.style[K]=""),h(n,it),v(n,rt)}if(!e||!tt&&e.target.parentNode===ft||e.target===ft&&be(e.propertyName)===be(Ut)){if(!Ft){var i=Kt;si(),Kt!==i&&(en.emit("indexChanged",Qe()),X&&ve(0),pe())}ee(),"inner"===kt&&en.emit("innerLoaded",Qe()),$t=!1,zn=Ln,Qt=Kt}}}function Te(e,t){if(!sn)if("prev"===e)Ee(t,-1);else if("next"===e)Ee(t,1);else if(!$t){var n=Kt%ht,i=0;if(n<0&&(n+=ht),"first"===e)i=-n;else if("last"===e)i=ht-Ot-n;else if("number"!=typeof e&&(e=parseInt(e)),!isNaN(e)){var a=e%ht;a<0&&(a+=ht),i=a-n}Kt+=i,Kt%ht!=Qt%ht&&ge(t)}}function Ee(e,t){if(!$t){var n;if(!t){e=e||R.event;for(var i=e.target||e.srcElement;i!==An&&[Cn,wn].indexOf(i)<0;)i=i.parentNode;var a=[Cn,wn].indexOf(i);a>=0&&(n=!0,t=0===a?-1:1)}if(Wt){if(Kt===Jt&&t===-1)return void Te("last",e);if(Kt===Zt&&1===t)return void Te(0,e)}t&&(Kt+=Dt*t,ge(n||e&&"keydown"===e.type?e:null))}}function Ce(e){if(!$t){e=e||R.event;for(var t,n=e.target||e.srcElement;n!==In&&!p(n,"data-nav");)n=n.parentNode;p(n,"data-nav")&&(t=Hn=[].indexOf.call(Mn,n),Te(t,e))}}function we(){Rn=setInterval(function(){Ee(null,Vn)},Xn),jn=!0}function Ne(){clearInterval(Rn),jn=!1}function Oe(e,t){g(Qn,{"data-action":e}),Qn.innerHTML=Zn[0]+e+Zn[1]+t}function De(){we(),Qn&&Oe("stop",Yn[1])}function ke(){Ne(),Qn&&Oe("start",Yn[0])}function Ae(){Un&&!jn&&(De(),Gn=!1)}function Me(){jn&&(ke(),Gn=!0)}function Pe(){jn?(ke(),Gn=!0):(De(),Gn=!1)}function Ie(){B.hidden?jn&&(Ne(),Fn=!0):Fn&&(we(),Fn=!1)}function Se(){jn&&(Ne(),qn=!0)}function We(){qn&&(we(),qn=!1)}function He(e){switch(e=e||R.event,e.keyCode){case j.LEFT:Ee(e,-1);break;case j.RIGHT:Ee(e,1)}}function Le(e){switch(e=e||R.event,e.keyCode){case j.LEFT:case j.UP:case j.PAGEUP:Cn.disabled||Ee(e,-1);break;case j.RIGHT:case j.DOWN:case j.PAGEDOWN:wn.disabled||Ee(e,1);break;case j.HOME:Te(0,e);break;case j.END:Te(ht-1,e)}}function ze(e){e.focus()}function Be(e){function n(e){return t.navContainer?e:Sn[e]}var i=B.activeElement;if(p(i,"data-nav")){e=e||R.event;var a=e.keyCode,r=[].indexOf.call(Mn,i),o=Sn.length,s=Sn.indexOf(r);switch(t.navContainer&&(o=ht,s=r),a){case j.LEFT:case j.PAGEUP:s>0&&ze(Mn[n(s-1)]);break;case j.UP:case j.HOME:s>0&&ze(Mn[n(0)]);break;case j.RIGHT:case j.PAGEDOWN:s<o-1&&ze(Mn[n(s+1)]);break;case j.DOWN:case j.END:s<o-1&&ze(Mn[n(o-1)]);break;case j.ENTER:case j.SPACE:Hn=r,Te(r,e)}}}function Re(){ye(0,ft.scrollLeft()),Qt=Kt}function je(e){return e.target||e.srcElement}function qe(e){return e.type.indexOf("touch")>=0}function Ge(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function Fe(e){if(ai=0,wt=!1,ni=ii=null,!$t){e=e||R.event;var t;qe(e)?(t=e.changedTouches[0],en.emit("touchStart",Qe(e))):(t=e,Ge(e),en.emit("dragStart",Qe(e))),ni=parseInt(t.clientX),ii=parseInt(t.clientY),$n=parseFloat(ft.style[Ut].replace(Xt,"").replace(Vt,""))}}function Ue(e){if(!$t&&null!==ni){e=e||R.event;var n;if(qe(e)?n=e.changedTouches[0]:(n=e,Ge(e)),_n=parseInt(n.clientX)-ni,ei=parseInt(n.clientY)-ii,0===ai&&(ai=f(u(ei,_n),15)===t.axis),ai){qe(e)?en.emit("touchMove",Qe(e)):(oi||(oi=!0),en.emit("dragMove",Qe(e))),wt||(wt=!0);var i=$n;if(lt)if(Pt)i+=_n,i+="px";else{var a=U?_n*Ot*100/(ot*qt):100*_n/ot;i+=a,i+="%"}else i+=ei,i+="px";U&&ve(0),ft.style[Ut]=Xt+i+Vt}}}function Xe(e){if(!$t&&wt){e=e||R.event;var t;qe(e)?(t=e.changedTouches[0],en.emit("touchEnd",Qe(e))):(t=e,en.emit("dragEnd",Qe(e))),_n=parseInt(t.clientX)-ni,ei=parseInt(t.clientY)-ii;var n=Boolean(lt?_n:ei);if(ai=0,wt=!1,ni=ii=null,lt){var i=-_n*Ot/ot;i=_n>0?Math.floor(i):Math.ceil(i),Kt+=i}else{var a=-($n+ei);if(a<=0)Kt=Jt;else if(a>=Et[Et.length-1])Kt=Zt;else{var r=0;do{r++,Kt=ei<0?r+1:r}while(r<qt&&a>=Et[r+1])}}if(ge(e,n),oi){oi=!1;var o=je(e);D(o,{click:function e(t){Ge(t),k(o,{click:e})}})}}}function Ve(){ut.style.height=Et[Kt+Ot]-Et[Kt]+"px"}function Ye(){Sn=[];for(var e=Kt%ht%Ot;e<ht;)!Ht&&e+Ot>ht&&(e=ht-Ot),Sn.push(e),e+=Ot;(Ht&&Sn.length*Ot<ht||!Ht&&Sn[0]>0)&&Sn.unshift(0)}function Ke(){Pn&&!gn&&(Ye(),Sn!==Wn&&([].forEach.call(Mn,function(e,t){Sn.indexOf(t)<0?T(e):E(e)}),Wn=Sn))}function Qe(e){return{container:ft,slideItems:vt,navContainer:In,navItems:Mn,controlsContainer:An,hasControls:mn,prevButton:Cn,nextButton:wn,items:Ot,slideBy:Dt,cloneCount:jt,slideCount:ht,slideCountNew:qt,index:Kt,indexCached:Qt,navCurrentIndex:Ln,navCurrentIndexCached:zn,visibleNavIndexes:Sn,visibleNavIndexesCached:Wn,event:e||{}}}t=e({container:B.querySelector(".slider"),mode:"carousel",axis:"horizontal",items:1,gutter:0,edgePadding:0,fixedWidth:!1,slideBy:1,controls:!0,controlsText:["prev","next"],controlsContainer:!1,nav:!0,navContainer:!1,navAsThumbnails:!1,arrowKeys:!1,speed:300,autoplay:!1,autoplayTimeout:5e3,autoplayDirection:"forward",autoplayText:["start","stop"],autoplayHoverPause:!1,autoplayButton:!1,autoplayButtonOutput:!0,autoplayResetOnVisibility:!0,loop:!0,rewind:!1,autoHeight:!1,responsive:!1,lazyload:!1,touch:!0,mouseDrag:!1,nested:!1,freezable:!0,onInit:!1},t||{}),["container","controlsContainer","navContainer","autoplayButton"].forEach(function(e){"string"==typeof t[e]&&(t[e]=B.querySelector(t[e]))});var Je=R.console&&"function"==typeof R.console.warn;if(!t.container||!t.container.nodeName)return void(Je&&console.warn("Can't find container element."));if(t.container.children.length<2)return void(Je&&console.warn("Slides less than 2."));if(t.responsive){var Ze={},$e=t.responsive;for(var _e in $e){var et=$e[_e];Ze[_e]="number"==typeof et?{items:et}:et}t.responsive=Ze,Ze=null,0 in t.responsive&&(t=e(t,t.responsive[0]),delete t.responsive[0])}var tt="carousel"===t.mode;if(!tt){t.axis="horizontal",t.rewind=!1,t.loop=!0,t.edgePadding=!1;var nt="tns-fadeIn",it="tns-fadeOut",at=!1,rt=t.animateNormal||"tns-normal";Q&&J&&(nt=t.animateIn||nt,it=t.animateOut||it,at=t.animateDelay||at)}var ot,st,lt="horizontal"===t.axis,ct=B.createElement("div"),ut=B.createElement("div"),ft=t.container,dt=ft.parentNode,vt=ft.children,ht=vt.length,pt=a(dt),mt=t.responsive,yt=[],gt=!1,bt=0,xt=n();if(mt){gt=Object.keys(mt).map(function(e){return parseInt(e)}).sort(function(e,t){return e-t}),gt.forEach(function(e){yt=yt.concat(Object.keys(mt[e]))});var Tt=[];yt.forEach(function(e){Tt.indexOf(e)<0&&Tt.push(e)}),yt=Tt,H()}var Et,Ct,wt,Nt,Ot=o("items"),Dt="page"===o("slideBy")?Ot:o("slideBy"),kt=t.nested,At=o("gutter"),Mt=o("edgePadding"),Pt=o("fixedWidth"),It=o("arrowKeys"),St=o("speed"),Wt=t.rewind,Ht=!Wt&&t.loop,Lt=o("autoHeight"),zt=s(),Bt=t.lazyload,Rt=[],jt=Ht?2*ht:0,qt=tt?ht+2*jt:ht+jt,Gt=!(!Pt||Ht||Mt),Ft=!tt||!Ht,Ut=lt?"left":"top",Xt="",Vt="",Yt=o("startIndex"),Kt=Yt?function(e){return e%=ht,e<0&&(e+=ht),e=Math.min(e,qt-Ot)}(Yt):tt?jt:0,Qt=Kt,Jt=0,Zt=qt-Ot,$t=!1,_t=t.onInit,en=new A,tn=ft.id,nn=" tns-slider tns-"+t.mode,an=ft.id||i(),rn=o("disable"),on=t.freezable,sn=!!rn||!!on&&ht<=Ot,ln="inner"===kt?" !important":"",cn={click:Ee,keydown:Le},un={click:Ce,keydown:Be},fn={mouseover:Se,mouseout:We},dn={visibilitychange:Ie},vn={keydown:He},hn={touchstart:Fe,touchmove:Ue,touchend:Xe,touchcancel:Xe},pn={mousedown:Fe,mousemove:Ue,mouseup:Xe,mouseleave:Xe},mn=r("controls"),yn=r("nav"),gn=t.navAsThumbnails,bn=r("autoplay"),xn=r("touch"),Tn=r("mouseDrag"),En="tns-slide-active";if(mn)var Cn,wn,Nn,On,Dn=o("controls"),kn=o("controlsText"),An=t.controlsContainer;if(yn)var Mn,Pn=o("nav"),In=t.navContainer,Sn=[],Wn=Sn,Hn=-1,Ln=Kt%ht,zn=Ln,Bn="tns-nav-active";if(bn)var Rn,jn,qn,Gn,Fn,Un=o("autoplay"),Xn=o("autoplayTimeout"),Vn="forward"===t.autoplayDirection?1:-1,Yn=o("autoplayText"),Kn=o("autoplayHoverPause"),Qn=t.autoplayButton,Jn=o("autoplayResetOnVisibility"),Zn=["<span class='tns-visually-hidden'>"," animation</span>"];if(xn)var $n,_n,ei,ti=o("touch"),ni=null,ii=null,ai=0;if(Tn)var ri=o("mouseDrag"),oi=!1;sn&&(Dn=Pn=ti=ri=It=Un=Kn=Jn=!1),U&&(Ut=U,Xt="translate",Xt+=lt?"X(":"Y(",Vt=")"),function(){ct.appendChild(ut),dt.insertBefore(ct,ft),ut.appendChild(ft),ot=a(ut);var e="tns-outer",n="tns-inner",i=r("gutter");if(tt?lt&&(r("edgePadding")||i&&!t.fixedWidth)?e+=" tns-ovh":n+=" tns-ovh":i&&(e+=" tns-ovh"),ct.className=e,ut.className=n,ut.id=an+"-iw",Lt&&(ut.className+=" tns-ah",ut.style[X]=St/1e3+"s"),""===ft.id&&(ft.id=an),nn+=G?" tns-subpixel":" tns-no-subpixel",nn+=q?" tns-calc":" tns-no-calc",tt&&(nn+=" tns-"+t.axis),ft.className+=nn,tt&&Q){var s={};s[Q]=xe,D(ft,s)}e=n=null;for(var u=0;u<ht;u++){var f=vt[u];f.id||(f.id=an+"-item"+u),v(f,"tns-item"),!tt&&rt&&v(f,rt),g(f,{"aria-hidden":"true",tabindex:"-1"})}if(Ht||Mt){for(var d=B.createDocumentFragment(),p=B.createDocumentFragment(),m=jt;m--;){var x=m%ht,E=vt[x].cloneNode(!0);if(b(E,"id"),p.insertBefore(E,p.firstChild),tt){var C=vt[ht-1-x].cloneNode(!0);b(C,"id"),d.appendChild(C)}}ft.insertBefore(d,ft.firstChild),ft.appendChild(p),vt=ft.children}for(var w=Kt,k=Kt+Math.min(ht,Ot);w<k;w++){var f=vt[w];g(f,{"aria-hidden":"false"}),b(f,["tabindex"]),v(f,En),tt||(f.style.left=100*(w-Kt)/Ot+"%",v(f,nt),h(f,rt))}if(tt&&lt&&(G?(l(zt,"#"+an+" > .tns-item","font-size:"+R.getComputedStyle(vt[0]).fontSize+";",c(zt)),l(zt,"#"+an,"font-size:0;",c(zt))):[].forEach.call(vt,function(e,t){e.style.marginLeft=y(t)})),F){var A=N(t.edgePadding,t.gutter,t.fixedWidth);l(zt,"#"+an+"-iw",A,c(zt)),tt&&lt&&(A="width:"+O(t.fixedWidth,t.gutter,t.items),l(zt,"#"+an,A,c(zt))),(lt||t.gutter)&&(A=P(t.fixedWidth,t.gutter,t.items)+I(t.gutter),l(zt,"#"+an+" > .tns-item",A,c(zt)))}else if(ut.style.cssText=N(Mt,At,Pt),tt&&lt&&(ft.style.width=O(Pt,At,Ot)),lt||At){var A=P(Pt,At,Ot)+I(At);l(zt,"#"+an+" > .tns-item",A,c(zt))}if(lt||rn||(ae(),Ve()),mt&&F&&gt.forEach(function(e){var t=mt[e],n="",i="",a="",s="",l=o("items",e),c=o("fixedWidth",e),u=o("edgePadding",e),f=o("gutter",e);("edgePadding"in t||"gutter"in t)&&(i="#"+an+"-iw{"+N(u,f,c)+"}"),tt&&lt&&("fixedWidth"in t||"gutter"in t||"items"in t)&&(a="#"+an+"{width:"+O(c,f,l)+"}"),("fixedWidth"in t||r("fixedWidth")&&"gutter"in t||!tt&&"items"in t)&&(s+=P(c,f,l)),"gutter"in t&&(s+=I(f)),s.length>0&&(s="#"+an+" > .tns-item{"+s+"}"),n=i+a+s,n.length>0&&zt.insertRule("@media (min-width: "+e/16+"em) {"+n+"}",zt.cssRules.length)}),tt&&!rn&&pe(),navigator.msMaxTouchPoints&&(v(ct,"ms-touch"),D(ct,{scroll:Re}),re()),yn){var M=tt?jt:0;if(In)g(In,{"aria-label":"Carousel Pagination"}),Mn=In.children,[].forEach.call(Mn,function(e,t){g(e,{"data-nav":t,tabindex:"-1","aria-selected":"false","aria-controls":vt[M+t].id})});else{for(var H="",j=gn?"":" hidden",w=0;w<ht;w++)H+='<button data-nav="'+w+'" tabindex="-1" aria-selected="false" aria-controls="'+vt[M+w].id+j+'" type="button"></button>';H='<div class="tns-nav" aria-label="Carousel Pagination">'+H+"</div>",ct.insertAdjacentHTML("afterbegin",H),In=ct.querySelector(".tns-nav"),Mn=In.children}if(Ke(),X){var U=X.substring(0,X.length-18).toLowerCase(),A="transition: all "+St/1e3+"s";U&&(A="-"+U+"-"+A),l(zt,"[aria-controls^="+an+"-item]",A,c(zt))}g(Mn[Ln],{tabindex:"0","aria-selected":"true"}),v(Mn[Ln],Bn),D(In,un),Pn||T(In)}if(bn){var V=Un?"stop":"start";Qn?g(Qn,{"data-action":V}):t.autoplayButtonOutput&&(ut.insertAdjacentHTML("beforebegin",'<button data-action="'+V+'" type="button">'+Zn[0]+V+Zn[1]+Yn[0]+"</button>"),Qn=ct.querySelector("[data-action]")),Qn&&D(Qn,{click:Pe}),Un?(De(),Kn&&D(ft,fn),Jn&&D(ft,dn)):Qn&&T(Qn)}mn&&(An?(Cn=An.children[0],wn=An.children[1],g(An,{"aria-label":"Carousel Navigation",tabindex:"0"}),g(Cn,{"data-controls":"prev"}),g(wn,{"data-controls":"next"}),g(An.children,{"aria-controls":an,tabindex:"-1"})):(ct.insertAdjacentHTML("afterbegin",'<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="'+an+'" type="button">'+kn[0]+'</button><button data-controls="next" tabindex="-1" aria-controls="'+an+'" type="button">'+kn[1]+"</button></div>"),An=ct.querySelector(".tns-controls"),Cn=An.children[0],wn=An.children[1]),Nn=ce(Cn),On=ce(wn),de(),D(An,cn),Dn||T(An)),ti&&D(ft,hn),ri&&D(ft,pn),It&&D(B,vn),"inner"===kt?en.on("outerResized",function(){W(),en.emit("innerLoaded",Qe())}):(D(R,{resize:S}),"outer"===kt&&en.on("innerLoaded",ee)),_(),ee(),L(),z(),en.on("indexChanged",ne),"function"==typeof _t&&_t(Qe()),"inner"===kt&&en.emit("innerLoaded",Qe()),rn&&$(!0),st=!0}();var si=function(){return Ht?function(){var e=Jt,t=Zt;if(tt)if(e+=Dt,t-=Dt,Mt)e+=1,t-=1;else if(Pt){var n=At?At:0;pt%(Pt+n)>n&&(t-=1)}if(Kt>t)for(;Kt>=e+ht;)Kt-=ht;else if(Kt<e)for(;Kt<=t-ht;)Kt+=ht}:function(){Kt=Math.max(Jt,Math.min(Zt,Kt))}}(),li=function(){return tt?function(e,t){t||(t=he()),Gt&&Kt===Zt&&(t=-((Pt+At)*qt-ot)+"px"),X||!e?(pe(t),e&&C(ft)||xe()):M(ft,Ut,Xt,Vt,t,St,xe),lt||Ve()}:function(e){Rt=[];var t={};t[Q]=t[J]=xe,k(vt[Qt],t),D(vt[Kt],t),me(Qt,nt,it,!0),me(Kt,rt,nt),Q&&J&&e||xe()}}();return{getInfo:Qe,events:en,goTo:Te,play:Ae,pause:Me,isOn:st,rebuild:function(){return Z(t)},destroy:function(){if(k(R,{resize:S}),k(B,vn),zt.disabled=!0,Ht)for(var e=jt;e--;)tt&&vt[0].remove(),vt[vt.length-1].remove();var n=["tns-item",En];tt||(n=n.concat("tns-normal",nt));for(var i=ht;i--;){var a=vt[i];a.id.indexOf(an+"-item")>=0&&(a.id=""),n.forEach(function(e){h(a,e)})}if(b(vt,["style","aria-hidden","tabindex"]),vt=an=ht=qt=jt=null,Dn&&(k(An,cn),t.controlsContainer&&(b(An,["aria-label","tabindex"]),b(An.children,["aria-controls","aria-disabled","tabindex"])),An=Cn=wn=null),Pn&&(k(In,un),t.navContainer&&(b(In,["aria-label"]),b(Mn,["aria-selected","aria-controls","tabindex"])),In=Mn=null),Un&&(clearInterval(Rn),Qn&&k(Qn,{click:Pe}),k(ft,fn),k(ft,dn),t.autoplayButton&&b(Qn,["data-action"])),ft.id=tn||"",ft.className=ft.className.replace(nn,""),x(ft),tt&&Q){var r={};r[Q]=xe,k(ft,r)}k(ft,hn),k(ft,pn),dt.insertBefore(ft,ct),ct.remove(),ct=ut=ft=Kt=Qt=Ot=Dt=Ln=zn=mn=Sn=Wn=this.getInfo=this.events=this.goTo=this.play=this.pause=this.destroy=null,this.isOn=st=!1}}};return Z}();

var slider = tns({
  container: '.slider',
  nav: false,
  controls: false,
  items: 1,
  autoplay: true,
  autoplayButtonOutput: false,
  responsive: {
    640: {
      items: 1
    },
    700: {
      items: 1
    },
    900: {
      items: 1
    }
  }
});

var featuredSlider = tns({
  container: '.featured__slider',
  nav: true,
  navContainer: '.featured__controls',
  controls: false,
  items: 1,
  autoplay: true,
  autoplayButtonOutput: false,
  navAsThumbnails: true,
  lazyload: true,
  responsive: {
    480: {
      items: 1,
      edgePadding: 12
    },
    700: {
      items: 2,
      edgePadding: 12
    },
    900: {
      items: 4,
      edgePadding: 12
    }
  }
});

var newsSlider = tns({
  container: '.news__slider',
  nav: true,
  navContainer: '.news__controls',
  controls: false,
  items: 1,
  autoplay: true,
  autoplayButtonOutput: false,
  navAsThumbnails: true,
  lazyload: true,
  responsive: {
    620: {
      items: 2
    },
    700: {
      items: 2
    },
    900: {
      items: 4,
      gutter: 20
    }
  }
});

var quoteSlider = tns({
  container: '.quotes__slider',
  nav: true,
  navContainer: '.quotes__controls',
  controls: false,
  items: 1,
  autoplay: true,
  autoplayButtonOutput: false,
  navAsThumbnails: true,
  lazyload: true,
  responsive: {
    640: {
      items: 1
    },
    700: {
      items: 1
    },
    900: {
      items: 1
    }
  }
});

var companiesSlider = tns({
  container: '.companies__list',
  nav: false,
  controls: false,
  items: 1,
  autoplay: true,
  autoplayButtonOutput: false,
  lazyload: true,
  responsive: {
    640: {
      items: 1
    },
    700: {
      items: 1
    },
    900: {
      items: 2
    },
    1140: {
      items: 3
    }
  }
});

var feed = new Instafeed({
  get: 'user',      // <-- new
  userId: '6725512930',   // <-- new
  clientId: '218e4100d4a44d94b8a38e2dbab7e81d',
  accessToken: '6725512930.218e410.24afc32b09b14c2eb3464b1dc3a4664f',
  template: '<li class="widget__item"><a href="{{link}}" class="widget__link"><img src="{{image}}" class="widget__img" /></a></li>',
  sortBy: 'most-recent',
  limit: '10',
  resolution: 'low_resolution'
});
feed.run();
