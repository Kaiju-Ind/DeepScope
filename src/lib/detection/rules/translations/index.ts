import type { TechnologyDefinition } from '../../types';
import { bablicTechnologyDefinition } from './bablic';
import { conveythisTechnologyDefinition } from './conveythis';
import { conwordTechnologyDefinition } from './conword';
import { crowdinTechnologyDefinition } from './crowdin';
import { easylingTechnologyDefinition } from './easyling';
import { langifyTechnologyDefinition } from './langify';
import { linguiseTechnologyDefinition } from './linguise';
import { pluglinTechnologyDefinition } from './pluglin';
import { smartlingTechnologyDefinition } from './smartling';
import { transcyTechnologyDefinition } from './transcy';
import { weblateTechnologyDefinition } from './weblate';
import { weglotTechnologyDefinition } from './weglot';
import { i18nextTechnologyDefinition } from './i18next';
import { reactI18nextTechnologyDefinition } from './react-i18next';
import { reactIntlFormatjsTechnologyDefinition } from './react-intl-formatjs';
import { vueI18nTechnologyDefinition } from './vue-i18n';

export const translationsTechnologyDefinitions = [
	bablicTechnologyDefinition,
	conveythisTechnologyDefinition,
	conwordTechnologyDefinition,
	crowdinTechnologyDefinition,
	easylingTechnologyDefinition,
	langifyTechnologyDefinition,
	linguiseTechnologyDefinition,
	pluglinTechnologyDefinition,
	smartlingTechnologyDefinition,
	transcyTechnologyDefinition,
	weblateTechnologyDefinition,
	weglotTechnologyDefinition,
	i18nextTechnologyDefinition,
	reactI18nextTechnologyDefinition,
	reactIntlFormatjsTechnologyDefinition,
	vueI18nTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
