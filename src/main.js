if (window.location.href.split('/').pop() === '') {
  import('./features/load-page').then()
  import('./features/change-planet').then()
  import('./features/menu-animation').then()
  import('./features/transition-page').then()
} else {
  import('./features/transition-page').then()
  import('./features/load-content-page').then()
}
