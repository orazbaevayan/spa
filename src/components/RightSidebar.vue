<template>
	<div :id="$options.name" :class="{ open: open, moves: moves }" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove" v-closable="{ handler: clearFocus, exclude: ['right-sidebar-open-button'] }">
		<div id="user-info">
			<div id="avatar">
				
			</div>
			<div id="info">
				<h6>{{ user?.fullName }}</h6>
				<span>ИИН {{ user?.iin }}</span>
				<span>{{ user?.phone }}</span>
			</div>
		</div>
		<div id="menu">
			<a href="#" class="link" @click.prevent="$store.dispatch('auth/logout')">{{ $t('ui.Выход') }}</a>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis illo, ut ea ratione dolor doloribus sequi est fuga similique voluptatibus eum ipsum accusantium vitae mollitia. Inventore quam ipsa possimus voluptas.
			Voluptate, temporibus beatae, excepturi ut facere dolore corrupti maiores sequi dignissimos dolorem? Explicabo molestias quas, omnis unde, accusantium illo voluptatem, ullam aspernatur autem, architecto cupiditate tempora nisi! Excepturi, totam, neque.
			Error, mollitia expedita nesciunt soluta autem iste consequatur dolore adipisci at natus est numquam ab praesentium, hic. Inventore nostrum cumque incidunt facilis, sed neque quos ab in, molestias natus eius.
			Laboriosam eos sed error in culpa, nihil sit, eveniet excepturi vero suscipit odio hic ad eum odit assumenda blanditiis. Eligendi labore quod, nobis voluptate debitis at consequatur ducimus magnam temporibus.
			Quod nam saepe repellendus voluptate et molestias blanditiis ex totam. Delectus quas blanditiis expedita molestias ab, beatae eius nihil perferendis doloremque molestiae, consequuntur libero nulla ducimus in ipsa, deleniti quod!
			Natus voluptatum nam maxime animi corporis eos consequatur cum magnam veritatis. Maxime libero quo error saepe modi id ipsam accusantium omnis neque temporibus. Accusantium, nemo, soluta. Architecto eum at aspernatur!
			Possimus libero voluptatem sequi maxime dignissimos omnis velit eaque nemo repudiandae sunt facere totam earum ut nostrum et quos doloribus, nisi, rerum? Laboriosam, cum aliquam. Reiciendis minus, excepturi soluta sunt!
			Consequuntur odio maiores neque error velit itaque ad, facilis, deleniti ea. Architecto similique aut et cupiditate culpa adipisci autem perspiciatis in tempora. Vero nihil porro obcaecati nostrum reprehenderit velit accusamus.
			Impedit aperiam nisi, ab ipsam ullam et unde in voluptatibus neque rem, enim earum suscipit deserunt, tempore quaerat, nihil. Doloremque facere placeat neque cum tempore quidem odit, dolore omnis consequuntur.
			Minima facere possimus earum nobis distinctio ex totam ea perferendis minus. Consequatur minus accusamus alias tempora pariatur adipisci repellendus placeat sequi reiciendis iste error beatae, dolor, dolorum autem quis minima.
			Recusandae repellendus aperiam at consectetur iure, nam, tempora magnam dolore ducimus est architecto, itaque pariatur sint? Nihil assumenda sequi repudiandae commodi aliquam doloremque necessitatibus molestiae error iusto, tempora veniam cupiditate?
			Ex voluptatem impedit harum eius, officiis ad culpa reprehenderit delectus quisquam commodi iure dolorum natus labore voluptatibus nam porro sint dolorem error illum a quas omnis dolores? Tenetur, inventore, cupiditate!
			Consectetur consequuntur cupiditate natus sed, dicta vero delectus iusto tenetur. Dolore, repudiandae quibusdam provident commodi iusto hic eos voluptates necessitatibus blanditiis rerum eum labore ullam sed laboriosam molestiae quis nisi.
			Maxime iste totam ad sit hic fugiat officia reiciendis? Libero voluptas et nobis beatae ab eaque quis esse mollitia similique nesciunt quam, eveniet. Laudantium repudiandae quod eos tempora consequuntur ad.
			Neque cumque aspernatur quibusdam? Quae, voluptate nostrum vitae vero similique fugiat culpa laudantium delectus deserunt exercitationem totam, ea quasi dolorum ipsum, amet omnis suscipit voluptas, sapiente eos veniam aperiam id?
			Deleniti, esse, officia. Deserunt odit fugiat pariatur illo perspiciatis eos nam soluta eius reiciendis sed eum quia modi, iure possimus, quos libero nesciunt accusamus aliquid delectus cupiditate voluptates! Maiores, eveniet!
			Laboriosam excepturi odio commodi corrupti eum voluptate iusto molestiae officia, perspiciatis quisquam, reiciendis veritatis quibusdam, omnis voluptatem enim sint. Vitae explicabo, velit incidunt reiciendis repellendus qui sapiente illo odio accusamus.
			Assumenda, corrupti dolores quas! Earum omnis non quisquam sequi porro alias similique praesentium autem minus iure totam minima, corrupti facere ratione commodi sapiente impedit laboriosam tempora consectetur a, soluta doloremque!
			Vero eius facilis quia ratione dignissimos, voluptatem nobis velit, tempore dicta quo, earum eveniet reiciendis voluptate pariatur laborum rerum repudiandae. Maiores, voluptatum aliquid, labore eaque ullam quo architecto eius deleniti!
			Quos expedita eaque iste, fuga est, rem quas excepturi repellendus earum blanditiis eveniet voluptatibus alias. Et harum culpa beatae qui placeat sit vero minima, labore eos soluta voluptas ratione optio?
		</div>
	</div>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex'

	export default {
		name: 'right-sidebar',
		data() {
			return {
				moves: false,
				lastTouch: {
					identifier: null,
					clientX: 0,
					clientY: 0,
					timestamp: 0
				},
				diffX: 0,
				speedX: 0,
				speedY: 0
			}
		},
		methods: {
			...mapMutations({
				'SET_FOCUS': 'ui/SET_FOCUS'
			}),
			setLastTouch(event) {
				this.lastTouch.timeStamp = event.timeStamp;
				this.lastTouch.clientX = event.changedTouches[0].clientX;
				this.lastTouch.clientY = event.changedTouches[0].clientY;
			},
			setMoves(event) {
				event.targetTouches.length ? this.moves = true : this.moves = false;
				this.activeTouch(event, this.lastTouch.identifier) ? this.diffX = event.currentTarget.offsetLeft - this.activeTouch(event, this.lastTouch.identifier).clientX : this.diffX = 0;
			},
			activeTouch(event, identifier) {
				for (var i = 0, len = event.targetTouches.length; i < len; i++) {
					var touch = event.targetTouches[i];
					if (touch.identifier === identifier) {
						return touch;
					}
				}
			},
			touchstart(event) {
				this.lastTouch.identifier = event.changedTouches.item(0).identifier;
				this.setLastTouch(event);
				this.setMoves(event);
			},
			touchmove(event) {
				let left = this.activeTouch(event, this.lastTouch.identifier).clientX + this.diffX;
				if (event.changedTouches[0].identifier === this.lastTouch.identifier) {
					this.speedX = (event.changedTouches[0].clientX - this.lastTouch.clientX)/(event.timeStamp - this.lastTouch.timeStamp);
					this.speedY = (event.changedTouches[0].clientY - this.lastTouch.clientY)/(event.timeStamp - this.lastTouch.timeStamp);
					this.setLastTouch(event);
				}
				if (window.innerWidth < 992 && (Math.abs(this.speedX) > Math.abs(this.speedY))) {
					if (left > window.innerWidth) {
						event.currentTarget.style.right = -event.currentTarget.offsetWidth + 'px';
					} else if (left < window.innerWidth - event.currentTarget.offsetWidth) {
						event.currentTarget.style.right = '0';
					} else {
						event.currentTarget.style.right = window.innerWidth - event.currentTarget.offsetWidth - (this.activeTouch(event, this.lastTouch.identifier).clientX + this.diffX) + 'px';
					}
				}
			},
			touchend(event) {
				this.setMoves(event);
				let left = event.currentTarget.offsetLeft;
				if (window.innerWidth < 992 && event.changedTouches[0].identifier === this.lastTouch.identifier) {
					if (left > window.innerWidth - (event.currentTarget.offsetWidth / 2) || (this.speedX > 0.1 && (Math.abs(this.speedX) > Math.abs(this.speedY)))) {
						this.clearFocus(this.$options.name);
					} else {
						this.SET_FOCUS(this.$options.name);
					}
					if (!event.targetTouches.length) {
						event.currentTarget.style.right = '';
					}
				}
			},
			clearFocus() {
				this.$store.dispatch('ui/clearFocus', this.$options.name);
			},
		},
		computed: {
			...mapGetters({
				'user': 'auth/user'
			}),
			open() {
				return this.$options.name === this.$store.getters['ui/focus'];
			}
		}
	}
