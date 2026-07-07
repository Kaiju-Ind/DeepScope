import type { TechnologyDefinition } from '../../types';

export const speakpipeTechnologyDefinition = {
	id: "speakpipe",
	name: "SpeakPipe",
	website: "https://www.speakpipe.com",
	description: "SpeakPipe is a tool that lets websites receive voice messages from visitors, making it easier for users to leave feedback, testimonials, or contact the site owner directly.",
	icon: "SpeakPipe.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "speakpipe:jsGlobal:0",
			kind: "jsGlobal",
			property: "_speakpipe_dialog_loaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "speakpipe:jsGlobal:1",
			kind: "jsGlobal",
			property: "_speakpipe_open_reply_dialog",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "speakpipe:jsGlobal:2",
			kind: "jsGlobal",
			property: "_speakpipe_open_reply_dialog_by_token",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "speakpipe:jsGlobal:3",
			kind: "jsGlobal",
			property: "_speakpipe_open_widget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
