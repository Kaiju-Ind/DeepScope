import type { TechnologyDefinition } from '../../types';

export const cometdTechnologyDefinition = {
	id: "cometd",
	name: "CometD",
	website: "https://cometd.org",
	description: "CometD is a scalable clustered web messaging platform that provides a HTTP-based event routing bus using the Ajax Push technology pattern known as Comet.",
	icon: "CometD.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "cometd:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/cometd\\/jquery\\.cometd\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cometd:jsGlobal:1",
			kind: "jsGlobal",
			property: "cometMsgReceived",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:cometd:cometd:*:*:*:*:*:*:*:*",
	},
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
