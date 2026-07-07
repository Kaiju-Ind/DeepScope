import type { TechnologyDefinition } from '../../types';

export const voogComWebsiteBuilderTechnologyDefinition = {
	id: "voog-com-website-builder",
	name: "Voog.com Website Builder",
	website: "https://www.voog.com/",
	icon: "Voog.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "voog-com-website-builder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("voog\\.com\\/tracker\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "voog-com-website-builder:html:1",
			kind: "html",
			pattern: new RegExp("<script [^>]*src=\"[^\"]*voog\\.com\\/tracker\\.js"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
