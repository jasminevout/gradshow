
var ParallaxManager, ParallaxPart;

ParallaxPart = (function() {
  function ParallaxPart(el) {
    this.el = el;
    this.speed = parseFloat(this.el.getAttribute('data-parallax-speed'));
    this.maxScroll = parseInt(this.el.getAttribute('data-max-scroll'));
  }

  ParallaxPart.prototype.update = function(scrollY) {
    if (scrollY > this.maxScroll) { return; }
    var offset = -(scrollY * this.speed);
    this.setYTransform(offset);
  };

  // Vertical scrolling vendor prefixes
  ParallaxPart.prototype.setYTransform = function(val) {
    this.el.style.webkitTransform = "translate3d(0, " + val + "px, 0)";
    this.el.style.MozTransform    = "translate3d(0, " + val + "px, 0)";
    this.el.style.OTransform      = "translate3d(0, " + val + "px, 0)";
    this.el.style.transform       = "translate3d(0, " + val + "px, 0)";
    this.el.style.msTransform     = "translateY(" + val + "px)";
  };

  return ParallaxPart;

})();

ParallaxManager = (function() {
    ParallaxManager.prototype.parts = [];
  
    function ParallaxManager(elements) {
      if (Array.isArray(elements) && elements.length) {
        this.elements = elements;
      }
      if (typeof elements === 'object' && elements.item) {
        this.elements = Array.prototype.slice.call(elements);
      } else if (typeof elements === 'string') {
        this.elements = document.querySelectorAll(elements);
        if (this.elements.length === 0) {
          throw new Error("Parallax: No elements found");
        }
        this.elements = Array.prototype.slice.call(this.elements);
      } else {
        throw new Error("Parallax: Element variable is not a querySelector string, Array, or NodeList");
      }
      for (var i in this.elements) {
        this.parts.push(new ParallaxPart(this.elements[i]));
      }
      window.addEventListener("scroll", this.onScroll.bind(this));
    }
  
    ParallaxManager.prototype.onScroll = function() {
      window.requestAnimationFrame(this.scrollHandler.bind(this));
    };
  
    ParallaxManager.prototype.scrollHandler = function() {
      var scrollY = Math.max(window.pageYOffset, 0);
      for (var i in this.parts) { this.parts[i].update(scrollY); }
    };
  
    return ParallaxManager;
  
})();
  
new ParallaxManager('.parallax-layer');

// Fade out banner on scroll
window.onscroll = function() {
  var target = document.getElementById("target");

  var height = window.innerHeight;

  var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

  // Speed of fade
  height = height / 2.5;

  target.style.opacity = (height - scrollTop) / height;

};