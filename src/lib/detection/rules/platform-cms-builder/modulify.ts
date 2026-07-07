import type { TechnologyDefinition } from '../../types';

export const modulifyTechnologyDefinition = {
	id: "modulify",
	name: "Modulify",
	website: "https://modulify.ai",
	description: "Modulify is a platform that enables the creation and deployment of scalable websites.",
	icon: "Modulify.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "modulify:dom:0",
			kind: "dom",
			selector: "html[data-wf-domain^='mdlfy-']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "modulify:dom:1",
			kind: "dom",
			selector: "[mdlfy-content]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
