!function(){
    var lang='en';

    function lsGet(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
    function lsSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }

    var themeBtn=document.getElementById('theme-btn');
    var navLogo=document.getElementById('nav-logo');
    var footerLogo=document.getElementById('footer-logo');

    function setTheme(dark){
        if(dark){document.body.classList.add('dark');if(themeBtn)themeBtn.textContent='\uD83C\uDF19';}
        else{document.body.classList.remove('dark');if(themeBtn)themeBtn.textContent='\u2600\uFE0F';}
        if(navLogo)navLogo.src=dark?'logo.svg':'logo_alt.svg';
        if(footerLogo)footerLogo.src=dark?'logo.svg':'logo_alt.svg';
    }

    var saved=lsGet('hl-theme');
    var sysDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(saved?saved==='dark':sysDark);

    if(themeBtn){
        themeBtn.addEventListener('click',function(){
            var nowDark=!document.body.classList.contains('dark');
            setTheme(nowDark);
            lsSet('hl-theme',nowDark?'dark':'light');
        });
    }

    var btnEn=document.getElementById('btn-en');
    var btnIt=document.getElementById('btn-it');

    function setLang(l){
        lang=l;
        var dark=document.body.classList.contains('dark');
        document.body.className='lang-'+l+(dark?' dark':'');
        document.documentElement.lang=l;
        if(btnEn)btnEn.classList.toggle('active',l==='en');
        if(btnIt)btnIt.classList.toggle('active',l==='it');
    }

    if(btnEn)btnEn.addEventListener('click',function(){setLang('en');});
    if(btnIt)btnIt.addEventListener('click',function(){setLang('it');});

    document.querySelectorAll('.faq-q').forEach(function(q){
        q.addEventListener('click',function(){
            var item=q.parentElement;
            var open=item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(function(i){i.classList.remove('open');});
            if(!open)item.classList.add('open');
        });
    });

    var revealEls=document.querySelectorAll('.reveal,.reveal-stagger');
    if(revealEls.length && 'IntersectionObserver' in window){
        document.documentElement.classList.add('reveal-ready');
        var io=new IntersectionObserver(function(entries){
            entries.forEach(function(e){
                if(e.isIntersecting){
                    e.target.classList.add('in');
                    io.unobserve(e.target);
                }
            });
        },{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
        revealEls.forEach(function(el){io.observe(el);});
        // rete di sicurezza: se per qualunque motivo l'observer non scatta, rivela tutto
        setTimeout(function(){
            revealEls.forEach(function(el){el.classList.add('in');});
        },1600);
    }
}();
