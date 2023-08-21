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
    let chessiaryTV = document.createElement('a');
    chessiaryTV.className = 'tv'
    chessiaryTV.innerText = 'TV'
    chessiaryTV.href = 'chessiary-tv/';

    // save scroll position
    let scrollPosition = localStorage.getItem('scrollPosition_' + currenPath);

    if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
    }

    // append more content
    moreContent.append(progressBarDiv);
    moreContent.append(chessiaryTV);
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