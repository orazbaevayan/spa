<template>
	<div :id="$options.name" :ref="$options.name" :class="{ open: open, moves: moves }" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove" v-closable="{ handler: clearFocus, exclude: ['left-sidebar-open-button'] }">
		<NavigationMenu />
	</div>
</template>

<script>
	import NavigationMenu from '@/components/NavigationMenu'
	import { mapActions } from 'vuex'

	export default {
		name: 'left-sidebar',
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
		components: {
			NavigationMenu
		},
		methods: {
			...mapActions({
				'activateFocus': 'ui/activateFocus'
			}),
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
					if (left > 0) {
						event.currentTarget.style.left = '0px';
					} else if (left < -event.currentTarget.offsetWidth) {
						event.currentTarget.style.left = -event.currentTarget.offsetWidth + 'px';
					} else {
						event.currentTarget.style.left = this.activeTouch(event, this.lastTouch.identifier).clientX + this.diffX + 'px';
					}
				}
			},
			clearFocus() {
				this.$store.dispatch('ui/clearFocus', this.$options.name);
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
			setLastTouch(event) {
				this.lastTouch.timeStamp = event.timeStamp;
				this.lastTouch.clientX = event.changedTouches[0].clientX;
				this.lastTouch.clientY = event.changedTouches[0].clientY;
			},
			touchend(event) {
				if (window.innerWidth < 992 && event.changedTouches[0].identifier === this.lastTouch.identifier) {
					this.setMoves(event);
					let left = event.currentTarget.offsetLeft;
					if (left < -(event.currentTarget.offsetWidth / 2) || (this.speedX < -0.1  && (Math.abs(this.speedX) > Math.abs(this.speedY)))) {
						this.clearFocus(this.$options.name);
					} else {
						this.activateFocus(this.$options.name);
					}
					if (!event.targetTouches.length) {
						event.currentTarget.style.left = '';
					}
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
	top: $header-hight;
	bottom: 0;
	background-color: #fff;
	padding: 16px;
	overflow-y: auto;
	overscroll-behavior: none;
	/* Hide scrollbar for Chrome, Safari and Opera */
	&::-webkit-scrollbar {
		display: none;
	}
	/* Hide scrollbar for IE, Edge and Firefox */
	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
	-webkit-user-select: none;  /* Chrome all / Safari all */
	-moz-user-select: none;     /* Firefox all */
	-ms-user-select: none;      /* IE 10+ */
	user-select: none;          /* Likely future */   
	@include media-breakpoint-down(lg) {
		top: 0;
		left: -$sidebar-width;
		border-right: 1px solid $gray-300;
		&.open {
			left: 0px;
		}
		&:not(.moves) {
			transition: left 0.2s ease;
		}
	}
}
</style>