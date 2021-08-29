<template>
	<div :id="$options.name" :class="{ open: open, moves: moves }" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove" v-closable="{ handler: clearFocus, exclude: ['right-sidebar-open-button'] }">
		<router-link class="link" active-class="active" :exact="true" :to="{ name: 'Home' }">{{ $t('ui.Выход') }}</router-link>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'

	export default {
		name: 'right-sidebar',
		data() {
			return {
				moves: false,
				lastTouch: {
					identifier: null,
					clientX: 0,
					timestamp: 0
				},
				diffX: 0,
				speed: 0
			}
		},
		methods: {
			...mapMutations({
				'SET_FOCUS': 'ui/SET_FOCUS'
			}),
			setLastTouch(event) {
				this.lastTouch.timeStamp = event.timeStamp;
				this.lastTouch.clientX = event.changedTouches[0].clientX;
			},
			setMoves(event) {
				event.targetTouches.length ? this.moves = true : this.moves = false;
				this.activeTouch(event, this.lastTouch.identifier) ? this.diffX = event.target.offsetLeft - this.activeTouch(event, this.lastTouch.identifier).clientX : this.diffX = 0;
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
					this.speed = (event.changedTouches[0].clientX - this.lastTouch.clientX)/(event.timeStamp - this.lastTouch.timeStamp);
					this.setLastTouch(event);
				}
				if (window.innerWidth < 992) {
					if (left > window.innerWidth) {
						event.target.style.right = -event.target.offsetWidth + 'px';
					} else if (left < window.innerWidth - event.target.offsetWidth) {
						event.target.style.right = '0';
					} else {
						event.target.style.right = window.innerWidth - event.target.offsetWidth - (this.activeTouch(event, this.lastTouch.identifier).clientX + this.diffX) + 'px';
					}
				}
			},
			touchend(event) {
				this.setMoves(event);
				let left = event.target.offsetLeft;
				if (window.innerWidth < 992) {
					if (left > window.innerWidth - (event.target.offsetWidth / 2) || this.speed > 0.1) {
						this.clearFocus(this.$options.name);
					} else {
						this.SET_FOCUS(this.$options.name);
					}
					if (!event.targetTouches.length) {
						event.target.style.right = '';
					}
				}
			},
			clearFocus() {
				this.$store.dispatch('ui/clearFocus', this.$options.name);
			},
		},
		computed: {
			open() {
				return this.$options.name === this.$store.getters['ui/focus'];
				//return true;
			}
		}
	}
</script>

<style lang="scss" scoped>
#right-sidebar {
	position: fixed;
	max-width: 80%;
	width: $sidebar-width;
	top: $header-hight;
	background-color: #fff;
	padding: 16px;
	&:not(.moves) {
		transition: right 0.2s ease, visibility .2s 0s ease, opacity .2s ease;
	}
	@include media-breakpoint-up(lg) {
		top: $header-hight;
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
		border-left: 1px solid $gray-300;
		&.open {
			z-index: 1;
			right: 0px;
		}
	}
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
</style>