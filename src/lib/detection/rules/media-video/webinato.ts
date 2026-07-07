import type { TechnologyDefinition } from '../../types';

export const webinatoTechnologyDefinition = {
	id: "webinato",
	name: "Webinato",
	website: "https://www.webinato.com",
	description: "Webinato is a webinar automation software that schedules, manages, and streams online seminars for businesses and educational purposes.",
	icon: "Webinato.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "webinato:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.webinato\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
