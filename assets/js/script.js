AOS.init({ once: true, duration: 800 });

/* ---------- Counter ---------- */
const counters = document.querySelectorAll('.counter');
const runCounter = () => counters.forEach(c => {
    const target = +c.dataset.target, inc = target / 50; let cur = 0;
    const update = () => { if (cur < target) { cur += inc; c.textContent = Math.ceil(cur); requestAnimationFrame(update); } else c.textContent = target; };
    update();
});
const obs = new IntersectionObserver((e) => { if (e[0].isIntersecting) { runCounter(); obs.disconnect(); } }, { threshold: .5 });
const stats = document.querySelector('#stats'); if (stats) obs.observe(stats);

/* ---------- Back-to-top ---------- */
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => window.scrollY > 300 ? (btt.classList.remove('opacity-0', 'pointer-events-none'), btt.classList.add('opacity-100')) : (btt.classList.add('opacity-0', 'pointer-events-none'), btt.classList.remove('opacity-100')));

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('nav-toggle'), navMenu = document.getElementById('nav-menu');
navToggle.addEventListener('click', () => navMenu.classList.toggle('hidden'));

/* ---------- Close mobile menu when clicking links ---------- */
function closeMobileMenu() {
    if (window.innerWidth < 768) {
        navMenu.classList.add('hidden');
    }
}

/* ---------- Alpine ---------- */
function teamApp() {
    return {
        isModalOpen: false,
        activeMember: null,
        members: [],
        repos: [],
        loadingRepos: false,
        reposError: null,

        init() {
            this.members = [
                {
                    name: 'Aji Putra Pratama',
                    role: 'Fullstack Developer',
                    username: 'Yazan',
                    bio: 'Fullstack Developer dengan pengalaman dalam pengembangan web dan aplikasi menggunakan teknologi modern yang efisien dan scalable.',
                    github: 'https://github.com/Yazan969',
                    githubUsername: 'Yazan969',
                    photo: 'assets/images/aji.jpg',
                    technologies: [
                        { name: 'HTML', color: '#E44D26' },
                        { name: 'CSS', color: '#1572B6' },
                        { name: 'JavaScript', color: '#F7DF1E' },
                        { name: 'Laravel', color: '#FF2D20' },
                        { name: 'React', color: '#61DAFB' },
                        { name: 'Java', color: '#007396' },
                        { name: 'Node.js', color: '#68A063' },
                        { name: 'Blender', color: '#F5792A' },
                        { name: 'Godot', color: '#478CBF' },
                        { name: 'C++', color: '#00599C' },
                        { name: 'Python', color: '#3776AB' },
                        { name: 'PHP', color: '#8993BE' },
                        { name: 'MySQL', color: '#4479A1' },
                        { name: 'MariaDB', color: '#003545' },
                        { name: 'Tailwind', color: '#38BDF8' },
                        { name: 'Bootstrap', color: '#7952B3' },
                        { name: 'Roblox Studio', color: '#00A2FF' }
                    ]
                },
                {
                    name: 'Raditya Syarif Hidayatullah',
                    role: 'Design Artist & Game Programmer',
                    username: 'Fenic',
                    bio: 'Design Artist dan Game Programmer dengan fokus pada visual menarik dan gameplay yang imersif.',
                    github: 'https://github.com/SmileHuman',
                    githubUsername: 'SmileHuman',
                    photo: 'assets/images/raditya.jpg',
                    technologies: [
                        { name: 'HTML', color: '#E44D26' },
                        { name: 'CSS', color: '#1572B6' },
                        { name: 'JavaScript', color: '#F7DF1E' },
                        { name: 'Laravel', color: '#FF2D20' },
                        { name: 'Java', color: '#007396' },
                        { name: 'Python', color: '#3776AB' },
                        { name: 'Roblox Studio', color: '#00A2FF' },
                        { name: 'Game Design', color: '#6B7280' },
                        { name: 'React Native', color: '#61DAFB' }
                    ]
                },
                {
                    name: 'Rasya Ifqian Nezqi',
                    role: 'Graphic Designer & 3D Digital Artist',
                    username: 'Gyro',
                    bio: 'Graphic Designer dan 3D Artist yang berfokus pada pembuatan asset visual untuk berbagai kebutuhan kreatif.',
                    github: 'https://github.com/ry71kmr54-lgtm',
                    githubUsername: 'ry71kmr54-lgtm',
                    photo: 'assets/images/rasya.jpg',
                    technologies: [
                        { name: 'HTML', color: '#E44D26' },
                        { name: 'CSS', color: '#1572B6' },
                        { name: 'JavaScript', color: '#F7DF1E' },
                        { name: 'Laravel', color: '#FF2D20' },
                        { name: 'PHP', color: '#8993BE' },
                        { name: 'Java', color: '#007396' },
                        { name: 'Unreal Engine', color: '#0E1128' },
                        { name: '3D Architect', color: '#6B7280' },
                        { name: 'Roblox Studio', color: '#00A2FF' }
                    ]
                },
                {
                    name: 'Uno Fathir Ar Royyan Kindy',
                    role: 'Game Designer, Graphic Designer & 3D Artist',
                    username: 'Liu Kindy',
                    bio: 'Game Designer dan 3D Artist yang menguasai proses kreatif dari konsep hingga implementasi.',
                    github: 'https://github.com/Liu-Kindy',
                    githubUsername: 'Liu-Kindy',
                    photo: 'assets/images/uno.jpg',
                    technologies: [
                        { name: 'HTML', color: '#E44D26' },
                        { name: 'CSS', color: '#1572B6' },
                        { name: 'JavaScript', color: '#F7DF1E' },
                        { name: 'Laravel', color: '#FF2D20' },
                        { name: 'Java', color: '#007396' },
                        { name: 'Python', color: '#3776AB' },
                        { name: 'Game Design', color: '#6B7280' },
                        { name: 'Blender', color: '#F5792A' },
                        { name: 'Roblox Studio', color: '#00A2FF' },
                        { name: 'Illustrator', color: '#FF9A00' }
                    ]
                }
            ];
        },

        async showModal(member) {
            this.activeMember = member;
            this.isModalOpen = true;
            this.repos = [];
            this.reposError = null;

            if (member.githubUsername) {
                await this.fetchGitHubRepos(member.githubUsername);
            }
        },

        async fetchGitHubRepos(username) {
            this.loadingRepos = true;
            this.reposError = null;

            try {
                let res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);

                if (!res.ok) {
                    res = await fetch(`https://api.github.com/users/Yazan969/repos?sort=updated&per_page=6`);
                }

                if (!res.ok) throw new Error('Gagal mengambil data repository');

                this.repos = await res.json();
            } catch (err) {
                console.error(err);
                this.reposError = 'Tidak dapat memuat repository.';
            } finally {
                this.loadingRepos = false;
            }
        }
    };
}