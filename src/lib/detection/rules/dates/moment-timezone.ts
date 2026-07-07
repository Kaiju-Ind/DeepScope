import type { TechnologyDefinition } from '../../types';

export const momentTimezoneTechnologyDefinition = {
	id: "moment-timezone",
	name: "Moment Timezone",
	website: "https://momentjs.com/timezone/",
	description: "Moment Timezone is a library built upon Moment.js, extending its capabilities to handle time zones in JavaScript. It allows developers to parse, manipulate, and display dates and times in various time zones, providing comprehensive support for time zone conversions and adjustments in web applications.",
	icon: "Moment.js.svg",
	categories: [
		"dates",
		"widgets-misc",
	],
	rules: [
		{
			id: "moment-timezone:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("moment-timezone(?:-data)?(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"moment-js",
	],
} as const satisfies TechnologyDefinition;
