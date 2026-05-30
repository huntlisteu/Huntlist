!function(){
    function lsGet(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
    function lsSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }

    var themeBtn=document.getElementById('theme-btn');
    var navLogo=document.getElementById('nav-logo');

    function setTheme(dark){
        if(dark){document.body.classList.add('dark');if(themeBtn)themeBtn.textContent='\uD83C\uDF19';}
        else{document.body.classList.remove('dark');if(themeBtn)themeBtn.textContent='\u2600\uFE0F';}
        if(navLogo)navLogo.src=dark?'logo.svg':'logo_alt.svg';
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
}();