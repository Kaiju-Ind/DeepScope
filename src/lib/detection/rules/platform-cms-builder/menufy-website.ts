import type { TechnologyDefinition } from '../../types';

export const menufyWebsiteTechnologyDefinition = {
	id: "menufy-website",
	name: "Menufy Website",
	website: "https://restaurant.menufy.com",
	description: "Menufy is an online and mobile meal ordering service.",
	icon: "Menufy.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "menufy-website:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sitecontent-menufycom\\.netdna-ssl\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "menufy-website:jsGlobal:1",
			kind: "jsGlobal",
			property: "Views_Website_Layouts_Footer_Menufy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
