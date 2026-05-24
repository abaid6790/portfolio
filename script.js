const EMAILJS_CONFIG = {
    serviceID: 'service_uvwq7m6', 
    templateID: 'template_xc398fh',   
    publicKey: 'NEafLGmDnRn99GSLC'       
};
// INITIALIZE EMAILJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('✅ EmailJS initialized');
    } else {
        console.error('❌ EmailJS not loaded');
    }
})();
// TEST FUNCTION - RUN IN CONSOLE
window.testEmailJS = function() {
    console.log('🔍 EmailJS Config Check:');
    console.log('Service ID:', EMAILJS_CONFIG.serviceID);
    console.log('Template ID:', EMAILJS_CONFIG.templateID);
    console.log('Public Key:', EMAILJS_CONFIG.publicKey?.substring(0, 10) + '...');
    console.log('EmailJS available:', typeof emailjs !== 'undefined');
    console.log('Send function:', typeof emailjs.send);
};
// MOBILE NAVIGATION
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}
// SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        // Close mobile menu
        if (navMenu) navMenu.classList.remove('active');
    });
});
// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.background = window.scrollY > 50 
            ? 'rgba(10, 10, 15, 0.98)' 
            : 'rgba(10, 10, 15, 0.95)';
    }
});
// SKILL BARS ANIMATION
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar').forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.setProperty('--width', bar.dataset.width + '%');
                }, index * 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.skill-group').forEach(group => {
    skillObserver.observe(group);
});
// CONTACT FORM - MAIN FUNCTION
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        try {
            // Collect form data
            const formData = {
                from_name: this.querySelector('input[type="text"]').value.trim(),
                from_email: this.querySelector('input[type="email"]').value.trim(),
                message: this.querySelector('textarea').value.trim()
            };
            console.log('📤 Sending:', formData);
            // Validate
            if (!formData.from_name || !formData.from_email || !formData.message) {
                throw new Error('Please fill all fields');
            }
            // Send email via EmailJS
            const result = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                formData,
                EMAILJS_CONFIG.publicKey
            );
            console.log('✅ SUCCESS:', result);
            alert('🎉 Message sent successfully');
            this.reset();
        } catch (error) {
            console.error('❌ EMAILJS ERROR:', error);
            let errorMsg = 'Failed to send message';
            if (error.text) errorMsg = error.text;
            else if (error.message) errorMsg = error.message;
            alert(`❌ ${errorMsg}\n\n💡 Tip: Check console or use direct email`);
        } finally {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }
    });
}
// FADE-IN ANIMATIONS
const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.project-card, .skill-group, .about-stats').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    fadeObserver.observe(el);
});
// PAGE LOAD COMPLETE
window.addEventListener('load', () => {
    console.log('🌟 Portfolio loaded successfully!');
    console.log('🧪 Run testEmailJS() in console to test EmailJS');
});