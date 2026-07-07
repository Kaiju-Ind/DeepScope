import type { TechnologyDefinition } from '../../types';

export const cyberchimpsResponsiveTechnologyDefinition = {
	id: "cyberchimps-responsive",
	name: "CyberChimps Responsive",
	website: "https://cyberchimps.com/responsive",
	description: "CyberChimps Responsive is a modern, lightweight, fully customizable, fast and responsive WordPress theme.",
	icon: "CyberChimps.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "cyberchimps-responsive:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/responsive(?:pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cyberchimps-responsive:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/responsive/'], link[href*='/wp-content/themes/responsivepro/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
