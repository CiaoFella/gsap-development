import gsap from 'gsap'
import SplitType from 'split-type'

let contentTl = gsap.timeline({})

const contentWrap = document.querySelector('.content-wrapper-content')
const headlineWrap = document.querySelector('.hero-headline-inner')
const headline = headlineWrap.querySelectorAll('.heading-style-h1')
const contentHeadline = document.querySelectorAll('.heading-style-h3 ')
const textContent = document.querySelectorAll('.content-text-content p')
const horizonIcon = headlineWrap.querySelector('.horizon-icon')
const allSMIcons = document.querySelectorAll(
  '.content-text-content .sm-icons_white .footer_icon-link'
)
const headlineSplit = new SplitType(headline)
const textContentSplit = new SplitType(textContent)
const delay = 1.5
const duration = 1
contentTl.to(
  contentWrap,
  {
    opacity: 1,
    duration: 0,
  },
  0
)
contentTl.fromTo(
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
contentTl.fromTo(
  textContentSplit.lines,
  {
    opacity: 0,
    y: '100%',
  },
  {
    opacity: 1,
    y: '0%',
    delay: delay,
    duration: 0.5,
    stagger: 0.075,
    ease: 'power2.out',
  },
  0
)
contentTl.fromTo(
  contentHeadline,
  {
    opacity: 0,
    y: '100%',
  },
  {
    opacity: 1,
    y: '0%',
    delay: delay,
    duration: 0.5,
    stagger: 0.075,
    ease: 'power2.out',
  },
  0
)
contentTl.to(
  headlineWrap,
  {
    delay: delay,
    autoAlpha: 1,
    duration: duration + 1.5,
    y: '-20%',
  },
  0
)
contentTl.from(
  horizonIcon,
  {
    rotationZ: -90,
    opacity: 0,
    delay: delay + 1,
    duration: 2,
    ease: 'power4.out',
  },
  0
)
contentTl.from(
  allSMIcons,
  {
    opacity: 0,
    y: '100%',
    delay: delay,
    duration: 0.5,
    stagger: 0.05,
    ease: 'power2.out',
  },
  0
)
