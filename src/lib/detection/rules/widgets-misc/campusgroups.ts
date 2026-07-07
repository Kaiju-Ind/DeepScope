import type { TechnologyDefinition } from '../../types';

export const campusgroupsTechnologyDefinition = {
	id: "campusgroups",
	name: "CampusGroups",
	website: "https://www.readyeducation.com/en-us/campusgroups",
	description: "CampusGroups is a student engagement platform that supports community building by facilitating broad student participation across campus organizations and activities.",
	icon: "CampusGroups.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "campusgroups:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^CG\\.SessionID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
