// Update active nav link based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and items
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.sushi-card, .ingredient-card, .glossary-item, .timeline-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effect to sushi cards
document.querySelectorAll('.sushi-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add floating animation to emojis in ingredient cards
document.querySelectorAll('.ingredient-icon').forEach(icon => {
    icon.style.animation = 'float 3s ease-in-out infinite';
});

// Add CSS animation for floating effect
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// Add click effect to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.animation = 'ripple 0.6s';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

console.log('🍣 Sushipedia loaded successfully! Enjoy exploring the world of sushi! 🍱');


// Quiz logic
function initQuiz() {
    const startBtn = document.getElementById('start-quiz-btn');
    const quizUI = document.getElementById('quiz-ui');
    const questionEl = document.getElementById('quiz-question');
    const answersEl = document.getElementById('quiz-answers');
    const explanationEl = document.getElementById('quiz-explanation');
    const nextBtn = document.getElementById('next-question-btn');
    const progressEl = document.getElementById('quiz-progress');
    const scoreEl = document.getElementById('quiz-score');
    const resultEl = document.getElementById('quiz-result');
    const progressFillEl = document.getElementById('quiz-progressbar-fill');
    const retryBtn = document.getElementById('retry-quiz-btn');

    if (!quizUI) return; // Not on a page with quiz UI

    const questionBank = [
        {
            q: '¿Cuál es el corazón del sushi? 🍚',
            options: [
                { t: 'Arroz de grano corto sazonado', correct: true, exp: 'Correcto: el arroz avinagrado sostiene todo el equilibrio del sushi.' },
                { t: 'La salsa de soya', correct: false, exp: 'La soya acompaña, pero el corazón es el arroz avinagrado.' },
                { t: 'El alga nori', correct: false, exp: 'El nori envuelve rolls, pero el centro del sushi es el arroz.' }
            ]
        },
        {
            q: 'El sashimi se caracteriza por… 🐟',
            options: [
                { t: 'Servirse sin arroz', correct: true, exp: 'Exacto: es pescado crudo de alta calidad, sin arroz.' },
                { t: 'Usar arroz por fuera', correct: false, exp: 'Eso es típico del uramaki, no del sashimi.' },
                { t: 'Llevar forma de cono', correct: false, exp: 'La forma de cono corresponde al temaki.' }
            ]
        },
        {
            q: '¿Qué indica “grado sashimi” en el pescado? ✅',
            options: [
                { t: 'Calidad y frescura aptas para consumo crudo', correct: true, exp: 'Correcto: significa que es seguro y de alta calidad para comer crudo.' },
                { t: 'Que está muy salado', correct: false, exp: 'No: “grado sashimi” se refiere a frescura y seguridad, no a sal.' },
                { t: 'Que se cocina a la parrilla', correct: false, exp: 'No: el sashimi se come crudo, no a la parrilla.' }
            ]
        },
        {
            q: '¿Qué rol cumple el jengibre encurtido (gari)? 🫚',
            options: [
                { t: 'Limpiar el paladar entre bocados', correct: true, exp: 'Sí: el gari refresca el paladar para apreciar nuevos sabores.' },
                { t: 'Hacer el sushi más picante', correct: false, exp: 'El picor lo aporta el wasabi; el gari limpia el paladar.' },
                { t: 'Sujetar el pescado al arroz', correct: false, exp: 'Eso se logra con la presión del moldeado, no con el gari.' }
            ]
        },
        {
            q: 'En un uramaki, ¿qué va por fuera? 🔄',
            options: [
                { t: 'El arroz', correct: true, exp: 'Correcto: en el uramaki el arroz va por fuera del nori.' },
                { t: 'El nori', correct: false, exp: 'En uramaki el nori va por dentro; el arroz por fuera.' },
                { t: 'El pescado', correct: false, exp: 'El pescado va como relleno; lo externo es el arroz.' }
            ]
        },
        {
            q: 'El alga nori aporta principalmente… 🌿',
            options: [
                { t: 'Sabor umami y textura crujiente', correct: true, exp: 'Exacto: nori suma umami y un toque crujiente al roll.' },
                { t: 'Dulzor intenso', correct: false, exp: 'El nori no es dulce; ofrece umami y salinidad.' },
                { t: 'Acidez', correct: false, exp: 'La acidez proviene del vinagre del arroz, no del nori.' }
            ]
        },
        {
            q: '¿Cuál de estos suele comerse con la mano? ✋',
            options: [
                { t: 'Nigiri', correct: true, exp: 'Bien: el nigiri tradicionalmente se come con las manos.' },
                { t: 'Chirashi', correct: false, exp: 'El chirashi se come en bol con utensilios, no con la mano.' },
                { t: 'Sashimi', correct: false, exp: 'El sashimi se come con palillos, no con la mano.' }
            ]
        },
        { q: '¿Para qué se tuesta ligeramente el nori? 🔥', options: [
            { t: 'Para hacerlo más crujiente', correct: true, exp: 'Correcto: el tostado le da textura crujiente.' },
            { t: 'Para que sea más dulce', correct: false, exp: 'No afecta el dulzor; aporta textura y aroma.' },
            { t: 'Para cambiar su color a rojo', correct: false, exp: 'No cambia a rojo; solo resalta textura y aroma.' }
        ]},
        { q: 'El wasabi se usa… 🌶️', options: [
            { t: 'Con moderación para realzar el pescado', correct: true, exp: 'Exacto: aporta picor suave y realza el sabor.' },
            { t: 'Para cubrir el sabor del pescado', correct: false, exp: 'Nunca debe tapar el sabor del pescado.' },
            { t: 'Para endulzar el arroz', correct: false, exp: 'No se usa para endulzar el arroz.' }
        ]},
        { q: '¿Qué forma tiene el temaki? 🍦', options: [
            { t: 'Cono', correct: true, exp: 'Correcto: el temaki es un cono de nori relleno.' },
            { t: 'Esfera', correct: false, exp: 'No, suele ser un cono, no una esfera.' },
            { t: 'Cubo', correct: false, exp: 'No, su forma típica es de cono.' }
        ]},
        { q: 'El chirashi se sirve… 🥣', options: [
            { t: 'En un bol con arroz y toppings', correct: true, exp: 'Exacto: chirashi es un bol con arroz y variedad encima.' },
            { t: 'Como conos individuales', correct: false, exp: 'Eso sería temaki.' },
            { t: 'En láminas sin arroz', correct: false, exp: 'Eso describe sashimi.' }
        ]},
        { q: 'El arroz de sushi ideal está… 🌡️', options: [
            { t: 'A temperatura ambiente', correct: true, exp: 'Correcto: ni caliente ni frío, a temperatura ambiente.' },
            { t: 'Helado', correct: false, exp: 'Muy frío afecta textura y sabor.' },
            { t: 'Hirviendo', correct: false, exp: 'Muy caliente arruina el montaje.' }
        ]},
        { q: '¿Qué detalle es típico del nigiri? 🍣', options: [
            { t: 'Arroz moldeado a mano', correct: true, exp: 'Exacto: se moldea a mano y va cubierto por pescado.' },
            { t: 'Corte en 8 piezas', correct: false, exp: 'Eso es típico del maki.' },
            { t: 'Arroz por fuera', correct: false, exp: 'Arroz por fuera es uramaki.' }
        ]},
        { q: '¿Qué relleno NO es pescado? 🥑', options: [
            { t: 'Aguacate', correct: true, exp: 'Bien: el aguacate es vegetal, no pescado.' },
            { t: 'Atún', correct: false, exp: 'El atún sí es pescado.' },
            { t: 'Salmón', correct: false, exp: 'El salmón es pescado.' }
        ]},
        { q: 'El gari normalmente es de color… 🎀', options: [
            { t: 'Rosa', correct: true, exp: 'Correcto: el jengibre encurtido suele ser rosado.' },
            { t: 'Azul', correct: false, exp: 'No, no se presenta azul.' },
            { t: 'Negro', correct: false, exp: 'No, negro no es su color.' }
        ]},
        { q: '¿Qué término describe al pepino en japonés? 🥒', options: [
            { t: 'Kyuuri', correct: true, exp: 'Bien: kyuuri significa pepino.' },
            { t: 'Sake', correct: false, exp: 'Sake es salmón.' },
            { t: 'Maguro', correct: false, exp: 'Maguro es atún.' }
        ]},
        { q: '¿Qué se busca en un pescado para sushi? 👃', options: [
            { t: 'Olor fresco a mar', correct: true, exp: 'Exacto: olor fresco, nada a “pescado fuerte”.' },
            { t: 'Olor fuerte a pescado', correct: false, exp: 'Olor fuerte indica poca frescura.' },
            { t: 'Olor dulce', correct: false, exp: 'No es un indicador típico.' }
        ]},
        { q: '¿Cuál es un corte preciso y fino? 🔪', options: [
            { t: 'Sashimi', correct: true, exp: 'Correcto: el sashimi requiere cortes precisos y finos.' },
            { t: 'Chirashi', correct: false, exp: 'Chirashi es bol, no cortes finos específicos.' },
            { t: 'Temaki', correct: false, exp: 'Temaki es cono, no cortes finos.' }
        ]},
        { q: 'El tamagoyaki es… 🥚', options: [
            { t: 'Tortilla japonesa dulce', correct: true, exp: 'Sí: es una tortilla dulce con azúcar y salsa de soya.' },
            { t: 'Salsa picante', correct: false, exp: 'No, es un tipo de huevo, no salsa.' },
            { t: 'Alga marina', correct: false, exp: 'No, alga sería nori.' }
        ]},
        { q: '¿Qué se suele mezclar con la soya? 🥢', options: [
            { t: 'Un poco de wasabi', correct: true, exp: 'Correcto: se puede mezclar wasabi con soya.' },
            { t: 'Arroz crudo', correct: false, exp: 'No se mezcla arroz crudo con soya.' },
            { t: 'Gari', correct: false, exp: 'El gari se come aparte para limpiar el paladar.' }
        ]},
        { q: 'El maki tradicionalmente está… 🟩', options: [
            { t: 'Envuelto en nori', correct: true, exp: 'Exacto: maki = rollo envuelto en alga nori.' },
            { t: 'Sin alga', correct: false, exp: 'Sin alga sería otra preparación.' },
            { t: 'En forma de cono', correct: false, exp: 'Forma de cono es temaki.' }
        ]},
        { q: 'El arroz del sushi se sazona con… 🧂', options: [
            { t: 'Vinagre, azúcar y sal', correct: true, exp: 'Correcto: esa mezcla le da el sabor característico.' },
            { t: 'Solo agua', correct: false, exp: 'Sin sazón no es arroz de sushi.' },
            { t: 'Mantequilla', correct: false, exp: 'No lleva mantequilla.' }
        ]}
    ];

    const QUESTIONS_PER_ROUND = 7;
    let currentRound = [];

    let current = 0;
    let score = 0;
    let answered = false;

    function renderQuestion() {
        const { q } = currentRound[current];
        const options = shuffle(currentRound[current].options);
        questionEl.textContent = q;
        answersEl.innerHTML = '';
        explanationEl.textContent = '';
        nextBtn.disabled = true;
        answered = false;
        progressEl.textContent = `Pregunta ${current + 1}/${currentRound.length}`;
        scoreEl.textContent = `Puntos: ${score}`;
        updateProgressBar();

        options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = opt.t;
            btn.addEventListener('click', () => selectAnswer(idx));
            answersEl.appendChild(btn);
        });
        currentRound[current].__shuffled = options;
    }

    function selectAnswer(index) {
        if (answered) return;
        answered = true;
        const opts = currentRound[current].__shuffled || currentRound[current].options;
        const chosen = opts[index];
        const buttons = Array.from(answersEl.querySelectorAll('.answer-btn'));
        buttons.forEach((b, i) => {
            const isCorrect = opts[i].correct;
            b.classList.add(isCorrect ? 'correct' : 'incorrect');
            if (i === index) b.classList.add('chosen');
        });

        if (chosen.correct) score += 1;
        explanationEl.textContent = chosen.exp;
        nextBtn.disabled = false;

        // Play cute sound feedback
        playTone(chosen.correct ? 660 : 220, 0.12);
    }

    function showResult() {
        quizUI.classList.add('finished');
        questionEl.style.display = 'none';
        answersEl.style.display = 'none';
        explanationEl.style.display = 'none';
        nextBtn.style.display = 'none';
        progressEl.textContent = '¡Completado!';
        scoreEl.textContent = `Puntos: ${score}/${currentRound.length}`;
        if (progressFillEl) { progressFillEl.style.width = '100%'; }

        let html = '';
        if (score === currentRound.length) {
            html += `
                <div class="win-banner">
                    <h2 class="win-title">¡Felicidades! 🎉</h2>
                    <p>¡Completaste las 7 preguntas y ganaste tu sushi digital!</p>
                    <div class="sushi-reward sushi-big" aria-label="Sushi digital">
                        <div class="nigiri-reward">
                            <div class="rice-base"></div>
                            <div class="fish-top salmon"></div>
                        </div>
                        <div class="nigiri-reward">
                            <div class="rice-base"></div>
                            <div class="fish-top tuna"></div>
                        </div>
                        <div class="uramaki-reward">
                            <div class="uramaki-rice"></div>
                            <div class="uramaki-nori"></div>
                            <div class="uramaki-filling"></div>
                        </div>
                    </div>
                </div>`;
            launchConfetti(true);
            playTone(880, 0.2);
        } else {
            html += `<h4>¡Buen intento!</h4><p>Tu puntaje fue ${score} de ${currentRound.length}. Intenta de nuevo para ganar un sushi digital ✨</p>`;
            launchConfetti(false);
        }
        html += `
            <div class="quiz-final-buttons">
                <button id="retry-quiz-final" class="quiz-action-btn retry-btn">🔄 Volver a intentar</button>
                <a href="index.html" class="quiz-action-btn home-btn">🏠 Volver al inicio</a>
            </div>`;
        resultEl.innerHTML = html;
        resultEl.style.display = 'block';
        
        // Add retry button handler
        const retryFinalBtn = document.getElementById('retry-quiz-final');
        if (retryFinalBtn) {
            retryFinalBtn.addEventListener('click', () => {
                startRound();
            });
        }
        
        const replay = quizUI.querySelector('.quiz-replay');
        if (replay) replay.style.display = 'none';
    }

    nextBtn.addEventListener('click', () => {
        if (!answered) return;
        current += 1;
        if (current >= currentRound.length) {
            showResult();
        } else {
            renderQuestion();
        }
    });

    function openQuizUI() {
        if (startBtn) {
            startBtn.style.display = 'none';
        }
        if (quizUI.style.display === 'none') {
            quizUI.style.display = 'block';
        }
        // small opening animation
        quizUI.classList.add('opening');
        requestAnimationFrame(() => {
            quizUI.classList.add('open');
        });
        startRound();
    }

    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openQuizUI();
        });
        // Expose a global fallback starter
        window.startSushiQuiz = openQuizUI;
    } else {
        // Auto-open in full-page mode (quiz.html)
        openQuizUI();
    }

    // Delegation fallback in case something prevents the direct handler
    document.addEventListener('click', (e) => {
        const t = e.target;
        if (t && t.id === 'start-quiz-btn') {
            e.preventDefault();
            openQuizUI();
        }
    });

    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            startRound();
        });
    }

    function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function sample(arr, n) {
        return shuffle(arr).slice(0, n);
    }

    function startRound() {
        currentRound = sample(questionBank, QUESTIONS_PER_ROUND);
        current = 0;
        score = 0;
        quizUI.classList.remove('finished');
        resultEl.style.display = 'none';
        const replay = quizUI.querySelector('.quiz-replay');
        if (replay) replay.style.display = 'none';
        questionEl.style.display = '';
        answersEl.style.display = '';
        explanationEl.style.display = '';
        nextBtn.style.display = '';
        updateProgressBar();
        renderQuestion();
    }

    function updateProgressBar() {
        if (!progressFillEl) return;
        const total = currentRound.length || QUESTIONS_PER_ROUND;
        const pct = Math.round((current / total) * 100);
        progressFillEl.style.width = pct + '%';
        progressFillEl.setAttribute('aria-valuenow', String(pct));
    }

    const QUESTIONS_PER_ROUND = 7;

    // Minimal cute audio feedback using Web Audio API
    let audioCtx;
    function playTone(freq, durationSec) {
        try {
            audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.value = 0.06; // soft volume
            osc.connect(gain).connect(audioCtx.destination);
            const now = audioCtx.currentTime;
            osc.start(now);
            osc.stop(now + durationSec);
        } catch (e) { /* ignore */ }
    }

    // Emoji confetti celebration
    function launchConfetti(big) {
        const container = quizUI.querySelector('.quiz-card') || quizUI.parentElement;
        const host = quizUI.parentElement;
        const confContainer = document.createElement('div');
        confContainer.style.position = 'relative';
        confContainer.style.pointerEvents = 'none';
        confContainer.style.zIndex = '2';
        host.appendChild(confContainer);
        const emojis = ['🍣','🍙','🥢','✨','🧂','🌿'];
        const count = big ? 60 : 20;
        for (let i = 0; i < count; i++) {
            const span = document.createElement('span');
            span.textContent = emojis[i % emojis.length];
            span.style.position = 'fixed';
            span.style.left = Math.random() * 100 + 'vw';
            span.style.top = '-5vh';
            span.style.fontSize = (Math.random() * (big ? 24 : 16) + 16) + 'px';
            span.style.opacity = '0.9';
            span.style.transition = 'transform 1.4s ease-out, opacity 1.4s ease-out';
            document.body.appendChild(span);
            requestAnimationFrame(() => {
                span.style.transform = `translateY(${100 + Math.random()*60}vh) rotate(${(Math.random()*120-60)}deg)`;
                span.style.opacity = '0';
            });
            setTimeout(() => span.remove(), 1600);
        }
        setTimeout(() => confContainer.remove(), 1800);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
} else {
    initQuiz();
}

// Page transitions with sushi fly
function initPageTransitions() {
    // Enter animation
    document.body.classList.add('page-enter');
    setTimeout(() => document.body.classList.remove('page-enter'), 400);

    // Intercept nav links
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#')) return;
            e.preventDefault();
            // sushi fly element
            const sushi = document.createElement('div');
            sushi.className = 'sushi-fly';
            sushi.textContent = '🍣';
            document.body.appendChild(sushi);
            document.body.classList.add('page-exit');
            setTimeout(() => {
                window.location.href = href;
            }, 320);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageTransitions);
} else {
    initPageTransitions();
}

