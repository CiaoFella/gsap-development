import gsap from 'gsap'
import $ from 'jquery'

$('.content-wrapper').addClass('first')
let nextPageLink

$('.is-liquid-link').on('click', function (e) {
  e.preventDefault()
  console.log()
  nextPageLink = $(this).attr('href')
  if ($(e.target).hasClass('is-back-home')) {
    $.ajax({
      url: nextPageLink,
      success: function (response) {
        let element = $(response).find('.page-loader')
        $('.main-wrapper').append(element)
      },
      complete: function () {
        pageTransitionHome()
      },
    })
  } else {
    $.ajax({
      url: nextPageLink,
      success: function (response) {
        let element = $(response).find('.page-loader_background-wrap')
        $('.main-wrapper').append(element)
      },
      complete: function () {
        pageTransition()
      },
    })
  }
})

function pageTransition() {
  $('html').addClass('animating')
  let pageTl = gsap.timeline({
    onComplete: updatePage,
  })
  pageTl.from('.page-loader_background-wrap', {
    y: '100vh',
    delay: 0.25,
    duration: 0.8,
    ease: 'power2.out',
  })
  pageTl.to(
    '.content-wrapper.first',
    {
      webkitFilter: 'blur(20px)',
      duration: 0.8,
      ease: 'power1.out',
    },
    0
  )
}

function pageTransitionHome() {
  $('html').addClass('animating')
  let pageTl = gsap.timeline({
    onComplete: updatePage,
  })
  pageTl.fromTo(
    '.page-loader',
    {
      y: '100%',
      display: 'flex',
    },
    {
      y: '0%',
      delay: 1,
      duration: 1,
    },
    0
  )
  pageTl.to(
    '.content-wrapper.first',
    {
      webkitFilter: blur(5),
      delay: 0.5,
      duration: 2,
    },
    0
  )
}

function updatePage() {
  window.location = nextPageLink
}
