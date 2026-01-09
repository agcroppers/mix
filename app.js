document.addEventListener('DOMContentLoaded', () => {
    initChemicalParticles();
    animateCalculations();
});

// --- 1. Sistema de Partículas: Química do Solo ---
function initChemicalParticles() {
    const canvas = document.getElementById('science-canvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    
    // Elementos que fazem sentido no agro
    const symbols = ['N', 'P', 'K', 'Ca', 'Mg', 'S', 'C', 'H₂O'];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class ChemicalParticle {
        constructor() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 50; // Começa de baixo
            this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
            this.velocity = Math.random() * 0.5 + 0.2;
            this.size = Math.random() * 10 + 10; // Tamanho da fonte
            this.opacity = 0;
            this.fadeState = 'in'; // in or out
        }

        update() {
            this.y -= this.velocity;
            
            // Fade in/out suave
            if (this.fadeState === 'in') {
                this.opacity += 0.01;
                if (this.opacity >= 0.6) this.fadeState = 'out';
            } else {
                this.opacity -= 0.005;
            }

            // Reset
            if (this.y < -50 || this.opacity <= 0) {
                this.y = height + 50;
                this.x = Math.random() * width;
                this.opacity = 0;
                this.fadeState = 'in';
                this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
            }
        }

        draw() {
            ctx.font = `${this.size}px 'Outfit'`;
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
            ctx.fillText(this.symbol, this.x, this.y);
            
            // Desenha um pequeno hexágono em volta de alguns
            if (this.symbol === 'C' || this.symbol === 'N') {
                ctx.strokeStyle = `rgba(76, 175, 80, ${this.opacity * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                const r = this.size; 
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    const hx = this.x + 8 + r * Math.cos(angle);
                    const hy = this.y - 8 + r * Math.sin(angle);
                    if (i === 0) ctx.moveTo(hx, hy);
                    else ctx.lineTo(hx, hy);
                }
                ctx.closePath();
                ctx.stroke();
            }
        }
    }

    // Criar partículas
    for(let i = 0; i < 40; i++) {
        particles.push(new ChemicalParticle());
    }

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

// --- 2. Animação de Números Inteligentes (Data Crunching) ---
function animateCalculations() {
    const nEl = document.getElementById('val-n');
    const compEl = document.getElementById('val-comp');
    const costEl = document.getElementById('val-cost');
    const progEl = document.getElementById('prog-num');

    // Função genérica para animar números
    function countUp(element, end, suffix, prefix = '', duration = 2000, isFloat = false) {
        let start = 0;
        const stepTime = Math.abs(Math.floor(duration / (end - start) * (isFloat ? 10 : 1)));
        
        let timer = setInterval(() => {
            start += isFloat ? 0.1 : 1;
            let current = isFloat ? start.toFixed(1) : Math.floor(start);
            
            element.innerText = `${prefix}${current}${suffix}`;
            
            if (start >= end) {
                clearInterval(timer);
                element.innerText = `${prefix}${end}${suffix}`; // Garante o valor final exato
            }
        }, isFloat ? 50 : 20);
    }

    // Dispara animações
    setTimeout(() => {
        countUp(nEl, 120, ' kg/ha');
        countUp(compEl, 2.5, ' MPa', '', 2000, true);
        
        // Simulação de custo aleatório complexo
        let cost = 0;
        const costTimer = setInterval(() => {
            cost += Math.random() * 50;
            costEl.innerText = `R$ ${cost.toFixed(2)}`;
            if (cost > 1250) {
                clearInterval(costTimer);
                costEl.innerText = `R$ 1.250,00`;
            }
        }, 30);

        countUp(progEl, 75, '%');
    }, 500); // Pequeno delay inicial
}