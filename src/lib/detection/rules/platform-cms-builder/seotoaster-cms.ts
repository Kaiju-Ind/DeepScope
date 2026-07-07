import type { TechnologyDefinition } from '../../types';

export const seotoasterCmsTechnologyDefinition = {
	id: "seotoaster-cms",
	name: "SeoToaster CMS",
	website: "https://www.seotoaster.com",
	description: "SeoToaster CMS is an open-source content management system that provides a unified platform for building, managing, and hosting websites.",
	icon: "SeoToaster.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "seotoaster-cms:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("sa\\.seotoaster\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
