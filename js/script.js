
	    // global variables
	    let currenPath = window.location.pathname;
	    
	    let progressBarDiv = document.createElement('span');
	     progressBarDiv.className = 'progress-bar';
	     
	    let notif = document.createElement('p');
	    notif.className = 'notif';
	    notif.innerText = "Your reading progress will be saved. You may come back later to continue reading if ever you want."
	    
	    let ad = document.createElement('div');
	    ad.className = 'ad'
	    ad.innerText = '♥️'
	    
	    ad.addEventListener('click', () => {
	        window.location.href = 'https://paypou.com/Ky5C/33730574';
	    });
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
	        
	        // home button
	        let homeBtn = document.createElement('button');
	        homeBtn.innerText = "Top";
	        homeBtn.className = "top-btn"
	        homeBtn.addEventListener('click', () => {
	             
	            window.scrollTo(0,0);
	        });
	        
	        // header
	        let header = document.createElement('button')
	        header.innerText = "Chessiary"
	        header.className = "header";
	        
	        header.addEventListener('click', () => {
	            window.location.href = '../index.html'
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
	        moreContent.append(homeBtn);
	        moreContent.append(header);
	        moreContent.append(progressBarDiv);
	        moreContent.append(notif);
	        moreContent.append(ad);
	    });
	