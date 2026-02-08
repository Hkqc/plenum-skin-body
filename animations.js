/**
 * Plenum Skin and Body - Organic Animations
 */
document.addEventListener('DOMContentLoaded', () => {
    initFacialAnimation();
    initMassageAnimation();
    initBodyAnimation();
});
function resizeCanvas(canvas) { const parent = canvas.parentElement; canvas.width = parent.clientWidth; canvas.height = parent.clientHeight; }
function initFacialAnimation() {
    const canvas = document.getElementById('canvas-facial');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let ripples = [];
    resizeCanvas(canvas);
    class Ripple {
        constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.radius = 0; this.alpha = 1; this.speed = 0.5 + Math.random(); }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(88, 97, 77, ' + this.alpha + ')'; ctx.lineWidth = 2; ctx.stroke(); }
        update() { this.radius += this.speed; this.alpha -= 0.005; }
    }
    function animate() { ctx.fillStyle = '#f9f9f9'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (ripples.length < 6 && Math.random() < 0.02) ripples.push(new Ripple());
        for (let i = 0; i < ripples.length; i++) { ripples[i].update(); ripples[i].draw(); if (ripples[i].alpha <= 0) { ripples.splice(i, 1); i--; } }
        requestAnimationFrame(animate);
    }
    animate();
}
function initMassageAnimation() {
    const canvas = document.getElementById('canvas-massage');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    resizeCanvas(canvas);
    let offset = 0;
    function animate() { ctx.fillStyle = '#f4f4f4'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath(); for (let i = 0; i < 3; i++) { ctx.beginPath(); for (let x = 0; x < canvas.width; x++) { const y = canvas.height / 2 + Math.sin(x * 0.01 + offset + i) * 30 * (i + 1) * 0.6; ctx.lineTo(x, y); } ctx.strokeStyle = 'rgba(47, 79, 79, ' + (0.1 + i * 0.1) + ')'; ctx.lineWidth = 2; ctx.stroke(); }
        offset += 0.02; requestAnimationFrame(animate);
    }
    animate();
}
function initBodyAnimation() {
    const canvas = document.getElementById('canvas-body');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    resizeCanvas(canvas);
    let particles = [];
    class Particle {
        constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 3 + 1; this.speedX = Math.random() * 1 - 0.5; this.speedY = Math.random() * 1 - 0.5; this.color = Math.random() > 0.5 ? '#D4AF37' : '#58614D'; }
        update() { this.x += this.speedX; this.y += this.speedY; if (this.x < 0 || this.x > canvas.width) this.speedX *= -1; if (this.y < 0 || this.y > canvas.height) this.speedY *= -1; }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.globalAlpha = 0.4; ctx.fill(); ctx.globalAlpha = 1.0; }
    }
    for (let i = 0; i < 40; i++) particles.push(new Particle());
    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#f9f9f9'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate);
    }
    animate();
}