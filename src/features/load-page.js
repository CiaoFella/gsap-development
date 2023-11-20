import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import $ from 'jquery'
import SplitType from 'split-type'
gsap.registerPlugin(CustomEase)

const progressCircle = document.getElementById('is-progress-circle')
const progressRotatingPlanet = document.querySelector(
  '.progress-circle-planet-inner-wrap'
)
const progressAnimationClick = document.querySelector('#js-page-loader-click')
const content = document.querySelector('.section-hero')

$('body').addClass('overflow-hidden')
progressAnimationClick.style.pointerEvents = 'none'
content.style.opacity = '0'

$(window).on('resize', function () {
  setTimeout(() => {
    endLoaderAnimation()
  }, 1000)
})

function animateLines() {
  $('[svg="animated"]').css({
    opacity: 0,
    transition: 'opacity 400ms ease',
  })
  $('[svg="animated"] path').each(function () {
    var pathLength = this.getTotalLength()
    $(this).attr({
      'stroke-dasharray': pathLength,
      'stroke-dashoffset': pathLength,
    })
    var svgAnimated = $(this).closest('[svg="animated"]')
    var svgAnimatedTop = svgAnimated.offset().top
    var svgAnimatedHeight = svgAnimated.outerHeight()
    var windowHeight = $(window).height()
    var windowScrollTop = $(window).scrollTop()
    var animationDuration = svgAnimated.attr('svg-animation-time') || 5000

    if (
      windowScrollTop + windowHeight > svgAnimatedTop &&
      windowScrollTop < svgAnimatedTop + svgAnimatedHeight
    ) {
      $(svgAnimated).css('opacity', 1)
      $(this).css({
        transition: 'stroke-dashoffset ' + animationDuration + 'ms ease-out',
        'stroke-dashoffset': 0,
      })
    }
  })
}

let counter = {
  value: 0,
}
let loaderDuration = 7
const customEase =
  'M0,0 C0.062,0.122 0.139,0.328 0.464,0.518 0.543,0.564 0.554,0.716 0.682,0.838 0.79,0.941 0.877,1 1,1 '

if (sessionStorage.getItem('visited') !== null) {
  loaderDuration = 3.5
  counter = {
    value: 70,
  }
}
sessionStorage.setItem('visited', 'true')

function updateLoaderText() {
  let progress = Math.round(counter.value)
  $('#progress-text').text(progress + '%')
}

function endLoaderAnimation() {
  progressAnimationClick.style.pointerEvents = 'auto'
  content.style.opacity = '1'
  progressAnimationClick.click()
  $(window).on('beforeunload', function () {
    $(window).scrollTop(0)
  })
  animateLines()
  heroAnimation()
}

function endHeroAnimation() {
  $('body').removeClass('overflow-hidden')
}

function heroAnimation() {
  let heroTl = gsap.timeline({ onComplete: endHeroAnimation })
  const headlineWrap = document.querySelector('.hero-headline-inner')
  const headline = headlineWrap.querySelectorAll('.heading-style-h1')
  const subHeadline = headlineWrap.querySelector('.heading-style-h4')
  const horizonIcon = headlineWrap.querySelector('.horizon-icon')
  const scrollIndicator = document.querySelector('.scroll-indicator')
  const headlineSplit = new SplitType(headline)
  const subHeadlineSplit = new SplitType(subHeadline)
  const delay = 1
  const duration = 1
  heroTl.fromTo(
    headlineSplit.chars,
    {
      opacity: 0,
      y: '100%',
    },
    {
      opacity: 1,
      y: '0%',
      delay: delay,
      duration: 0.75,
      stagger: 0.03,
      ease: 'power2.out',
    }
  )
  heroTl.fromTo(
    subHeadlineSplit.chars,
    {
      opacity: 0,
      y: '100%',
    },
    {
      opacity: 1,
      y: '0%',
      delay: delay + duration,
      duration: duration / 2,
      stagger: 0.01,
      ease: 'power2.out',
    },
    0
  )
  heroTl.fromTo(
    headlineWrap,
    {
      y: '20%',
    },
    {
      delay: delay,
      duration: duration + 1.5,
      y: '0%',
    },
    0
  )
  heroTl.fromTo(
    horizonIcon,
    {
      rotationZ: -90,
      opacity: 0,
    },
    {
      rotationZ: 0,
      opacity: 1,
      delay: delay + 1,
      duration: 2,
      ease: 'power4.out',
    },
    0
  )
  heroTl.from(
    '.hero-bottom',
    {
      opacity: 0,
      delay: delay + 1.5,
      y: '100%',
      duration: 1,
      ease: 'power4.out',
    },
    0
  )
  heroTl.from(
    '.line-wrap',
    {
      delay: delay + 1,
      height: '0%',
      duration: 2,
      ease: 'power2.out',
    },
    0
  )
  heroTl.from(
    '.navigation-background-line.is-nav-bottom',
    {
      delay: delay,
      width: '0%',
      duration: 3,
      ease: 'power4.out',
    },
    0
  )
  heroTl.from(scrollIndicator, {
    opacity: 0,
    scale: '0.5',
    duration: 1,
    ease: 'power4.out',
  })
}

const startLoaderAnimation = () => {
  let tl = gsap.timeline({
    onComplete: endLoaderAnimation,
  })
  gsap.to(progressCircle, {
    delay: 0.75,
    strokeDashoffset: 0,
    duration: loaderDuration + 1,
    ease: CustomEase.create('custom', customEase),
  })
  tl.to(counter, {
    onUpdate: updateLoaderText,
    delay: 0.75,
    value: 100,
    duration: loaderDuration,
    ease: CustomEase.create('custom', customEase),
  })
  tl.to(
    progressRotatingPlanet,
    {
      delay: 0.75,
      rotation: 1440,
      duration: loaderDuration + 0.3,
      ease: 'circ.out',
    },
    0
  )
}

startLoaderAnimation()
