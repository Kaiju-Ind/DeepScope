import type { TechnologyDefinition } from '../../types';

export const petiteVueTechnologyDefinition = {
	id: "petite-vue",
	name: "petite-vue",
	website: "https://github.com/vuejs/petite-vue",
	description: "petite-vue is an alternative distribution of Vue optimised for progressive enhancement.",
	icon: "vue.svg",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "petite-vue:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/petite-vue"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "petite-vue:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\/petite-vue@([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
