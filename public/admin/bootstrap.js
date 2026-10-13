(async () => {
  const status=document.getElementById('cms-status');
  try {
    // Relative paths work at the domain root and under the GitHub Pages base.
    const response=await fetch(new URL('config.yml',location.href));
    if(!response.ok) throw new Error('CMS-konfigurationen kunde inte hämtas.');
    const text=await response.text();
    if(!/base_url:\s*https:\/\//.test(text)) {
      status.textContent='CMS behöver en konfigurerad OAuth-förmedlare innan inloggning kan användas. Webbplatsen och bildexporterna fungerar oberoende av inloggningen. Se docs/oauth.md i repositoryt.';
      return;
    }
    window.CMS_MANUAL_INIT=true;
    const script=document.createElement('script');script.src=new URL('vendor/decap-cms.js',location.href).href;
    script.onload=()=>{
      window.CMS.registerMediaLibrary({
        name:'protected-exports',enableStandalone:false,
        init:()=>({show:()=>alert('Bildoriginal laddas inte upp i det offentliga repositoryt. Exportera vattenstämplade webbversioner från en skyddad källa och välj bild-ID i bildbiblioteket.'),hide:()=>{}})
      });
      status.hidden=true;window.CMS.init();
    };
    script.onerror=()=>{status.textContent='CMS-appen kunde inte laddas.';};
    document.body.append(script);
  } catch(error) {status.textContent=error.message;}
})();
