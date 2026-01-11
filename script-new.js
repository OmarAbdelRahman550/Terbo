// شاشة التحميل الجديدة
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.progress-bar');
    
    // محاكاة شريط التقدم
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 300);
        }
    }, 40);
});

// شريط التنقل
const header = document.getElementById('header');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// قائمة الهاتف المحمول
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.querySelector('i').classList.toggle('fa-bars');
        mobileToggle.querySelector('i').classList.toggle('fa-times');
    });
}

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileToggle) {
            mobileToggle.querySelector('i').classList.add('fa-bars');
            mobileToggle.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Dark/Light Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const html = document.documentElement;

// التحقق من التفضيل المحفوظ
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    html.classList.add('dark-theme');
}
updateThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        html.classList.toggle('dark-theme');
        const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        updateThemeIcon();
    });
}

function updateThemeIcon() {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
        if (body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// تحديث الرابط النشط
const navItems = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// أنيميشن عند التمرير
const animateElements = document.querySelectorAll('.animate-on-scroll');
const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(el => {
    animateObserver.observe(el);
});

// الأنيميشن عند التمرير
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// مراقبة العناصر
document.querySelectorAll('.stat-box').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.project-article').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.gallery-item-new').forEach(el => {
    observer.observe(el);
});

// عداد الأرقام - محسّن ليكون ثابت تماماً
function animateNumber(element) {
    const target = parseFloat(element.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;
    
    // ضمان ثبات العنصر تماماً - منع أي حركة
    const parent = element.parentElement;
    if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'visible';
    }
    
    element.style.willChange = 'contents';
    element.style.transform = 'translateY(0)';
    element.style.transition = 'none';
    element.style.position = 'static';
    element.style.top = 'auto';
    element.style.bottom = 'auto';
    element.style.margin = '0';
    element.style.padding = '0';
    element.style.display = 'inline-block';
    element.style.verticalAlign = 'baseline';

    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // استخدام easing function لحركة سلسة
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = target * easeOutQuart;
        
        if (progress < 1) {
            // تحديث النص فقط بدون أي transform
            if (isDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString('en-US');
            }
            // التأكد من عدم وجود أي transform
            element.style.transform = 'translateY(0)';
            requestAnimationFrame(updateCounter);
        } else {
            // التأكد من أن القيمة النهائية ثابتة
            if (isDecimal) {
                element.textContent = target.toFixed(1);
            } else {
                element.textContent = target.toLocaleString('en-US');
            }
            // إزالة will-change بعد الانتهاء
            element.style.willChange = 'auto';
            element.style.transform = 'translateY(0)';
        }
    };

    requestAnimationFrame(updateCounter);
}

// مراقبة بطاقات الإحصائيات - محسّن
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const numberElement = entry.target.querySelector('.stat-value');
            if (numberElement) {
                // إضافة style لضمان الثبات
                numberElement.style.willChange = 'contents';
                numberElement.style.transform = 'translateY(0)';
                numberElement.style.transition = 'none';
                animateNumber(numberElement);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach(card => {
    statsObserver.observe(card);
});

// نموذج التطوع
const volunteerFormNew = document.getElementById('volunteerFormNew');
const formFeedback = document.getElementById('formFeedback');

if (volunteerFormNew) {
    volunteerFormNew.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = volunteerFormNew.querySelector('.submit-button');
        submitBtn.classList.add('loading');
        
        // محاكاة إرسال النموذج
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            formFeedback.textContent = 'شكراً لك! تم إرسال طلبك بنجاح. سنتواصل معك قريباً.';
            formFeedback.className = 'form-feedback success';
            volunteerFormNew.reset();
            
            setTimeout(() => {
                formFeedback.className = 'form-feedback';
            }, 5000);
        }, 2000);
    });
}

// زر العودة للأعلى
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// تأثيرات التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// تأثير parallax للقسم الرئيسي
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const heroParticles = heroSection.querySelector('.hero-particles');
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// تأثير hover للبطاقات العائمة
document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// تأثيرات إضافية للصور
document.querySelectorAll('.gallery-item-new').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const image = this.querySelector('.gallery-image-new');
        if (image) {
            image.style.filter = 'brightness(1.1)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const image = this.querySelector('.gallery-image-new');
        if (image) {
            image.style.filter = 'brightness(1)';
        }
    });
});

// تأثير ripple للأزرار
document.querySelectorAll('.cta-button, .submit-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-effect 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// إضافة أنيميشن ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// تحديث التاريخ في التذييل
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace('2024', currentYear);
}

// تأثيرات إضافية للعناصر
document.querySelectorAll('.benefit-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// تأثيرات للمشاريع
document.querySelectorAll('.metric-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// تأثيرات للعناصر البصرية
document.querySelectorAll('.visual-element').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) rotate(2deg)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// تحسين الأداء - Lazy loading
if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.gallery-image-new').forEach(img => {
        lazyObserver.observe(img);
    });
}

// تأثيرات الكتابة للعنوان (اختياري)
function typeWriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// تحسين تجربة المستخدم
document.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// تأثيرات للبطاقات
document.querySelectorAll('.mission-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'rgba(16, 185, 129, 0.5)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });
});

console.log('🌍 موقع مؤتمر المناخ - مصر | النسخة الجديدة | تم تحميل الموقع بنجاح!');

