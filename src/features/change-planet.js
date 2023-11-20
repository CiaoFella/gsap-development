import gsap from 'gsap'
import SplitType from 'split-type'

const viewer = document.querySelector('#ez-viewer')

let currentState
if (viewer) {
  viewer.addEventListener('ez-currentState', (event) => {
    setTimeout(() => {
      currentState = event.detail
    }, 50)
  })
}

function initializeFunction() {
  const allPlanetTabs = document.querySelectorAll('.navigation-tab-step')
  setClickAttributes()
  setInitalActiveTabState()
  intitializeMenuClick()
  viewer.addEventListener('ez-planet', planetClick)
  allPlanetTabs.forEach((element) => {
    element.addEventListener('click', (e) => {
      setTimeout(() => {
        setInitalActiveTabState()
        setActiveContentTab()
        disableScroll()
      }, '150')
      startPlanetDetailAnimation(e)
    })
  })
}

const disableScroll = () => {
  const body = document.querySelector('body')
  const hideWhenPlanetItem = document.querySelectorAll('.hide-when-planet')
  if (currentState === 'sun') {
    body.style.overflow = 'visible'
    hideWhenPlanetItem.forEach((singleItem) => {
      singleItem.style.display = 'flex'
    })
  } else {
    body.style.overflow = 'hidden'
    hideWhenPlanetItem.forEach((singleItem) => {
      singleItem.style.display = 'none'
    })
  }
  window.scrollTo(0, document.body.scrollHeight)
}

const intitializeMenuClick = () => {
  const clickableMenu = document.querySelector('.is-menu')
  clickableMenu.addEventListener('click', () => {
    clickableMenu.classList.toggle('is-active-menu')
  })
}

const planetClick = (event) => {
  if (currentState.includes('close') || currentState === 'sun') {
    return
  } else {
    const currentClickedPlanet = event.detail
    let findClickRelatedTab
    let findClickRelatedTabContent

    if (currentClickedPlanet === 'sun') {
      findClickRelatedTab = document.querySelector(
        `.navigation-tab-step[data-ez-click=${currentClickedPlanet}]`
      )
      findClickRelatedTabContent = document.querySelector(
        `.navigation-planet-detail-inner[data-ez-click=${currentClickedPlanet}]`
      ).parentNode
    } else {
      findClickRelatedTab = document.querySelector(
        `.navigation-tab-step[data-ez-click=${currentClickedPlanet}_close2]`
      )
      findClickRelatedTabContent = document.querySelector(
        `.navigation-planet-detail-inner[data-ez-click=${currentClickedPlanet}_close2]`
      ).parentNode
    }
    findClickRelatedTab.classList.add('w--current')
    findClickRelatedTabContent.classList.add('w--tab-active')
    findClickRelatedTab.click()
  }
}

const startPlanetDetailAnimation = (e) => {
  const activeTabDataAttribute = document.querySelector(
    '.navigation-tab-step.w--current'
  ).dataset.ezClick

  setTimeout(() => {
    const currentlySelectedInnerItem = document.querySelector(
      '.navigation-planet-detail.w-tab-pane.w--tab-active'
    )
    const planetDetailContentList = currentlySelectedInnerItem.querySelectorAll(
      '.planet-detail-overview-item'
    )
    const planetDetailInformationList =
      currentlySelectedInnerItem.querySelectorAll('.is-information')
    const splitInformationText = new SplitType(planetDetailInformationList, {
      types: 'lines',
    })
    const horizonIcon =
      currentlySelectedInnerItem.querySelector('.horizon-icon')
    const allInformationItems = [horizonIcon, splitInformationText.lines]

    function triggerPlanetAnimations() {
      if (planetDetailContentList.length > 0) {
        gsap.fromTo(
          planetDetailContentList,
          {
            opacity: 0,
            x: '-100%',
          },
          {
            opacity: 1,
            x: '0%',
            delay: 0.5,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out',
          }
        )
        gsap.fromTo(
          allInformationItems,
          {
            opacity: 0,
            x: '100%',
          },
          {
            opacity: 1,
            x: '0%',
            delay: 0.5,
            duration: 1,
            stagger: 0.05,
            ease: 'power4.out',
          }
        )
      }
    }
    if (
      (currentState === activeTabDataAttribute && e.pointerId === 1) ||
      (currentState === 'sun' && activeTabDataAttribute === 'sun')
    ) {
      return
    } else {
      triggerPlanetAnimations()
    }
  }, 125)
}

const setInitalActiveTabState = () => {
  const activeContentTab = document.querySelectorAll(
    '.navigation-planet-detail.w--tab-active'
  )
  if (activeContentTab) {
    const innerContent = activeContentTab[0].querySelectorAll(
      '.navigation-planet-detail-inner'
    )
    const firstInnerContent = innerContent[0]
    if (firstInnerContent) {
      const firstInnerContentDot =
        firstInnerContent.querySelector('.navigation-step')
      if (firstInnerContentDot) {
        innerContent.forEach((element) => {
          const singleContentDot = element.querySelector('.navigation-step')
          element.classList.remove('is-active')
          singleContentDot.classList.remove('is-active')
        })
        firstInnerContent.classList.add('is-active')
        firstInnerContentDot.classList.add('is-active')
      }
    }
    setClickAttributes()
  }
}

const setActiveContentTab = () => {
  const activeContentTab = document.querySelectorAll(
    '.navigation-planet-detail.w--tab-active'
  )
  const innerContent = activeContentTab[0].querySelectorAll(
    '.navigation-planet-detail-inner'
  )
  innerContent.forEach((innerItem) => {
    innerItem.addEventListener('click', () => {
      const currentlySelectedInnerItem = document.querySelectorAll(
        '.navigation-planet-detail-inner.is-active'
      )
      const newlySelectedInnerItemDot = document.querySelectorAll(
        '.navigation-planet-detail-inner.is-active .navigation-step.is-active'
      )
      const currentItemDot = innerItem.querySelector('.navigation-step')
      if (currentlySelectedInnerItem.length > 0) {
        innerContent.forEach((element) => {
          const allInnerItemDots = element.querySelector('.navigation-step')
          allInnerItemDots.classList.remove('is-active')
          element.classList.remove('is-active')
        })
        currentlySelectedInnerItem[0].classList.remove('is-active')
        newlySelectedInnerItemDot[0].classList.remove('is-active')
      }
      innerItem.classList.add('is-active')
      currentItemDot.classList.add('is-active')
    })
  })
}

const setClickAttributes = () => {
  const getAllItmesWithDataAttribute = Array.from(
    document.querySelectorAll('[data-ez-click]')
  )
  getAllItmesWithDataAttribute.forEach((dataItem) => {
    const getAllChildrenOfDataItem = Array.from(dataItem.children)
    const getDataValue = dataItem.dataset.ezClick
    const noDataAttribute = dataItem.querySelectorAll('.planet-detail-inner')
    getAllChildrenOfDataItem.forEach((childDataItem) => {
      childDataItem.setAttribute('data-ez-click', `${getDataValue}`)
    })
    if (noDataAttribute) {
      noDataAttribute.forEach((noAttributeItem) => {
        noAttributeItem.removeAttribute('data-ez-click')
      })
    }
  })
}

initializeFunction()
