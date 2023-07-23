/**
* Template Name: ZenBlog
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/zenblog-bootstrap-blog-template/
* Author: BootstrapMade.com
* License: https:///bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Mobile nav toggle
   */

  const mobileNavToogleButton = document.querySelector('.mobile-nav-toggle');

  if (mobileNavToogleButton) {
    mobileNavToogleButton.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    });
  }

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToogleButton.classList.toggle('bi-list');
    mobileNavToogleButton.classList.toggle('bi-x');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Hero Slider
   */
  var swiper = new Swiper(".sliderFeaturedPosts", {
    spaceBetween: 0,
    speed: 500,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".custom-swiper-button-next",
      prevEl: ".custom-swiper-button-prev",
    },
  });

  /**
   * Open and close the search form.
   */
  const searchOpen = document.querySelector('.js-search-open');
  const searchClose = document.querySelector('.js-search-close');
  const searchWrap = document.querySelector(".js-search-form-wrap");

  searchOpen.addEventListener("click", (e) => {
    e.preventDefault();
    searchWrap.classList.add("active");
  });

  searchClose.addEventListener("click", (e) => {
    e.preventDefault();
    searchWrap.classList.remove("active");
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});


//audio
const audioPlayers = document.querySelectorAll('.audio-player audio');

audioPlayers.forEach((audioPlayer) => {
  audioPlayer.addEventListener('play', () => {
    audioPlayer.parentElement.classList.add('playing');
  });

  audioPlayer.addEventListener('pause', () => {
    audioPlayer.parentElement.classList.remove('playing');
  });

  audioPlayer.parentElement.addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  });
});


// calendar
document.addEventListener('DOMContentLoaded', function () {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const monthYear = document.getElementById('monthYear');
  const days = document.getElementById('days');
  const posterContainer = document.querySelector('.posterContainer');

  const posters = {
    '2023-07-09': 'assets/img/poster3.jpg',
    '2023-07-22': 'assets/img/poster2.jpg',
    '2023-07-23': 'assets/img/poster1.jpg',
    // Add more dates and corresponding poster URLs as needed
  };

  let currentDate = new Date();
  let selectedDate = null;
  let prevSelectedDate = null;

  function updateCalendar() {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    monthYear.textContent = currentDate.toLocaleString('en-us', { month: 'long', year: 'numeric' });

    let day = firstDayOfMonth.getDay();
    days.innerHTML = '';

    // Add empty cells for days of the previous month
    for (let i = prevMonthLastDay - day + 1; i <= prevMonthLastDay; i++) {
      const cell = document.createElement('div');
      cell.classList.add('prev-month');
      cell.textContent = i;
      days.appendChild(cell);
    }

    // Add cells for days of the current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const cell = document.createElement('div');
      if (i === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear()) {
        cell.classList.add('current-day');
      }
      // Create a date string in the same format as your "posters" keys
      let thisDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

      // If this date is in the "posters" object, add a 'poster-date' class
      if (posters.hasOwnProperty(thisDate)) {
        cell.classList.add('poster-date');
      }
      cell.textContent = i;
      days.appendChild(cell);
    }

    // Add empty cells for days of the next month
    let nextMonthDays = 7 - (days.childElementCount % 7);
    if (nextMonthDays !== 7) {
      for (let i = 1; i <= nextMonthDays; i++) {
        const cell = document.createElement('div');
        cell.classList.add('next-month');
        cell.textContent = i;
        days.appendChild(cell);
      }
    }

    // Add click event listeners to each day
    const dayCells = days.querySelectorAll('div:not(.prev-month):not(.next-month)');
    dayCells.forEach((cell) => {
      cell.addEventListener('click', () => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), cell.textContent);
        if (selectedDate && selectedDate.getTime() === clickedDate.getTime()) {
          // Deselect the date if it's already selected
          selectedDate = null;
          dayCells.forEach((cell) => cell.classList.remove('selected'));
          posterContainer.innerHTML = '<img src="assets/img/default-poster.jpg" class="poster" alt="">'; // Set default poster
        } else {
          // Select the date and display the corresponding poster
          selectedDate = clickedDate;
          dayCells.forEach((cell) => cell.classList.remove('selected'));
          cell.classList.add('selected');
          updatePoster();
        }
      });
    });
  }

 function updatePoster() {
  // Sample data to demonstrate changing poster image based on selected date
  if (selectedDate) {
    const adjustedDate = new Date(selectedDate);
    adjustedDate.setDate(adjustedDate.getDate() + 1);
    const selectedDateStr = adjustedDate.toISOString().split('T')[0];
    if (posters[selectedDateStr]) {
      const img = document.createElement('img');
      img.src = posters[selectedDateStr];
      img.alt = 'Poster';

      // Set the CSS style properties for the image
      img.style.width = '75%';
      img.style.border = '1px solid #ccc';

      // Only update the poster if the selected date has changed
      if (!prevSelectedDate || selectedDate.getTime() !== prevSelectedDate.getTime()) {
        posterContainer.innerHTML = ''; // Clear any existing content
        posterContainer.appendChild(img); // Append the new image
      }
    } else {
      // Set default poster when no matching date is found
      posterContainer.innerHTML = '<img src="assets/img/noEvent.jpg" class="poster" alt="">';
    }
  } else {
    // Check if there is a poster for the current date
    const currentDateStr = currentDate.toISOString().split('T')[0];
    if (posters[currentDateStr]) {
      const img = document.createElement('img');
      img.src = posters[currentDateStr];
      img.alt = 'Poster';

      // Set the CSS style properties for the image
      img.style.width = '75%';
      img.style.border = '1px solid #ccc';

      // Only update the poster if the selected date has changed
      if (!prevSelectedDate || currentDate.getTime() !== prevSelectedDate.getTime()) {
        posterContainer.innerHTML = ''; // Clear any existing content
        posterContainer.appendChild(img); // Append the new image
      }
    } else {
      // Set default poster when no date is selected
      posterContainer.innerHTML = '<img src="assets/img/default-poster.jpg" class="poster" alt="">';
    }
  }

  prevSelectedDate = selectedDate;
}

  prevBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
  });

  nextBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
  });

  updateCalendar();
});