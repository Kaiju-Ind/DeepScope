import type { TechnologyDefinition } from '../../types';
import { aceTechnologyDefinition } from './ace';
import { adobeGoliveTechnologyDefinition } from './adobe-golive';
import { amayaTechnologyDefinition } from './amaya';
import { bannerbooTechnologyDefinition } from './bannerboo';
import { blocklyTechnologyDefinition } from './blockly';
import { bluefishTechnologyDefinition } from './bluefish';
import { ckeditorTechnologyDefinition } from './ckeditor';
import { codemirrorTechnologyDefinition } from './codemirror';
import { draftJsTechnologyDefinition } from './draft-js';
import { dreamweaverTechnologyDefinition } from './dreamweaver';
import { editInPlaceTechnologyDefinition } from './edit-in-place';
import { editorJsTechnologyDefinition } from './editor-js';
import { editplusTechnologyDefinition } from './editplus';
import { etherpadTechnologyDefinition } from './etherpad';
import { freetextboxTechnologyDefinition } from './freetextbox';
import { froalaEditorTechnologyDefinition } from './froala-editor';
import { frontpageTechnologyDefinition } from './frontpage';
import { iwebTechnologyDefinition } from './iweb';
import { microsoftExcelTechnologyDefinition } from './microsoft-excel';
import { microsoftPowerpointTechnologyDefinition } from './microsoft-powerpoint';
import { microsoftPublisherTechnologyDefinition } from './microsoft-publisher';
import { microsoftWordTechnologyDefinition } from './microsoft-word';
import { monacoEditorTechnologyDefinition } from './monaco-editor';
import { n1edTechnologyDefinition } from './n1ed';
import { powtoonTechnologyDefinition } from './powtoon';
import { pspadTechnologyDefinition } from './pspad';
import { quillTechnologyDefinition } from './quill';
import { smarteditor2TechnologyDefinition } from './smarteditor2';
import { summernoteTechnologyDefinition } from './summernote';
import { tinymceTechnologyDefinition } from './tinymce';
import { tiptapTechnologyDefinition } from './tiptap';
import { tlootoTechnologyDefinition } from './tlooto';
import { trixTechnologyDefinition } from './trix';
import { unbounceTechnologyDefinition } from './unbounce';
import { webStoriesForWordpressTechnologyDefinition } from './web-stories-for-wordpress';
import { webdevTechnologyDefinition } from './webdev';
import { websiteX5TechnologyDefinition } from './website-x5';
import { wysibbTechnologyDefinition } from './wysibb';

export const richTextEditorsTechnologyDefinitions = [
	aceTechnologyDefinition,
	adobeGoliveTechnologyDefinition,
	amayaTechnologyDefinition,
	bannerbooTechnologyDefinition,
	blocklyTechnologyDefinition,
	bluefishTechnologyDefinition,
	ckeditorTechnologyDefinition,
	codemirrorTechnologyDefinition,
	draftJsTechnologyDefinition,
	dreamweaverTechnologyDefinition,
	editInPlaceTechnologyDefinition,
	editorJsTechnologyDefinition,
	editplusTechnologyDefinition,
	etherpadTechnologyDefinition,
	freetextboxTechnologyDefinition,
	froalaEditorTechnologyDefinition,
	frontpageTechnologyDefinition,
	iwebTechnologyDefinition,
	microsoftExcelTechnologyDefinition,
	microsoftPowerpointTechnologyDefinition,
	microsoftPublisherTechnologyDefinition,
	microsoftWordTechnologyDefinition,
	monacoEditorTechnologyDefinition,
	n1edTechnologyDefinition,
	powtoonTechnologyDefinition,
	pspadTechnologyDefinition,
	quillTechnologyDefinition,
	smarteditor2TechnologyDefinition,
	summernoteTechnologyDefinition,
	tinymceTechnologyDefinition,
	tiptapTechnologyDefinition,
	tlootoTechnologyDefinition,
	trixTechnologyDefinition,
	unbounceTechnologyDefinition,
	webStoriesForWordpressTechnologyDefinition,
	webdevTechnologyDefinition,
	websiteX5TechnologyDefinition,
	wysibbTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
