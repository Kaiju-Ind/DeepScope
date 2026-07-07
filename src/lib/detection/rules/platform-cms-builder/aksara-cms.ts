import type { TechnologyDefinition } from '../../types';

export const aksaraCmsTechnologyDefinition = {
	id: "aksara-cms",
	name: "Aksara CMS",
	website: "https://aksaracms.com",
	description: "Aksara CMS is a CodeIgniter based CRUD toolkit.",
	icon: "Aksara CMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "aksara-cms:dom:0",
			kind: "dom",
			selector: "div.aksara-footer",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"bootstrap",
		"codeigniter",
		"jquery",
		"mysql",
		"openlayers",
		"php",
	],
} as const satisfies TechnologyDefinition;
