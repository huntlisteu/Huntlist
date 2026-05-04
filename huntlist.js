!function(){
    var lang='en';

    // THEME
    var themeBtn=document.getElementById('theme-btn');
    function setTheme(dark){
        if(dark){document.body.classList.add('dark');themeBtn.textContent='\uD83C\uDF19';}
        else{document.body.classList.remove('dark');themeBtn.textContent='\u2600\uFE0F';}
        document.getElementById('nav-logo').src=dark?'logo.svg':'logo_alt.svg';
        document.getElementById('footer-logo').src=dark?'logo.svg':'logo_alt.svg';
    }
    var saved=localStorage.getItem('hl-theme');
    var sysDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(saved?saved==='dark':sysDark);
    themeBtn.addEventListener('click',function(){
        var nowDark=!document.body.classList.contains('dark');
        setTheme(nowDark);
        localStorage.setItem('hl-theme',nowDark?'dark':'light');
    });

    // LANG
    function setLang(l){
        lang=l;
        var dark=document.body.classList.contains('dark');
        document.body.className='lang-'+l+(dark?' dark':'');
        document.documentElement.lang=l;
        document.getElementById('btn-en').classList.toggle('active',l==='en');
        document.getElementById('btn-it').classList.toggle('active',l==='it');
        document.getElementById('nav-cta').textContent=l==='en'?'Join the waitlist':'Unisciti alla lista';
        document.getElementById('cta-btn').textContent=l==='en'?'Get early access':'Accesso anticipato';
        document.getElementById('cta-email').placeholder=l==='en'?'your@email.com':'tua@email.it';
        document.getElementById('form-en').style.display=l==='en'?'flex':'none';
        document.getElementById('form-it').style.display=l==='it'?'flex':'none';
    }
    document.getElementById('btn-en').addEventListener('click',function(){setLang('en');});
    document.getElementById('btn-it').addEventListener('click',function(){setLang('it');});
    document.getElementById('nav-cta').addEventListener('click',function(){
        document.getElementById(lang==='en'?'email-en':'email-it').focus();
    });

    // FAQ
    document.querySelectorAll('.faq-q').forEach(function(q){
        q.addEventListener('click',function(){
            var item=q.parentElement;
            var open=item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(function(i){i.classList.remove('open');});
            if(!open)item.classList.add('open');
        });
    });

    // WAITLIST
    function join(inputId,noteId){
        var input=document.getElementById(inputId);
        var note=document.getElementById(noteId);
        var it=lang==='it';
        if(input.value&&input.value.indexOf('@')>0){
            note.textContent=it?'Sei in lista! Ti avviseremo al lancio.':"You're on the list! We'll reach out when we launch.";
            note.style.color='#5DCAA5';
            note.style.fontWeight='500';
            input.value='';
            setTimeout(function(){
                note.textContent=it?'Niente spam.':'No spam.';
                note.style.color='';note.style.fontWeight='';
            },5000);
        }else{
            input.style.borderColor='#F5855A';
            input.focus();
            setTimeout(function(){input.style.borderColor='';},2000);
        }
    }
    document.getElementById('join-en').addEventListener('click',function(){join('email-en','note-en');});
    document.getElementById('join-it').addEventListener('click',function(){join('email-it','note-it');});
    document.getElementById('cta-btn').addEventListener('click',function(){
        var input=document.getElementById('cta-email');
        var note=document.getElementById('cta-note');
        var it=lang==='it';
        if(input.value&&input.value.indexOf('@')>0){
            note.innerHTML='<span style="color:#9FE1CB;font-weight:500">'+(it?'Sei in lista!':"You're on the list!")+'</span>';
            input.value='';
        }else{
            input.style.borderColor='rgba(255,255,255,0.8)';
            input.focus();
            setTimeout(function(){input.style.borderColor='';},2000);
        }
    });
}();