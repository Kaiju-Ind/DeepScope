import type { TechnologyDefinition } from '../../types';

export const warPeTechnologyDefinition = {
	id: "war-pe",
	name: "WAR.PE",
	website: "https://war.pe",
	description: "WAR. PE is a platform designed to enhance the web experience by promoting user privacy and security.",
	icon: "WARPE.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "war-pe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/war\\.pe\\/warp\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
