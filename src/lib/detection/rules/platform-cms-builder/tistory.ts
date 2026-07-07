import type { TechnologyDefinition } from '../../types';

export const tistoryTechnologyDefinition = {
	id: "tistory",
	name: "Tistory",
	website: "https://tistory.com",
	description: "Tistory is a South Korean blog-publishing service that allows private or multi-user blogs.",
	icon: "Tistory.svg",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "tistory:jsGlobal:0",
			kind: "jsGlobal",
			property: "TistoryBlog",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
