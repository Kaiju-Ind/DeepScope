import type { TechnologyDefinition } from '../../types';

export const teamviewerTechnologyDefinition = {
	id: "teamviewer",
	name: "TeamViewer",
	website: "https://monitis.com",
	description: "TeamViewer is a network and IT systems uptime monitoring service, formerly known as Monitis.",
	icon: "TeamViewer.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "teamviewer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("rum\\.monitis\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:teamviewer:teamviewer:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
