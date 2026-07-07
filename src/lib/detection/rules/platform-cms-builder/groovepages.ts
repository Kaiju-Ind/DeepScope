import type { TechnologyDefinition } from '../../types';

export const groovepagesTechnologyDefinition = {
	id: "groovepages",
	name: "GroovePages",
	website: "https://groove.cm/pages",
	description: "GroovePages is a cloud-based drag-and-drop website and funnel builder that enables users to create responsive websites, landing pages, and sales funnels without coding.",
	icon: "GrooveKart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "groovepages:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/app\\.groove\\.cm\\/groovepages\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "groovepages:dom:1",
			kind: "dom",
			selector: "link[href*='//app.groove.cm/groovepages/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
