import type { TechnologyDefinition } from '../../types';

export const edwiserBridgeTechnologyDefinition = {
	id: "edwiser-bridge",
	name: "Edwiser Bridge",
	website: "https://edwiser.org",
	description: "Edwiser Bridge is a Wordpress plugin facilitating the sale of Moodle courses with synchronized data and single sign-on capability.",
	icon: "EdwiserBridge.svg",
	categories: [
		"content-publishing",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "edwiser-bridge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/edwiser-bridge(?:-sso|-pro)?\\/public\\/assets\\/js\\/.+\\.js\\?ver=(\\d+(?:\\.\\d+)+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "edwiser-bridge:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/edwiser-bridge']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
