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
			clearFocus() {
				this.$store.dispatch('ui/clearFocus', this.$options.name);
			},
			setMoves(event) {
				event.targetTouches.length ? this.moves = true : this.moves = false;
				this.activeTouch(event, this.lastTouch.identifier) ? this.diffX = event.target.offsetRight - this.activeTouch(event, this.lastTouch.identifier).clientX : this.diffX = 0;
			},
			activeTouch(event, identifier) {
				for (var i = 0, len = event.targetTouches.length; i < len; i++) {
					var touch = event.targetTouches[i];
					if (touch.identifier === identifier) {
						return touch;
					}
				}
			},
			setLastTouch(event) {
				this.lastTouch.timeStamp = event.timeStamp;
				this.lastTouch.clientX = event.changedTouches[0].clientX;
			},
			touchstart(event) {
				this.lastTouch.identifier = event.changedTouches.item(0).identifier;
				this.setLastTouch(event);
				this.setMoves(event);
			},
			touchmove(event) {
				let right = window.innerWidth - (this.activeTouch(event, this.lastTouch.identifier).clientX + this.diffX);
				if (event.changedTouches[0].identifier === this.lastTouch.identifier) {
					this.speed = (event.changedTouches[0].clientX - this.lastTouch.clientX)/(event.timeStamp - this.lastTouch.timeStamp);
					this.setLastTouch(event);
				}
				if (window.innerWidth < 992) {
					if (right < event.target.offsetWidth) {
						event.target.style.right = event.target.offsetWidth + 'px';
					} else if (right > 0) {
						event.target.style.right = '0px';
					} else {
						event.target.style.right = -(this.activeTouch(event, this.lastTouch.identifier).clientX + this.diffX + 'px');
					}
				}
			},
			touchend(event) {
				this.setMoves(event);
				let left = event.target.offsetLeft;
				if (window.innerWidth < 992) {
					if (left < -(event.target.offsetWidth / 2) || this.speed < -0.1) {
						this.clearFocus(this.$options.name);
					} else {
						this.SET_FOCUS(this.$options.name);
					}
					if (!event.targetTouches.length) {
						event.target.style.left = '';
					}
				}
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
	bottom: 0;
	background-color: #fff;
	padding: 16px;
	@include media-breakpoint-down(lg) {
		top: 0;
		right: -$sidebar-width;
		&.open {
			z-index: 1;
			right: 0px;
		}
		&:not(.moves) {
			transition: right 0.2s ease;
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