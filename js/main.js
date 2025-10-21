document.addEventListener('DOMContentLoaded', () => {
    // Experience Tabs
    const tabs = document.querySelectorAll('.tab-button');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Deactivate all tabs and panels
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            panels.forEach(p => p.classList.remove('active'));

            // Activate the clicked tab and corresponding panel
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const panelId = tab.getAttribute('aria-controls');
            const panel = document.getElementById(panelId);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Theme switcher
    const themeSwitch = document.querySelector('#checkbox');
    const body = document.body;

    function setTheme(theme) {
        if (theme === 'light') {
            body.setAttribute('data-theme', 'light');
            if(themeSwitch) themeSwitch.checked = false;
        } else {
            body.removeAttribute('data-theme');
            if(themeSwitch) themeSwitch.checked = true;
        }
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
            const theme = themeSwitch.checked ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            setTheme(theme);
        });
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});