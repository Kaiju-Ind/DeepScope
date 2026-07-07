import type { TechnologyDefinition } from '../../types';

export const clientxcmsTechnologyDefinition = {
	id: "clientxcms",
	name: "ClientXCMS",
	website: "https://clientxcms.com",
	description: "ClientXCMS is a content management system that provides a drag-and-drop interface, customisable templates, user and media management, and website analytics to help businesses manage their website content.",
	icon: "ClientXCMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "clientxcms:jsGlobal:0",
			kind: "jsGlobal",
			property: "CLIENTXCMSCurrency",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clientxcms:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("bh-navbar__burger|\\[data-bh-reveal\\]"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "clientxcms:dom:2",
			kind: "dom",
			selector: "header#bhNavbar.bh-navbar #dark-mode-btn[data-url$='/darkmode']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
