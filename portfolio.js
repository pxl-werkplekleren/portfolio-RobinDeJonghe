document.addEventListener("DOMContentLoaded", () => {
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    document.body.prepend(progress);

    const navLinks = document.querySelectorAll(".main-nav a");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach((link) => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });

    const revealItems = document.querySelectorAll(
        ".portfolio-header, .main-nav, .introductie, .uitleg-opleiding, .logboek, .role, .situering-profiel"
    );

    revealItems.forEach((item) => {
        item.classList.add("js-reveal");
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealItems.forEach((item) => observer.observe(item));

    const backToTop = document.querySelector(".terug-naar-boven");

    const updateScrollUI = () => {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progressValue = maxScroll > 0 ? scrollTop / maxScroll : 0;

        progress.style.transform = `scaleX(${progressValue})`;

        if (backToTop) {
            backToTop.classList.toggle("is-floating", scrollTop > 520);
        }
    };

    updateScrollUI();
    window.addEventListener("scroll", updateScrollUI, { passive: true });
});
