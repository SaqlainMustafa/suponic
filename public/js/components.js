Vue.component('main-nav-link', {
	template: `<a @mouseenter='imgType="-hover"' @mouseleave='imgType=""' :href="link" class="main-nav_icon-text d-flex align-items-center text-yellow">
	<img :src="'images/nav-icon' + imgType + '.png'" alt="">
	<span>{{text}}</span>
</a>`,

	props: ['text', 'link'],

	data() {
		return {
			imgType: ''
		}
	}
})

Vue.component('btn-diagonal', {
	template: `<button class="btn-diagonal p-relative" @mouseenter='src="-hover"' @mouseleave='src=""'>
	<img :src="'images/btn-diagonal' + src + '.png'" alt="">
	<div class='text-white'>{{text}}</div>
</button>`,

	props: ['text'],

	data() {
		return {
			src: ''
		}
	}
})

Vue.component('main-banner-nav-item', {
	template: `<div class="item d-flex flex-column align-items-center">
	<img :src="'images/' + src" alt="">
	<span class='text-white'>{{text}}</span>
</div>`,

	props: ['text', 'src']

})

Vue.component('rating', {
	template: `<div class="rating-wrapper d-flex align-items-center text-white line-height-normal">
	<span class="font-bold">Rating</span>
	<div class="rating">
		<img v-for='(item, index) in 5' :src="'images/' + setStarType(index) + '.png'" alt="">
	</div>
	<span>{{score}}</span>
</div>`,

	props: {
		score: Number
	},

	data() {
		return {
			starType: '',
			starCount: Math.floor(this.score),
		}
	},

	methods: {
		setStarType(index) {
			if (index < this.starCount)
				return this.starType = 'star-icon'
			else return this.starType = 'star-icon-empty'
		}
	}
})

Vue.component('game-card', {
	template: `<div class="game-card d-flex flex-column align-items-center text-center p-relative animate">
	<img :src="'images/' + img + '.png'" alt="" class="game-card_img">
	<h1 class="text-white grid-col-span title font-bold">{{title}}</h1>
	<rating :stars='stars' :score='score'></rating>
	<span class="game-card_desc text-white">{{desc}}</span>
	<a :href="link"><btn-diamond text='Download'></btn-diamond></a>
</div>`,

	props: ['title', 'desc', 'img', 'link', 'score', 'stars']
})

Vue.component('btn-diamond', {
	template: `<div class='btn-diamond text-white font-bold text-center d-flex align-items-center p-relative'>{{text}}</div>`,
	props: ['text']
})

Vue.component('article-card', {
	template: `<div class="article-card animate">
	<h1 class="article-card_number font-bold">{{number}}</h1>
	<h2 class="article-card_headline text-white font-bold p-relative">{{headline}}</h2>
	<div class="article-card_article-body">
		<slot></slot>
	</div>
</div>`,

	props: ['number', 'headline']
})

Vue.component('news-card', {
	template: `<div class="news-card p-relative animate">
	<img :src="'images/' + character + '-character.png'" alt="" class="news-card_img">
	<div class="news-card_content d-flex flex-column">
		<h5 class="news-card_title font-bold text-white">{{title}}</h5>
		<btn-diamond text='Learn More' class="btn-diamond-transparent"></btn-diamond>
		<p class="news-card_text">{{para}}</p>
	</div>
</div>`,

	props: ['character', 'title', 'para']
})

Vue.component('fb-feed-card', {
	template: `<div class="fb-feed-card p-relative animate">
	<img :src="'images/fb-feed-img' + img + '.png'" alt="" class="fb-feed-card_img">
	<a href='#' class="fb-feed-card_content text-white">
		<h2 class="title text-yellow font-bold">{{title}}</h2>
		<slot></slot>
	</a>
</div>`,

	props: ['img', 'title']
})

Vue.component('field', {
	template:
		`<input :type="type" name="" id="" class="text-white w-100 field" :placeholder="placeholder">`,

	props: {
		type: {
			type: String,
			default: 'text'
		},
		placeholder: String
	}
})

Vue.component('password-field', {
	template:
		`<div class="pw-wrapper p-relative">
	<input :type="type" name="" id="" class="text-white w-100 field" :placeholder="placeholder">
	<a v-if='showForgot' href='#' class='forgot-pw text-muted form-text tdn'>Forgot Password</a>
	<img src="images/eye-icon.png" alt="" class="toggle-pw-visibility" @click='togglePasswordVisibility'>
</div>`,

	props: {
		showForgot: {
			type: Boolean
		},

		placeholder: {
			type: String,
			default: 'Password'
		}
	},

	data() {
		return {
			type: 'password'
		}
	},

	methods: {
		togglePasswordVisibility() {
			if (this.type == 'password')
				return this.type = 'text'
			else return this.type = 'password'
		}
	}
})

Vue.component('sgc-card', {
	template:
		`<div class="sgc-card text-center">
	<div class="coins d-flex flex-column align-items-center">
		<h5 class="text-yellow font-bold">{{setAmount}}</h5>
		<img :src="'images/' + amount + 'sgc-coins.png'" alt="">
	</div>
	<div class="amount-and-coin text-white font-bold">{{amount}} <span>SGC</span> <img src="images/coin-avail-icon.png" alt="" class="coin"></div>
	<button class="purchase text-white font-bold" @click='showModal'>Purchase</button>
</div>`,

	props: {
		amount: Number
	},

	data() {
		return {
			image: ''
		}
	},

	computed: {
		setAmount() {
			return `$${this.amount}`
		},
	},

	methods: {
		showModal() {
			var modal = document.querySelector('.modal-purchase');
			modal.style.display = 'block';
			modal.querySelector('.btn-diamond').textContent = `Pay with Card $${this.amount}`;
			modal.querySelector('.amount span:first-child').textContent = this.amount
		}
	}
})

Vue.component('modal', {
	template:
		`<div class="modal-wrapper"><div class="modal p-relative"><div class="dismiss text-yellow">×</div> <h4 class="title text-white font-bold">{{title}}</h4>  <slot></slot> </div></div>`,

	props: {
		title: String,
	}
})

Vue.component('remember-me', {
	template:
	`<label for="remember" class="d-flex align-items-center text-muted form-text">Remember Me
	<div class="checkbox-wrapper d-flex p-relative"><input type="checkbox" name="" id="remember"> <span class="checkmark"></span></div></label>`
})

new Vue({
	el: '#app',

	data: {
		mainBarNavItems: [
			{ id: 0, text: 'Action', src: 'action-icon.png' },
			{ id: 1, text: 'Adventure', src: 'adventure-icon.png' },
			{ id: 2, text: 'RPG', src: 'rpg-icon.png' },
			{ id: 3, text: 'Simulation', src: 'simulation-icon.png' },
			{ id: 4, text: 'Casual', src: 'casual-icon.png' },
			{ id: 5, text: 'Sports', src: 'sports-icon.png' },
			{ id: 6, text: 'Others', src: 'others-icon.png' },
		],

		pageLoaded: false,
		// modalVisible: true
		loggedIn: false
	},

	created() {
		window.addEventListener('load', () => {
			this.pageLoaded = true

			targets.forEach(target => {
				observer.observe(target);
			});
		})
	}
})