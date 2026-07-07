import type { TechnologyDefinition } from '../../types';

export const onepressSocialLockerTechnologyDefinition = {
	id: "onepress-social-locker",
	name: "OnePress Social Locker",
	website: "https://wordpress.org/plugins/social-locker",
	description: "Social Locker locks your most valuable site content behind a set of social buttons until the visitor likes, shares, +1s or tweets your page.",
	icon: "OnePress Social Locker.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "onepress-social-locker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/social-?locker(?:-next-premium)?\\/bizpanda\\/assets\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "onepress-social-locker:jsGlobal:1",
			kind: "jsGlobal",
			property: "__pandalockers",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "onepress-social-locker:jsGlobal:2",
			kind: "jsGlobal",
			property: "bizpanda",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
