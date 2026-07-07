import type { TechnologyDefinition } from '../../types';

export const remixdTechnologyDefinition = {
	id: "remixd",
	name: "Remixd",
	website: "https://www.remixd.com",
	description: "Remixd is a platform that enables podcast creators to efficiently produce and share their podcasts with a worldwide audience. The platform provides various tools and features to support podcast creation, hosting, and distribution, such as podcast hosting, analytics, monetisation, and social media integration.",
	icon: "remixd.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "remixd:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tags\\.remixd\\.com\\/player"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
