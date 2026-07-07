import type { TechnologyDefinition } from '../../types';

export const rtoasterTechnologyDefinition = {
	id: "rtoaster",
	name: "Rtoaster",
	website: "https://www.brainpad.co.jp/rtoaster",
	description: "Rtoaster is a high-precision personalization platform developed in Japan that enables tailored user experiences across digital channels.",
	icon: "Rtoaster.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "rtoaster:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.rtoaster\\.jp"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
