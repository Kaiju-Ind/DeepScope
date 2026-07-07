import type { TechnologyDefinition } from '../../types';

export const dotclearTechnologyDefinition = {
	id: "dotclear",
	name: "Dotclear",
	website: "https://dotclear.org",
	description: "Dotclear is an open-source blogging platform focused on ease of use and versatility, offering features like multi-blog support, customizable themes, and antispam tools.",
	icon: "Dotclear.png",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:dotclear:dotclear:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
