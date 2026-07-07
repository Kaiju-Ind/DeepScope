import type { TechnologyDefinition } from '../../types';
import { adobeFontsTechnologyDefinition } from './adobe-fonts';
import { antDesignTechnologyDefinition } from './ant-design';
import { bootstrapIconsTechnologyDefinition } from './bootstrap-icons';
import { bootstrapTableTechnologyDefinition } from './bootstrap-table';
import { bootstrapTechnologyDefinition } from './bootstrap';
import { bulmaTechnologyDefinition } from './bulma';
import { bunnyFontsTechnologyDefinition } from './bunny-fonts';
import { chakraUiTechnologyDefinition } from './chakra-ui';
import { cufonTechnologyDefinition } from './cufon';
import { emfontTechnologyDefinition } from './emfont';
import { fontAwesomeTechnologyDefinition } from './font-awesome';
import { fontFaceRuleTechnologyDefinition } from './font-face-rule';
import { fontserverTechnologyDefinition } from './fontserver';
import { forkAwesomeTechnologyDefinition } from './fork-awesome';
import { foundationTechnologyDefinition } from './foundation';
import { glyphiconsTechnologyDefinition } from './glyphicons';
import { googleFontApiTechnologyDefinition } from './google-font-api';
import { headlessUiTechnologyDefinition } from './headless-ui';
import { hoeflerAndCoTechnologyDefinition } from './hoefler-and-co';
import { i30conTechnologyDefinition } from './i30con';
import { ionicTechnologyDefinition } from './ionic';
import { ioniconsTechnologyDefinition } from './ionicons';
import { lucideTechnologyDefinition } from './lucide';
import { mantineTechnologyDefinition } from './mantine';
import { muiTechnologyDefinition } from './mui';
import { myfontsTechnologyDefinition } from './myfonts';
import { radixUiTechnologyDefinition } from './radix-ui';
import { shadcnUiTechnologyDefinition } from './shadcn-ui';
import { shoelaceTechnologyDefinition } from './shoelace';
import { sifrTechnologyDefinition } from './sifr';
import { symbolsetTechnologyDefinition } from './symbolset';
import { tailwindCssTechnologyDefinition } from './tailwind-css';
import { twitterEmojiTwemojiTechnologyDefinition } from './twitter-emoji-twemoji';
import { typekitTechnologyDefinition } from './typekit';
import { woff2FontFormatTechnologyDefinition } from './woff2-font-format';
import { zurbFoundationTechnologyDefinition } from './zurb-foundation';

export const stylingLibraryTechnologyDefinitions = [
	adobeFontsTechnologyDefinition,
	antDesignTechnologyDefinition,
	bootstrapIconsTechnologyDefinition,
	bootstrapTableTechnologyDefinition,
	bootstrapTechnologyDefinition,
	bulmaTechnologyDefinition,
	bunnyFontsTechnologyDefinition,
	chakraUiTechnologyDefinition,
	cufonTechnologyDefinition,
	emfontTechnologyDefinition,
	fontAwesomeTechnologyDefinition,
	fontFaceRuleTechnologyDefinition,
	fontserverTechnologyDefinition,
	forkAwesomeTechnologyDefinition,
	foundationTechnologyDefinition,
	glyphiconsTechnologyDefinition,
	googleFontApiTechnologyDefinition,
	headlessUiTechnologyDefinition,
	hoeflerAndCoTechnologyDefinition,
	i30conTechnologyDefinition,
	ionicTechnologyDefinition,
	ioniconsTechnologyDefinition,
	lucideTechnologyDefinition,
	mantineTechnologyDefinition,
	muiTechnologyDefinition,
	myfontsTechnologyDefinition,
	radixUiTechnologyDefinition,
	shadcnUiTechnologyDefinition,
	shoelaceTechnologyDefinition,
	sifrTechnologyDefinition,
	symbolsetTechnologyDefinition,
	tailwindCssTechnologyDefinition,
	twitterEmojiTwemojiTechnologyDefinition,
	typekitTechnologyDefinition,
	woff2FontFormatTechnologyDefinition,
	zurbFoundationTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
