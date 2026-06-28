document.addEventListener('DOMContentLoaded', () => {
    generateBouquet();
    generateParticles();
    generateGlobalSparkles();

    const songBtn = document.getElementById('song-btn');
    const card = document.getElementById('card-wrapper');
    const letterContent = document.getElementById('letter-content');

    const part1 = [
        '<span class="first-letter">M</span>i veterinaria, mi doctora, mi niña, mi mujer, mi princesa,mi consentida, mi todo.',
        'Quiero decirte que disfrutes mucho tus vacaciones. Pásatela increíble, conoce lugares bonitos, vive cada momento y disfruta demasiado esta experiencia. De verdad deseo que te vaya muy bonito y que regreses con muchas historias que contarme.',
        'Yo aquí voy a estar, esperándote con muchas ganas para verte en cuanto regreses. Y aunque por estos días estemos un poquito lejos, quiero que sepas que sigo aquí para ti. Si me necesitas, si quieres hablar, si extrañas, si algo pasa o simplemente quieres contarme cómo va tu día, aquí voy a estar.',
        'Y también quiero decirte algo más…'
    ];

    const part2 = [
        'Me rindo.',
        'Me rindo completamente a ti.<br>Me rindo a no reprimir nada por ti, a cuidarte, a amarte bonito y a ser completamente tuyo.',
        'Me rindo porque contigo no quiero luchar contra lo que siento.<br>Porque contigo quiero quedarme.<br>Porque tú eres mi lugar bonito, mi paz y una de las cosas más lindas que tengo en mi vida.',
        'Disfruta mucho, mi amor.<br>Aquí te espera alguien que te quiere demasiado y que ya cuenta los días para volver a verte.',
        'Te quiero mucho 🤍.'
    ];

    const songLyrics = [
        { time: 22, text: "A veces te digo no" },
        { time: 24, text: "Porque no quiero dejarme a mí<br>Las ruinas del corazón" },
        { time: 29, text: "Tengo miedo de perder" },
        { time: 31, text: "Te advierto que la razón<br>Se puede quebrar de amor" },
        { time: 35, text: "Y desbordar los sentimientos<br>Que tanto tiempo tuve dentro" },
        { time: 40, text: "Si te gano pierdo igual" },
        { time: 43, text: "Si pierdo es porque me entrego<br>Es algo tan natural" },
        { time: 47, text: "Tener el control del juego<br>Es algo que no me va" },
        { time: 52, text: "Te dejo la libertad" },
        { time: 54, text: "De hacer conmigo lo que quieras<br>De quererme a tu manera" },
        { time: 59, text: "Y yo soy," },
        { time: 63, text: "la hoja que lleva el viento" },
        { time: 65, text: "Que va volando a tu alrededor" },
        { time: 68, text: "Y tú," },
        { time: 70, text: "el aire que me levanta<br>Que me da fuerza para este amor" },
        { time: 76, text: "Tu amor me hace tanto bien" },
        { time: 79, text: "Tu amor me hace tanto bien" },
        { time: 86, text: "Cierro los ojos, quiero tenerte cerca, sentir tu cuerpo" },
        { time: 91, text: "Dame tu mano, vuela conmigo cruzando el universo" },
        { time: 96, text: "Y siempre contigo estar," },
        { time: 97, text: "no hay otra forma de amar" },
        { time: 99, text: "Que desbordar los sentimientos<br>que tanto tiempo tuve dentro" },
        { time: 104, text: "Y yo soy," },
        { time: 109, text: "la hoja que lleva el viento<br>Que va volando a tu alrededor" },
        { time: 114, text: "Y tú," },
        { time: 118, text: "el aire que me levanta<br>Que me da fuerza para este amor" },
        { time: 122, text: "Y tú," },
        { time: 127, text: "la gota de lluvia fresca<br>Que va cayendo en mi corazón" },
        { time: 132, text: "Tu amor me hace tanto bien" },
        { time: 134, text: "Tu amor me hace tanto bien" },
        { time: 136, text: "Tu amor me hace tanto bien" },
        { time: 142, text: "La gota de lluvia fresca<br>Que va cayendo en mi corazón..." },
        { time: 148, text: "Y yo soy," },
        { time: 152, text: "la hoja que lleva el viento" },
        { time: 154, text: "Que va volando a tu alrededor" },
        { time: 157, text: "Y tú," },
        { time: 162, text: "el aire que me levanta<br>Que me da fuerza para este amor" },
        { time: 166, text: "Tu amor me hace tanto bien" },
        { time: 168, text: "Tu amor me hace tanto bien" },
        { time: 170, text: "Tu amor me hace tanto bien..." },
        { time: 174, text: "Tu amor me hace tanto bien" },
        { time: 176, text: "Tu amor me hace tanto bien" }
    ];

    function fadeInLines(container, scrollContainer, htmlArray, index, delay, onComplete) {
        if (index < htmlArray.length) {
            const p = document.createElement('p');
            p.innerHTML = htmlArray[index];
            p.style.opacity = '0';
            p.style.transition = 'opacity 2s ease, transform 2s ease';
            p.style.transform = 'translateY(15px)';
            container.appendChild(p);

            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';

                // Auto-scroll to new content
                scrollContainer.scrollTo({
                    top: scrollContainer.scrollHeight,
                    behavior: 'smooth'
                });

                // Dynamic delay based on string length
                let currentDelay = Math.max(delay || 3200, htmlArray[index].length * 28);
                if (htmlArray[index] === 'Me rindo.') {
                    currentDelay = 4500;
                }

                setTimeout(() => {
                    fadeInLines(container, scrollContainer, htmlArray, index + 1, delay, onComplete);
                }, currentDelay);
            }, 100);

        } else {
            if (onComplete) onComplete();
        }
    }

    const lyricsWrapper = document.getElementById('lyrics-wrapper');
    const lyricsContent = document.getElementById('lyrics-content');
    const finishLyricsBtn = document.getElementById('finish-lyrics-btn');

    let currentLyricIndex = -1;

    songBtn.addEventListener('click', () => {
        songBtn.classList.add('fade-out');

        const bgMusic = document.getElementById('bg-music');

        setTimeout(() => {
            songBtn.style.display = 'none';
            lyricsWrapper.classList.remove('hidden');

            if (bgMusic) {
                bgMusic.play().catch(e => console.log("Music play failed.", e));

                // Sync lyric display with audio playback
                bgMusic.addEventListener('timeupdate', () => {
                    let currentTime = bgMusic.currentTime;

                    let nextIndex = songLyrics.findIndex(lyric => lyric.time > currentTime);
                    if (nextIndex === -1) {
                        nextIndex = songLyrics.length;
                    }
                    let activeIndex = nextIndex - 1;

                    if (activeIndex !== currentLyricIndex && activeIndex >= 0) {
                        currentLyricIndex = activeIndex;

                        const existing = lyricsContent.querySelector('p');
                        if (existing) {
                            existing.classList.remove('show');
                            setTimeout(() => existing.remove(), 800);
                        }

                        const p = document.createElement('p');
                        p.innerHTML = songLyrics[activeIndex].text;
                        lyricsContent.appendChild(p);

                        // Force reflow for animation trigger
                        void p.offsetWidth;

                        p.classList.add('show');
                    }
                });

                bgMusic.addEventListener('ended', () => {
                    const existing = lyricsContent.querySelector('p');
                    if (existing) {
                        existing.classList.remove('show');
                        setTimeout(() => existing.remove(), 800);
                    }
                    
                    finishLyricsBtn.style.display = 'inline-block';
                    setTimeout(() => {
                        finishLyricsBtn.style.opacity = '1';
                    }, 100);
                });
            }
        }, 500);
    });

    finishLyricsBtn.addEventListener('click', () => {
        finishLyricsBtn.style.opacity = '0';
        finishLyricsBtn.style.pointerEvents = 'none';
        lyricsWrapper.classList.add('hidden');

        setTimeout(() => {
            finishLyricsBtn.style.display = 'none';
            lyricsWrapper.style.display = 'none';
            
            card.classList.remove('hidden');

            // Initialize letter sequence
            setTimeout(() => {
                fadeInLines(letterContent, document.querySelector('.card-inner'), part1, 0, 3500, () => {

                    // Display continuation prompt
                    const touchBtn = document.getElementById('touch-to-continue');
                    touchBtn.style.display = 'block';

                    const cardInner = document.querySelector('.card-inner');
                    cardInner.scrollTo({ top: cardInner.scrollHeight, behavior: 'smooth' });

                    setTimeout(() => {
                        touchBtn.style.opacity = '0.8';
                    }, 100);

                    // Await user interaction for part 2
                    touchBtn.addEventListener('click', function onClickContinue() {
                        touchBtn.removeEventListener('click', onClickContinue);
                        touchBtn.style.opacity = '0';

                        setTimeout(() => {
                            touchBtn.style.display = 'none';
                            card.classList.add('hidden');

                            // Reset and initialize second letter sequence
                            setTimeout(() => {
                                letterContent.innerHTML = '';
                                document.querySelector('.card-title').style.display = 'none';
                                document.querySelector('.top-plaque').style.display = 'none';
                                document.querySelector('.card-divider').style.display = 'none';
                                letterContent.style.marginTop = '40px';

                                card.classList.remove('hidden');

                                setTimeout(() => {
                                    fadeInLines(letterContent, document.querySelector('.card-inner'), part2, 0, 3500, () => {
                                        // Finalize letter sequence
                                        document.getElementById('bottom-divider').style.opacity = '0.8';
                                        document.getElementById('signature').style.opacity = '1';

                                        const restartBtn = document.getElementById('restart-btn');
                                        restartBtn.style.display = 'inline-block';
                                        setTimeout(() => {
                                            restartBtn.style.opacity = '1';
                                            cardInner.scrollTo({ top: cardInner.scrollHeight, behavior: 'smooth' });
                                        }, 100);
                                    });
                                }, 1000);
                            }, 2500);
                        }, 500);
                    });
                });
            }, 1000);
        }, 500);
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
        window.location.reload();
    });
});

