import type { TechnologyDefinition } from '../../types';

export const userlikeTechnologyDefinition = {
	id: "userlike",
	name: "UserLike",
	website: "https://userlike.com",
	description: "Userlike is a cloud-based live chat solution that can be integrated with existing websites.",
	icon: "UserLike.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "userlike:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("userlike\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "userlike:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("userlikelib\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "userlike:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/userlike-cdn-widgets\\."),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "userlike:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.userlike\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "userlike:jsGlobal:4",
			kind: "jsGlobal",
			property: "__USERLIKE_MOUNT_GUARD__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "userlike:jsGlobal:5",
			kind: "jsGlobal",
			property: "userlike",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "userlike:jsGlobal:6",
			kind: "jsGlobal",
			property: "userlikeInit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
