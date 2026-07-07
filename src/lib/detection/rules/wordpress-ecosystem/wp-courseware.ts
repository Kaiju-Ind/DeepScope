import type { TechnologyDefinition } from '../../types';

export const wpCoursewareTechnologyDefinition = {
	id: "wp-courseware",
	name: "WP Courseware",
	website: "https://flyplugins.com/wp-courseware-wordpress-lms",
	description: "WP Courseware is an LMS plugin that allows novice and professional users to build online courses using its easy-to-use drag and drop course builder.",
	icon: "WP Courseware.svg",
	categories: [
		"wordpress-ecosystem",
		"content-publishing",
	],
	rules: [
		{
			id: "wp-courseware:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wp-courseware\\/.+frontend\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wp-courseware:jsGlobal:1",
			kind: "jsGlobal",
			property: "wpcw_course_note_params.api_url",
			valuePattern: new RegExp("\\/wp-json\\/wpcw\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
