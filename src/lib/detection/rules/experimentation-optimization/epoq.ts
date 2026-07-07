import type { TechnologyDefinition } from '../../types';

export const epoqTechnologyDefinition = {
	id: "epoq",
	name: "Epoq",
	website: "https://www.epoq.de",
	description: "Epoq is a platform that leverages artificial intelligence to deliver one-to-one personalization in e-commerce, enhancing product recommendations and user interactions through data-driven insights.",
	icon: "Epoq.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "epoq:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.epoq\\.de"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
