import type { TechnologyDefinition } from '../../types';

export const papayaCmsTechnologyDefinition = {
	id: "papaya-cms",
	name: "papaya CMS",
	website: "https://papaya-cms.com",
	icon: "papaya CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "papaya-cms:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]*\\/papaya-themes\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "papaya-cms:dom:1",
			kind: "dom",
			selector: "link[href*='papaya-themes']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
