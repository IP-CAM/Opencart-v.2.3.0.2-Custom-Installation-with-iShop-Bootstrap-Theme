var feed = new Instafeed({
  get: 'user',      // <-- new
  userId: '6725512930',   // <-- new
  clientId: '218e4100d4a44d94b8a38e2dbab7e81d',
  accessToken: '6725512930.218e410.24afc32b09b14c2eb3464b1dc3a4664f',
  template: '<li class="widget__item"><a href="{{link}}"><img src="{{image}}" /></a></li>',
  sortBy: 'most-recent',
  limit: '10',
  resolution: 'low_resolution'
});
feed.run();
