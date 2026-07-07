import type { TechnologyDefinition } from '../../types';

export const sixcmsTechnologyDefinition = {
	id: "sixcms",
	name: "SixCMS",
	website: "https://www.six.de/produktwelt/content-management/",
	description: "SixCMS is a content management system (CMS) used for creating and managing websites and digital content.",
	icon: "SixCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sixcms:dom:0",
			kind: "dom",
			selector: "img[src*='/sixcms/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
