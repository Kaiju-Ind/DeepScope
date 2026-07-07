import type { TechnologyDefinition } from '../../types';

export const helixUltimateTechnologyDefinition = {
	id: "helix-ultimate",
	name: "Helix Ultimate",
	website: "https://www.joomshaper.com/joomla-templates/helixultimate",
	description: "Helix Ultimate a free template framework for Joomla.",
	icon: "HelixUltimate.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "helix-ultimate:dom:0",
			kind: "dom",
			selector: "header#sp-header, body.helix-ultimate",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"joomla",
	],
} as const satisfies TechnologyDefinition;