function generateBouquet() {
    const bouquetContainer = document.querySelector('.bouquet-bg');

    // Bouquet composition data: x, y, scale, rotation
    const rosesData = [
        { x: 0, y: -80, scale: 1.8, r: 0 },
        { x: -140, y: -20, scale: 1.3, r: -25 },
        { x: 140, y: -30, scale: 1.4, r: 25 },
        { x: -220, y: 80, scale: 1.1, r: -40 },
        { x: 220, y: 70, scale: 1.2, r: 45 },
        { x: -80, y: 120, scale: 1.5, r: -15 },
        { x: 90, y: 130, scale: 1.4, r: 20 },
        { x: 0, y: 180, scale: 1.6, r: 5 }
    ];

    rosesData.forEach(data => {
        bouquetContainer.innerHTML += `
        <div class="css-rose" style="--scale: ${data.scale}; --x: ${data.x}px; --y: ${data.y}px; --r: ${data.r}deg;">
            <div class="rose-stem"></div>
            <div class="leaf left"></div>
            <div class="leaf right"></div>
            <div class="flower">
                <div class="petal p-outer p1"></div>
                <div class="petal p-outer p2"></div>
                <div class="petal p-outer p3"></div>
                <div class="petal p-outer p4"></div>
                <div class="petal p-outer p5"></div>
                
                <div class="petal p-inner p1-inner"></div>
                <div class="petal p-inner p2-inner"></div>
                <div class="petal p-inner p3-inner"></div>
                <div class="petal p-inner p4-inner"></div>
                <div class="petal p-inner p5-inner"></div>
                
                <div class="center"></div>
                <div class="flower-particles"></div>
            </div>
        </div>`;
    });
}

