import type { TechnologyDefinition } from '../../types';

export const zkTechnologyDefinition = {
	id: "zk",
	name: "ZK",
	website: "https://zkoss.org",
	description: "ZK is a framework for building rich, interactive web applications using Java, providing a set of tools and components to create dynamic user interfaces.",
	icon: "ZK.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "zk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("zkau\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zk:html:1",
			kind: "html",
			pattern: new RegExp("<!-- ZK [.\\d\\s]+-->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "zk:html:2",
			kind: "html",
			pattern: new RegExp("<!-- zk [.\\d\\s]+-->"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
