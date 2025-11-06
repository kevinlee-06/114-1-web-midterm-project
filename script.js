
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('nightCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth; 
        canvas.height = canvas.offsetHeight;
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#000000'); 
        gradient.addColorStop(1, '#001f3f');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const radialGradient = ctx.createRadialGradient(100, 80, 20, 100, 80, 50);
        radialGradient.addColorStop(0, '#ffffe0');
        radialGradient.addColorStop(1, 'rgba(255, 255, 224, 0)');
        ctx.beginPath();
        ctx.arc(100, 80, 50, 0, Math.PI * 2, false);
        ctx.fillStyle = radialGradient;
        ctx.fill();
        ctx.closePath();
        const buildings = [
            { x: 150, width: 100, height: 200 },
            { x: 300, width: 150, height: 150 },
            { x: 500, width: 200, height: 250 },
            { x: 720, width: 80, height: 100 }
        ];
        buildings.forEach(building => {
            ctx.fillStyle = '#333';
            ctx.fillRect(building.x, canvas.height - building.height, building.width, building.height);
            const windowWidth = building.width / 5;
            const windowHeight = 25;
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < Math.floor(building.height / windowHeight - 1); j++) {
                    const isLight = Math.random() < 0.1;
                    ctx.fillStyle = isLight ? '#ffffe0' : '#333';
                    ctx.fillRect(building.x + i * windowWidth + 5, canvas.height - (j + 1) * windowHeight - 20, windowWidth - 10, windowHeight - 10);
                }
            }
        });
        function drawStar(x, y, radius) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.closePath();
        }
        for (let i = 0; i < 10; i++) {
            const starX = Math.random() * canvas.width;
            const starY = Math.random() * (canvas.height / 4);
            const starRadius = Math.random() * 2 + 1;
            drawStar(starX, starY, starRadius);
        }

        ctx.fillStyle = '#ffffff';
        ctx.font = '30px Arial';
        ctx.textAlign = 'right';
        ctx.fillText('Moonlight City', canvas.width - 30, 50);
        ctx.font = '18px Arial';
        ctx.fillText('月亮', canvas.width - 30, 80);
    }
});
function changeTableWidth(width) {
    document.getElementById('dataTable').style.width = width + 'px';
}

function changeBorderWidth(width) {
    const cells = document.querySelectorAll('#dataTable td');
    cells.forEach(cell => {
        cell.style.borderWidth = width + 'px';
    });
}

function changeTableColor(color) {
    const cells = document.querySelectorAll('#dataTable .a');
    cells.forEach(cell => {
        cell.style.backgroundColor = color;
    });
}

function resetTable() {
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');

const lightboxCounter = lightbox.querySelector('.lightbox-counter');

const imageSources = [];
galleryItems.forEach(item => {
    imageSources.push(item.querySelector('img').src);
});

let currentIndex = 0;
function updateLightboxImage(index) {
    if (index < 0 || index >= imageSources.length) {
        console.error("Index out of bounds");
        return;
    }
    lightboxImage.src = imageSources[index];
    currentIndex = index;
    lightboxCounter.textContent = `Image ${index + 1}  of  ${imageSources.length}`;
}

function openLightbox(index) {
    updateLightboxImage(index);
    lightbox.classList.add('active');
}
function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImage.src = '';
    lightboxCounter.textContent = ''; 
}
function showNextImage() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= imageSources.length) {
        nextIndex = 0;
    }
    updateLightboxImage(nextIndex);
}
function showPrevImage() {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
        prevIndex = imageSources.length - 1;
    }
    updateLightboxImage(prevIndex);
}
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
});

lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) {
        return;
    }

    if (e.key === 'Escape') {
        closeLightbox();
    }
    if (e.key === 'ArrowRight') {
        showNextImage();
    }
    if (e.key === 'ArrowLeft') {
        showPrevImage();
    }
});
});