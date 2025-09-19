document.addEventListener('DOMContentLoaded', function() {
    const heart = document.querySelector('.heart');
    const colorBtn = document.getElementById('colorBtn');
    const sizeBtn = document.getElementById('sizeBtn');
    const speedBtn = document.getElementById('speedBtn');
    const rotateBtn = document.getElementById('rotateBtn');
    
    // Массив цветов для сердца
    const colors = ['default', 'pink', 'purple', 'blue', 'green', 'orange'];
    let currentColorIndex = 0;
    
    // Массив размеров
    const sizes = ['small', 'medium', 'large'];
    let currentSizeIndex = 1; // medium по умолчанию
    
    // Массив скоростей анимации
    const speeds = ['slow', 'normal', 'fast'];
    let currentSpeedIndex = 1; // normal по умолчанию
    
    // Состояние вращения
    const rotationStates = ['off', 'slow', 'normal', 'fast'];
    let currentRotationIndex = 0; // off по умолчанию
    
    // Функция для изменения цвета сердца
    function changeHeartColor() {
        // Удаляем предыдущий класс цвета
        colors.forEach(color => {
            if (color !== 'default') {
                heart.classList.remove(color);
            }
        });
        
        // Добавляем новый класс цвета
        if (colors[currentColorIndex] !== 'default') {
            heart.classList.add(colors[currentColorIndex]);
        }
        
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        
        // Обновляем текст кнопки
        const colorNames = {
            'default': 'Красный',
            'pink': 'Розовый',
            'purple': 'Фиолетовый',
            'blue': 'Синий',
            'green': 'Зеленый',
            'orange': 'Оранжевый'
        };
        colorBtn.textContent = `Цвет: ${colorNames[colors[currentColorIndex]]}`;
    }
    
    // Функция для изменения размера сердца
    function changeHeartSize() {
        const heartContainer = document.querySelector('.heart-container');
        
        // Удаляем предыдущий класс размера
        sizes.forEach(size => {
            heartContainer.classList.remove(size);
        });
        
        // Добавляем новый класс размера
        heartContainer.classList.add(sizes[currentSizeIndex]);
        
        currentSizeIndex = (currentSizeIndex + 1) % sizes.length;
        
        // Обновляем текст кнопки
        const sizeNames = {
            'small': 'Маленький',
            'medium': 'Средний',
            'large': 'Большой'
        };
        sizeBtn.textContent = `Размер: ${sizeNames[sizes[currentSizeIndex]]}`;
    }
    
    // Функция для изменения скорости анимации
    function changeAnimationSpeed() {
        const heartElement = document.querySelector('.heart');
        const heartShadow = document.querySelector('.heart-shadow');
        
        // Удаляем предыдущий класс скорости
        speeds.forEach(speed => {
            heartElement.classList.remove(speed);
            heartShadow.classList.remove(speed);
        });
        
        // Добавляем новый класс скорости
        heartElement.classList.add(speeds[currentSpeedIndex]);
        heartShadow.classList.add(speeds[currentSpeedIndex]);
        
        currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
        
        // Обновляем текст кнопки
        const speedNames = {
            'slow': 'Медленно',
            'normal': 'Нормально',
            'fast': 'Быстро'
        };
        speedBtn.textContent = `Скорость: ${speedNames[speeds[currentSpeedIndex]]}`;
    }
    
    // Функция для управления вращением сердца
    function toggleHeartRotation() {
        const heartElement = document.querySelector('.heart');
        
        // Удаляем все классы вращения
        heartElement.classList.remove('rotating', 'rotating-slow', 'rotating-fast');
        
        // Добавляем новый класс вращения
        if (rotationStates[currentRotationIndex] !== 'off') {
            if (rotationStates[currentRotationIndex] === 'slow') {
                heartElement.classList.add('rotating-slow');
            } else if (rotationStates[currentRotationIndex] === 'fast') {
                heartElement.classList.add('rotating-fast');
            } else {
                heartElement.classList.add('rotating');
            }
        }
        
        currentRotationIndex = (currentRotationIndex + 1) % rotationStates.length;
        
        // Обновляем текст кнопки
        const rotationNames = {
            'off': 'Выключено',
            'slow': 'Медленно',
            'normal': 'Нормально',
            'fast': 'Быстро'
        };
        rotateBtn.textContent = `Вращение: ${rotationNames[rotationStates[currentRotationIndex]]}`;
    }
    
    // Добавляем CSS для размеров
    const style = document.createElement('style');
    style.textContent = `
        .heart-container.small .heart {
            transform: scale(0.7);
        }
        .heart-container.large .heart {
            transform: scale(1.3);
        }
        .heart.slow {
            animation-duration: 2.5s !important;
        }
        .heart.fast {
            animation-duration: 0.8s !important;
        }
        .heart-shadow.slow {
            animation-duration: 2.5s !important;
        }
        .heart-shadow.fast {
            animation-duration: 0.8s !important;
        }
    `;
    document.head.appendChild(style);
    
    // Обработчики событий для кнопок
    colorBtn.addEventListener('click', changeHeartColor);
    sizeBtn.addEventListener('click', changeHeartSize);
    speedBtn.addEventListener('click', changeAnimationSpeed);
    rotateBtn.addEventListener('click', toggleHeartRotation);
    
    // Инициализация текста кнопок
    colorBtn.textContent = 'Цвет: Красный';
    sizeBtn.textContent = 'Размер: Средний';
    speedBtn.textContent = 'Скорость: Нормально';
    rotateBtn.textContent = 'Вращение: Выключено';
    
    // Добавляем эффект клика по сердцу
    heart.addEventListener('click', function() {
        // Создаем эффект "взрыва" частиц
        createParticleExplosion();
        
        // Временно ускоряем анимацию
        heart.style.animationDuration = '0.3s';
        setTimeout(() => {
            heart.style.animationDuration = '';
        }, 1000);
    });
    
    // Функция для создания взрыва частиц при клике
    function createParticleExplosion() {
        const heartRect = heart.getBoundingClientRect();
        const centerX = heartRect.left + heartRect.width / 2;
        const centerY = heartRect.top + heartRect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = '#ff6b6b';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            // Случайное направление
            const angle = (i / 12) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            document.body.appendChild(particle);
            
            // Анимация частицы
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }
    
    // Добавляем эффект при наведении на сердце
    heart.addEventListener('mouseenter', function() {
        heart.style.filter = 'brightness(1.2) drop-shadow(0 0 20px rgba(255, 107, 107, 0.8))';
    });
    
    heart.addEventListener('mouseleave', function() {
        heart.style.filter = '';
    });
    
    // Создаем дополнительные плавающие частицы
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        
        document.querySelector('.particles').appendChild(particle);
        
        // Анимация частицы
        particle.animate([
            {
                transform: 'translateY(100vh) rotate(0deg)',
                opacity: 0
            },
            {
                transform: 'translateY(-100px) rotate(360deg)',
                opacity: 1
            }
        ], {
            duration: (Math.random() * 4 + 4) * 1000,
            easing: 'linear'
        }).onfinish = () => {
            particle.remove();
        };
    }
    
    // Создаем новые частицы каждые 2 секунды
    setInterval(createFloatingParticle, 2000);
    
    // Добавляем эффект параллакса при движении мыши
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const heartContainer = document.querySelector('.heart-container');
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        heartContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    // Добавляем эффект при скролле (если есть скролл)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.heart-container');
        const speed = scrolled * 0.5;
        
        parallax.style.transform += ` translateY(${speed}px)`;
    });
    
    console.log('Анимированное сердце загружено! ❤️');
});
