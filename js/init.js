import {fitText} from './fittext.js';

$(function() {
  const body = document.getElementsByTagName('body')[0];
  const header = document.getElementById('home');
  const headline = document.getElementsByClassName('responsive-headline')[0];
  const nav = document.getElementById('nav-wrap');
  const navLinks = nav.getElementsByTagName('a');
  const sections = document.getElementsByTagName('section');

  fitText(headline, {minFontSize: '40px', maxFontSize: '90px'});

  // Highlight the current section in the navigation bar
  for (const section of [header, ...sections]) {
    new Waypoint({
      element: section,
      handler: function(direction) {
        const activeSection = direction === 'up' ? this.previous() : this;
        const activeLink =
            nav.querySelector(`a[href="#${activeSection.element.id}"]`);
        for (const navLink of navLinks) {
          navLink.parentElement.classList.remove('current');
        }
        activeLink.parentElement.classList.add('current');
      },
    });
  }

  // Make sure that #header-background-image height is equal to the browser
  // height.
  header.style.height = window.innerHeight;

  window.addEventListener('resize', () => {
    header.style.height = window.innerHeight;
    body.style.width = window.innerWidth;
  });

  // Hide nav bar while it's over header picture
  document.addEventListener('scroll', () => {
    const headerHeight = header.offsetHeight;
    const scrollY = window.scrollY;

    if ((scrollY > headerHeight * .20) && (scrollY < headerHeight) &&
        (window.outerWidth > 768)) {
      nav.classList.remove('show');
      nav.classList.add('hide');
    } else {
      if (scrollY < headerHeight * .20) {
        nav.classList.remove('opaque');
        nav.classList.remove('hide');
        nav.classList.add('show');
      } else {
        nav.classList.remove('hide');
        nav.classList.add('show');
      }
    }
  });

  // Modal Popup
  $('.item-wrap a').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    removalDelay: 200,
    showCloseBtn: false,
    mainClass: 'mfp-fade',
  });
  $(document).on('click', '.popup-modal-dismiss', (e) => {
    e.preventDefault();
    $.magnificPopup.close();
  });

  // Tiny Slider
  // https://github.com/ganlanyuan/tiny-slider
  tns({
    container: '.slides',
    navPosition: 'bottom',
    autoplay: true,
    autoplayTimeout: 7000,
    autoHeight: true,
    controls: false,
    autoplayButtonOutput: false,
  });
});
