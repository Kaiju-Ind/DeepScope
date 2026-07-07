import type { TechnologyDefinition } from '../../types';

export const accessibeTechnologyDefinition = {
	id: "accessibe",
	name: "AccessiBe",
	website: "https://accessibe.com",
	description: "AccessiBe is an accessibility overlay which claims to provide ADA and WCAG compliance. The system scans and analyzes a website, and applies adjustments which they claim make your website ADA and WCAG 2.1 compliant.",
	icon: "AccessiBe.svg",
	categories: [
		"accessibility"
	],
	rules: [
		{
			id: "accessibe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("acsbapp\\.com\\/(?:.*\\/acsb\\.js|apps\\/app\\/dist\\/js\\/app\\.js)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "accessibe:jsGlobal:1",
			kind: "jsGlobal",
			property: "acsb",
			confidence: 50,
			description: "Page-owned global matches a known technology marker."
		},
		{
			id: "accessibe:jsGlobal:2",
			kind: "jsGlobal",
			property: "acsbJS",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		}
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
