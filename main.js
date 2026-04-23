document.addEventListener('DOMContentLoaded', () => {
    // 1. System Boot Sequence
    const title = document.getElementById('main-title');
    const originalText = title.innerText;
    title.innerText = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.innerText += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Start glitching after typing
            setInterval(randomGlitch, 3000);
        }
    };
    
    const randomGlitch = () => {
        title.style.transform = `translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`;
        setTimeout(() => title.style.transform = 'translate(0,0)', 50);
    };

    setTimeout(typeWriter, 500);

    // 2. Radar Chart Animation
    const radarData = document.getElementById('radar-data');
    const animateRadar = () => {
        // Shift radar points slightly to simulate "real-time tracking"
        const points = [
            "350,130 430,205 460,315 350,360 240,295 250,190",
            "350,125 435,210 455,320 350,365 235,300 255,185"
        ];
        let state = 0;
        setInterval(() => {
            radarData.setAttribute('points', points[state]);
            state = (state + 1) % points.length;
        }, 2000);
    };
    animateRadar();

    // 3. Mission Cards Observer (Scroll in)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.mission-card').forEach((card, idx) => {
        card.style.opacity = '0';
        card.style.transform = idx % 2 === 0 ? 'translateX(-20px)' : 'translateX(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    // 4. Parallax Section (optional, currently disabled for stability)
    // Removed broken per-element parallax to maintain SVG integrity.

    // 5. System Messages
    console.log("%c[SYS] SYSTEM_BOOT_COMPLETE", "color: #00F0C8; font-weight: bold;");
    console.log("%c[SYS] CONNECTED_TO_EGO_CORE_v4.0", "color: #00F0C8;");
});
