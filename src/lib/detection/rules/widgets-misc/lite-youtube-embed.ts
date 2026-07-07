import type { TechnologyDefinition } from '../../types';

export const liteYoutubeEmbedTechnologyDefinition = {
	id: "lite-youtube-embed",
	name: "lite-youtube-embed",
	website: "https://github.com/paulirish/lite-youtube-embed",
	description: "The lite-youtube-embed technique renders the YouTube video inside the IFRAME tag only when the play button in clicked thus improving the core web vitals score of your website.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "lite-youtube-embed:dom:0",
			kind: "dom",
			selector: "lite-youtube",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"youtube",
	],
} as const satisfies TechnologyDefinition;
