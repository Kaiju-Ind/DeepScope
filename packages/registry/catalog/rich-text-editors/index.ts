import type { TechnologyDefinition } from "../../types.ts";
import { aceTechnologyDefinition } from "./ace.ts";
import { adobeGoliveTechnologyDefinition } from "./adobe-golive.ts";
import { amayaTechnologyDefinition } from "./amaya.ts";
import { bannerbooTechnologyDefinition } from "./bannerboo.ts";
import { blocklyTechnologyDefinition } from "./blockly.ts";
import { bluefishTechnologyDefinition } from "./bluefish.ts";
import { ckeditorTechnologyDefinition } from "./ckeditor.ts";
import { codemirrorTechnologyDefinition } from "./codemirror.ts";
import { draftJsTechnologyDefinition } from "./draft-js.ts";
import { dreamweaverTechnologyDefinition } from "./dreamweaver.ts";
import { editInPlaceTechnologyDefinition } from "./edit-in-place.ts";
import { editorJsTechnologyDefinition } from "./editor-js.ts";
import { editplusTechnologyDefinition } from "./editplus.ts";
import { etherpadTechnologyDefinition } from "./etherpad.ts";
import { freetextboxTechnologyDefinition } from "./freetextbox.ts";
import { froalaEditorTechnologyDefinition } from "./froala-editor.ts";
import { frontpageTechnologyDefinition } from "./frontpage.ts";
import { iwebTechnologyDefinition } from "./iweb.ts";
import { microsoftExcelTechnologyDefinition } from "./microsoft-excel.ts";
import { microsoftPowerpointTechnologyDefinition } from "./microsoft-powerpoint.ts";
import { microsoftPublisherTechnologyDefinition } from "./microsoft-publisher.ts";
import { microsoftWordTechnologyDefinition } from "./microsoft-word.ts";
import { monacoEditorTechnologyDefinition } from "./monaco-editor.ts";
import { n1edTechnologyDefinition } from "./n1ed.ts";
import { powtoonTechnologyDefinition } from "./powtoon.ts";
import { pspadTechnologyDefinition } from "./pspad.ts";
import { quillTechnologyDefinition } from "./quill.ts";
import { smarteditor2TechnologyDefinition } from "./smarteditor2.ts";
import { summernoteTechnologyDefinition } from "./summernote.ts";
import { tinymceTechnologyDefinition } from "./tinymce.ts";
import { tiptapTechnologyDefinition } from "./tiptap.ts";
import { tlootoTechnologyDefinition } from "./tlooto.ts";
import { trixTechnologyDefinition } from "./trix.ts";
import { unbounceTechnologyDefinition } from "./unbounce.ts";
import { webStoriesForWordpressTechnologyDefinition } from "./web-stories-for-wordpress.ts";
import { webdevTechnologyDefinition } from "./webdev.ts";
import { websiteX5TechnologyDefinition } from "./website-x5.ts";
import { wysibbTechnologyDefinition } from "./wysibb.ts";

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
