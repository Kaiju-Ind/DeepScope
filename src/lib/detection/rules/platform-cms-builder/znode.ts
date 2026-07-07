import type { TechnologyDefinition } from '../../types';

export const znodeTechnologyDefinition = {
	id: "znode",
	name: "Znode",
	website: "https://www.znode.com",
	description: "Znode is a provider of enterprise .NET-based shopping cart systems for building and managing online commerce platforms.",
	icon: "Znode.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "znode:jsGlobal:0",
			kind: "jsGlobal",
			property: "ZnodeAjaxify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "znode:jsGlobal:1",
			kind: "jsGlobal",
			property: "ZnodeBase",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
