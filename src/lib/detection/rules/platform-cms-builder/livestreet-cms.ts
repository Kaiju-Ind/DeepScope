import type { TechnologyDefinition } from '../../types';

export const livestreetCmsTechnologyDefinition = {
	id: "livestreet-cms",
	name: "LiveStreet CMS",
	website: "https://livestreetcms.com",
	icon: "LiveStreet CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "livestreet-cms:jsGlobal:0",
			kind: "jsGlobal",
			property: "LIVESTREET_SECURITY_KEY",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "livestreet-cms:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("LiveStreet CMS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "livestreet-cms:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("livestreet cms", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
