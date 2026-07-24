window.addEventListener('load', () => {
			window.scrollTo(0, 0); 
			
			if (window.location.hash) {
				history.replaceState(null, null, window.location.pathname);
			}
		});

		
		const mobileMenuBtn = document.getElementById('mobileMenuBtn');
		const navMenu = document.getElementById('navMenu');

		mobileMenuBtn.addEventListener('click', () => {
			mobileMenuBtn.classList.toggle('active');
			navMenu.classList.toggle('active');
		});

		
		const navLinks = document.querySelectorAll('.nav-link');
		navLinks.forEach(link => {
			link.addEventListener('click', () => {
				mobileMenuBtn.classList.remove('active');
				navMenu.classList.remove('active');
			});
		});

		
		function smoothScroll(target, duration = 800) {
			const targetElement = document.querySelector(target);
			if (!targetElement) return;

			const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80; 
			const startPosition = window.pageYOffset;
			const distance = targetPosition - startPosition;
			let startTime = null;

			function animation(currentTime) {
				if (startTime === null) startTime = currentTime;
				const timeElapsed = currentTime - startTime;
				const run = ease(timeElapsed, startPosition, distance, duration);
				window.scrollTo(0, run);
				if (timeElapsed < duration) requestAnimationFrame(animation);
			}

			
			function ease(t, b, c, d) {
				t /= d / 2;
				if (t < 1) return c / 2 * t * t + b;
				t--;
				return -c / 2 * (t * (t - 2) - 1) + b;
			}

			requestAnimationFrame(animation);
		}

		
		document.addEventListener('click', function (e) {
			if (e.target.matches('a[href^="#"]')) {
				e.preventDefault();
				const href = e.target.getAttribute('href');
				if (href !== '#' && href.length > 1) {
					smoothScroll(href);
				}
			}
		});

		
		const sections = document.querySelectorAll('.section');

		function checkScroll() {
			sections.forEach(section => {
				const sectionTop = section.getBoundingClientRect().top;
				const windowHeight = window.innerHeight;

				if (sectionTop < windowHeight * 0.85) {
					section.classList.add('visible');
				}
			});
		}

		
		window.addEventListener('load', checkScroll);
		window.addEventListener('scroll', checkScroll);

		
		const footerFeatures = document.querySelectorAll('.footer-feature');
		footerFeatures.forEach((feature, index) => {
			feature.style.animationDelay = `${index * 0.1}s`;
		});
