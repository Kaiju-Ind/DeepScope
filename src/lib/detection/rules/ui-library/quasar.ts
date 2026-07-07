import type { TechnologyDefinition } from '../../types';

export const quasarTechnologyDefinition = {
	id: "quasar",
	name: "Quasar",
	website: "https://quasar.dev",
	description: "Quasar is an open-source Vue.js based framework.",
	icon: "Quasar.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "quasar:dom:0",
			kind: "dom",
			selector: "div#q-app",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "quasar:dom:1",
			kind: "dom",
			selector: "div.q-page-container",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "quasar:dom:2",
			kind: "dom",
			selector: "div.q-notifications",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "quasar:dom:3",
			kind: "dom",
			selector: "span.q-focus-helper",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"vue-js",
	],
	requires: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
