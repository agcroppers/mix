// --- 1. Base de Dados de Inteligência (Mock) ---
const regionData = {
    'br-co': {
        temp: 32,
        desc: "Ensolarado",
        humid: "40%",
        soil: { type: "Latossolo Vermelho", clay: "45-60%", mo: "65%" },
        crops: ["Crotalária Spectabilis", "Braquiária Ruziziensis", "Milheto"],
        market: "Alta demanda por descompactação de solo pós-soja."
    },
    'br-sul': {
        temp: 18,
        desc: "Nublado",
        humid: "75%",
        soil: { type: "Argissolo", clay: "30-45%", mo: "80%" },
        crops: ["Aveia Preta", "Azevém", "Nabo Forrageiro"],
        market: "Foco em cobertura de inverno e proteção contra geada."
    },
    'br-matopiba': {
        temp: 35,
        desc: "Seco",
        humid: "30%",
        soil: { type: "Neossolo Quartzarênico", clay: "10-20%", mo: "40%" },
        crops: ["Estilosantes", "Milheto ADR 300", "Sorgo"],
        market: "Necessidade crítica de retenção de água e biomassa."
    },
    'br-se': {
        temp: 24,
        desc: "Parcialmente Nublado",
        humid: "60%",
        soil: { type: "Latossolo Amarelo", clay: "35-50%", mo: "60%" },
        crops: ["Trigo Mourisco", "Crotalária Ochroleuca", "Mix Café"],
        market: "Otimização de nitrogênio para culturas perenes (Café/Laranja)."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initSmartSelector();
    
    // Carrega dados iniciais
    updateDashboard('br-co');
});

// --- 2. Lógica do Smart Selector ---
function initSmartSelector() {
    const selector = document.getElementById('region-select');
    
    selector.addEventListener('change', (e) => {
        // Animação de saída (Fade Out) dos dados
        animateElementsOut();
        
        // Simula tempo de processamento "AI"
        setTimeout(() => {
            updateDashboard(e.target.value);
            animateElementsIn();
        }, 400);
    });
}

function updateDashboard(regionKey) {
    const data = regionData[regionKey];
    
    // Clima
    document.getElementById('temp-val').innerText = data.temp;
    document.getElementById('weather-desc').innerText = data.desc;
    document.getElementById('humid-val').innerText = data.humid;
    
    // Solo
    document.getElementById('soil-type').innerText = data.soil.type;
    document.getElementById('soil-clay').innerText = data.soil.clay;
    document.getElementById('mo-fill').style.width = data.soil.mo;
    
    // Culturas (Cria lista dinamicamente)
    const list = document.getElementById('crops-list');
    list.innerHTML = '';
    data.crops.forEach(crop => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="dot"></span> ${crop}`;
        list.appendChild(li);
    });
    
    // Market Insight
    document.getElementById('market-tip').innerText = data.market;
}

// Utilitários de Animação
function animateElementsOut() {
    const widgets = document.querySelectorAll('.weather-widget, .soil-widget, .crops-widget');
    widgets.forEach(w => {
        w.style.opacity = '0.5';
        w.style.transform = 'scale(0.98)';
    });
}

function animateElementsIn() {
    const widgets = document.querySelectorAll('.weather-widget, .soil-widget, .crops-widget');
    widgets.forEach(w => {
        w.style.opacity = '1';
        w.style.transform = 'scale(1)';
    });
}

// --- 3. Partículas Orgânicas (Pólen/Luz) ---
function initParticles() {
    const canvas = document.getElementById('organic-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Pollen {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Movimento muito lento
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 3 + 1;
            this.alpha = Math.random() * 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Loop infinito sem cortes bruscos
            if (this.x < -10) this.x = width + 10;
            if (this.x > width + 10) this.x = -10;
            if (this.y < -10) this.y = height + 10;
            if (this.y > height + 10) this.y = -10;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            // Cor: Dourado/Verde muito sutil
            ctx.fillStyle = `rgba(141, 123, 104, ${this.alpha * 0.3})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 50; i++) particles.push(new Pollen());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}