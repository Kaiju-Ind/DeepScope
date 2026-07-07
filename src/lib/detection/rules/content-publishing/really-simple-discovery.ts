import type { TechnologyDefinition } from '../../types';

export const reallySimpleDiscoveryTechnologyDefinition = {
	id: "really-simple-discovery",
	name: "Really Simple Discovery",
	website: "https://cyber.harvard.edu/blogs/gems/tech/rsd.html",
	description: "Declares an RSD endpoint for blog editing clients.",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "really-simple-discovery:link:0",
			kind: "link",
			rel: "EditURI",
			typePattern: new RegExp("application/rsd\\+xml", "i"),
			confidence: 100,
			description: "Document links to an RSD endpoint.",
		},
	],
} as const satisfies TechnologyDefinition;
