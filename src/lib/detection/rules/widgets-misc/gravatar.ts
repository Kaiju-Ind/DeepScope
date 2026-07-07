import type { TechnologyDefinition } from '../../types';

export const gravatarTechnologyDefinition = {
	id: "gravatar",
	name: "Gravatar",
	website: "https://gravatar.com",
	description: "Gravatar is a service for providing globally unique avatars.",
	icon: "Gravatar.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "gravatar:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]+gravatar\\.com\\/avatar\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gravatar:jsGlobal:1",
			kind: "jsGlobal",
			property: "Gravatar",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