</script>

<style lang="scss" scoped>
#right-sidebar {
	position: fixed;
	max-width: 80%;
	width: $sidebar-width;
	background-color: #fff;

	overflow-y: scroll;
	overscroll-behavior: none;

	/* Hide scrollbar for Chrome, Safari and Opera */
	&::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */

	&:not(.moves) {
		transition: right 0.2s ease, visibility .2s 0s ease, opacity .2s ease;
	}
	@include media-breakpoint-up(lg) {
		top: $header-hight + 3px;
		border: 1px solid $gray-300;
		max-height: calc(100vh - (#{$header-hight} + 6px));
		&:not(.open) {
			visibility: hidden;
			opacity: 0;
		}
	}
	@include media-breakpoint-down(lg) {
		top: 0;
		bottom: 0;
		right: -$sidebar-width;
		&.open {
			z-index: 1;
			right: 0px;
		}
	}
	#user-info {
		display: flex;
		flex-direction: row;
		background-color: lighten($primary, 20%);
		padding: 8px;
		align-items: center;
		#avatar {
			background-color: #fff;
			border-radius: 50%;
			width: 4rem;
			height: 4rem;
			margin: 8px;
		}
		#info {
			display: flex;
			flex-direction: column;
			h6, span {
				color: #fff;
				line-height: 100%;
				margin: 0;
			}
			h6 {
				font-size: 0.9rem;
				margin-bottom: 8px;
			}
			span {
				font-size: 0.7rem;
			}
			span:not(:last-child) {
				margin-bottom: 8px;
			}
		}
	}
	#menu {
		padding: 16px;
		.link {
			display: block;
			text-decoration: none;
			padding: 8px;
			line-height: 150%;
			&.active {
				text-decoration: underline;
			}
		}
	}
}
</style>