function generateParticles() {
    // Select all flower particle containers
    const particleContainers = document.querySelectorAll('.flower-particles');

    particleContainers.forEach(container => {
        const particleCount = 8;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');

            // Alternate between light points and petals
            if (Math.random() > 0.5) {
                particle.classList.add('red-particle');
                const size = Math.random() * 4 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
            } else {
                particle.classList.add('red-petal-particle');
                const size = Math.random() * 8 + 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size * 0.8}px`;
            }

            const duration = Math.random() * 4 + 3;
            const delay = Math.random() * 5;

            // Randomize radial explosion vectors
            const tx = (Math.random() - 0.5) * 300 + 'px';
            const ty = (Math.random() - 0.5) * 300 + 'px';
            const rot = (Math.random() * 720) + 'deg';

            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `-${delay}s`;
            particle.style.setProperty('--tx', tx);
            particle.style.setProperty('--ty', ty);
            particle.style.setProperty('--rot', rot);

            container.appendChild(particle);
        }
    });
}

function generateGlobalSparkles() {
    const container = document.getElementById('petals-container');
    const sparkleCount = 60;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');

        if (Math.random() > 0.5) {
            sparkle.classList.add('gold-sparkle');
        } else {
            sparkle.classList.add('silver-sparkle');
        }

        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 10;
        const drift = (Math.random() * 20 - 10) + 'vw';

        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.left = `${left}vw`;
        sparkle.style.animationDuration = `${duration}s`;
        sparkle.style.animationDelay = `-${delay}s`;
        sparkle.style.setProperty('--drift', drift);

        container.appendChild(sparkle);
    }
}
