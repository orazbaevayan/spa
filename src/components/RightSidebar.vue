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
	&:not(.moves) {
		transition: right 0.2s ease, visibility .2s 0s ease, opacity .2s ease;
	}
	@include media-breakpoint-up(lg) {
		top: $header-hight + 3px;
		border: 1px solid $gray-300;
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