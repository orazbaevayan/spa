<template>
	<div class="card" :class="{ 'control-panel': isControlPanel }">
		<div class="card-header p-1 d-flex" :style="(cardOpen && toggleOn) ? '' : 'border-bottom: none !important;'">
			<div class="d-flex align-items-center">
				<slot name="prepend"/>
			</div>
			<div class="card-header-text d-flex px-1 cursor-pointer flex-fill align-items-center">
				<slot name="header"/>
			</div>
			<div class="toggle-button d-flex px-2 align-items-center" v-if="toggleOn" @click.prevent="toggleCard()">
				<font-awesome-icon :icon="['fa', 'chevron-down']" v-if="!cardOpen" />
				<font-awesome-icon :icon="['fa', 'chevron-up']" v-if="cardOpen" />
			</div>
			<div class="d-flex align-items-center p-0">
				<slot name="append"/>
			</div>
		</div>
		<div class="card-body p-0" v-if="cardOpen && toggleOn">
			<slot name="content"/>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			toggleOn: {
				type: Boolean,
				default: false
			},
			isControlPanel: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				cardOpen: false,
			}
		},
		methods: {
			toggleCard() {
				this.cardOpen = !this.cardOpen;
			}
		}
	}
</script>

<style lang="scss" scoped>
.card {
	background-color: transparent;
	&.control-panel {
		border-color: transparent;
		background-color: transparent;
		.card-header {
			background-color: transparent;
		}
	}
	.toggle-button {
		cursor: pointer;
	}
}
</style>