import type { TechnologyDefinition } from '../../types';

export const woltlabCommunityFrameworkTechnologyDefinition = {
	id: "woltlab-community-framework",
	name: "Woltlab Community Framework",
	website: "https://www.woltlab.com",
	description: "WoltLab Community Framework is a modular and extensible software platform designed for building and managing online communities with features like forums, blogs, and galleries.",
	icon: "Woltlab Community Framework.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "woltlab-community-framework:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("WCF\\..*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "woltlab-community-framework:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("wcf\\..*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
