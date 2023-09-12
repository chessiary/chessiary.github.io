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

    // chessiary tv
    let switchBtn = document.createElement('button');
    let chessiaryTV = document.createElement('div');
    chessiaryTV.style.display = 'none';
    switchBtn.textContent = "TV";
    switchBtn.className = 'switch';
    switchBtn.addEventListener('click', () => {
        if(chessiaryTV.style.display == 'none'){
            chessiaryTV.style.display = 'block';
        }else{
            chessiaryTV.style.display = 'none';
        }
    });
    chessiaryTV.innerHTML =
    `
    <div class="tv-container">
    <div class="tv">
    <iframe src="https://lichess.org/tv/frame?theme=brown&bg=dark" allowtransparency="true" frameborder="0" title="Chessiary TV"></iframe>
    </div>
    </div>
    <video controls loop muted autoplay class="wakelock">
        <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/5/54/Yawning_kitten.ogv/Yawning_kitten.ogv.120p.vp9.webm">
    </video>
    `
    // save scroll position
    let scrollPosition = localStorage.getItem('scrollPosition_' + currenPath);

    if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
    }

    // append more content
    moreContent.append(progressBarDiv);
    moreContent.append(chessiaryTV);
    moreContent.append(switchBtn);
});

if ('serviceWorker' in navigator && window.matchMedia('(display-mode: standalone)').matches === false) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js');
            console.log('Service Worker registered:', registration);

            const {
                state
            } = registration;
            if (state === 'activated' || state === 'redundant') {
                showInstallPrompt(registration);
            } else {
                registration.addEventListener('statechange', event => {
                    if (event.target.state === 'activated' || event.target.state === 'redundant') {
                        showInstallPrompt(registration);
                    }
                });
            }
        } catch (error) {
            console.error('Service Worker registration failed:',
                error);
        }
    });
}

function showInstallPrompt(registration) {
    const deferredPrompt = registration.deferredPrompt;

    if (!deferredPrompt) {
        return;
    }

    const installButton = document.getElementById('install-button');

    installButton.addEventListener('click', () => {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }

            deferredPrompt = null;
        });
    });

    installButton.style.display = 'block';
}