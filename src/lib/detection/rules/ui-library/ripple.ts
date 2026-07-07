import type { TechnologyDefinition } from '../../types';

export const rippleTechnologyDefinition = {
	id: "ripple",
	name: "Ripple",
	website: "https://dpc-sdp.github.io/sdp-docs/ripple/",
	description: "Ripple is the frontend framework for Single Digital Presence, delivered using Nuxt and Vue.js.",
	icon: "ripple.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "ripple:header:0",
			kind: "header",
			key: "x-sdp-app-type",
			valuePattern: new RegExp("ripple", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"drupal",
		"nuxt-js",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
