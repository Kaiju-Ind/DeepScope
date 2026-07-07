import type { TechnologyDefinition } from '../../types';

export const formatDetectionMetaTechnologyDefinition = {
	id: "format-detection-meta",
	name: "Safari Format Detection Meta",
	website: "https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html",
	description: "Declares Safari on iOS automatic format detection behavior such as telephone number linking.",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "format-detection-meta:meta:0",
			kind: "meta",
			key: "format-detection",
			valuePattern: new RegExp("(?:^|,)\\s*telephone\\s*=\\s*(?:yes|no)(?:\\s*,|$)", "i"),
			confidence: 100,
			description: "Document declares Safari telephone number format detection behavior.",
		},
	],
} as const satisfies TechnologyDefinition;
