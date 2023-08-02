
	    // global variables
	    let currenPath = window.location.pathname;
	    
	    let progressBarDiv = document.createElement('span');
	     progressBarDiv.className = 'progress-bar';
	     
	    let notif = document.createElement('p');
	    notif.className = 'notif';
	    notif.innerText = "Your reading progress will be saved. You may come back later to continue reading if ever you want."
	    
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
	        
	        // hide notif
	        setTimeout(() => {
	            notif.style.display = "none";
	        }, 3500);
	        
	        // append more content
	        moreContent.append(header);
	        moreContent.append(progressBarDiv);
	        moreContent.append(notif);
	        moreContent.append(ad);
	    });
	