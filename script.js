
	    // global variables
	    let currenPath = window.location.pathname;
	    
	    let progressBarDiv = document.createElement('span');
	     progressBarDiv.className = 'progress-bar';
	    
	    window.addEventListener('scroll', () => {
	        
	        localStorage.setItem('scrollPosition_' + currenPath, window.scrollY);
	        
	        const windowHeight = window.innerHeight;
	        
            const fullHeight = document.documentElement.scrollHeight;
            
            const scrolled = window.scrollY;
            
            const progressWidth = (scrolled / (fullHeight - windowHeight)) * 100;
            
              progressBarDiv.style.width = progressWidth + '%';
	    });
	    
	    window.addEventListener('load', () => {
	        
	        // more content global variable
	        let moreContent = document.getElementById('more-content');
	        
	        // ad
	        let ad= document.createElement('a');
	        ad.className = 'ad'
    	    ad.innerText = '♥️'
    	    
    	    ad.href = 'https://paypou.com/Ky5C/33730574';
    	    ad.target = '_blank';
	        
	        // header
	        let header = document.createElement('button')
	        header.innerText = "Chessiary"
	        header.className = "header";
	        
	        header.addEventListener('click', () => {
	            window.scrollTo(0,0);
	        });
	        // save scroll position
	        let scrollPosition = localStorage.getItem('scrollPosition_' + currenPath);
	        
	        if(scrollPosition){
	            window.scrollTo(0, scrollPosition);
	        }
	        
	        // append more content
	        moreContent.append(header);
	        moreContent.append(progressBarDiv);
	        moreContent.append(ad);
	    });
	    if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('sw.js')
            .then(registration => {
              console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
              console.error('Service Worker registration failed:', error);
            });
        }
	