import type { TechnologyDefinition } from '../../types';

export const equalbrowseTechnologyDefinition = {
	id: "equalbrowse",
	name: "Equalbrowse",
	website: "https://equalbrowse.com",
	description: "Equalbrowse is a website accessibility platform that supports compliance with legal and regulatory standards through automated remediation, monitoring, and accessibility management features.",
	icon: "Equalbrowse.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "equalbrowse:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.equalbrowse\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "equalbrowse:jsGlobal:1",
			kind: "jsGlobal",
			property: "hhpEqualbrowsifyOptions",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
