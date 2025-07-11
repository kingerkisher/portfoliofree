// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for reaching out! I will get back to you soon.');
    this.reset();
});

// Animated Counters in About Section (SLOW + SMOOTH)
const counters = document.querySelectorAll('.counter');

const animateCounters = () => {
    counters.forEach(counter => {
        counter.innerText = '0';
        const target = +counter.getAttribute('data-target');

        const updateCounter = () => {
            const current = +counter.innerText;
            const increment = Math.ceil(target / 300); // smaller step = slower

            if (current < target) {
                counter.innerText = `${Math.min(current + increment, target)}`;
                setTimeout(updateCounter, 40); // slower speed
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });
};

// Only trigger once when About section is visible
const aboutSection = document.getElementById('about');
let countersStarted = false;

window.addEventListener('scroll', () => {
    const top = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight && !countersStarted) {
        animateCounters();
        countersStarted = true;
    }
});

// Smooth scrolling for nav links
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.hash !== '') {
            e.preventDefault();
            const target = document.querySelector(this.hash);
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.classList.remove('show');
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Projects Pagination
document.addEventListener("DOMContentLoaded", () => {
    const projectsPerPage = 3;
    const projectContainer = document.getElementById("project-container");
    const pagination = document.getElementById("pagination");
    const allProjects = projectContainer.querySelectorAll(".col-md-4");
    let currentPage = 1;
    const totalPages = Math.ceil(allProjects.length / projectsPerPage);

    function showProjects(page) {
        const start = (page - 1) * projectsPerPage;
        const end = start + projectsPerPage;
        allProjects.forEach((proj, index) => {
            proj.style.display = (index >= start && index < end) ? "block" : "none";
        });
    }

    function renderPagination() {
        pagination.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.className = "page-btn";
            if (i === currentPage) btn.classList.add("active");
            btn.addEventListener("click", () => {
                currentPage = i;
                showProjects(currentPage);
                renderPagination();
            });
            pagination.appendChild(btn);
        }
    }

    showProjects(currentPage);
    renderPagination();
});




