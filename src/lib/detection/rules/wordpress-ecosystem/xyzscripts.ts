import type { TechnologyDefinition } from '../../types';

export const xyzscriptsTechnologyDefinition = {
	id: "xyzscripts",
	name: "XYZScripts",
	website: "https://xyzscripts.com",
	description: "XYZScripts is a provider of PHP clone scripts and WordPress plugins. It offers top-quality PHP and MySQL scripts to help build online businesses, with ready-to-deploy solutions that enable website setup.",
	icon: "XYZScripts.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "xyzscripts:dom:0",
			kind: "dom",
			selector: "a[href*='xyzscripts.com/'] + a[href*='www.xyzscripts.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
