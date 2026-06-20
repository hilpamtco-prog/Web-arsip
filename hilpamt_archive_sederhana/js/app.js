const MAIN_PIN = "admin123"; // ubah PIN di sini 

        // Animasi partikel intro
        const canvas = document.getElementById('intro-canvas');
        const ctx = canvas.getContext('2d');
        let particlesArray = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.6 - 0.3;
                this.speedY = Math.random() * 0.6 - 0.3;
                this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.2)';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            let numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        initParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            // Hubungkan garis antar node terdekat (Constellation Effect)
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 110) {
                        ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 - (distance/110) * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // Audio efek saat launch
        function playSciFiLaunchAudio() {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (!AudioContext) return;
                const audioCtx = new AudioContext();
                
                // 1. Bass Drop Sweep Woosh Effect
                let oscSub = audioCtx.createOscillator();
                let gainSub = audioCtx.createGain();
                oscSub.type = 'sawtooth';
                oscSub.frequency.setValueAtTime(150, audioCtx.currentTime);
                oscSub.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 1.0);
                
                gainSub.gain.setValueAtTime(0.35, audioCtx.currentTime);
                gainSub.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.0);
                
                let filter = audioCtx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(350, audioCtx.currentTime);
                
                oscSub.connect(filter);
                filter.connect(gainSub);
                gainSub.connect(audioCtx.destination);
                oscSub.start();
                oscSub.stop(audioCtx.currentTime + 1.0);
                
                // 2. Cyber Confirmation Digital Chime
                let oscChime = audioCtx.createOscillator();
                let gainChime = audioCtx.createGain();
                oscChime.type = 'sine';
                oscChime.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
                oscChime.frequency.setValueAtTime(1174.66, audioCtx.currentTime + 0.12); // D6 note
                
                gainChime.gain.setValueAtTime(0.2, audioCtx.currentTime);
                gainChime.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
                
                oscChime.connect(gainChime);
                gainChime.connect(audioCtx.destination);
                oscChime.start();
                oscChime.stop(audioCtx.currentTime + 0.6);
            } catch (e) {
                console.log("Audio Engine Autoplay Blocked / Unsupported:", e);
            }
        }

        // Transisi intro
        function initiateSystemLaunch() {
            playSciFiLaunchAudio();
            const introScreen = document.getElementById('cyber-intro');
            
            introScreen.style.transition = 'all 1.0s cubic-bezier(0.85, 0, 0.15, 1)';
            introScreen.style.transform = 'scale(1.15) translateY(-100%)';
            introScreen.style.opacity = '0';
            introScreen.style.filter = 'blur(40px)';
            
            setTimeout(() => {
                introScreen.style.display = 'none';
            }, 1000);
        }

        // Logika utama website
        function verifyMainPassword() {
            const inputField = document.getElementById('main-password');
            const errorLabel = document.getElementById('lock-error');

            if (inputField.value === MAIN_PIN) {
                document.getElementById('lock-screen').style.opacity = '0';
                setTimeout(() => { document.getElementById('lock-screen').style.display = 'none'; }, 600);
            } else {
                errorLabel.style.display = 'block';
                inputField.style.borderColor = 'var(--neon-pink)';
                inputField.value = '';
            }
        }

        function activateDock() {
            document.getElementById('btn-explore').style.display = 'none';
            document.getElementById('app-dock').style.display = 'flex';
        }

        function navigateTo(target) {
            document.getElementById('home-section').style.display = 'none';
            document.querySelectorAll('.section-content').forEach(sec => sec.style.display = 'none');
            document.querySelectorAll('.dock-item').forEach(item => item.classList.remove('active'));

            if (target === 'arsip') {
                document.getElementById('arsip-section').style.display = 'block';
                document.getElementById('dock-arsip').classList.add('active');
                document.getElementById('global-home-btn').style.display = 'flex';
            } else {
                let secondaryAuth = prompt("Menu Terkunci. Masukkan sandi akses khusus:");
                if (secondaryAuth === MAIN_PIN) {
                    if (target === 'lajnah') {
                        document.getElementById('lajnah-section').style.display = 'block';
                        document.getElementById('dock-lajnah').classList.add('active');
                    } else if (target === 'proker') {
                        document.getElementById('proker-section').style.display = 'block';
                        document.getElementById('dock-proker').classList.add('active');
                    } else if (target === 'visi') {
                        document.getElementById('visi-section').style.display = 'block';
                        document.getElementById('dock-visi').classList.add('active');
                    }
                    document.getElementById('global-home-btn').style.display = 'flex';
                } else {
                    alert("Akses Ditolak! Sandi salah.");
                    document.getElementById('home-section').style.display = 'flex';
                    document.getElementById('dock-arsip').classList.add('active');
                }
            }
            window.scrollTo(0,0);
        }

        function backToHome() {
            document.querySelectorAll('.section-content').forEach(sec => sec.style.display = 'none');
            document.getElementById('archive-manager').style.display = 'none';
            document.querySelectorAll('.year-card').forEach(yc => yc.classList.remove('active'));
            document.getElementById('home-section').style.display = 'flex';
            document.getElementById('global-home-btn').style.display = 'none';
        }

        let selectedYearScope = null;
        function selectYear(year) {
            selectedYearScope = year;
            document.querySelectorAll('.year-card').forEach(yc => yc.classList.remove('active'));
            document.getElementById('yc-' + year).classList.add('active');
            document.getElementById('archive-manager').style.display = 'block';
            document.getElementById('current-year-heading').innerText = "Koleksi Media Tahun " + year;
        }

        // Drag & Drop File Loader Uploader
        const dropZone = document.getElementById('drop-zone');
        const fileUploader = document.getElementById('file-uploader');

        dropZone.addEventListener('click', () => fileUploader.click());
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); processUploadedMedia(e.dataTransfer.files); });
        fileUploader.addEventListener('change', (e) => { processUploadedMedia(e.target.files); });

        function processUploadedMedia(files) {
            if (files.length === 0) return;
            const gallery = document.getElementById('photo-gallery');
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <div class="gallery-thumb" style="background: rgba(6,182,212,0.1); border: 1px solid var(--neon-cyan); color: #fff;">🖼️ ${file.name}</div>
                    <button class="btn-download" onclick="triggerDownload('${file.name}')"><span>⬇️</span> Download</button>
                `;
                gallery.prepend(galleryItem);
            }
            alert(files.length + " media foto berhasil diunggah ke Arsip " + selectedYearScope + "!");
        }

        function triggerDownload(filename) { alert("Mempersiapkan pengunduhan file berkas: " + filename); }
        
        function openLajnahDetail(name, ketua, sekretaris, deskripsi) {
            document.getElementById('modal-lajnah-title').innerText = name;
            document.getElementById('modal-lajnah-desc').innerText = deskripsi;
            document.getElementById('modal-ketua').innerText = ketua;
            document.getElementById('modal-sekretaris').innerText = sekretaris;
            document.getElementById('detail-modal').style.display = 'flex';
        }
        
        function closeLajnahModal() { document.getElementById('detail-modal').style.display = 'none'; }
        
        function handleSearch(e) {
            if (e.key === 'Enter') {
                const query = document.getElementById('global-search').value.toLowerCase();
                if(!query) return;
                alert("Mencari berkas '" + query + "' di seluruh kluster arsip HILPAMT...");
            }
        }
