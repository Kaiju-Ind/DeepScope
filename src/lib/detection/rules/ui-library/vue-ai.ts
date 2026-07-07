import type { TechnologyDefinition } from '../../types';

export const vueAiTechnologyDefinition = {
	id: "vue-ai",
	name: "Vue.ai",
	website: "https://vue.ai",
	description: "Vue.ai is an AI-powered experience management suite which combines the power of product, customer and business intelligence using computer vision and NLP.",
	icon: "Vue.ai.svg",
	categories: [
		"ui-library",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "vue-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("vuex\\.vue\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vue-ai:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("vue_ai\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vue-ai:jsGlobal:2",
			kind: "jsGlobal",
			property: "getVueUrlSegments",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vue-ai:jsGlobal:3",
			kind: "jsGlobal",
			property: "vuex",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
