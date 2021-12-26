// Init JS
jQuery(document).ready(function($) {
  // FitText Settings
  setTimeout(() => {
    $('h1.responsive-headline')
        .fitText(1, {minFontSize: '40px', maxFontSize: '90px'});
  }, 100);

  // Highlight the current section in the navigation bar
  const sections = $('section');
  const navigationLinks = $('#nav-wrap a');
  sections.waypoint({
    handler: function(event, direction) {
      let activeSection;
      activeSection = $(this);
      if (direction === 'up') {
        activeSection = activeSection.prev();
      }
      const activeLink =
          $('#nav-wrap a[href="#' + activeSection.attr('id') + '"]');
      navigationLinks.parent().removeClass('current');
      activeLink.parent().addClass('current');
    },
    offset: '35%',
  });

  const header = document.getElementById('home');
  const body = document.getElementsByTagName('body')[0];

  // Make sure that #header-background-image height is equal to the browser
  // height.
  header.style.height = window.innerHeight;

  window.addEventListener('resize', () => {
    header.style.height = window.innerHeight;
    body.style.width = window.innerWidth;
  });

  // Fade In/Out Primary Navigation
  document.addEventListener('scroll', () => {
    const headerHeight = header.offsetHeight;
    const scrollY = window.scrollY;
    const nav = document.getElementById('nav-wrap');

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

  // Flexslider
  $('.flexslider').flexslider({
    namespace: 'flex-',
    controlsContainer: '.flex-container',
    animation: 'slide',
    controlNav: true,
    directionNav: false,
    smoothHeight: true,
    slideshowSpeed: 9000,
    animationSpeed: 600,
    randomize: false,
  });
});
