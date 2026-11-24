import type { TechnologyDefinition } from '@/lib/detection/types';

export const bearBlogTechnologyDefinition: TechnologyDefinition = {
	id: 'bear-blog',
	name: 'Bear Blog',
	website: 'https://bearblog.dev',
	description:
		'BearBlog is a privacy-first blogging platform that uses no trackers, JavaScript, or stylesheets, delivering plain text publishing focused solely on content.',
	icon: 'BearBlog.svg',
	categories: [
		'content-publishing',
	],
	rules: [
		{
			id: 'bear-blog:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('\\.bearblog\\.dev'),
			description: 'Script content contains a bounded technology signature.',
		},
		{
			id: 'bear-blog:dom:1',
			kind: 'dom',
			selector: "footer a[href='https://bearblog.dev'], footer a[href='https://bearblog.dev/']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
