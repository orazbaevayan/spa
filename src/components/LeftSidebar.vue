<template>
	<div id="left-sidebar" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove">
		<router-link class="link" :to="{ name: 'Home' }">{{ $t('pages.Главная') }}</router-link>
		<router-link class="link" :to="{ name: 'Courses' }">{{ $t('pages.Курсы') }}</router-link>
		{{ 'posX: ' + posX }}
		<br>
		{{ 'startX: ' + startX }}
		<br>
		{{ 'elPosX: ' + elPosX }}
		<br>
		{{ 'startOffset: ' + startOffset }}
		<br>
		{{ 'moving: ' + moving }}
	</div>
</template>

<script>
	export default {
		data() {
			return {
				moving: false,
				startX: null,
				startOffset: null,
				posX: null,
				elPosX: null
			}
		},
		methods: {
			touchstart(event) {
				if (!this.moving) {
					this.moving = true;
					this.startX = event.touches[0].clientX;
					this.startOffset = event.target.offsetLeft;
				}
			},
			touchend(event) {
				this.moving = false;
				event.target.style.left = '';
			},
			touchmove(event) {
				if (this.moving) {
					event.target.style.left = this.startOffset + (event.touches[0].clientX - this.startX) + 'px';
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
#left-sidebar {
	position: fixed;
	max-width: 80%;
	width: 300px;
	top: 0;
	bottom: 0;
	padding-top: 41px;
	background-color: #d4e8fa;
	.link {
		display: block;
		text-decoration: none;
		padding: 8px;
		line-height: 100%;
	}
}
</style>