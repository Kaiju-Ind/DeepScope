import type { TechnologyDefinition } from '../../types';

export const scheduleEngineTechnologyDefinition = {
	id: "schedule-engine",
	name: "Schedule Engine",
	website: "https://www.scheduleengine.com/",
	description: "Schedule Engine is a customer support solution built for contractors.",
	icon: "Schedule Engine.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "schedule-engine:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("webchat.scheduleengine.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
