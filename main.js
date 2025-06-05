function initAllSliders() {
    const sliders = document.querySelectorAll('.slider-wrapper');

    sliders.forEach(wrapper => {
        const track = wrapper.querySelector('.slider-track');
        const prevBtn = wrapper.querySelector('.slider-prev');
        const nextBtn = wrapper.querySelector('.slider-next');
        const items = Array.from(track.children);
        const itemWidth = items[0].offsetWidth + 20;
        let index = 0;
        let isTransitioning = false;

        // Clone items for infinite scroll
        items.forEach(item => {
            track.appendChild(item.cloneNode(true));
        });

        const goToSlide = (newIndex) => {
            if (isTransitioning) return;
            isTransitioning = true;
            index = newIndex;

            track.style.transition = 'transform 0.5s ease';
            track.style.transform = `translateX(-${index * itemWidth}px)`;

            setTimeout(() => {
                if (index >= items.length) {
                    track.style.transition = 'none';
                    index = 0;
                    track.style.transform = `translateX(0px)`;
                }
                isTransitioning = false;
            }, 500);
        };

        prevBtn.addEventListener('click', () => {
            if (index === 0) {
                track.style.transition = 'none';
                index = items.length;
                track.style.transform = `translateX(-${index * itemWidth}px)`;
                setTimeout(() => goToSlide(index - 1), 50);
            } else {
                goToSlide(index - 1);
            }
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(index + 1);
        });

        setInterval(() => goToSlide(index + 1), 5000);
    });
}

function initModals() {
    const modals = document.querySelectorAll('.modal');
    const body = document.body;

    document.querySelectorAll('[data-modal-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = document.getElementById(btn.getAttribute('data-modal-target'));
            if (!modal) return;

            modal.classList.remove('invisible', 'opacity-0');
            modal.querySelector('div').classList.remove('scale-95');
            body.style.overflow = 'hidden';
        });
    });

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        const modalContent = modal.querySelector('div');

        const closeModal = () => {
            modal.classList.add('opacity-0');
            modalContent.classList.add('scale-95');
            setTimeout(() => {
                modal.classList.add('invisible');
                body.style.overflow = '';
            }, 300);
        };

        closeBtn ?.addEventListener('click', closeModal);

        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && !modal.classList.contains('invisible')) {
                closeModal();
            }
        });
    });
}

function initAccordions() {
    const accordions = document.querySelectorAll('[data-accordion-toggle]');

    accordions.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('[data-accordion-icon]');
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

            document.querySelectorAll('[data-accordion-content]').forEach(panel => {
                panel.style.maxHeight = null;
            });

            document.querySelectorAll('[data-accordion-icon]').forEach(icon => {
                icon.classList.remove('rotate-180');
            });

            if (!isOpen) {
                content.style.maxHeight = `${content.scrollHeight}px`;
                icon ?.classList.add('rotate-180');
            }
        });
    });
}

function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    const underline = document.getElementById('tab-underline');

    const activateTab = (tab) => {
        tabs.forEach(t => t.classList.remove('text-white'));
        contents.forEach(c => c.classList.add('hidden'));

        tab.classList.add('text-white');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId) ?.classList.remove('hidden');

        underline.style.width = `${tab.offsetWidth}px`;
        underline.style.left = `${tab.offsetLeft}px`;
    };

    tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab)));

    window.addEventListener('DOMContentLoaded', () => {
        if (tabs.length) activateTab(tabs[0]);
    });
}

function initDropdowns() {
    const dropdowns = document.querySelectorAll('.custom-dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const icon = dropdown.querySelector('.dropdown-icon');
        const menu = dropdown.querySelector('.dropdown-menu');
        const selected = dropdown.querySelector('.selected-option');
        const options = menu.querySelectorAll('li');
        let isOpen = false;

        const closeMenu = () => {
            isOpen = false;
            menu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
            icon ?.classList.remove('rotate-180');
        };

        const openMenu = () => {
            isOpen = true;
            menu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
            icon ?.classList.add('rotate-180');
        };

        toggle ?.addEventListener('click', (e) => {
            e.stopPropagation();
            isOpen ? closeMenu() : openMenu();
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                selected.textContent = option.textContent;
                closeMenu();
            });
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                closeMenu();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
    initAllSliders();
    initModals();
    initTabs();
    initDropdowns();
});