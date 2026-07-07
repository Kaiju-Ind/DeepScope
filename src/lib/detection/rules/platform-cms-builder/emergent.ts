import type { TechnologyDefinition } from '../../types';

export const emergentTechnologyDefinition = {
	id: "emergent",
	name: "Emergent",
	website: "https://app.emergent.sh/",
	description: "Emergent is a website cloning AI website and app builder that replicates existing sites and applications while enabling the creation and customization of new digital experiences through automated design and development tools.",
	icon: "Emergent.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "emergent:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.emergent\\.sh"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
