import type { TechnologyDefinition } from '../../types';

export const disqusTechnologyDefinition = {
	id: "disqus",
	name: "Disqus",
	website: "https://disqus.com",
	description: "Disqus is a worldwide blog comment hosting service for web sites and online communities that use a networked platform.",
	icon: "Disqus.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "disqus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("disqus_url"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "disqus:dom:1",
			kind: "dom",
			selector: "div#disqus_thread",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "disqus:jsGlobal:2",
			kind: "jsGlobal",
			property: "DISQUS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "disqus:jsGlobal:3",
			kind: "jsGlobal",
			property: "disqus_shortname",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "disqus:jsGlobal:4",
			kind: "jsGlobal",
			property: "disqus_url",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:disqus:disqus_comment_system:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
