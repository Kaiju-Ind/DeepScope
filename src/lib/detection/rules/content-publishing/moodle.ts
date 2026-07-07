import type { TechnologyDefinition } from '../../types';

export const moodleTechnologyDefinition = {
	id: "moodle",
	name: "Moodle",
	website: "https://moodle.org",
	description: "Moodle is a free and open-source Learning Management System (LMS) written in PHP and distributed under the GNU General Public License.",
	icon: "Moodle.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "moodle:html:0",
			kind: "html",
			pattern: new RegExp("<img[^>]+moodlelogo"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "moodle:jsGlobal:1",
			kind: "jsGlobal",
			property: "M.core",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moodle:jsGlobal:2",
			kind: "jsGlobal",
			property: "Y.Moodle",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moodle:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^MOODLEID_$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "moodle:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^MoodleSession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "moodle:meta:5",
			kind: "meta",
			key: "keywords",
			valuePattern: new RegExp("^moodle", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "moodle:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^moodleid_$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "moodle:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^moodlesession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:moodle:moodle:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
