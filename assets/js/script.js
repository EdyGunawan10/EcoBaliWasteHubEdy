(function(){
  var toggle=document.querySelector('.menu-toggle');
  var nav=document.querySelector('.main-nav');
  if(toggle&&nav){
    toggle.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      document.body.classList.toggle('menu-open',open);
      toggle.setAttribute('aria-expanded',open?'true':'false');
    });
  }

  var reportForms=document.querySelectorAll('[data-report-form]');
  reportForms.forEach(function(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=form.querySelector('.status-message');
      if(msg){
        msg.textContent='Laporan berhasil tersimpan pada simulasi tampilan. Pada versi produksi, data ini dapat diteruskan ke petugas lapangan.';
        msg.classList.add('show');
      }
      form.reset();
    });
  });

  var tabs=document.querySelectorAll('[data-filter]');
  var cards=document.querySelectorAll('[data-category]');
  tabs.forEach(function(tab){
    tab.addEventListener('click',function(){
      tabs.forEach(function(t){t.classList.remove('active');});
      tab.classList.add('active');
      var target=tab.getAttribute('data-filter');
      cards.forEach(function(card){
        var match=target==='all'||card.getAttribute('data-category')===target;
        card.classList.toggle('show',match);
      });
    });
  });

  var counters=document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window){
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting)return;
        var el=entry.target;
        var max=Number(el.getAttribute('data-count'))||0;
        var suffix=el.getAttribute('data-suffix')||'';
        var start=0;
        var step=Math.max(1,Math.ceil(max/42));
        var timer=setInterval(function(){
          start+=step;
          if(start>=max){start=max;clearInterval(timer);}
          el.textContent=start+suffix;
        },26);
        observer.unobserve(el);
      });
    },{threshold:.45});
    counters.forEach(function(el){observer.observe(el);});
  }
})();
