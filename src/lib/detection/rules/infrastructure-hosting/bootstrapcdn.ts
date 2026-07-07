import type { TechnologyDefinition } from '../../types';

export const bootstrapcdnTechnologyDefinition = {
	id: "bootstrapcdn",
	name: "BootstrapCDN",
	website: "https://www.bootstrapcdn.com/",
	description: "BootstrapCDN is a powerful and reliable Content Delivery Network (CDN) that delivers static resources, including CSS, JavaScript, and font files, for the widely-used Bootstrap framework. By leveraging multiple server locations worldwide, BootstrapCDN accelerates website loading times, ensuring a smooth and visually appealing user experience. Additionally, it ensures website compatibility with various devices and browsers. The service reduces bandwidth usage and server load, improving web performance for developers and end-users alike.",
	icon: "BootstrapCDN.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "bootstrapcdn:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bootstrapcdn\\.com\\/bootstrap\\/((?:\\d+\\.)+\\d+)?(?:\\/js\\/)?bootstrap(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
