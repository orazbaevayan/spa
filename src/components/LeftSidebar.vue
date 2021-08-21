<template>
	<div id="left-sidebar" :class="{ open: open, moves: moves }" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove">
		<router-link class="link" :to="{ name: 'Home' }">{{ $t('pages.Главная') }}</router-link>
		<router-link class="link" :to="{ name: 'Courses' }">{{ $t('pages.Курсы') }}</router-link>
		<br>
		{{ 'diff: ' + diff }}
		<br>
		{{ 'lastTouch: ' + lastTouch }},
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'

	export default {
		name: 'leftSidebar',
		data() {
			return {
				moves: false,
				lastTouch: null,
				diff: 0,
			}
		},
		methods: {
			...mapMutations({
				'SET_FOCUS': 'ui/SET_FOCUS'
			}),
			setMoves(event) {
				event.targetTouches.length ? this.moves = true : this.moves = false;
				this.activeTouch(event, this.lastTouch) ? this.diff = event.target.offsetLeft - this.activeTouch(event, this.lastTouch).clientX : this.diff = 0;
				this.touches = event.touches.length;
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
				this.lastTouch = event.changedTouches.item(0).identifier;
				this.setMoves(event);
			},
			touchmove(event) {
				let left = this.activeTouch(event, this.lastTouch).clientX + this.diff;
				if (left > 0) {
					event.target.style.left = '0px';
				} else if (left < -event.target.offsetWidth) {
					event.target.style.left = -event.target.offsetWidth + 'px';
				} else {
					event.target.style.left = this.activeTouch(event, this.lastTouch).clientX + this.diff + 'px';
				}
			},
			touchend(event) {
				this.setMoves(event);
				let left = event.target.offsetLeft;
				if (left < -(event.target.offsetWidth / 2)) {
					this.SET_FOCUS();
				} else {
					this.SET_FOCUS(this.$options.name);
				}
				if (!event.targetTouches.length) {
					event.target.style.left = '';
				}
			},
		},
		computed: {
			open() {
				return this.$options.name === this.$store.getters['ui/focus'];
			}
		}
	}
</script>

<style lang="scss" scoped>
#left-sidebar {
	position: fixed;
	max-width: 80%;
	width: $sidebar-width;
	top: 0;
	bottom: 0;
	padding-top: 40px;
	background-color: #d4e8fa;
	@include media-breakpoint-down(lg) {
		left: -$sidebar-width;
		&.open {
			left: 0px;
		}
		&:not(.moves) {
			transition: left 0.2s ease;
		}
	}
	.link {
		display: block;
		text-decoration: none;
		padding: 8px;
		line-height: 100%;
	}
}
</style>