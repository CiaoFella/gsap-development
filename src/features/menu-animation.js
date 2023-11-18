const menuClickTrigger = document.querySelector('.menu-wrap.is-menu')
const allMenuPlanets = document.querySelectorAll('.nav-single-planet')
allMenuPlanets.forEach((singlePlanet) => {
  singlePlanet.addEventListener('click', function handlePlanetClick(e) {
    console.log('clicked')
    e.stopPropagation()
    const clickedPlanetDataAttribute = e.target.dataset.ezClickJs
    const findCorrespondingTab = document.querySelector(
      `.navigation-tab-step[data-ez-click=${clickedPlanetDataAttribute}]`
    )
    if (findCorrespondingTab) {
      menuClickTrigger.click()
      setTimeout(() => {
        findCorrespondingTab.click()
      }, 500)
    }
  })
})
