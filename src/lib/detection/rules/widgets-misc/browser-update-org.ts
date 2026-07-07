import type { TechnologyDefinition } from '../../types';

export const browserUpdateOrgTechnologyDefinition = {
	id: "browser-update-org",
	name: "Browser-Update.org",
	website: "https://browser-update.org",
	description: "Browser-update.org is a tool to unobtrusively notify visitors that they should update their web browser in order to use your website.",
	icon: "Browser-Update.org.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "browser-update-org:jsGlobal:0",
			kind: "jsGlobal",
			property: "$bu_.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "browser-update-org:jsGlobal:1",
			kind: "jsGlobal",
			property: "$bu_getBrowser",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
