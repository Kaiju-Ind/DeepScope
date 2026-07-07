import type { TechnologyDefinition } from '../../types';

export const metronetProfilePictureTechnologyDefinition = {
	id: "metronet-profile-picture",
	name: "Metronet Profile Picture",
	website: "https://wordpress.org/plugins/metronet-profile-picture/",
	description: "Set a custom profile image for a user using the standard WordPress media upload tool.",
	icon: "Metronet Profile Picture.png",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "metronet-profile-picture:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("metronet-profile-picture(?:\\/js)?(?:\\/mpp-frontend)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "metronet-profile-picture:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/metronet-profile-picture/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
