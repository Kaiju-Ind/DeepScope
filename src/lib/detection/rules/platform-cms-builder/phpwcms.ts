import type { TechnologyDefinition } from '../../types';

export const phpwcmsTechnologyDefinition = {
	id: "phpwcms",
	name: "phpwcms",
	website: "https://www.phpwcms.org",
	description: "phpwcms is a web-based content management system and CMS framework built with PHP and MySQL.",
	icon: "PHPWCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:phpwcms:phpwcms:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
