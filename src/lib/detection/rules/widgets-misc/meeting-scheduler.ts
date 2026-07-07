import type { TechnologyDefinition } from '../../types';

export const meetingSchedulerTechnologyDefinition = {
	id: "meeting-scheduler",
	name: "Meeting Scheduler",
	website: "https://bookmenow.info",
	description: "Meeting Scheduler is a schedule appointments widget.",
	icon: "Meeting Scheduler.png",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "meeting-scheduler:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bookmenow\\.info\\/(?:runtime|main).+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "meeting-scheduler:dom:1",
			kind: "dom",
			selector: "a[href*='bookmenow.info/book']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
