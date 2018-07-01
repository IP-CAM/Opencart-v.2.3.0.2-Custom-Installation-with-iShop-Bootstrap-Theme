<?=$header?>
<?=$content_top?>
</main>
<footer class="page-footer">
    <div class="container">
        <div class="page-footer__logo">
            <a href="/" class="page-footer__link">
                <img src="catalog/view/theme/ishop/image/logo-white.svg" alt="Sports Store" class="page-footer__logotype  " width="206" height="26">
            </a>
        </div>
         <section class="socials">
      <ul class="socials__list">
        <li class="socials__item">
          <a href="https://vk.com/" class="socials__link" title="Вконтакте">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-vk"></use>
            </svg>
          </a>
        </li>
        <li class="socials__item">
          <a href="https://twitter.com/" class="socials__link" title="Твиттер">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-twitter"></use>
            </svg>
          </a>
        </li>
        <li class="socials__item">
          <a href="https://www.facebook.com/" class="socials__link" title="Фейсбук">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-facebook"></use>
            </svg>
          </a>
        </li>
        <li class="socials__item">
          <a href="http://instagram.com/" class="socials__link" title="Инстаграм">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-instagram"></use>
            </svg>
          </a>
        </li>
        <li class="socials__item">
          <a href="https://plus.google.com/discover?hl=ru" class="socials__link" title="Гугл плюс">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-googleplus"></use>
            </svg>
          </a>
        </li>
      </ul>
    </section>
        <div class="page-footer__copyright">
            <p class="page-footer__text">© 2018 Алексей Истомин</p>
        </div>
    </div>
</footer>
<button class="back-to-top" id="back-to-top" type="button" title="Наверх">
    <svg class="back-to-top__icon" width="20" height="20">
        <use x="0" y="0" xlink:href="#icon-arrow-top"></use>
    </svg>
</button>
<section class="search-popup search-popup--closed">
    <?php echo $search; ?>
</section>
<script src="catalog/view/javascript/script.min.js" defer></script>
<script>
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

    var feed = new Instafeed({
        get: 'user',      // <-- new
        userId: '6725512930',   // <-- new
        clientId: '218e4100d4a44d94b8a38e2dbab7e81d',
        accessToken: '6725512930.218e410.24afc32b09b14c2eb3464b1dc3a4664f',
        template: '<li class="widget__item"><a href="{{link}}" class="widget__link"><img data-src="{{image}}" class="widget__img lazyload" /></a></li>',
        sortBy: 'most-recent',
        limit: '10',
        resolution: 'low_resolution'
    });
    feed.run();

</script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const styles = ['catalog/view/theme/ishop/stylesheet/style.min.css'];
        styles.forEach((path) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = path;
            document.head.appendChild(link);
        });
    });
</script>
<!-- BEGIN JIVOSITE CODE {literal} -->
<script type='text/javascript'>
    (function(){ var widget_id = 'LwBZhjS2Lk';var d=document;var w=window;function l(){var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;s.src = '//code.jivosite.com/script/widget/'+widget_id; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);}if(d.readyState=='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>
<!-- {/literal} END JIVOSITE CODE -->
</body>

</html>