import {tns} from 'tiny-slider';

import {fitText} from './fittext';

interface MagnificPopup {
  (options: unknown): JQuery;
  close(): void;
}

declare global {
  interface JQuery {
    magnificPopup: MagnificPopup;
  }
  interface JQueryStatic {
    magnificPopup: MagnificPopup;
  }
}

$(function() {
  const body = document.getElementsByTagName('body')[0];
  const header = document.getElementById('home');
  if (header === null) {
    throw new Error('home is null');
  }
  const headline = document.getElementsByClassName('responsive-headline')[0] as HTMLHeadingElement;
  const nav = document.getElementById('nav-wrap');
  if (nav === null) {
    throw new Error('nav-wrap is null');
  }
  const navLinks = nav.getElementsByTagName('a');
  const sections = document.getElementsByTagName('section');

  fitText(headline, /* minFontSizePx= */ 40, /* maxFontSizePx= */ 90);

  // Highlight the current section in the navigation bar
  for (const section of [header, ...sections]) {
    new Waypoint({
      element: section,
      handler: function(direction) {
        const activeSection = (direction === 'up' ? this.previous() : this) as Waypoint | null;
        if (activeSection == null) {
          return;
        }
        const activeLink = nav.querySelector(`a[href="#${activeSection.element.id}"]`);
        for (const navLink of navLinks) {
          navLink.parentElement?.classList.remove('current');
        }
        activeLink?.parentElement?.classList.add('current');
      },
    });
  }

  // Make sure that #header-background-image height is equal to the browser height.
  header.style.height = window.innerHeight.toString();

  window.addEventListener('resize', () => {
    header.style.height = window.innerHeight.toString();
    body.style.width = window.innerWidth.toString();
  });

  // Hide nav bar while it's over header picture
  document.addEventListener('scroll', () => {
    const headerHeight = header.offsetHeight;
    const scrollY = window.scrollY;

    if ((scrollY > headerHeight * .20) && (scrollY < headerHeight) && (window.outerWidth > 768)) {
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
