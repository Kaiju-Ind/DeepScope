import type { TechnologyDefinition } from '../../types';

export const sakaiTechnologyDefinition = {
	id: "sakai",
	name: "Sakai",
	website: "https://www.sakailms.org",
	description: "Sakai is a robust open-source learning management system created by higher ed for higher ed.",
	icon: "Sakai.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "sakai:jsGlobal:0",
			kind: "jsGlobal",
			property: "sakai",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sakai:jsGlobal:1",
			kind: "jsGlobal",
			property: "sakaiPortalWindow",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sakai:jsGlobal:2",
			kind: "jsGlobal",
			property: "sakaiTutorialSkin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sakai:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^SAKAIID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "sakai:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^sakaiid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:sakailms:sakai:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
