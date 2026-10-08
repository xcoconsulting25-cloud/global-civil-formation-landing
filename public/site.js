(function(){
  try {
    var header = document.getElementById('siteHeader');
    if (header) {
      window.addEventListener('scroll', function(){ header.classList.toggle('scrolled', window.scrollY > 8); });
    }
  } catch(e) { console.error('header script error', e); }

  try {
    var navToggle = document.getElementById('navToggle');
    var navPanel = document.getElementById('navMobilePanel');
    if (navToggle && navPanel) {
      navToggle.addEventListener('click', function(){
        var isOpen = navPanel.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
  } catch(e) { console.error('nav toggle script error', e); }

  try {
    document.querySelectorAll('.faq-item').forEach(function(item){
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      if (!q || !a) return;
      q.addEventListener('click', function(){
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function(o){
          o.classList.remove('open');
          var oa = o.querySelector('.faq-a');
          if (oa) oa.style.maxHeight = null;
        });
        if (!isOpen){
          item.classList.add('open');
          a.style.maxHeight = (a.scrollHeight + 24) + 'px';
        }
      });
    });
  } catch(e) { console.error('faq script error', e); }

  try {
    var cd = document.getElementById('countdown');
    if (cd && cd.dataset.target) {
      var target = new Date(cd.dataset.target).getTime();
      var days = document.getElementById('cd-days');
      var hours = document.getElementById('cd-hours');
      var min = document.getElementById('cd-min');
      var sec = document.getElementById('cd-sec');
      var tick = function(){
        var diff = target - Date.now();
        if (!days || !hours || !min || !sec) return;
        if (diff <= 0){ days.textContent='0'; hours.textContent='0'; min.textContent='0'; sec.textContent='0'; return; }
        days.textContent = Math.floor(diff / 86400000);
        hours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0');
        min.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
        sec.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
      };
      tick();
      setInterval(tick, 1000);
    }
  } catch(e) { console.error('countdown script error', e); }
})();
