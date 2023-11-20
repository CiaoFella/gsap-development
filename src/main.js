if (window.location.href.split('/').pop() === '') {
  import('./features/change-planet')
  import('./features/load-page')
  import('./features/load-content-page')
  import('./features/menu-animation')
  import('./features/transition-page')
} else {
  import('./features/load-content-page')
  import('./features/transition-page')
}
