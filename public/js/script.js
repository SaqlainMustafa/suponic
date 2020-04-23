for (e of document.querySelectorAll('.main-header .menu-toggle')) {
	e.addEventListener('click', () => document.querySelector('.main-header .main-nav').classList.toggle('main-nav--visible'))
}

var targets = document.querySelectorAll('.animate');

let observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.2
}

observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.intersectionRatio >= 0.2) {
			// console.log(entry.intersectionRatio);

			if (entry.target.classList.contains('animate')) {
				entry.target.classList.add('animated')
			}
		}
	})
}, observerOptions)

if (document.querySelector('.modal .dismiss')) {
	document.querySelector('.modal .dismiss').addEventListener('click', function () {
		this.closest('.modal-wrapper').style.display = 'none'
	})
}

if (navigator.userAgent.indexOf("Edge") !== -1)
	console.log('Edge')