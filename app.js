/* =========================================================
   GLOBAL ERROR HANDLER
   ========================================================= */
window.addEventListener('error', (e) => {
  console.error('Uncaught error:', e.error || e.message);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

/* =========================================================
   I18N
   ========================================================= */
const I18N = {
  nl: {
    appTitle:'Gang Sheet Builder', appSubtitle:'Transferpersshop · 300 DPI print-ready',
    projectTitleLabel:'Opdracht naam', projectTitlePlaceholder:"Bijv. borstlogo's bedrijf X",
    clear:'Leegmaken', clearSheet:'Vel leegmaken',
    step1:'Kies vel formaat', step2:"Upload logo's of maak tekst", step3:"Logo's bewerken", step4:"Logo's bewerken",
    sheetFormat:'Vel formaat',
    dropTitle:'Klik of sleep hier', dropHint:'SVG, AI, PDF, EPS, PNG, JPG', dropMax:'Max. 50 MB',
    uploadTip:'Gebruik vectorbestanden (SVG, AI, PDF) of PNGs met transparante achtergrond van minimaal 300 dpi voor de scherpste prints.',
    uploadTipLink:'Bekijk onze tips',
    loadingVector:'Vector wordt verwerkt…', logoAdded:'toegevoegd',
    unsupportedFile:'Bestandstype niet ondersteund',
    unitLabel:'Meeteenheid',
    layoutGapLabel:"Indeling & tussenruimte",
    gapLabel:"Tussenruimte tussen logo's",
    gapHelp:"Bepaal de tussenruimte tussen de logo's voor het knippen/snijden van de transfers.",
    bgLabel:'Vel-achtergrond (alleen preview)',
    bgHelp:"Witte logo's zie je het best op checkered of grijs. De export blijft transparant.",
    bgRemove:'Verwijder witte achtergrond',
    thresholdLabel:'Drempelwaarde',
    thresholdHelp:'Lager = meer lichte pixels weg. Hoger = alleen puur wit.',
    bgAi:'AI achtergrond verwijderen',
    fillSheet:'Vel vullen met logo',
    fillHelp:'Selecteer een logo om witverwijdering te gebruiken. "Vel vullen" en "Vel leegmaken" staan boven het vel.',
    selectedTitle:'Geselecteerde logo',
    infoSheet:'Vel', infoUsed:'Gebruikt',
    selected:'Geselecteerde logo',
    selectEmpty:'Klik op een logo om te bewerken.',
    allLogos:"Geüploade logo's",
    listEmpty:'Nog niets geüpload.',
    summaryTitle:'Samenvatting',
    sumUnique:"Unieke logo's",
    sumTotal:'Totaal aantal kopieën',
    sumUsage:'Gebruik van vel',
    sumDpi:'Print kwaliteit (DPI)',
    sumSheets:'Aantal vellen',
    sumColor:'Kleurruimte',
    exportBtn:'Download print-ready PDF',
    exportBgBtn:'Download drukproef',
    close:'Sluiten',
    zoomFit:'Passend', zoomHint:'Sneltoetsen: +, −, 0',
    width:'Breedte', height:'Hoogte', rotation:'Rotatie', logoSize:'Afmeting logo', actions:'Acties', ratioLock:'Verhouding vergrendelen', ratioUnlock:'Verhouding ontgrendelen',
    sectionTransform:'Transformatie', sectionAppearance:'Uiterlijk', sectionLayout:'Indeling', sectionInfo:'Info',
    dpiAt:'Resolutie bij deze grootte',
    quality:'Kwaliteit',
    dpiHint:'DPI is de scherpte van de print. 300 DPI of hoger geeft een scherpe print. Hoe lager de DPI, hoe waziger het logo op het eindproduct.',
    tbRotate:'↻ 90°', tbFlip:'⇆ spiegel', tbDup:'⧉ dupliceer', tbDel:'✕ verwijder',
    colorsLabel:'Kleuren',
    colorClickToChange:'Klik op een kleur om te wijzigen',
    colorTint:'Tint/overlay kleur',
    colorApplyTint:'Tint toepassen',
    colorRemoveTint:'Tint verwijderen',
    colorChanged:'Kleur gewijzigd',
    colorNoColors:'Geen bewerkbare kleuren gevonden',
    colorApply:'Kleur toepassen',
    colorMakeWhite:'Maak logo wit',
    colorMakeBlack:'Maak logo zwart',
    colorMadeMono:'Logo omgezet',
    rollWidth:'Breedte', rollLength:'Kies lengte', lengthUnit:'meter',
    sumLength:'Formaat',
    rollTooShort:'Vel kan niet korter dan de geplaatste logo\'s. Verwijder eerst logo\'s onderaan.',
    rollAutoExtended:'Vel automatisch verlengd',
    formatTooSmall:'Logo\'s passen niet op dit formaat. Verwijder eerst logo\'s.',
    sheetLabel:'Vel', addSheet:'+ Nieuw vel',
    sizeTooLarge:'Logo te groot om te tilen op dit vel',
    overlapWarn:"Logo's mogen niet overlappen. Positie is teruggezet.",
    manualModeStep:'Indeling modus',
    manualModeLabel:'Handmatige indeling',
    manualModeHelp:'Schakel automatische indeling uit. Logo\'s kunnen vrij gesleept, overlapt en 360° gedraaid worden.',
    manualModeOn:'Handmatige indeling ingeschakeld',
    manualModeOff:'Automatische indeling hersteld',
    manualModeConfirm:'Terug naar automatische indeling? Dit optimaliseert de indeling en overschrijft je handmatige layout.',
    manualModeOptimizeWarn:'Indeling optimaliseren schakelt handmatige modus uit.',
    smallDetailWarn:'Let op: dit logo bevat details kleiner dan 0.4 mm bij deze grootte. Zeer fijne details kunnen verloren gaan in de print.',
    embeddedRasterWarn:'Dit vectorbestand bevat een ingesloten afbeelding (raster). De printkwaliteit hangt af van de resolutie van die afbeelding.',
    embeddedRasterHint:'Dit vectorbestand bevat een ingesloten afbeelding. De DPI is gebaseerd op die afbeelding, niet op het vectorbestand zelf.',
    lowDpiWarn:'Het geüploade logo heeft een lage resolutie',
    lowDpiMore:'Upload een betere resolutie of vector bestand — of gebruik Logo bewerken → Upscale om de resolutie te verhogen.',
    lowDpiDismiss:'Ik begrijp het',
    pdfGenerating:'PDF wordt aangemaakt…',
    pdfSaved:'opgeslagen · 300 DPI',
    addLogoFirst:'Voeg eerst een logo toe',
    lowResFound:'Lage resolutie gevonden',
    lowResBody:'logo(s) zijn onder 300 DPI en kunnen wazig printen. Toch exporteren?',
    lowResOk:'Toch exporteren',
    cancel:'Annuleren', ok:'Ja, doorgaan',
    selectImageFirst:'Selecteer eerst een afbeelding',
    bgRemoved:'Witte achtergrond verwijderd',
    bgAiTitle:'AI achtergrond verwijderen',
    bgAiBody:"Deze functie gebruikt remove.bg of een vergelijkbare AI-service voor foto's en complexere afbeeldingen. In de productieversie koppel je hier een API-key. In deze demo is de AI-knop uitgeschakeld — gebruik de browser-versie hierboven voor platte witte achtergronden.",
    clearTitle:'Leegmaken',
    clearBody:"Weet je zeker dat je het hele vel wilt leegmaken? Alle logo's worden verwijderd.",
    clearDone:'Vel leeggemaakt',
    fillTitle:'Vul hele blad',
    fillBody:(sheet,name,gap)=>`Het vel (${sheet}) vullen met kopieën van "${name}"? Tussenruimte: ${gap} mm. Als het beter past wordt het logo automatisch 90° gedraaid.`,
    fillDone:(n,cols,rows,rot)=>`${n} kopieën geplaatst · ${cols}×${rows}${rot?' · 90° gedraaid':''}`,
    noFillActive:'Geen fill template actief',
    logoGone:'Bronlogo niet meer aanwezig — upload opnieuw',
    copies:'stuks', logos:"logo's", logo:'logo',
    removeSheet:'Vel verwijderen?',
    removeSheetBody:"Alle logo's op dit vel gaan verloren.",
    repackDone:'Indeling bijgewerkt met nieuwe tussenruimte',
    spillToNew:(n)=>`Geen plek meer — automatisch verplaatst naar vel ${n}`,
    sheetFullNoSpill:'Geen plek meer op dit vel (niet-multi modus)',
    rot0:'0°', rot90:'90°', rot180:'180°', rot270:'270°', rotReset:'reset',
    infoTitle:'Productie-informatie',
    infoTipDetail:'Minimale detailgrootte',
    infoTipDetailBody:'Details kleiner dan 0,4 mm (1 pt) kunnen wegvallen tijdens productie. Houd hier rekening mee bij kleine teksten, dunne lijnen en fijne patronen.',
    infoTipVector:'Vector boven raster',
    infoTipVectorBody:'Gebruik bij voorkeur vectorbestanden (SVG, AI, PDF). Deze zijn schaalbaar zonder kwaliteitsverlies. PNG en JPG zijn rasterbestanden — hoe groter je ze maakt, hoe lager de DPI en hoe waziger de print.',
    infoTipDpi:'Resolutie (DPI)',
    infoTipDpiBody:'DPI (dots per inch) bepaalt de scherpte van je print. Alleen relevant voor rasterbestanden (PNG, JPG) — vectorbestanden zijn altijd scherp.',
    infoTipBg:'Transparante achtergrond',
    infoTipBgBody:'Gebruik PNGs met transparante achtergrond. Een witte achtergrond wordt meegeprint als wit vlak rondom je logo. De "Verwijder witte achtergrond" functie kan helpen, maar een echt transparant bronbestand is altijd beter.',
    tourSkip:'Sluiten', tourNext:'Volgende', tourFinish:'Afronden',
    tourStepProjectTitle:'Opdracht naam',
    tourStepProjectBody:'Geef je transfer een naam. Deze verschijnt onderaan elke pagina van de PDF samen met Transferpersshop en de datum.',
    tourStep1Title:'Kies vel formaat',
    tourStep1Body:'Selecteer het formaat van je vel. 55×100 DTF is het standaard formaat voor DTF-rollen en ondersteunt automatisch meerdere vellen.',
    tourStep2Title:"Upload logo's of maak tekst",
    tourStep2Body:'Sleep je bestanden hierheen of klik om te uploaden. Vectorbestanden (SVG, AI, PDF) geven de scherpste resultaten. PNGs met transparante achtergrond op minimaal 300 DPI zijn ook uitstekend. Gebruik de Tekst maken knop om teksten direct aan te maken.',
    tourStep3Title:"Logo's bewerken",
    tourStep3Body:'Pas de tussenruimte aan, verwijder witte achtergronden en stel de drempelwaarde in. Selecteer een logo op het vel om het te roteren, schalen of dupliceren.',
    tourStep4Title:'Vel vullen',
    tourStep4Body:'Selecteer een logo en klik "Vel vullen met logo" om het vel automatisch zo vol mogelijk te vullen. De tool draait logo\'s als dat meer kopieën oplevert.',
    tourStep5Title:'Samenvatting & export',
    tourStep5Body:'Bekijk het totaal aantal kopieën, velgebruik en DPI-status. Klik "Download print-ready PDF" voor een 300 DPI transparante PDF, of "Download drukproef" voor een proef met achtergrond, maatvoering en footer om naar je klant te sturen. Met "Opdracht opslaan" bewaar je je werk in je account; via "Opdracht openen" laad je een eerder opgeslagen opdracht weer in.',
    tourStep6Title:'Eenheid & achtergrond',
    tourStep6Body:'Wissel hier tussen mm en cm als maateenheid. Kies een vel-achtergrond (wit, grijs of geruit) om je logo\'s beter te zien — de export blijft altijd transparant.',
    tourStepZoomTitle:'Zoom & velknoppen',
    tourStepZoomBody:'Zoom in en uit op je vel met de knoppen of sneltoetsen (+, −, 0). Hier vind je ook "Vel vullen" om het vel automatisch vol te pakken en "Vel leegmaken" om opnieuw te beginnen.',
    tourStepSelTitle:'Geselecteerde logo',
    tourStepSelBody:'Klik op een logo op het vel om het hier te bewerken. Pas de afmeting, rotatie en kleuren aan, of dupliceer en verwijder het logo.',
    tourStepLayoutGapTitle:'Indeling & tussenruimte',
    tourStepLayoutGapBody:'Stel de afstand tussen logo\'s in en schakel optioneel over naar handmatige indeling. Bij handmatige indeling kunnen logo\'s vrij gesleept, overlapt en 360° gedraaid worden.',
    tourStepListTitle:"Geüploade logo's",
    tourStepListBody:'Overzicht van al je geüploade logo\'s met het totale aantal kopieën over alle vellen. Gebruik de +/− knoppen of typ een aantal om snel kopieën toe te voegen of te verwijderen.',
    undoBtn:'Ongedaan maken', redoBtn:'Herhalen',
    projectSave:'Project opslaan', projectLoad:'Project laden',
    shortcutsBtn:'⌨ Sneltoetsen', shortcutsTitle:'Sneltoetsen',
    shortcutsBody:'Ctrl+Z: Ongedaan · Ctrl+Shift+Z: Herhalen · Ctrl+D: Dupliceer · Delete: Verwijder · Pijltoetsen: Verschuif · +/−: Zoom · 0: Passend · Ctrl+A: Alle selecteren',
    optimizeLayout:'Optimaliseer indeling', optimizeDone:'Indeling geoptimaliseerd',
    selectMultiple:'Meerdere geselecteerd', deleteMultiple:'Verwijder alles', duplicateMultiple:'Dupliceer alles', rotateMultiple:'Roteer alles 90°',
    alignLeft:'Links', alignCenterH:'Centreer H', alignRight:'Rechts',
    alignTop:'Boven', alignCenterV:'Centreer V', alignBottom:'Onder',
    distributeH:'Verdeel H', distributeV:'Verdeel V',
    alignLabel:'Uitlijnen t.o.v. selectie',
    alignCanvasLabel:'Uitlijnen op vel',
    printPreview:'Preview', previewTitle:'Print preview',
  },
  en: {
    appTitle:'Gang Sheet Builder', appSubtitle:'Transferpersshop · 300 DPI print-ready',
    projectTitleLabel:'Project name', projectTitlePlaceholder:'E.g. chest logos company X',
    clear:'Clear', clearSheet:'Clear sheet',
    step1:'Choose sheet format', step2:'Upload logos or create text', step3:'Edit logos', step4:'Edit logos',
    sheetFormat:'Sheet format',
    dropTitle:'Click or drop files', dropHint:'SVG, AI, PDF, EPS, PNG, JPG', dropMax:'Max. 50 MB',
    uploadTip:'Use vector files (SVG, AI, PDF) or PNGs with transparent background of at least 300 dpi for the sharpest prints.',
    uploadTipLink:'View our tips',
    loadingVector:'Processing vector file…', logoAdded:'added',
    unsupportedFile:'File type not supported',
    unitLabel:'Measurement unit',
    layoutGapLabel:'Layout & spacing',
    gapLabel:'Spacing between logos',
    gapHelp:'Set the spacing between logos for cutting/trimming the transfers.',
    bgLabel:'Sheet background (preview only)',
    bgHelp:'White logos show best on checkered or gray. Exports stay transparent.',
    bgRemove:'Remove white background',
    thresholdLabel:'Threshold',
    thresholdHelp:'Lower = more light pixels removed. Higher = only pure white.',
    bgAi:'AI background removal',
    fillSheet:'Fill sheet with logo',
    fillHelp:'Select a logo to use background removal. "Fill sheet" and "Clear sheet" are above the sheet.',
    selectedTitle:'Selected logo',
    infoSheet:'Sheet', infoUsed:'Used',
    selected:'Selected logo',
    selectEmpty:'Click a logo to edit it.',
    allLogos:'Uploaded logos',
    listEmpty:'Nothing uploaded yet.',
    summaryTitle:'Summary',
    sumUnique:'Unique logos',
    sumTotal:'Total copies',
    sumUsage:'Sheet usage',
    sumDpi:'Print quality (DPI)',
    sumSheets:'Number of sheets',
    sumColor:'Color space',
    exportBtn:'Download print-ready PDF',
    exportBgBtn:'Download proof',
    close:'Close',
    zoomFit:'Fit', zoomHint:'Shortcuts: +, −, 0',
    width:'Width', height:'Height', rotation:'Rotation', logoSize:'Logo size', actions:'Actions', ratioLock:'Lock aspect ratio', ratioUnlock:'Unlock aspect ratio',
    sectionTransform:'Transform', sectionAppearance:'Appearance', sectionLayout:'Layout', sectionInfo:'Info',
    dpiAt:'Resolution at this size',
    quality:'Quality',
    dpiHint:'DPI is the sharpness of the print. 300 DPI or higher gives a sharp print. The lower the DPI, the blurrier the logo on the final product.',
    tbRotate:'↻ 90°', tbFlip:'⇆ flip', tbDup:'⧉ duplicate', tbDel:'✕ delete',
    colorsLabel:'Colors',
    colorClickToChange:'Click a color to change it',
    colorTint:'Tint/overlay color',
    colorApplyTint:'Apply tint',
    colorRemoveTint:'Remove tint',
    colorChanged:'Color changed',
    colorNoColors:'No editable colors found',
    colorApply:'Apply color',
    colorMakeWhite:'Make logo white',
    colorMakeBlack:'Make logo black',
    colorMadeMono:'Logo converted',
    rollWidth:'Width', rollLength:'Choose length', lengthUnit:'meters',
    sumLength:'Format',
    rollTooShort:'Sheet cannot be shorter than the placed logos. Remove logos at the bottom first.',
    rollAutoExtended:'Sheet automatically extended',
    formatTooSmall:'Logos don\'t fit on this format. Remove logos first.',
    sheetLabel:'Sheet', addSheet:'+ New sheet',
    sizeTooLarge:'Logo too large to tile on this sheet',
    overlapWarn:'Logos may not overlap. Position has been reverted.',
    manualModeStep:'Layout mode',
    manualModeLabel:'Manual layout',
    manualModeHelp:'Disable automatic layout. Logos can be freely dragged, overlapped and rotated 360°.',
    manualModeOn:'Manual layout enabled',
    manualModeOff:'Automatic layout restored',
    manualModeConfirm:'Switch back to automatic layout? This will optimize the layout and overwrite your manual arrangement.',
    manualModeOptimizeWarn:'Optimizing layout will disable manual mode.',
    smallDetailWarn:'Warning: this logo contains details smaller than 0.4 mm at this size. Very fine details may be lost in print.',
    embeddedRasterWarn:'This vector file contains an embedded image (raster). Print quality depends on the resolution of that image.',
    embeddedRasterHint:'This vector file contains an embedded image. The DPI is based on that image, not the vector file itself.',
    lowDpiWarn:'The uploaded logo has a low resolution',
    lowDpiMore:'Upload a higher resolution or vector file — or use Edit logo → Upscale to increase the resolution.',
    lowDpiDismiss:'I understand',
    pdfGenerating:'Generating PDF…',
    pdfSaved:'saved · 300 DPI',
    addLogoFirst:'Add a logo first',
    lowResFound:'Low resolution found',
    lowResBody:'logo(s) are below 300 DPI and may print blurry. Export anyway?',
    lowResOk:'Export anyway',
    cancel:'Cancel', ok:'Yes, continue',
    selectImageFirst:'Select an image first',
    bgRemoved:'White background removed',
    bgAiTitle:'AI background removal',
    bgAiBody:'This uses remove.bg or a similar AI service for photos and complex images. In production you plug in an API key. In this demo the AI button is disabled — use the browser version above for flat white backgrounds.',
    clearTitle:'Clear sheet',
    clearBody:'Clear the whole sheet? All logos will be removed.',
    clearDone:'Sheet cleared',
    fillTitle:'Fill sheet',
    fillBody:(sheet,name,gap)=>`Fill the ${sheet} sheet with copies of "${name}"? Spacing: ${gap} mm. The logo is automatically rotated 90° if that packs better.`,
    fillDone:(n,cols,rows,rot)=>`${n} copies placed · ${cols}×${rows}${rot?' · 90° rotated':''}`,
    noFillActive:'No fill template active',
    logoGone:'Source logo is gone — please upload again',
    copies:'pcs', logos:'logos', logo:'logo',
    removeSheet:'Remove this sheet?',
    removeSheetBody:'All logos on this sheet will be lost.',
    repackDone:'Layout updated with new spacing',
    spillToNew:(n)=>`No space left — automatically moved to sheet ${n}`,
    sheetFullNoSpill:'No space left on this sheet (single-sheet mode)',
    rot0:'0°', rot90:'90°', rot180:'180°', rot270:'270°', rotReset:'reset',
    infoTitle:'Production information',
    infoTipDetail:'Minimum detail size',
    infoTipDetailBody:'Details smaller than 0.4 mm (1 pt) may be lost during production. Keep this in mind for small text, thin lines, and fine patterns.',
    infoTipVector:'Vector over raster',
    infoTipVectorBody:'Use vector files (SVG, AI, PDF) whenever possible. They scale without quality loss. PNG and JPG are raster files — the larger you make them, the lower the DPI and the blurrier the print.',
    infoTipDpi:'Resolution (DPI)',
    infoTipDpiBody:'DPI (dots per inch) determines print sharpness. Only relevant for raster files (PNG, JPG) — vector files are always sharp.',
    infoTipBg:'Transparent background',
    infoTipBgBody:'Use PNGs with transparent backgrounds. A white background will print as a white block around your logo. The "Remove white background" feature can help, but a truly transparent source file is always better.',
    tourSkip:'Close', tourNext:'Next', tourFinish:'Finish',
    tourStepProjectTitle:'Project name',
    tourStepProjectBody:'Give your transfer a name. It appears at the bottom of each PDF page along with Transferpersshop and the date.',
    tourStep1Title:'Choose sheet size',
    tourStep1Body:'Select the format for your sheet. 55×100 DTF is the default format for DTF rolls and supports automatic multi-sheet overflow.',
    tourStep2Title:'Upload logos or create text',
    tourStep2Body:'Drag files here or click to upload. Vector files (SVG, AI, PDF) give the sharpest results. PNGs with transparent backgrounds at 300+ DPI are also excellent. Use the Create text button to generate text directly.',
    tourStep3Title:'Edit logos',
    tourStep3Body:'Adjust spacing, remove white backgrounds, and set the threshold. Select a logo on the sheet to rotate, scale, or duplicate it.',
    tourStep4Title:'Fill sheet',
    tourStep4Body:'Select a logo and click "Fill sheet with logo" to automatically pack the sheet as full as possible. The tool rotates logos if that yields more copies.',
    tourStep5Title:'Summary & export',
    tourStep5Body:'Review total copies, sheet usage, and DPI status. Click "Download print-ready PDF" for a 300 DPI transparent PDF, or "Download proof" for a customer-ready proof with background, dimensions and footer. Use "Save project" to store your work in your account and "Open project" to load a previously saved project.',
    tourStep6Title:'Units & background',
    tourStep6Body:'Switch between mm and cm as your unit of measurement. Choose a sheet background (white, gray, or checkered) to see your logos better — the export always stays transparent.',
    tourStepZoomTitle:'Zoom & sheet buttons',
    tourStepZoomBody:'Zoom in and out on your sheet with the buttons or shortcuts (+, −, 0). Here you\'ll also find "Fill sheet" to auto-pack the sheet and "Clear sheet" to start over.',
    tourStepSelTitle:'Selected logo',
    tourStepSelBody:'Click a logo on the sheet to edit it here. Adjust size, rotation, and colors, or duplicate and delete the logo.',
    tourStepLayoutGapTitle:'Layout & spacing',
    tourStepLayoutGapBody:'Set the distance between logos and optionally switch to manual layout. In manual mode, logos can be freely dragged, overlapped, and rotated 360°.',
    tourStepListTitle:'Uploaded logos',
    tourStepListBody:'Overview of all your uploaded logos with the total number of copies across all sheets. Use the +/− buttons or type a number to quickly add or remove copies.',
    undoBtn:'Undo', redoBtn:'Redo',
    projectSave:'Save project', projectLoad:'Load project',
    shortcutsBtn:'⌨ Shortcuts', shortcutsTitle:'Keyboard Shortcuts',
    shortcutsBody:'Ctrl+Z: Undo · Ctrl+Shift+Z: Redo · Ctrl+D: Duplicate · Delete: Remove · Arrow keys: Move · +/−: Zoom · 0: Fit · Ctrl+A: Select all',
    optimizeLayout:'Optimize layout', optimizeDone:'Layout optimized',
    selectMultiple:'Multiple selected', deleteMultiple:'Delete all', duplicateMultiple:'Duplicate all', rotateMultiple:'Rotate all 90°',
    alignLeft:'Left', alignCenterH:'Center H', alignRight:'Right',
    alignTop:'Top', alignCenterV:'Center V', alignBottom:'Bottom',
    distributeH:'Distribute H', distributeV:'Distribute V',
    alignLabel:'Align to selection',
    alignCanvasLabel:'Align to sheet',
    printPreview:'Preview', previewTitle:'Print preview',
  }
};

function t(key, ...args){
  const dict = I18N[state.lang] || I18N.nl;
  const v = dict[key];
  if(typeof v === 'function') return v(...args);
  return v !== undefined ? v : key;
}

/* =========================================================
   CONFIG + STATE
   ========================================================= */
// Sheet format definitions
const SHEET_FORMATS = {
  dtf55: { label: 'DTF 55 cm', w: 550, h: 1000, isDTF: true },
  dtf32: { label: 'DTF 32 cm', w: 320, h: 1000, isDTF: true, roles: ['admin','printer'] },
  a3:    { label: 'A3', w: 297, h: 420, isDTF: false },
  a4:    { label: 'A4', w: 210, h: 297, isDTF: false },
  a5:    { label: 'A5', w: 148, h: 210, isDTF: false },
};

// DTF Roll configuration
// Proof footer SVG (Transferpersshop branding bar) as inline base64 data URI
const PROOF_FOOTER_DATA_URI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTkyLjEzIiBoZWlnaHQ9IjEyOC4xOCIgaWQ9IkRydWtwcm9lZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA5OTIuMTMgMTI4LjE4Ij48cmVjdCB3aWR0aD0iOTkyLjEzIiBoZWlnaHQ9IjEyOC4xOCIvPjxnPjxwYXRoIGQ9Ik03MTMuMDgsMjIuNDljLTIyLjM3LDAtNDAuNSwxOC4xMy00MC41LDQwLjVzMTguMTMsNDAuNSw0MC41LDQwLjUsNDAuNS0xOC4xMyw0MC41LTQwLjUtMTguMTMtNDAuNS00MC41LTQwLjVNNzMyLjM2LDUzLjQ0YzAsLjI2LS4yMS40Ny0uNDcuNDdoLTIwLjU2Yy0uMjYsMC0uNDcuMjEtLjQ3LjQ3djI3LjQyYzAsLjI2LjIxLjQ3LjQ3LjQ3aDMuNTJjLjI2LDAsLjQ3LS4yMS40Ny0uNDd2LTIxLjk3YzAtLjI2LjIxLS40Ny40Ny0uNDdoNC43Yy4yNiwwLC40Ny4yMS40Ny40N3YyNy42MWMwLC4yNi0uMjEuNDctLjQ3LjQ3aC0xNC45NGMtLjI2LDAtLjQ3LS4yMS0uNDctLjQ3di0uMjJjMC0uMjYsMC0uNjgsMC0uOTN2LTMzLjU0YzAtLjI2LDAtLjQ3LDAtLjQ3LDAsMCwwLS4yMSwwLS40N3YtMy4wNmMwLS4yNi4yMS0uNDcuNDctLjQ3aDIwLjcyYy4yNiwwLC40Ny0uMjEuNDctLjQ3di0zLjZjMC0uMjYtLjIxLS40Ny0uNDctLjQ3aC0yNi4zNmMtLjI2LDAtLjQ3LjIxLS40Ny40N3Y5LjIyYzAsLjI2LS4yMS40Ny0uNDcuNDdoLTQuN2MtLjI2LDAtLjQ3LS4yMS0uNDctLjQ3di0xNC44NmMwLS4yNi4yMS0uNDcuNDctLjQ3aDM3LjYzYy4yNiwwLC40Ny4yMS40Ny40N3YxNC44OFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNzcyLjY5LDU3LjA1YzAsLjc2LDAsMS4yOC0uMzUsMS43MS0uMzUuNDMtLjkyLjY0LTEuOTIuNjRzLTEuNTctLjIxLTEuOTItLjY0Yy0uMzUtLjQzLS4zNS0uOTUtLjM1LTEuNzF2LTkuMjFoLTIuMTVjLS44LDAtMS4zNSwwLTEuOC0uMzEtLjQ1LS4yOS0uNjctLjc4LS42Ny0xLjY0cy4yMi0xLjM1LjY3LTEuNjRjLjQ1LS4zMSwxLS4zMSwxLjgtLjMxaDguODRjLjgsMCwxLjM1LDAsMS44LjMxLjQ1LjI5LjY3Ljc4LjY3LDEuNjRzLS4yMiwxLjM1LS42NywxLjY0Yy0uNDUuMzEtMSwuMzEtMS44LjMxaC0yLjE1djkuMjFaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTc4My45NSw1Ny4wNWMwLC43NiwwLDEuMjgtLjMzLDEuNzEtLjMyLjQzLS44Ny42NC0xLjgyLjY0cy0xLjUtLjIxLTEuODItLjY0Yy0uMzItLjQzLS4zMi0uOTUtLjMyLTEuNzF2LTEwLjYxYzAtLjg1LDAtMS44NywxLjYtMi4zNS43Mi0uMjEsMS44LS4zNiwzLjQ3LS4zNiwxLjM3LDAsMi45LjA5LDQuMy43MSwxLjcyLjc2LDIuNzUsMi4xNiwyLjc1LDQuMiwwLDEuOS0uOSwzLjM3LTIuNTUsNC4yNWwzLjQ1LDQuMzRjLjgsMS4wMi4zLDIuMTYtMS44NSwyLjE2LTEuNjUsMC0yLjI3LS42Ni0zLjA1LTEuNzhsLTEuNzItMi40N2MtLjQ1LS42Ni0uOC0xLjMxLS44LTEuMzFoLTEuM3YzLjJaTTc4My45NSw1MC41N3MuMzUuMDIuNy4wMmMxLjg1LDAsMi41Ny0uNjksMi41Ny0xLjcxLDAtMS4xOS0uOTctMS41Ny0yLjI3LTEuNTctLjU1LDAtMSwuMDctMSwuMDd2My4xOFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODA0Ljk1LDU2LjIyaC01LjU3bC0uNDUsMS4xOWMtLjUyLDEuMzgtMS4xNSwxLjk5LTIuNzIsMS45OS0xLjQyLDAtMS45NS0uNS0xLjk1LTEuMjYsMC0uMjguMDgtLjU5LjI3LTEuMDJsNS4wOS0xMS40OWMuNTItMS4yMSwxLjEyLTEuODUsMi43Mi0xLjg1czIuMTUuNjYsMi42NSwxLjg1bDQuOTIsMTEuNTFjLjE1LjQuMjMuNjkuMjMuOTUsMCwuODYtLjcsMS4zMS0yLjEyLDEuMzEtMS41LDAtMi4wMi0uNS0yLjYtMS45N2wtLjQ3LTEuMjFaTTgwMC42Myw1Mi45NGgzLjFsLTEuNTUtMy45OS0xLjU1LDMuOTlaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTgxNi44Myw1Ni45OGMwLC43NiwwLDEuMjgtLjM1LDEuNzEtLjMzLjQzLS44Ny42NC0xLjg1LjY0cy0xLjUyLS4yMS0xLjg1LS42NGMtLjM1LS40My0uMzUtLjk1LS4zNS0xLjcxdi0xMS42YzAtMS4wMi43Ny0xLjY2LDIuNDUtMS42NnMyLjM3LjY0LDMsMS40Mmw1LjU0LDcuMjF2LTYuMjljMC0uNzYsMC0xLjI4LjM1LTEuNzEuMzMtLjQzLjg3LS42NCwxLjg1LS42NHMxLjUyLjIxLDEuODUuNjRjLjM1LjQzLjM1Ljk1LjM1LDEuNzF2MTEuNjNjMCwxLjE0LS43NywxLjcxLTIuMTIsMS43MXMtMi4wNS0uNTUtMi43LTEuMzVsLTYuMTctNy42NnY2LjZaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTgzOS4yMiw1MC42NGMxLjMuODMsMi40LDIuMDIsMi40LDMuOTYsMCwzLjA0LTIuNzIsNC43OS02LjA0LDQuNzktMS4xNSwwLTIuMy0uMjEtMy40LS42OS0uODUtLjM4LTEuNTctLjg4LTEuNTctMS44M3MuNjUtMi4wOSwxLjgtMi4wOWMxLjA1LDAsMS44NSwxLDMuMiwxLC45LDAsMS40Ny0uNDMsMS40Ny0xLjAyLDAtLjc0LS44Ny0xLjE5LTEuOTUtMS43My0xLjg1LS45My00LjM3LTIuMDQtNC4zNy00LjgyczIuNjItNC43LDUuODQtNC43YzIuMjUsMCw0Ljc0LjksNC43NCwyLjQ3LDAsLjktLjgyLDEuOTktMS45LDEuOTktLjkyLDAtMS44Mi0uODMtMi45NS0uODMtLjc1LDAtMS4yLjM4LTEuMi44MywwLC45NywyLjEyLDEuNSwzLjkyLDIuNjYiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODQ4Ljc2LDU3LjA1YzAsLjc2LDAsMS4yOC0uMzUsMS43MS0uMzMuNDMtLjkuNjQtMS44Ny42NHMtMS41NS0uMjEtMS44Ny0uNjRjLS4zNS0uNDMtLjM1LS45NS0uMzUtMS43MXYtMTEuMDhjMC0xLjQ3LjU3LTIuMDIsMi4xMi0yLjAyaDUuNTdjLjgsMCwxLjM1LDAsMS44LjMxLjQ1LjI5LjY3Ljc4LjY3LDEuNjRzLS4yMiwxLjM1LS42NywxLjY0Yy0uNDUuMzEtMSwuMzEtMS44LjMxaC0zLjI1djIuMDloMi41N2MuOCwwLDEuMzUsMCwxLjguMjguNDUuMzEuNjcuNzguNjcsMS42MXMtLjIyLDEuMzEtLjY3LDEuNjFjLS40NS4yOS0xLC4yOS0xLjguMjloLTIuNTd2My4zMloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODYxLjM5LDQ5LjU5aDIuMzVjLjgsMCwxLjM1LDAsMS44LjI5LjQ1LjI4LjY3Ljc0LjY3LDEuNTRzLS4yMiwxLjIzLS42NywxLjUyYy0uNDUuMjgtMSwuMjgtMS44LjI4aC0yLjM1djIuNTRoMy43NWMuOCwwLDEuMzUsMCwxLjguMjguNDUuMjkuNjcuNzQuNjcsMS41NHMtLjIyLDEuMjMtLjY3LDEuNTJjLS40NS4yOS0xLC4yOS0xLjguMjloLTUuOTRjLTEuNTUsMC0yLjEyLS41NC0yLjEyLTIuMDJ2LTExLjNjMC0xLjQ3LjU3LTIuMDIsMi4xMi0yLjAyaDUuNDljLjgsMCwxLjM1LDAsMS44LjI4LjQ1LjI5LjY4Ljc0LjY4LDEuNTRzLS4yMywxLjIzLS42OCwxLjUyYy0uNDUuMjgtMSwuMjgtMS44LjI4aC0zLjN2MS45WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04NzQuOCw1Ny4wNWMwLC43NiwwLDEuMjgtLjMyLDEuNzEtLjMyLjQzLS44Ny42NC0xLjgyLjY0cy0xLjUtLjIxLTEuODItLjY0Yy0uMzItLjQzLS4zMi0uOTUtLjMyLTEuNzF2LTEwLjYxYzAtLjg1LDAtMS44NywxLjYtMi4zNS43Mi0uMjEsMS44LS4zNiwzLjQ3LS4zNiwxLjM3LDAsMi45LjA5LDQuMy43MSwxLjcyLjc2LDIuNzUsMi4xNiwyLjc1LDQuMiwwLDEuOS0uOSwzLjM3LTIuNTUsNC4yNWwzLjQ1LDQuMzRjLjgsMS4wMi4zLDIuMTYtMS44NSwyLjE2LTEuNjUsMC0yLjI3LS42Ni0zLjA1LTEuNzhsLTEuNzItMi40N2MtLjQ1LS42Ni0uOC0xLjMxLS44LTEuMzFoLTEuM3YzLjJaTTg3NC44LDUwLjU3cy4zNS4wMi43LjAyYzEuODUsMCwyLjU3LS42OSwyLjU3LTEuNzEsMC0xLjE5LS45Ny0xLjU3LTIuMjctMS41Ny0uNTUsMC0xLC4wNy0xLC4wN3YzLjE4WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04OTEuNzUsNTQuMjVjLS40NSwwLS44My0uMDItLjgzLS4wMnYyLjgyYzAsLjc2LDAsMS4yOC0uMzUsMS43MS0uMzMuNDMtLjkuNjQtMS44Ny42NHMtMS41NS0uMjEtMS44Ny0uNjRjLS4zNS0uNDMtLjM1LS45NS0uMzUtMS43MXYtMTAuNjNjMC0uODUsMC0xLjc4LDEuNDItMi4yOC43Mi0uMjYsMS45LS40LDMuNC0uNCwxLjYyLDAsMy41NC4xNyw1LjA5LDEuMDcsMS40NS44NSwyLjMyLDIuMTgsMi4zMiw0LjExLDAsMy41Ni0zLDUuMzQtNi45Nyw1LjM0TTg5MC45Miw1MC45NXMuMy4wNS43LjA1YzEuMzcsMCwyLjU1LS41MiwyLjU1LTEuODcsMC0xLjIzLTEtMS44LTIuNDUtMS44LS40MiwwLS44LjA1LS44LjA1djMuNThaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTkwNS41Myw0OS41OWgyLjM1Yy44LDAsMS4zNSwwLDEuOC4yOS40NS4yOC42Ny43NC42NywxLjU0cy0uMjIsMS4yMy0uNjcsMS41MmMtLjQ1LjI4LTEsLjI4LTEuOC4yOGgtMi4zNXYyLjU0aDMuNzRjLjgsMCwxLjM1LDAsMS44LjI4LjQ1LjI5LjY3Ljc0LjY3LDEuNTRzLS4yMiwxLjIzLS42NywxLjUyYy0uNDUuMjktMSwuMjktMS44LjI5aC01Ljk0Yy0xLjU1LDAtMi4xMi0uNTQtMi4xMi0yLjAydi0xMS4zYzAtMS40Ny41Ny0yLjAyLDIuMTItMi4wMmg1LjQ5Yy44LDAsMS4zNSwwLDEuOC4yOC40NS4yOS42OC43NC42OCwxLjU0cy0uMjMsMS4yMy0uNjgsMS41MmMtLjQ1LjI4LTEsLjI4LTEuOC4yOGgtMy4zdjEuOVoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOTE4Ljk0LDU3LjA1YzAsLjc2LDAsMS4yOC0uMzMsMS43MS0uMzIuNDMtLjg3LjY0LTEuODIuNjRzLTEuNS0uMjEtMS44Mi0uNjRjLS4zMi0uNDMtLjMyLS45NS0uMzItMS43MXYtMTAuNjFjMC0uODUsMC0xLjg3LDEuNi0yLjM1LjcyLS4yMSwxLjgtLjM2LDMuNDctLjM2LDEuMzcsMCwyLjkuMDksNC4yOS43MSwxLjcyLjc2LDIuNzUsMi4xNiwyLjc1LDQuMiwwLDEuOS0uOSwzLjM3LTIuNTUsNC4yNWwzLjQ1LDQuMzRjLjgsMS4wMi4zLDIuMTYtMS44NSwyLjE2LTEuNjUsMC0yLjI3LS42Ni0zLjA1LTEuNzhsLTEuNzItMi40N2MtLjQ1LS42Ni0uOC0xLjMxLS44LTEuMzFoLTEuM3YzLjJaTTkxOC45NCw1MC41N3MuMzUuMDIuNy4wMmMxLjg1LDAsMi41Ny0uNjksMi41Ny0xLjcxLDAtMS4xOS0uOTctMS41Ny0yLjI3LTEuNTctLjU1LDAtMSwuMDctMSwuMDd2My4xOFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOTM4LjIzLDUwLjY0YzEuMy44MywyLjQsMi4wMiwyLjQsMy45NiwwLDMuMDQtMi43Miw0Ljc5LTYuMDQsNC43OS0xLjE1LDAtMi4zLS4yMS0zLjQtLjY5LS44NS0uMzgtMS41Ny0uODgtMS41Ny0xLjgzcy42NS0yLjA5LDEuOC0yLjA5YzEuMDUsMCwxLjg1LDEsMy4yLDEsLjksMCwxLjQ3LS40MywxLjQ3LTEuMDIsMC0uNzQtLjg3LTEuMTktMS45NS0xLjczLTEuODUtLjkzLTQuMzctMi4wNC00LjM3LTQuODJzMi42Mi00LjcsNS44NC00LjdjMi4yNSwwLDQuNzQuOSw0Ljc0LDIuNDcsMCwuOS0uODIsMS45OS0xLjksMS45OS0uOTIsMC0xLjgyLS44My0yLjk1LS44My0uNzUsMC0xLjIuMzgtMS4yLjgzLDAsLjk3LDIuMTIsMS41LDMuOTIsMi42NiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik03NzIuMDksNzNjMS4zLjg4LDIuNCwyLjEzLDIuNCw0LjE4LDAsMy4yMS0yLjczLDUuMDYtNi4wNiw1LjA2LTEuMTUsMC0yLjMtLjIzLTMuNDEtLjczLS44NS0uNC0xLjU4LS45My0xLjU4LTEuOTNzLjY1LTIuMiwxLjgtMi4yYzEuMDUsMCwxLjg1LDEuMDUsMy4yMSwxLjA1LjksMCwxLjQ4LS40NSwxLjQ4LTEuMDgsMC0uNzgtLjg4LTEuMjUtMS45NS0xLjgzLTEuODUtLjk4LTQuMzgtMi4xNS00LjM4LTUuMDhzMi42My00Ljk2LDUuODYtNC45NmMyLjI1LDAsNC43Ni45NSw0Ljc2LDIuNiwwLC45NS0uODMsMi4xLTEuOSwyLjEtLjkzLDAtMS44My0uODgtMi45NS0uODgtLjc1LDAtMS4yLjQtMS4yLjg4LDAsMS4wMywyLjEzLDEuNTgsMy45MywyLjgiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNzkyLjEzLDc5Ljc2YzAsLjgsMCwxLjM1LS4zNSwxLjgtLjM1LjQ1LS45My42OC0xLjkzLjY4cy0xLjU4LS4yMy0xLjkzLS42OGMtLjM1LS40NS0uMzUtMS0uMzUtMS44di00LjExaC01LjgxdjQuMTFjMCwuOCwwLDEuMzUtLjM1LDEuOC0uMzUuNDUtLjkzLjY4LTEuOTMuNjhzLTEuNTgtLjIzLTEuOTMtLjY4Yy0uMzUtLjQ1LS4zNS0xLS4zNS0xLjh2LTExLjUyYzAtLjgsMC0xLjM1LjM1LTEuOC4zNS0uNDUuOTMtLjY4LDEuOTMtLjY4czEuNTguMjMsMS45My42OGMuMzUuNDUuMzUsMSwuMzUsMS44djMuMzhoNS44MXYtMy4zOGMwLS44LDAtMS4zNS4zNS0xLjguMzUtLjQ1LjkzLS42OCwxLjkzLS42OHMxLjU4LjIzLDEuOTMuNjhjLjM1LjQ1LjM1LDEsLjM1LDEuOHYxMS41MloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODAzLjY0LDY1LjM2YzUuMzEsMCw4LjY0LDMuNTgsOC42NCw4LjQ0cy0zLjQzLDguNDQtOC43NCw4LjQ0LTguNjQtMy41OC04LjY0LTguNDQsMy40My04LjQ0LDguNzQtOC40NE04MDMuNTksNzguMzFjMi40OCwwLDQuMDgtMS42NSw0LjA4LTQuNTFzLTEuNi00LjUxLTQuMDgtNC41MS00LjA4LDEuNjUtNC4wOCw0LjUxLDEuNiw0LjUxLDQuMDgsNC41MSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04MjAuMzQsNzYuODFjLS40NSwwLS44My0uMDMtLjgzLS4wM3YyLjk4YzAsLjgsMCwxLjM1LS4zNSwxLjgtLjMzLjQ1LS45LjY4LTEuODguNjhzLTEuNTUtLjIzLTEuODgtLjY4Yy0uMzUtLjQ1LS4zNS0xLS4zNS0xLjh2LTExLjIyYzAtLjksMC0xLjg4LDEuNDMtMi40LjczLS4yOCwxLjktLjQzLDMuNDEtLjQzLDEuNjMsMCwzLjU2LjE4LDUuMTEsMS4xMywxLjQ1LjksMi4zMywyLjMsMi4zMyw0LjMzLDAsMy43Ni0zLjAxLDUuNjQtNi45OSw1LjY0TTgxOS41Miw3My4zM3MuMy4wNS43LjA1YzEuMzgsMCwyLjU1LS41NSwyLjU1LTEuOTgsMC0xLjMtMS0xLjktMi40NS0xLjktLjQzLDAtLjguMDUtLjguMDV2My43OFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODQwLjY0LDc5LjY5YzAsLjgsMCwxLjM1LS4zNSwxLjgtLjMzLjQ1LS44OC42OC0xLjg1LjY4cy0xLjUzLS4yMy0xLjg1LS42OGMtLjM1LS40NS0uMzUtMS0uMzUtMS44di0xMi4yNWMwLTEuMDguNzgtMS43NSwyLjQ1LTEuNzVzMi4zOC42OCwzLjAxLDEuNWw1LjU2LDcuNjF2LTYuNjRjMC0uOCwwLTEuMzUuMzUtMS44LjMzLS40NS44OC0uNjgsMS44NS0uNjhzMS41My4yMywxLjg1LjY4Yy4zNS40NS4zNSwxLC4zNSwxLjh2MTIuMjdjMCwxLjItLjc4LDEuOC0yLjEzLDEuOHMtMi4wNS0uNTgtMi43LTEuNDNsLTYuMTktOC4wOXY2Ljk2WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04NjMuNTMsNzguMTNjLjgsMCwxLjM1LDAsMS44LjMzLjQ1LjMuNjguODMuNjgsMS43M3MtLjIzLDEuNDMtLjY4LDEuNzNjLS40NS4zMy0xLC4zMy0xLjguMzNoLTUuOTRjLTEuNTUsMC0yLjEzLS41Ny0yLjEzLTIuMTN2LTExLjc0YzAtLjgsMC0xLjM1LjM1LTEuOC4zNS0uNDUuOTMtLjY4LDEuOTMtLjY4czEuNTguMjMsMS45My42OGMuMzUuNDUuMzUsMSwuMzUsMS44djkuNzdoMy41MVoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODI4LjIyLDc2Ljk1aDMuOThjLjMxLDAsLjU2LjI1LjU2LjU2djMuOThjMCwuMzEtLjI1LjU2LS41Ni41NmgtMy45OGMtLjMxLDAtLjU2LS4yNS0uNTYtLjU2di0zLjk4YzAtLjMxLjI1LS41Ni41Ni0uNTZaIiBmaWxsPSIjZmZmIi8+PC9nPjxnPjxnPjxwYXRoIGQ9Ik01Ny40Myw1NC40Nmw0LjQ3LTI1LjRjLjMxLTEuNzEsMS40LTIuNjMsMy4xMS0yLjYzaDExLjc4YzguOTMsMCwxNC4zNiw2Ljg4LDEyLjg4LDE1LjMzLTEuNDksOC41LTkuMzcsMTUuMzMtMTguMzEsMTUuMzNoLTExLjc4Yy0xLjcxLDAtMi40NS0uOTItMi4xNS0yLjYzWk03MS40OCw0OS4yMWM0LjczLDAsOC4xOS0yLjkzLDguOTgtNy40NC43OS00LjU1LTEuNjItNy40OS02LjM1LTcuNDVoLTMuOTRsLTIuNjMsMTQuODloMy45NFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTEwLjU0LDM1LjQxbC0uODgsNC44MmMtLjIyLDEuNC0xLjE0LDIuMDEtMi4yMywxLjkzLS4zNS0uMDQtLjY2LS4wNC0uOTYtLjA0LTMuNjgsMC01LjA0LDIuNTQtNS40Myw0Ljk1bC0xLjMxLDcuNGMtLjMxLDEuNzEtMS40LDIuNjMtMy4xMSwyLjYzaC0zLjc3Yy0xLjcxLDAtMi40NS0uOTItMi4xNS0yLjYzbDMuMTEtMTcuNzhjLjMxLTEuNzEsMS40LTIuNjMsMy4xMS0yLjYzaDMuNDJjMS43MSwwLDIuNDUuOTIsMi4xNSwyLjYzbC0uMzksMi4yM2MxLjU4LTQuNjksNS41Mi01LjM0LDYuNzQtNS4zNGguNTNjMS4yMywwLDEuMzEsMS4wMSwxLjE4LDEuODRaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExMC43Niw0Ny41NGwxLjg4LTEwLjg2Yy4zMS0xLjcxLDEuNC0yLjYzLDMuMTEtMi42M2gzLjc3YzEuNzEsMCwyLjQ1LjkyLDIuMTUsMi42M2wtMS43NSw5Ljk4Yy0uMzEsMS44LS4yNiwzLjksMi4wNiwzLjlzMy4wMi0yLjEsMy4zMy0zLjlsMS43NS05Ljk4Yy4zMS0xLjcxLDEuNC0yLjYzLDMuMTEtMi42M2gzLjc3YzEuNzEsMCwyLjQ1LjkyLDIuMTUsMi42M2wtMy4xMSwxNy43OGMtLjMxLDEuNzEtMS40LDIuNjMtMy4xMSwyLjYzaC0zLjc3Yy0xLjcxLDAtMi40NS0uOTItMi4xNS0yLjYzbC4wNC0uMjJjLTEuNjYsMi4wNi0zLjksMy4zMy03LjAxLDMuMzMtNy4xNCwwLTYuODgtNi4yNi02LjIyLTEwLjAzWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNDguNzYsNTEuNTdsLTEuMjMtNC42LTEuMzEsNy40OWMtLjMxLDEuNzEtMS40LDIuNjMtMy4xMSwyLjYzaC0zLjc3Yy0xLjcxLDAtMi40NS0uOTItMi4xNS0yLjYzbDQuNjQtMjYuNDFjLjMxLTEuNzEsMS40LTIuNjMsMy4xMS0yLjYzaDMuNzdjMS43MSwwLDIuNDUuOTIsMi4xNSwyLjYzbC0yLjY3LDE1LjIsNS44Mi03LjQ0Yy45Ni0xLjIzLDEuOTctMS43NSwzLjQyLTEuNzVoNC4xNmMyLjE5LDAsMi42MywxLjQsMS4wNSwzLjJsLTYuNyw3LjQ5LDEuNDksMy45Yy42NiwxLjUzLDEuNTgsMS43MSwyLjQ1LDEuNzEuMTgsMCwuNDgtLjA0Ljc0LS4wOSwxLjE0LS4yNiwxLjg0LS4wOSwyLjE1Ljg4bC43NCwyLjVjLjI2Ljk2LS4wOSwxLjg4LTEuMzEsMi41LTIuMDEsMS4wMS0zLjk0LDEuNDUtNS43OCwxLjQ1LTMuNzIsMC02LjQ0LTEuNDUtNy42Ni02WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNjMuOTUsNjQuMjdsNC44Ni0yNy41OWMuMzEtMS43MSwxLjQtMi42MywzLjExLTIuNjNoMy43N2MxLjcxLDAsMi40NS45MiwyLjE1LDIuNjN2LjIyYzEuNTgtMi4wNiw0LjE2LTMuMzMsNy4xNC0zLjMzLDYuMTMsMCw5Ljk0LDUuMDQsOC43MSwxMnMtNi44MywxMi0xMi45NiwxMmMtMi45OCwwLTUuMTItMS4yNy01Ljk2LTMuMzdsLTEuOCwxMC4wN2MtLjMxLDEuNzEtMS4zNiwyLjYzLTMuMDcsMi42M2gtMy43N2MtMS43MSwwLTIuNS0uOTItMi4xOS0yLjYzWk0xODQuNjcsNDUuNTdjLjQ4LTIuODktLjc0LTUuMTItMy4zNy01LjEycy00LjY0LDIuMjMtNS4xMiw1LjEyYy0uNTMsMi44OS43LDUuMTIsMy4zMyw1LjEyczQuNjQtMi4yMyw1LjE3LTUuMTJaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTIxNS4xLDM1LjQxbC0uODgsNC44MmMtLjIyLDEuNC0xLjE0LDIuMDEtMi4yMywxLjkzLS4zNS0uMDQtLjY2LS4wNC0uOTYtLjA0LTMuNjgsMC01LjA0LDIuNTQtNS40Myw0Ljk1bC0xLjMxLDcuNGMtLjMxLDEuNzEtMS40LDIuNjMtMy4xMSwyLjYzaC0zLjc3Yy0xLjcxLDAtMi40NS0uOTItMi4xNS0yLjYzbDMuMTEtMTcuNzhjLjMxLTEuNzEsMS40LTIuNjMsMy4xMS0yLjYzaDMuNDJjMS43MSwwLDIuNDUuOTIsMi4xNSwyLjYzbC0uMzksMi4yM2MxLjU4LTQuNjksNS41Mi01LjM0LDYuNzQtNS4zNGguNTNjMS4yMywwLDEuMzEsMS4wMSwxLjE4LDEuODRaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTIxNC40OCw0NS41N2MxLjE0LTYuNjYsNy41My0xMiwxNS40Mi0xMnMxMi4zNSw1LjM0LDExLjIxLDEyYy0xLjE4LDYuNjYtNy41OCwxMi0xNS40NiwxMnMtMTIuMzUtNS4zNC0xMS4xNy0xMlpNMjMyLjc0LDQ1LjU3Yy40OC0yLjkzLTEuMjMtNC45OS00LjA3LTQuOTlzLTUuMzQsMi4xLTUuODIsNC45OWMtLjUzLDIuODksMS4xOCw0Ljk5LDQuMDcsNC45OXM1LjMtMi4wNiw1LjgyLTQuOTlaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTI0Mi45NCw0NS42NmMxLjE0LTYuMzEsNi43LTEyLjA5LDE1LjAyLTEyLjA5LDcuMjcsMCwxMS45MSw0LjM4LDEwLjY0LDExLjc0LS4yNiwxLjQ1LTEuNDksMi4wNi0zLjExLDIuMDZoLTE0LjQ1Yy0uMjIsMS4yNywxLjQ1LDMuNDYsNS4zNCwzLjQ2LDEuMDUsMCwyLjUtLjE3LDQuMi0uOTIsMS42Mi0uNywyLjgtLjYxLDMuNS43bC41Ny45MmMuNzQsMS4zMS40NCwyLjc2LTEuMTgsMy43Mi0yLjg5LDEuNjYtNi4xMywyLjMyLTkuMTEsMi4zMi04LjUsMC0xMi41Ny01LjMtMTEuNDMtMTEuOTFaTTI2MC44MSw0My4yMWMuMjYtMi4yMy0xLjY2LTMuMzMtMy45LTMuMzNzLTQuNiwxLjEtNS4xMiwzLjMzaDkuMDJaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTI3MS4zMiw1NC40NmwyLjQ1LTEzLjg4aC0xLjQ5Yy0uODMsMC0xLjIzLS40OC0xLjA5LTEuMzFsLjU3LTMuMzNjLjE4LS44My43NC0xLjMxLDEuNTgtMS4zMWgxLjQ5bC4yMi0xLjIzYzEuMTgtNi43NCw2LjctOC40NSwxMC44Mi04LjQ1LDMuNTksMCw4LjA2LDEuMzEsNy4xOCw2LjM5LS4wNC4xNy0uMDkuMzktLjE4LjYxLS4yMi44My0uNzQsMS4yMy0xLjUzLDEuMjNoLTQuMTJjLS42NiwwLS44OC0uNDQtLjc5LS44MywwLS4wOS4wNC0uMTMuMDQtLjIyLjA5LS41My0uMzUtMS4wNS0xLjE0LTEuMDVzLTEuNC40OC0xLjUzLDEuMjNsLS4zOSwyLjMyaDMuMTVjLjgzLDAsMS4yMy40OCwxLjA1LDEuMzFsLS41NywzLjMzYy0uMTMuODMtLjcsMS4zMS0xLjUzLDEuMzFoLTIuOTNsLTIuNDUsMTMuODhjLS4zMSwxLjcxLTEuNCwyLjYzLTMuMTEsMi42M2gtMy41NWMtMS43MSwwLTIuNDUtLjkyLTIuMTUtMi42M1oiIGZpbGw9IiNmZmYiLz48L2c+PHJlY3QgeD0iNTcuMyIgeT0iNzEuMjYiIHdpZHRoPSIyNC4xNSIgaGVpZ2h0PSIyNC4xNSIgZmlsbD0iI2JmYmZiZiIvPjxnPjxwYXRoIGQ9Ik05MS4zNyw4MC40OXYtNi45NmMwLS40Ny4yNS0uNzIuNzItLjcyaDEuMDhjLjQ3LDAsLjcyLjI1LjcyLjcydjUuNTJoMy4wNWMuNDcsMCwuNzIuMjUuNzIuNzJ2LjcyYzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTQuODVjLS40NywwLS43Mi0uMjUtLjcyLS43MloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOTguMzEsNzMuNDJjMC0uNjIuNDQtMS4xLDEuMzgtMS4xczEuMzguNDgsMS4zOCwxLjEtLjQ5LDEuMS0xLjM4LDEuMS0xLjM4LS40OC0xLjM4LTEuMVpNOTguNDYsODAuNDl2LTQuODdjMC0uNDcuMjUtLjcyLjcyLS43MmgxLjAzYy40NywwLC43Mi4yNS43Mi43MnY0Ljg3YzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTAxLjc3LDc4LjA2YzAtMS44MiwxLjU1LTMuMjksMy43MS0zLjI5LjcxLDAsMS40Ni4xNywyLjEuNTQuNC4yNS40MS42NC4xMSwxLjAxbC0uMy4zNmMtLjI4LjM1LS41OC4zNS0xLC4xNi0uMjktLjEyLS41NS0uMTYtLjc0LS4xNi0uODIsMC0xLjQuNTgtMS40LDEuMzhzLjU5LDEuMzgsMS40LDEuMzhjLjE5LDAsLjQ2LS4wNC43NC0uMTYuNDItLjE5LjczLS4yLDEuMDEuMTRsLjMuMzdjLjI5LjM2LjI4Ljc3LS4xNCwxLjAxLS42Mi4zNy0xLjM4LjU0LTIuMDcuNTQtMi4xNiwwLTMuNzEtMS40Ni0zLjcxLTMuMjlaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTEwOC44Niw4MC40OXYtNy4yM2MwLS40Ny4yNS0uNzIuNzItLjcyaDEuMDNjLjQ3LDAsLjcyLjI1LjcyLjcydjIuNDJjLjM1LS41Ni45LS45MSwxLjc1LS45MSwxLjk1LDAsMi4xOSwxLjcxLDIuMTksMi43NXYyLjk3YzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MnYtMi43M2MwLS40OS0uMTEtMS4wNy0uNzQtMS4wN3MtLjczLjU4LS43MywxLjA3djIuNzNjMCwuNDctLjI1LjcyLS43Mi43MmgtMS4wM2MtLjQ3LDAtLjcyLS4yNS0uNzItLjcyWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMTYuODEsNzkuMDN2LTIuMzRoLS41Yy0uMjMsMC0uMzYtLjEzLS4zNi0uMzZ2LTEuMDdjMC0uMjMuMTMtLjM2LjM2LS4zNmguNzdsLjItMS4xMmMuMDUtLjI5LjI0LS40My41My0uNDNoLjk0Yy4zMSwwLC40OC4xNy40OC40OHYxLjA3aDEuMTRjLjIzLDAsLjM2LjEzLjM2LjM2djEuMDdjMCwuMjMtLjEzLjM2LS4zNi4zNmgtMS4xNHYyLjM2YzAsLjI4LjEzLjM4LjMuMzguMjUsMCwuMzQtLjI1LjM0LS40OCwwLS4wNywwLS4xMy0uMDEtLjE5LS4wMi0uMjUuMDYtLjM4LjMtLjM4aC44OWMuMTksMCwuMzUuMDcuNDEuMjYuMDYuMTYuMDguMzIuMS40OSwwLDEuNzYtMS4yNSwyLjIxLTIuMzMsMi4yMXMtMi40LS40Ny0yLjQtMi4zMVoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTI1LjQ4LDgzLjU1Yy0uNDMtLjE4LS41Mi0uNTYtLjI5LS45N2wuMi0uMzdjLjIzLS40LjU1LS40OC45Ny0uMjkuNDEuMTcuODUuMywxLjMyLjMuOTQsMCwxLjYzLS40NiwxLjYzLTEuNjN2LS4xNmMtLjM0LjU2LTEuMDMuOTEtMS44NS45MS0xLjY4LDAtMi45My0xLjQ4LTIuOTMtMy4yOXMxLjI1LTMuMjksMi45My0zLjI5Yy44MiwwLDEuNDYuMzUsMS44Ljkydi0uMThjMC0uNDIuMjUtLjYxLjcyLS42MWguOTZjLjQ3LDAsLjcyLjI1LjcyLjcydjQuNzdjMCwyLjY5LTEuNjMsMy42My0zLjY4LDMuNjMtLjg2LDAtMS43Ni0uMTYtMi41MS0uNDhaTTEyOS4zMSw3OC4wNmMwLS43OS0uNDQtMS40NC0xLjE2LTEuNDRzLTEuMTkuNjUtMS4xOSwxLjQ0LjQ3LDEuNDQsMS4xOSwxLjQ0LDEuMTYtLjY1LDEuMTYtMS40NFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTM3LjM1LDc1LjI4djEuMzJjMCwuMzgtLjIyLjU1LS41Mi41My0uMTEtLjAxLS4xOS0uMDEtLjI4LS4wMS0xLjAxLDAtMS4yNS43LTEuMjUsMS4zNnYyLjAzYzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MnYtNC44N2MwLS40Ny4yNS0uNzIuNzItLjcyaC45NGMuNDcsMCwuNzIuMjUuNzIuNzJ2LjYxYy4yLTEuMjgsMS4yNS0xLjQ2LDEuNTgtMS40NmguMTRjLjM0LDAsLjQxLjI4LjQxLjVaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTEzNy45Myw3My40MmMwLS42Mi40NC0xLjEsMS4zOC0xLjFzMS4zOC40OCwxLjM4LDEuMS0uNDksMS4xLTEuMzgsMS4xLTEuMzgtLjQ4LTEuMzgtMS4xWk0xMzguMDcsODAuNDl2LTQuODdjMC0uNDcuMjUtLjcyLjcyLS43MmgxLjAzYy40NywwLC43Mi4yNS43Mi43MnY0Ljg3YzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTM5Ljc0LDgyLjI5czAtLjExLjAxLS4xN2MuMDItLjIzLjE2LS4zMy4zNy0uMzNoMS4xM2MuMTgsMCwuMjUuMTIuMjUuMjN2LjA2YzAsLjE0LjEuMjkuMzEuMjlzLjM0LS4xMy4zNC0uMzR2LTYuNGMuMDEtLjQ3LjI2LS43Mi43My0uNzJoLjk3Yy40NywwLC43Mi4yNS43Mi43MnY2LjFjMCwxLjg1LTEuNDMsMi4zMS0yLjU1LDIuMzEtLjk4LDAtMi4yOC0uMzYtMi4yOC0xLjc1Wk0xNDIuMDIsNzMuNDJjMC0uNjIuNDQtMS4xLDEuMzgtMS4xczEuMzguNDgsMS4zOCwxLjEtLjQ5LDEuMS0xLjM4LDEuMS0xLjM4LS40OC0xLjM4LTEuMVoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTQ1LjU5LDgwLjAzYy0uMi0uNDQuMDUtLjc3LjUtLjg4bC40OC0uMTFjLjQxLS4xLjU2LjExLjg5LjQxLjE5LjE3LjQ0LjIzLjc0LjIzLjM2LDAsLjU5LS4xMS41OS0uMzEsMC0uMTItLjA1LS4yLS40Mi0uMzRsLS43Mi0uMjZjLS4zNS0uMTMtMS45Ny0uNTQtMS45Ny0xLjkyLDAtMS4yNiwxLjEyLTIuMDgsMi41Ny0yLjA4Ljg2LDAsMS41OC4yNSwyLjA5Ljg5LjMyLjQyLjExLjgyLS4zOC45NWwtLjQzLjEyYy0uMzguMTEtLjU4LS4wMS0uODUtLjIyLS4xMy0uMS0uMjktLjEzLS40NC0uMTMtLjI2LDAtLjQuMTQtLjQuM3MuMTMuMjMuNDIuMzJsLjcuMjljMS4zNy40OCwxLjk4LDEuMTUsMiwyLjAxLDAsMS40Mi0xLjI4LDIuMDQtMi43NSwyLjA0LTEuMjcsMC0yLjE5LS40Mi0yLjYxLTEuMzJaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE1NS42MSw4MC42NGwtMS43My00LjkxYy0uMTgtLjQ5LjA2LS44My41OS0uODNoMS4yYy40MywwLC43LjE5Ljc5LjYybC41NSwyLjM1LjY0LTIuMjFjLjEyLS40Mi4zOC0uNjEuOC0uNjFoLjEyYy40MiwwLC42OC4xOS44LjYxbC42NCwyLjIxLjU1LTIuMzVjLjEtLjQzLjM2LS42Mi43OS0uNjJoMS4yYy41MywwLC43Ny4zNC41OS44M2wtMS43Myw0LjkxYy0uMTMuNC0uNC41OC0uODIuNThoLS42NGMtLjQyLDAtLjctLjE4LS44Mi0uNmwtLjY0LTIuMjEtLjY0LDIuMjFjLS4xMi40Mi0uNC42LS44Mi42aC0uNjRjLS40MiwwLS42OC0uMTgtLjgyLS41OFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTYzLjUsNzguMDZjMC0xLjgyLDEuNDktMy4yOSwzLjY1LTMuMjlzMy42NSwxLjQ2LDMuNjUsMy4yOS0xLjQ5LDMuMjktMy42NSwzLjI5LTMuNjUtMS40Ni0zLjY1LTMuMjlaTTE2OC41LDc4LjA2YzAtLjgtLjU4LTEuMzctMS4zNS0xLjM3cy0xLjM2LjU4LTEuMzYsMS4zNy41NiwxLjM3LDEuMzYsMS4zNywxLjM1LS41NiwxLjM1LTEuMzdaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE3Ni4xNCw3NS4yOHYxLjMyYzAsLjM4LS4yMi41NS0uNTIuNTMtLjExLS4wMS0uMTktLjAxLS4yOC0uMDEtMS4wMSwwLTEuMjUuNy0xLjI1LDEuMzZ2Mi4wM2MwLC40Ny0uMjUuNzItLjcyLjcyaC0xLjAzYy0uNDcsMC0uNzItLjI1LS43Mi0uNzJ2LTQuODdjMC0uNDcuMjUtLjcyLjcyLS43MmguOTRjLjQ3LDAsLjcyLjI1LjcyLjcydi42MWMuMi0xLjI4LDEuMjUtMS40NiwxLjU4LTEuNDZoLjE0Yy4zNCwwLC40MS4yOC40MS41WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNzYuNTEsNzguMDZjMC0xLjkxLDEuMjgtMy4yOSwyLjk2LTMuMjkuODIsMCwxLjQ2LjM1LDEuOC45MnYtMi40M2MwLS40Ny4yNS0uNzIuNzItLjcyaDEuMDNjLjQ3LDAsLjcyLjI1LjcyLjcydjcuMjNjMCwuNDctLjI1LjcyLS43Mi43MmgtMS4wM2MtLjQ3LDAtLjcyLS4yNS0uNzItLjcydi0uMDZjLS4zNC41Ni0uOTguOTEtMS44LjkxLTEuNjgsMC0yLjk2LTEuMzgtMi45Ni0zLjI5Wk0xODEuMyw3OC4wNmMwLS43OS0uNDQtMS40LTEuMTYtMS40cy0xLjE2LjYxLTEuMTYsMS40LjQ0LDEuNCwxLjE2LDEuNCwxLjE2LS42MSwxLjE2LTEuNFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTg1LjQxLDc5LjAzdi0yLjM0aC0uNWMtLjIzLDAtLjM2LS4xMy0uMzYtLjM2di0xLjA3YzAtLjIzLjEzLS4zNi4zNi0uMzZoLjc3bC4yLTEuMTJjLjA1LS4yOS4yNC0uNDMuNTMtLjQzaC45NGMuMzEsMCwuNDguMTcuNDguNDh2MS4wN2gxLjE0Yy4yMywwLC4zNi4xMy4zNi4zNnYxLjA3YzAsLjIzLS4xMy4zNi0uMzYuMzZoLTEuMTR2Mi4zNmMwLC4yOC4xMy4zOC4zLjM4LjI1LDAsLjM0LS4yNS4zNC0uNDgsMC0uMDcsMC0uMTMtLjAxLS4xOS0uMDItLjI1LjA2LS4zOC4zLS4zOGguODljLjE5LDAsLjM1LjA3LjQxLjI2LjA2LjE2LjA4LjMyLjEuNDksMCwxLjc2LTEuMjUsMi4yMS0yLjMzLDIuMjFzLTIuNC0uNDctMi40LTIuMzFaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE5My40Niw4MC40OXYtNC44N2MwLS40Ny4yNS0uNzIuNzItLjcyaDEuMDNjLjQ3LDAsLjcyLjI1LjcyLjcydi4wNmMuMzUtLjU2LjktLjkxLDEuNzUtLjkxLDEuOTUsMCwyLjE5LDEuNzEsMi4xOSwyLjc1djIuOTdjMCwuNDctLjI1LjcyLS43Mi43MmgtMS4wM2MtLjQ3LDAtLjcyLS4yNS0uNzItLjcydi0yLjczYzAtLjQ5LS4xMS0xLjA3LS43NC0xLjA3cy0uNzMuNTgtLjczLDEuMDd2Mi43M2MwLC40Ny0uMjUuNzItLjcyLjcyaC0xLjAzYy0uNDcsMC0uNzItLjI1LS43Mi0uNzJaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTIwMC44NCw3My40MmMwLS42Mi40NC0xLjEsMS4zOC0xLjFzMS4zOC40OCwxLjM4LDEuMS0uNDksMS4xLTEuMzgsMS4xLTEuMzgtLjQ4LTEuMzgtMS4xWk0yMDAuOTksODAuNDl2LTQuODdjMC0uNDcuMjUtLjcyLjcyLS43MmgxLjAzYy40NywwLC43Mi4yNS43Mi43MnY0Ljg3YzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjA0LjMxLDc4LjA4YzAtMS43MywxLjI1LTMuMzEsMy41My0zLjMxLDEuOTksMCwzLjQ4LDEuMiwzLjQ4LDMuMjEsMCwuNC0uMy41Ni0uNzQuNTZoLTMuOTZjMCwuMzUuNTUuOTUsMS42Mi45NS4yOSwwLC42OC0uMDUsMS4xMi0uMjUuNDEtLjE5LjczLS4xNywxLC4xOWwuMTkuMjVjLjI4LjM2LjI1Ljc2LS4xNCwxLjAyLS43MS40Ni0xLjU2LjY0LTIuMzguNjQtMi4zMywwLTMuNzEtMS40NS0zLjcxLTMuMjZaTTIwOS4wOCw3Ny40MWMtLjA0LS42MS0uNjItLjkxLTEuMjQtLjkxcy0xLjIuMy0xLjI0LjkxaDIuNDdaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTIxMi41NCw3OS4wM3YtMi4zNGgtLjVjLS4yMywwLS4zNi0uMTMtLjM2LS4zNnYtMS4wN2MwLS4yMy4xMy0uMzYuMzYtLjM2aC43N2wuMi0xLjEyYy4wNS0uMjkuMjQtLjQzLjUzLS40M2guOTRjLjMxLDAsLjQ4LjE3LjQ4LjQ4djEuMDdoMS4xNGMuMjMsMCwuMzYuMTMuMzYuMzZ2MS4wN2MwLC4yMy0uMTMuMzYtLjM2LjM2aC0xLjE0djIuMzZjMCwuMjguMTMuMzguMy4zOC4yNSwwLC4zNC0uMjUuMzQtLjQ4LDAtLjA3LDAtLjEzLS4wMS0uMTktLjAyLS4yNS4wNi0uMzguMy0uMzhoLjg5Yy4xOSwwLC4zNS4wNy40MS4yNi4wNi4xNi4wOC4zMi4xLjQ5LDAsMS43Ni0xLjI1LDIuMjEtMi4zMywyLjIxcy0yLjQtLjQ3LTIuNC0yLjMxWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yMjEuMjIsODMuNTVjLS40My0uMTgtLjUyLS41Ni0uMjktLjk3bC4yLS4zN2MuMjMtLjQuNTUtLjQ4Ljk3LS4yOS40MS4xNy44NS4zLDEuMzIuMy45NCwwLDEuNjMtLjQ2LDEuNjMtMS42M3YtLjE2Yy0uMzQuNTYtMS4wMy45MS0xLjg1LjkxLTEuNjgsMC0yLjkzLTEuNDgtMi45My0zLjI5czEuMjUtMy4yOSwyLjkzLTMuMjljLjgyLDAsMS40Ni4zNSwxLjguOTJ2LS4xOGMwLS40Mi4yNS0uNjEuNzItLjYxaC45NmMuNDcsMCwuNzIuMjUuNzIuNzJ2NC43N2MwLDIuNjktMS42MywzLjYzLTMuNjgsMy42My0uODYsMC0xLjc2LS4xNi0yLjUxLS40OFpNMjI1LjA0LDc4LjA2YzAtLjc5LS40NC0xLjQ0LTEuMTYtMS40NHMtMS4xOS42NS0xLjE5LDEuNDQuNDcsMS40NCwxLjE5LDEuNDQsMS4xNi0uNjUsMS4xNi0xLjQ0WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yMjguMjUsNzguMDhjMC0xLjczLDEuMjUtMy4zMSwzLjUzLTMuMzEsMS45OSwwLDMuNDgsMS4yLDMuNDgsMy4yMSwwLC40LS4zLjU2LS43NC41NmgtMy45NmMwLC4zNS41NS45NSwxLjYyLjk1LjI5LDAsLjY4LS4wNSwxLjEyLS4yNS40MS0uMTkuNzMtLjE3LDEsLjE5bC4xOS4yNWMuMjguMzYuMjUuNzYtLjE0LDEuMDItLjcxLjQ2LTEuNTYuNjQtMi4zOC42NC0yLjMzLDAtMy43MS0xLjQ1LTMuNzEtMy4yNlpNMjMzLjAyLDc3LjQxYy0uMDQtLjYxLS42Mi0uOTEtMS4yNC0uOTFzLTEuMi4zLTEuMjQuOTFoMi40N1oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjM1Ljc2LDc4LjA2YzAtMS45MSwxLjI4LTMuMjksMi45Ni0zLjI5LjgyLDAsMS40Ni4zNSwxLjguOTJ2LTIuNDNjMC0uNDcuMjUtLjcyLjcyLS43MmgxLjAzYy40NywwLC43Mi4yNS43Mi43MnY3LjIzYzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MnYtLjA2Yy0uMzQuNTYtLjk4LjkxLTEuOC45MS0xLjY4LDAtMi45Ni0xLjM4LTIuOTYtMy4yOVpNMjQwLjU2LDc4LjA2YzAtLjc5LS40NC0xLjQtMS4xNi0xLjRzLTEuMTYuNjEtMS4xNiwxLjQuNDQsMS40LDEuMTYsMS40LDEuMTYtLjYxLDEuMTYtMS40WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNDguNjgsNzUuMjh2MS4zMmMwLC4zOC0uMjIuNTUtLjUyLjUzLS4xMS0uMDEtLjE5LS4wMS0uMjgtLjAxLTEuMDEsMC0xLjI1LjctMS4yNSwxLjM2djIuMDNjMCwuNDctLjI1LjcyLS43Mi43MmgtMS4wM2MtLjQ3LDAtLjcyLS4yNS0uNzItLjcydi00Ljg3YzAtLjQ3LjI1LS43Mi43Mi0uNzJoLjk0Yy40NywwLC43Mi4yNS43Mi43MnYuNjFjLjItMS4yOCwxLjI1LTEuNDYsMS41OC0xLjQ2aC4xNGMuMzQsMCwuNDEuMjguNDEuNVoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjQ5LjMzLDc4LjZ2LTIuOTdjMC0uNDcuMjUtLjcyLjcyLS43MmgxLjAzYy40NywwLC43Mi4yNS43Mi43MnYyLjczYzAsLjQ5LjExLDEuMDcuNzQsMS4wN3MuNzMtLjU4LjczLTEuMDd2LTIuNzNjMC0uNDcuMjUtLjcyLjcyLS43MmgxLjAzYy40NywwLC43Mi4yNS43Mi43MnY0Ljg3YzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MnYtLjA2Yy0uMzUuNTYtLjkuOTEtMS43NS45MS0xLjk2LDAtMi4xOS0xLjcxLTIuMTktMi43NVoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjU5Ljk0LDc5LjdsLS41NS0xLjI2djIuMDVjMCwuNDctLjI1LjcyLS43Mi43MmgtMS4wM2MtLjQ3LDAtLjcyLS4yNS0uNzItLjcydi03LjIzYzAtLjQ3LjI1LS43Mi43Mi0uNzJoMS4wM2MuNDcsMCwuNzIuMjUuNzIuNzJ2NC4xNmwxLjI0LTIuMDRjLjItLjM0LjQ2LS40OC44NS0uNDhoMS4xNGMuNiwwLC43OS4zOC40NC44OGwtMS40OCwyLjA1LjYsMS4wN2MuMjUuNDIuNTIuNDcuNzYuNDcuMDUsMCwuMTItLjAxLjE5LS4wMi4zLS4wNy41LS4wMi42NC4yNGwuMzIuNjhjLjEyLjI2LjA2LjUyLS4yNC42OC0uNS4yOC0xLjAxLjQtMS41MS40LTEuMDIsMC0xLjgzLS40LTIuNC0xLjY0WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNjUuMSw3OS4wM3YtMi4zNGgtLjVjLS4yMywwLS4zNi0uMTMtLjM2LS4zNnYtMS4wN2MwLS4yMy4xMy0uMzYuMzYtLjM2aC43N2wuMi0xLjEyYy4wNS0uMjkuMjQtLjQzLjUzLS40M2guOTRjLjMxLDAsLjQ4LjE3LjQ4LjQ4djEuMDdoMS4xNGMuMjMsMCwuMzYuMTMuMzYuMzZ2MS4wN2MwLC4yMy0uMTMuMzYtLjM2LjM2aC0xLjE0djIuMzZjMCwuMjguMTMuMzguMy4zOC4yNSwwLC4zNC0uMjUuMzQtLjQ4LDAtLjA3LDAtLjEzLS4wMS0uMTktLjAyLS4yNS4wNi0uMzguMy0uMzhoLjg5Yy4xOSwwLC4zNS4wNy40MS4yNi4wNi4xNi4wOC4zMi4xLjQ5LDAsMS43Ni0xLjI1LDIuMjEtMi4zMywyLjIxcy0yLjQtLjQ3LTIuNC0yLjMxWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNzAuMzksODMuMDdsLS4wNS0uMDdjLS4xNC0uMjMtLjEtLjQxLjEyLS41OC40NC0uMzMuOTQtLjkxLjk2LTEuNC0uMDYsMC0uMTIsMC0uMTctLjAxLS42LS4wOC0uOTUtLjY0LS45NS0xLjEsMC0uNjguNDYtMS4yOSwxLjMzLTEuMjksMS4wNiwwLDEuMzUuOTIsMS4zNSwxLjQyLDAsMS4zMS0xLDIuNjUtMi4wNCwzLjIxLS4yMy4xMi0uNDIuMDUtLjU2LS4xN1oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOTAuOTEsOTIuNDZjMC0xLjkxLDEuMjgtMy4yOSwyLjk2LTMuMjkuODIsMCwxLjQ2LjM1LDEuOC45MnYtMi40M2MwLS40Ny4yNS0uNzIuNzItLjcyaDEuMDNjLjQ3LDAsLjcyLjI1LjcyLjcydjcuMjNjMCwuNDctLjI1LjcyLS43Mi43MmgtMS4wM2MtLjQ3LDAtLjcyLS4yNS0uNzItLjcydi0uMDZjLS4zNC41Ni0uOTguOTEtMS44LjkxLTEuNjgsMC0yLjk2LTEuMzgtMi45Ni0zLjI5Wk05NS43MSw5Mi40NmMwLS43OS0uNDQtMS40LTEuMTYtMS40cy0xLjE2LjYxLTEuMTYsMS40LjQ0LDEuNCwxLjE2LDEuNCwxLjE2LS42MSwxLjE2LTEuNFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOTkuMTgsODcuODJjMC0uNjIuNDQtMS4xLDEuMzgtMS4xczEuMzguNDgsMS4zOCwxLjEtLjQ5LDEuMS0xLjM4LDEuMS0xLjM4LS40OC0xLjM4LTEuMVpNOTkuMzIsOTQuODl2LTQuODdjMC0uNDcuMjUtLjcyLjcyLS43MmgxLjAzYy40NywwLC43Mi4yNS43Mi43MnY0Ljg3YzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTAyLjY1LDkyLjQ4YzAtMS43MywxLjI1LTMuMzEsMy41My0zLjMxLDEuOTksMCwzLjQ4LDEuMiwzLjQ4LDMuMjEsMCwuNC0uMy41Ni0uNzQuNTZoLTMuOTZjMCwuMzUuNTUuOTUsMS42Mi45NS4yOSwwLC42OC0uMDUsMS4xMi0uMjUuNDEtLjE5LjczLS4xNywxLC4xOWwuMTkuMjVjLjI4LjM2LjI1Ljc2LS4xNCwxLjAyLS43MS40Ni0xLjU2LjY0LTIuMzguNjQtMi4zMywwLTMuNzEtMS40NS0zLjcxLTMuMjZaTTEwNy40Miw5MS44MWMtLjA0LS42MS0uNjItLjkxLTEuMjQtLjkxcy0xLjIuMy0xLjI0LjkxaDIuNDdaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExMC40Nyw5NC44OXYtNC44N2MwLS40Ny4yNS0uNzIuNzItLjcyaDEuMDNjLjQ3LDAsLjcyLjI1LjcyLjcydi4wNmMuMzUtLjU2LjktLjkxLDEuNzUtLjkxLDEuOTUsMCwyLjE5LDEuNzEsMi4xOSwyLjc1djIuOTdjMCwuNDctLjI1LjcyLS43Mi43MmgtMS4wM2MtLjQ3LDAtLjcyLS4yNS0uNzItLjcydi0yLjczYzAtLjQ5LS4xMS0xLjA3LS43NC0xLjA3cy0uNzMuNTgtLjczLDEuMDd2Mi43M2MwLC40Ny0uMjUuNzItLjcyLjcyaC0xLjAzYy0uNDcsMC0uNzItLjI1LS43Mi0uNzJaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExOC40MSw5My40M3YtMi4zNGgtLjVjLS4yMywwLS4zNi0uMTMtLjM2LS4zNnYtMS4wN2MwLS4yMy4xMy0uMzYuMzYtLjM2aC43N2wuMi0xLjEyYy4wNS0uMjkuMjQtLjQzLjUzLS40M2guOTRjLjMxLDAsLjQ4LjE3LjQ4LjQ4djEuMDdoMS4xNGMuMjMsMCwuMzYuMTMuMzYuMzZ2MS4wN2MwLC4yMy0uMTMuMzYtLjM2LjM2aC0xLjE0djIuMzZjMCwuMjguMTMuMzguMy4zOC4yNSwwLC4zNC0uMjUuMzQtLjQ4LDAtLjA3LDAtLjEzLS4wMS0uMTktLjAyLS4yNS4wNi0uMzguMy0uMzhoLjg5Yy4xOSwwLC4zNS4wNy40MS4yNi4wNi4xNi4wOC4zMi4xLjQ5LDAsMS43Ni0xLjI1LDIuMjEtMi4zMywyLjIxcy0yLjQtLjQ3LTIuNC0yLjMxWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMjYuMTUsOTIuNDZjMC0xLjkxLDEuMjgtMy4yOSwyLjk2LTMuMjkuODIsMCwxLjQ2LjM1LDEuOC45MnYtLjA3YzAtLjQ3LjI1LS43Mi43Mi0uNzJoMS4wM2MuNDcsMCwuNzIuMjUuNzIuNzJ2NC44N2MwLC40Ny0uMjUuNzItLjcyLjcyaC0xLjAzYy0uNDcsMC0uNzItLjI1LS43Mi0uNzJ2LS4wNmMtLjM0LjU2LS45OC45MS0xLjguOTEtMS42OCwwLTIuOTYtMS4zOC0yLjk2LTMuMjlaTTEzMC45NSw5Mi40NmMwLS43OS0uNDQtMS40LTEuMTYtMS40cy0xLjE2LjYxLTEuMTYsMS40LjQ0LDEuNCwxLjE2LDEuNCwxLjE2LS42MSwxLjE2LTEuNFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTM0LjU3LDk0Ljg5di03LjIzYzAtLjQ3LjI1LS43Mi43Mi0uNzJoMS4wM2MuNDcsMCwuNzIuMjUuNzIuNzJ2Ny4yM2MwLC40Ny0uMjUuNzItLjcyLjcyaC0xLjAzYy0uNDcsMC0uNzItLjI1LS43Mi0uNzJaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTEzOC4wMiw5NC40M2MtLjItLjQ0LjA1LS43Ny41LS44OGwuNDgtLjExYy40MS0uMS41Ni4xMS44OS40MS4xOS4xNy40NC4yMy43NC4yMy4zNiwwLC41OS0uMTEuNTktLjMxLDAtLjEyLS4wNS0uMi0uNDItLjM0bC0uNzItLjI2Yy0uMzUtLjEzLTEuOTctLjU0LTEuOTctMS45MiwwLTEuMjYsMS4xMi0yLjA4LDIuNTctMi4wOC44NiwwLDEuNTguMjUsMi4wOS44OS4zMi40Mi4xMS44Mi0uMzguOTVsLS40My4xMmMtLjM4LjExLS41OC0uMDEtLjg1LS4yMi0uMTMtLjEtLjI5LS4xMy0uNDQtLjEzLS4yNiwwLS40LjE0LS40LjNzLjEzLjIzLjQyLjMybC43LjI5YzEuMzcuNDgsMS45OCwxLjE1LDIsMi4wMSwwLDEuNDItMS4yOCwyLjA0LTIuNzUsMi4wNC0xLjI3LDAtMi4xOS0uNDItMi42MS0xLjMyWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNDYuNTgsOTIuNDZjMC0xLjkxLDEuMjgtMy4yOSwyLjk2LTMuMjkuODIsMCwxLjQ2LjM1LDEuOC45MnYtLjA3YzAtLjQ3LjI1LS43Mi43Mi0uNzJoMS4wM2MuNDcsMCwuNzIuMjUuNzIuNzJ2NC44N2MwLC40Ny0uMjUuNzItLjcyLjcyaC0xLjAzYy0uNDcsMC0uNzItLjI1LS43Mi0uNzJ2LS4wNmMtLjM0LjU2LS45OC45MS0xLjguOTEtMS42OCwwLTIuOTYtMS4zOC0yLjk2LTMuMjlaTTE1MS4zOCw5Mi40NmMwLS43OS0uNDQtMS40LTEuMTYtMS40cy0xLjE2LjYxLTEuMTYsMS40LjQ0LDEuNCwxLjE2LDEuNCwxLjE2LS42MSwxLjE2LTEuNFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTU0LjY1LDkyLjQ2YzAtMS44MiwxLjU1LTMuMjksMy43MS0zLjI5LjcxLDAsMS40Ni4xNywyLjEuNTQuNC4yNS40MS42NC4xMSwxLjAxbC0uMy4zNmMtLjI4LjM1LS41OC4zNS0xLC4xNi0uMjktLjEyLS41NS0uMTYtLjc0LS4xNi0uODIsMC0xLjQuNTgtMS40LDEuMzhzLjU5LDEuMzgsMS40LDEuMzhjLjE5LDAsLjQ2LS4wNC43NC0uMTYuNDItLjE5LjczLS4yLDEuMDEuMTRsLjMuMzdjLjI5LjM2LjI4Ljc3LS4xNCwxLjAxLS42Mi4zNy0xLjM4LjU0LTIuMDcuNTQtMi4xNiwwLTMuNzEtMS40Ni0zLjcxLTMuMjlaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE2MS43NSw5NC44OXYtNy4yM2MwLS40Ny4yNS0uNzIuNzItLjcyaDEuMDNjLjQ3LDAsLjcyLjI1LjcyLjcydjIuNDJjLjM1LS41Ni45LS45MSwxLjc1LS45MSwxLjk1LDAsMi4xOSwxLjcxLDIuMTksMi43NXYyLjk3YzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MnYtMi43M2MwLS40OS0uMTEtMS4wNy0uNzQtMS4wN3MtLjczLjU4LS43MywxLjA3djIuNzNjMCwuNDctLjI1LjcyLS43Mi43MmgtMS4wM2MtLjQ3LDAtLjcyLS4yNS0uNzItLjcyWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNjkuNjksOTMuNDN2LTIuMzRoLS41Yy0uMjMsMC0uMzYtLjEzLS4zNi0uMzZ2LTEuMDdjMC0uMjMuMTMtLjM2LjM2LS4zNmguNzdsLjItMS4xMmMuMDUtLjI5LjI0LS40My41My0uNDNoLjk0Yy4zMSwwLC40OC4xNy40OC40OHYxLjA3aDEuMTRjLjIzLDAsLjM2LjEzLjM2LjM2djEuMDdjMCwuMjMtLjEzLjM2LS4zNi4zNmgtMS4xNHYyLjM2YzAsLjI4LjEzLjM4LjMuMzguMjUsMCwuMzQtLjI1LjM0LS40OCwwLS4wNywwLS4xMy0uMDEtLjE5LS4wMi0uMjUuMDYtLjM4LjMtLjM4aC44OWMuMTksMCwuMzUuMDcuNDEuMjYuMDYuMTYuMDguMzIuMS40OSwwLDEuNzYtMS4yNSwyLjIxLTIuMzMsMi4yMXMtMi40LS40Ny0yLjQtMi4zMVoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTc0Ljc1LDkyLjQ4YzAtMS43MywxLjI1LTMuMzEsMy41My0zLjMxLDEuOTksMCwzLjQ4LDEuMiwzLjQ4LDMuMjEsMCwuNC0uMy41Ni0uNzQuNTZoLTMuOTZjMCwuMzUuNTUuOTUsMS42Mi45NS4yOSwwLC42OC0uMDUsMS4xMi0uMjUuNDEtLjE5LjczLS4xNywxLC4xOWwuMTkuMjVjLjI4LjM2LjI1Ljc2LS4xNCwxLjAyLS43MS40Ni0xLjU2LjY0LTIuMzguNjQtMi4zMywwLTMuNzEtMS40NS0zLjcxLTMuMjZaTTE3OS41Myw5MS44MWMtLjA0LS42MS0uNjItLjkxLTEuMjQtLjkxcy0xLjIuMy0xLjI0LjkxaDIuNDdaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE4Ny4wOSw4OS42OHYxLjMyYzAsLjM4LS4yMi41NS0uNTIuNTMtLjExLS4wMS0uMTktLjAxLS4yOC0uMDEtMS4wMSwwLTEuMjUuNy0xLjI1LDEuMzZ2Mi4wM2MwLC40Ny0uMjUuNzItLjcyLjcyaC0xLjAzYy0uNDcsMC0uNzItLjI1LS43Mi0uNzJ2LTQuODdjMC0uNDcuMjUtLjcyLjcyLS43MmguOTRjLjQ3LDAsLjcyLjI1LjcyLjcydi42MWMuMi0xLjI4LDEuMjUtMS40NiwxLjU4LTEuNDZoLjE0Yy4zNCwwLC40MS4yOC40MS41WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xODguMzksOTcuOTVjLS40My0uMTgtLjUyLS41Ni0uMjktLjk3bC4yLS4zN2MuMjMtLjQuNTUtLjQ4Ljk3LS4yOS40MS4xNy44NS4zLDEuMzIuMy45NCwwLDEuNjMtLjQ2LDEuNjMtMS42M3YtLjE2Yy0uMzQuNTYtMS4wMy45MS0xLjg1LjkxLTEuNjgsMC0yLjkzLTEuNDgtMi45My0zLjI5czEuMjUtMy4yOSwyLjkzLTMuMjljLjgyLDAsMS40Ni4zNSwxLjguOTJ2LS4xOGMwLS40Mi4yNS0uNjEuNzItLjYxaC45NmMuNDcsMCwuNzIuMjUuNzIuNzJ2NC43N2MwLDIuNjktMS42MywzLjYzLTMuNjgsMy42My0uODYsMC0xLjc2LS4xNi0yLjUxLS40OFpNMTkyLjIxLDkyLjQ2YzAtLjc5LS40NC0xLjQ0LTEuMTYtMS40NHMtMS4xOS42NS0xLjE5LDEuNDQuNDcsMS40NCwxLjE5LDEuNDQsMS4xNi0uNjUsMS4xNi0xLjQ0WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yMDAuMjUsODkuNjh2MS4zMmMwLC4zOC0uMjIuNTUtLjUyLjUzLS4xMS0uMDEtLjE5LS4wMS0uMjgtLjAxLTEuMDEsMC0xLjI1LjctMS4yNSwxLjM2djIuMDNjMCwuNDctLjI1LjcyLS43Mi43MmgtMS4wM2MtLjQ3LDAtLjcyLS4yNS0uNzItLjcydi00Ljg3YzAtLjQ3LjI1LS43Mi43Mi0uNzJoLjk0Yy40NywwLC43Mi4yNS43Mi43MnYuNjFjLjItMS4yOCwxLjI1LTEuNDYsMS41OC0xLjQ2aC4xNGMuMzQsMCwuNDEuMjguNDEuNVoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjAwLjU4LDkyLjQ2YzAtMS44MiwxLjQ5LTMuMjksMy42NS0zLjI5czMuNjUsMS40NiwzLjY1LDMuMjktMS40OSwzLjI5LTMuNjUsMy4yOS0zLjY1LTEuNDYtMy42NS0zLjI5Wk0yMDUuNTgsOTIuNDZjMC0uOC0uNTgtMS4zNy0xLjM1LTEuMzdzLTEuMzYuNTgtMS4zNiwxLjM3LjU2LDEuMzcsMS4zNiwxLjM3LDEuMzUtLjU2LDEuMzUtMS4zN1oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjA4LjcxLDk0Ljg5di00Ljg3YzAtLjQ3LjI1LS43Mi43Mi0uNzJoMS4wM2MuNDcsMCwuNzIuMjUuNzIuNzJ2LjA2Yy4zNS0uNTYuOS0uOTEsMS43NS0uOTEsMS45NSwwLDIuMTksMS43MSwyLjE5LDIuNzV2Mi45N2MwLC40Ny0uMjUuNzItLjcyLjcyaC0xLjAzYy0uNDcsMC0uNzItLjI1LS43Mi0uNzJ2LTIuNzNjMC0uNDktLjExLTEuMDctLjc0LTEuMDdzLS43My41OC0uNzMsMS4wN3YyLjczYzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjE1LjkzLDkyLjQ2YzAtMS45MSwxLjI4LTMuMjksMi45Ni0zLjI5LjgyLDAsMS40Ni4zNSwxLjguOTJ2LTIuNDNjMC0uNDcuMjUtLjcyLjcyLS43MmgxLjAzYy40NywwLC43Mi4yNS43Mi43MnY3LjIzYzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MnYtLjA2Yy0uMzQuNTYtLjk4LjkxLTEuOC45MS0xLjY4LDAtMi45Ni0xLjM4LTIuOTYtMy4yOVpNMjIwLjcyLDkyLjQ2YzAtLjc5LS40NC0xLjQtMS4xNi0xLjRzLTEuMTYuNjEtMS4xNiwxLjQuNDQsMS40LDEuMTYsMS40LDEuMTYtLjYxLDEuMTYtMS40WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yMjguNiw5NS4wN2wtMi4yMi00LjkzYy0uMjMtLjQ5LDAtLjg0LjU0LS44NGgxLjE0Yy40MiwwLC43LjE4LjgzLjU5bDEuMDQsMy4wNiwxLjA3LTMuMDZjLjEzLS40LjQtLjU5LjgyLS41OWgxLjE1Yy41NCwwLC43OC4zNS41NS44NGwtMi4yMSw0LjkzYy0uMTcuMzctLjQzLjU0LS44NC41NGgtMS4wM2MtLjQxLDAtLjY3LS4xNy0uODQtLjU0WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yMzMuODMsOTIuNDZjMC0xLjkxLDEuMjgtMy4yOSwyLjk2LTMuMjkuODIsMCwxLjQ2LjM1LDEuOC45MnYtLjA3YzAtLjQ3LjI1LS43Mi43Mi0uNzJoMS4wM2MuNDcsMCwuNzIuMjUuNzIuNzJ2NC44N2MwLC40Ny0uMjUuNzItLjcyLjcyaC0xLjAzYy0uNDcsMC0uNzItLjI1LS43Mi0uNzJ2LS4wNmMtLjM0LjU2LS45OC45MS0xLjguOTEtMS42OCwwLTIuOTYtMS4zOC0yLjk2LTMuMjlaTTIzOC42Myw5Mi40NmMwLS43OS0uNDQtMS40LTEuMTYtMS40cy0xLjE2LjYxLTEuMTYsMS40LjQ0LDEuNCwxLjE2LDEuNCwxLjE2LS42MSwxLjE2LTEuNFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjQyLjI0LDk0Ljg5di00Ljg3YzAtLjQ3LjI1LS43Mi43Mi0uNzJoMS4wM2MuNDcsMCwuNzIuMjUuNzIuNzJ2LjA2Yy4zNS0uNTYuOS0uOTEsMS43NS0uOTEsMS45NSwwLDIuMTksMS43MSwyLjE5LDIuNzV2Mi45N2MwLC40Ny0uMjUuNzItLjcyLjcyaC0xLjAzYy0uNDcsMC0uNzItLjI1LS43Mi0uNzJ2LTIuNzNjMC0uNDktLjExLTEuMDctLjc0LTEuMDdzLS43My41OC0uNzMsMS4wN3YyLjczYzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjUyLjEyLDkyLjQ2YzAtMS45MSwxLjI4LTMuMjksMi45Ni0zLjI5LjgyLDAsMS40Ni4zNSwxLjguOTJ2LTIuNDNjMC0uNDcuMjUtLjcyLjcyLS43MmgxLjAzYy40NywwLC43Mi4yNS43Mi43MnY3LjIzYzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MnYtLjA2Yy0uMzQuNTYtLjk4LjkxLTEuOC45MS0xLjY4LDAtMi45Ni0xLjM4LTIuOTYtMy4yOVpNMjU2LjkxLDkyLjQ2YzAtLjc5LS40NC0xLjQtMS4xNi0xLjRzLTEuMTYuNjEtMS4xNiwxLjQuNDQsMS40LDEuMTYsMS40LDEuMTYtLjYxLDEuMTYtMS40WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNjAuMiw5Mi40OGMwLTEuNzMsMS4yNS0zLjMxLDMuNTMtMy4zMSwxLjk5LDAsMy40OCwxLjIsMy40OCwzLjIxLDAsLjQtLjMuNTYtLjc0LjU2aC0zLjk2YzAsLjM1LjU1Ljk1LDEuNjIuOTUuMjksMCwuNjgtLjA1LDEuMTItLjI1LjQxLS4xOS43My0uMTcsMSwuMTlsLjE5LjI1Yy4yOC4zNi4yNS43Ni0uMTQsMS4wMi0uNzEuNDYtMS41Ni42NC0yLjM4LjY0LTIuMzMsMC0zLjcxLTEuNDUtMy43MS0zLjI2Wk0yNjQuOTgsOTEuODFjLS4wNC0uNjEtLjYyLS45MS0xLjI0LS45MXMtMS4yLjMtMS4yNC45MWgyLjQ3WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNzAuNjksOTcuNTh2LTcuNTZjMC0uNDcuMjUtLjcyLjcyLS43MmgxLjAzYy40NywwLC43Mi4yNS43Mi43MnYuMDZjLjM0LS41Ni45OC0uOTEsMS44LS45MSwxLjY4LDAsMi45NiwxLjM4LDIuOTYsMy4yOXMtMS4yOCwzLjI5LTIuOTYsMy4yOWMtLjgyLDAtMS40Ni0uMzUtMS44LS45MnYyLjc2YzAsLjQ3LS4yNS43Mi0uNzIuNzJoLTEuMDNjLS40NywwLS43Mi0uMjUtLjcyLS43MlpNMjc1LjQ1LDkyLjQ2YzAtLjc5LS40NC0xLjQtMS4xNi0xLjRzLTEuMTYuNjEtMS4xNiwxLjQuNDQsMS40LDEuMTYsMS40LDEuMTYtLjYxLDEuMTYtMS40WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yODMuMyw4OS42OHYxLjMyYzAsLjM4LS4yMi41NS0uNTIuNTMtLjExLS4wMS0uMTktLjAxLS4yOC0uMDEtMS4wMSwwLTEuMjUuNy0xLjI1LDEuMzZ2Mi4wM2MwLC40Ny0uMjUuNzItLjcyLjcyaC0xLjAzYy0uNDcsMC0uNzItLjI1LS43Mi0uNzJ2LTQuODdjMC0uNDcuMjUtLjcyLjcyLS43MmguOTRjLjQ3LDAsLjcyLjI1LjcyLjcydi42MWMuMi0xLjI4LDEuMjUtMS40NiwxLjU4LTEuNDZoLjE0Yy4zNCwwLC40MS4yOC40MS41WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yODMuNjMsOTIuNDZjMC0xLjgyLDEuNDktMy4yOSwzLjY1LTMuMjlzMy42NSwxLjQ2LDMuNjUsMy4yOS0xLjQ5LDMuMjktMy42NSwzLjI5LTMuNjUtMS40Ni0zLjY1LTMuMjlaTTI4OC42Myw5Mi40NmMwLS44LS41OC0xLjM3LTEuMzUtMS4zN3MtMS4zNi41OC0xLjM2LDEuMzcuNTYsMS4zNywxLjM2LDEuMzcsMS4zNS0uNTYsMS4zNS0xLjM3WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yOTEuNDQsOTIuNDhjMC0xLjczLDEuMjUtMy4zMSwzLjUzLTMuMzEsMS45OSwwLDMuNDgsMS4yLDMuNDgsMy4yMSwwLC40LS4zLjU2LS43NC41NmgtMy45NmMwLC4zNS41NS45NSwxLjYyLjk1LjI5LDAsLjY4LS4wNSwxLjEyLS4yNS40MS0uMTkuNzMtLjE3LDEsLjE5bC4xOS4yNWMuMjguMzYuMjUuNzYtLjE0LDEuMDItLjcxLjQ2LTEuNTYuNjQtMi4zOC42NC0yLjMzLDAtMy43MS0xLjQ1LTMuNzEtMy4yNlpNMjk2LjIxLDkxLjgxYy0uMDQtLjYxLS42Mi0uOTEtMS4yNC0uOTFzLTEuMi4zLTEuMjQuOTFoMi40N1oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjk5LjY0LDk0Ljg5di0zLjhoLS40MWMtLjIzLDAtLjM2LS4xMy0uMzYtLjM2di0uOTFjMC0uMjMuMTMtLjM2LjM2LS4zNmguNDF2LS4zNGMwLTEuODUsMS40My0yLjMxLDIuNTUtMi4zMS45OCwwLDIuMjguMzYsMi4yOCwxLjc1LDAsLjA1LDAsLjExLS4wMS4xNy0uMDIuMjMtLjE2LjMzLS4zNy4zM2gtMS4xM2MtLjE4LDAtLjI1LS4xMi0uMjUtLjIzdi0uMDZjMC0uMTQtLjE0LS4yOS0uMzYtLjI5cy0uMzYuMTMtLjM2LjM0di42NGguODZjLjIzLDAsLjM2LjEzLjM2LjM2di45MWMwLC4yMy0uMTMuMzYtLjM2LjM2aC0uOHYzLjhjMCwuNDctLjI1LjcyLS43Mi43MmgtLjk3Yy0uNDcsMC0uNzItLjI1LS43Mi0uNzJaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTMwMy41NCw5NC41NmMwLS43MS41OC0xLjIyLDEuMzgtMS4yMnMxLjM5LjUyLDEuMzksMS4yMi0uNjEsMS4xOS0xLjM5LDEuMTktMS4zOC0uNS0xLjM4LTEuMTlaIiBmaWxsPSIjZmZmIi8+PC9nPjwvZz48L3N2Zz4=';

const ROLL_WIDTH_MM = 550;      // 55 cm wide
const DEFAULT_LENGTH_MM = 1000;  // Default 1 meter
const MIN_LENGTH_MM = 1000;      // Minimum 1 meter
const MAX_LENGTH_MM = 50000;     // Maximum 50 meters

const DPI_TARGET = 300;
const MM_PER_INCH = 25.4;
let displayPxPerMm = 1.6;
let idCounter = 0;

// Stores cloned ArrayBuffers of uploaded AI/PDF files keyed by logo _originalId.
// Used by the PDF export to embed the original PDF page via pdf-lib's embedPdf,
// preserving 100% of vector content including gradients, patterns, and text.
const pdfSourceBuffers = new Map();

// Shared SVG source strings keyed by _originalId.
// Instead of storing _svgSource on every Fabric object (400 copies = 400 identical strings),
// we store one copy here and look it up when needed (export, recolor).
// Saves ~100s of MB with many logo copies.
const svgSourceStore = new Map();
/** Lookup SVG source: object-level override first, then shared store. */
function getSvgSource(obj) {
  return obj._svgSource || (obj._originalId && svgSourceStore.get(obj._originalId)) || null;
}

const state = {
  sheetFormat: 'dtf55',  // active format key
  sheet: { id: 'dtf-roll', w: ROLL_WIDTH_MM, h: DEFAULT_LENGTH_MM },
  rollLengthM: 1.0,  // Length in meters (user-facing, DTF only)
  unit: 'cm',
  lang: 'nl',
  selectedId: null,
  gapMm: 10,
  sheetBg: 'checker',
  zoom: 1,
  fillTemplate: null,
  manualMode: false,  // true = free placement, no collision/snap/rotation restrictions
};

/* =========================================================
   UNDO/REDO SYSTEM
   ========================================================= */
const undoRedoStack = {
  undo: [],
  redo: [],
  _statsDirty: true,
  _statsCache: null,
  // 15 stappen: elke stap bevat een volledige canvas-serialisatie (incl.
  // base64-beelddata van rasterlogo's) — 15 i.p.v. 30 halveert het geheugen
  maxStates: 15,

  push(state) {
    this.undo.push(state);
    if(this.undo.length > this.maxStates) this.undo.shift();
    this.redo = [];
    this._statsDirty = true;
  },

  pop() {
    return this.undo.pop();
  },

  peekRedo() {
    return this.redo.length > 0 ? this.redo[this.redo.length - 1] : null;
  },

  pushRedo(state) {
    this.redo.push(state);
    if(this.redo.length > this.maxStates) this.redo.shift();
    this._statsDirty = true;
  },

  popRedo() {
    return this.redo.pop();
  }
};

/* ── Undo / redo helpers ──
   pushUndo()      — call BEFORE a programmatic change (delete, duplicate,
                     recolor, repack, fill, clear, etc.)
   Interactive transforms (drag/scale/rotate) are captured automatically
   via before:transform → modified events on the canvas. */

let _isLoadingState = false;       // guard: don't record while restoring
let _preTransformSnap = null;      // snapshot taken before drag/scale/rotate

function _snapshotSvgSources() {
  // Capture current svgSource per _originalId for undo restore.
  // Only stores entries that exist — typically a few KB instead of hundreds of MB.
  const snap = {};
  svgSourceStore.forEach((val, key) => { snap[key] = val; });
  // Also capture any per-object overrides (recolored copies)
  canvas.getObjects().forEach(o => {
    if(o._svgSource && o._originalId) snap[o._originalId] = o._svgSource;
  });
  return snap;
}

function _restoreSvgSources(snap) {
  if(!snap) return;
  Object.entries(snap).forEach(([key, val]) => svgSourceStore.set(key, val));
  // Re-attach to objects that need it
  canvas.getObjects().forEach(o => {
    if(o._originalId && snap[o._originalId]) o._svgSource = snap[o._originalId];
  });
}

function pushUndo() {
  if(_isLoadingState) return;
  const json = JSON.stringify(canvas.toJSON(FABRIC_UNDO_PROPS));
  const svgSnap = _snapshotSvgSources();
  undoRedoStack.undo.push({ json, svgSnap });
  if(undoRedoStack.undo.length > undoRedoStack.maxStates) undoRedoStack.undo.shift();
  undoRedoStack.redo = [];          // new action kills redo branch
  undoRedoStack._statsDirty = true;
  updateUndoRedoButtons();
}

function undo() {
  if(undoRedoStack.undo.length === 0) return;
  const currentJson = JSON.stringify(canvas.toJSON(FABRIC_UNDO_PROPS));
  const currentSvg = _snapshotSvgSources();
  const prev = undoRedoStack.undo.pop();
  undoRedoStack.redo.push({ json: currentJson, svgSnap: currentSvg });
  loadCanvasState(prev.json, prev.svgSnap);
  updateUndoRedoButtons();
}

function redo() {
  if(undoRedoStack.redo.length === 0) return;
  const currentJson = JSON.stringify(canvas.toJSON(FABRIC_UNDO_PROPS));
  const currentSvg = _snapshotSvgSources();
  const next = undoRedoStack.redo.pop();
  undoRedoStack.undo.push({ json: currentJson, svgSnap: currentSvg });
  loadCanvasState(next.json, next.svgSnap);
  updateUndoRedoButtons();
}

function loadCanvasState(jsonStr, svgSnap) {
  _isLoadingState = true;
  invalidateAllThumbs();
  canvas.loadFromJSON(jsonStr, () => {
    // Re-attach SVG sources from snapshot
    if(svgSnap) _restoreSvgSources(svgSnap);
    canvas.getObjects().forEach(o => attachObjListeners(o));
    canvas.renderAll();
    _isLoadingState = false;
    renderItemList();
    renderSelectedPanel();
    updateInfoBar();
    undoRedoStack._statsDirty = true;
  });
}

function updateUndoRedoButtons() {
  const undoBtn = document.getElementById('undoBtn');
  const redoBtn = document.getElementById('redoBtn');
  if(undoBtn) undoBtn.disabled = undoRedoStack.undo.length === 0;
  if(redoBtn) redoBtn.disabled = undoRedoStack.redo.length === 0;
}

const { jsPDF } = window.jspdf;

/* =========================================================
   CANVAS
   ========================================================= */
const canvas = new fabric.Canvas('canvas', {
  backgroundColor: null,
  preserveObjectStacking: true,
  selection: true,
});

// Props serialized with canvas.toJSON — used by undo, clone, and export.
// NOTE: _svgSource is EXCLUDED from undo serialization (FABRIC_UNDO_PROPS) to save
// ~100s of MB. It's stored in svgSourceStore keyed by _originalId and re-attached
// after undo/redo restore. Full list (FABRIC_EXTRA_PROPS) is used for export/clone.
const FABRIC_EXTRA_PROPS = [
  '_id','_originalId','_name','_naturalW','_naturalH',
  '_mmW','_mmH','_mmLeft','_mmTop','_isFillTile','_svgSource',
  '_embeddedRasterW','_embeddedRasterH','_vectorOrigin','_recolored','_hasGradients',
  '_pdfPageW','_pdfPageH','_rasterEdited','_hasAppliedOutline'
];
const FABRIC_UNDO_PROPS = FABRIC_EXTRA_PROPS.filter(p => p !== '_svgSource');

/* Capture state BEFORE any interactive transform starts.
   The snapshot is pushed to the undo stack when 'modified' fires. */
let _preTransformSvgSnap = null;
canvas.on('before:transform', () => {
  if(!_isLoadingState){
    _preTransformSnap = JSON.stringify(canvas.toJSON(FABRIC_UNDO_PROPS));
    _preTransformSvgSnap = _snapshotSvgSources();
  }
});

/* ── Adaptieve object-caching ──────────────────────────────────────
   Vectorgroepen staan standaard op objectCaching=false voor maximale
   scherpte. Met veel logo's op het vel (grote gang sheets, "vel vullen")
   moet Fabric dan ELKE frame alle paths opnieuw tekenen → traag.
   Boven de drempel schakelen we caching in (bitmap per object), eronder
   weer uit. Debounced zodat bulk-uploads maar één pass kosten. */
const CACHE_GROUP_THRESHOLD = 40;
let _cacheStratTimer = null;
function _updateCachingStrategy(){
  const groups = canvas.getObjects().filter(o => o._mmW && o.type === 'group');
  const useCache = groups.length > CACHE_GROUP_THRESHOLD;
  let changed = false;
  groups.forEach(o => {
    if(o.objectCaching !== useCache){
      o.objectCaching = useCache;
      o.dirty = true;
      changed = true;
    }
  });
  if(changed) canvas.requestRenderAll();
}
function _updateCachingStrategySoon(){
  clearTimeout(_cacheStratTimer);
  _cacheStratTimer = setTimeout(_updateCachingStrategy, 250);
}
canvas.on('object:removed', _updateCachingStrategySoon);

function attachObjListeners(o){
  _updateCachingStrategySoon();
  o.on('modified', ()=>{
    if(!state.manualMode){ clampObjToSheet(o); preventOverlap(o); }
    syncMmFromPx(o);
    // Push the PRE-transform snapshot (state before drag/scale/rotate)
    if(_preTransformSnap && !_isLoadingState){
      undoRedoStack.undo.push({ json: _preTransformSnap, svgSnap: _preTransformSvgSnap });
      if(undoRedoStack.undo.length > undoRedoStack.maxStates) undoRedoStack.undo.shift();
      undoRedoStack.redo = [];
      undoRedoStack._statsDirty = true;
      _preTransformSnap = null;
      _preTransformSvgSnap = null;
      updateUndoRedoButtons();
    }
  });
  o.on('moving', ()=>{
    if(!state.manualMode){ clampObjToSheet(o); preventOverlap(o); }
    syncMmFromPx(o);
    drawAlignmentGuides(o);
  });
  o.on('scaling',  ()=>{ if(!state.manualMode) clampObjToSheet(o); syncMmFromPx(o); });
  o.on('rotating', ()=>{
    if(!state.manualMode){
      // Snap to nearest 90° (0° or 90° only — never 180°/270° to prevent upside-down)
      const raw = ((o.angle % 360) + 360) % 360;
      const snapped = raw < 45 || raw >= 315 ? 0 : (raw < 135 ? 90 : (raw < 225 ? 0 : 90));
      if(Math.abs(o.angle - snapped) > 0.1) o.rotate(snapped);
      clampObjToSheet(o);
    }
    syncMmFromPx(o);
  });
  o.set({
    cornerColor:'#1d9aaf', cornerStrokeColor:'#1d9aaf', borderColor:'#1d9aaf',
    cornerSize:10, transparentCorners:false, hasRotatingPoint:true,
    lockUniScaling: true, // always lock aspect ratio
  });
  // Hide side/edge scaling handles — only corners allowed (proportional)
  o.setControlsVisibility({ mt:false, mb:false, ml:false, mr:false });
}

/* =========================================================
   SMART ALIGNMENT GUIDES
   ========================================================= */
const guideCtx = document.createElement('canvas').getContext('2d');
let guideLines = { h: [], v: [] };

function drawAlignmentGuides(movingObj) {
  if(!movingObj) return;
  guideLines = { h: [], v: [] };

  const snapThreshold = 3 * displayPxPerMm; // 3mm in pixels
  const movingRect = movingObj.getBoundingRect(true, true);

  canvas.getObjects().forEach(o => {
    if(o === movingObj || !o._mmW) return;
    const otherRect = o.getBoundingRect(true, true);

    // Check horizontal alignment (left, center, right edges)
    if(Math.abs(movingRect.left - otherRect.left) < snapThreshold)
      guideLines.v.push(movingRect.left);
    if(Math.abs((movingRect.left + movingRect.width/2) - (otherRect.left + otherRect.width/2)) < snapThreshold)
      guideLines.v.push(movingRect.left + movingRect.width/2);
    if(Math.abs((movingRect.left + movingRect.width) - (otherRect.left + otherRect.width)) < snapThreshold)
      guideLines.v.push(movingRect.left + movingRect.width);

    // Check vertical alignment (top, center, bottom edges)
    if(Math.abs(movingRect.top - otherRect.top) < snapThreshold)
      guideLines.h.push(movingRect.top);
    if(Math.abs((movingRect.top + movingRect.height/2) - (otherRect.top + otherRect.height/2)) < snapThreshold)
      guideLines.h.push(movingRect.top + movingRect.height/2);
    if(Math.abs((movingRect.top + movingRect.height) - (otherRect.top + otherRect.height)) < snapThreshold)
      guideLines.h.push(movingRect.top + movingRect.height);
  });

  canvas.requestRenderAll();
}

canvas.on('after:render', () => {
  if(!guideLines.h.length && !guideLines.v.length) return;

  const ctx = canvas.contextContainer;
  ctx.save();
  ctx.strokeStyle = '#1d9aaf';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);

  // Draw vertical guides
  guideLines.v.forEach(x => {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  });

  // Draw horizontal guides
  guideLines.h.forEach(y => {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  });

  ctx.restore();
});

canvas.on('mouse:up', () => {
  guideLines = { h: [], v: [] };
});

// Keep an object's axis-aligned bounding rect inside the sheet (the canvas).
// Works for rotated, scaled, and centered-origin objects.
function clampObjToSheet(obj){
  if(!obj || !obj.setCoords) return;
  obj.setCoords();
  const br = obj.getBoundingRect(true, true);
  const cw = canvas.getWidth(), ch = canvas.getHeight();
  let dx = 0, dy = 0;
  if(br.width <= cw){
    if(br.left < 0) dx = -br.left;
    else if(br.left + br.width > cw) dx = cw - (br.left + br.width);
  } else {
    // Logo wider than sheet: snap left edge to 0.
    dx = -br.left;
  }
  if(br.height <= ch){
    if(br.top < 0) dy = -br.top;
    else if(br.top + br.height > ch) dy = ch - (br.top + br.height);
  } else {
    dy = -br.top;
  }
  if(dx || dy){
    obj.left += dx;
    obj.top  += dy;
    obj.setCoords();
  }
}

/* Prevent overlap: push a moving object away from others, respecting gap.
   Uses axis-aligned bounding rects for speed. Finds the smallest push
   direction (left, right, up, down) to resolve each collision. */
function preventOverlap(moving){
  if(state.manualMode) return;
  if(!moving || !moving.setCoords) return;
  const gapPx = (state.gapMm || 0) * displayPxPerMm;
  const objs = canvas.getObjects();

  // Multiple passes to resolve cascade overlaps (max 5)
  for(let pass = 0; pass < 5; pass++){
    let anyPushed = false;
    moving.setCoords();
    const mr = moving.getBoundingRect(true, true);

    for(const other of objs){
      if(other === moving || !other._mmW) continue;
      if(moving.type === 'activeSelection' && moving._objects?.includes(other)) continue;
      other.setCoords();
      const or = other.getBoundingRect(true, true);

      const overlapX = (mr.left < or.left + or.width + gapPx) && (mr.left + mr.width + gapPx > or.left);
      const overlapY = (mr.top < or.top + or.height + gapPx) && (mr.top + mr.height + gapPx > or.top);

      if(overlapX && overlapY){
        const pushRight = (or.left + or.width + gapPx) - mr.left;
        const pushLeft  = mr.left + mr.width + gapPx - or.left;
        const pushDown  = (or.top + or.height + gapPx) - mr.top;
        const pushUp    = mr.top + mr.height + gapPx - or.top;

        const min = Math.min(pushRight, pushLeft, pushDown, pushUp);
        if(min === pushRight)     moving.left += pushRight;
        else if(min === pushLeft) moving.left -= pushLeft;
        else if(min === pushDown) moving.top  += pushDown;
        else                      moving.top  -= pushUp;

        moving.setCoords();
        clampObjToSheet(moving);
        anyPushed = true;
        // Re-get mr for next iteration within this pass
        break; // restart inner loop with updated position
      }
    }
    if(!anyPushed) break;
  }
}

function resizeSheet(){
  const wrap = document.getElementById('canvasWrap');
  const isDTF = SHEET_FORMATS[state.sheetFormat]?.isDTF;
  // DTF: fit to width only (canvas scrolls vertically)
  // Fixed sheets (A3/A4/A5): fit both width and height
  const rulerSpace = isDTF ? 100 : 20;
  const maxW = wrap.clientWidth - rulerSpace;
  const maxH = wrap.clientHeight - 40;
  const sheetMmW = state.sheet.w, sheetMmH = state.sheet.h;
  const basePxW = sheetMmW * 3;
  const basePxH = sheetMmH * 3;
  let fitScale;
  if(isDTF){
    fitScale = Math.min(maxW/basePxW, 1);
  } else {
    fitScale = Math.min(maxW/basePxW, maxH/basePxH, 1);
  }
  let scale = fitScale * state.zoom;
  // Browser-limiet: een canvas mag max ~32k px per dimensie zijn (en grote
  // canvassen kosten pxW×pxH×4 bytes). Bij lange DTF-rollen (tot 50 m) cappen
  // we de canvashoogte, anders rendert de browser NIETS meer.
  const MAX_CANVAS_PX = 16000;
  if(basePxH * scale > MAX_CANVAS_PX){
    scale = MAX_CANVAS_PX / basePxH;
  }
  const pxW = Math.round(sheetMmW * 3 * scale);
  const pxH = Math.round(sheetMmH * 3 * scale);
  displayPxPerMm = pxW / sheetMmW;
  window._displayPxPerMm = displayPxPerMm;

/* ── Thema (licht = standaard, donker per account) ── */
function gsbApplyTheme(theme){
  const th = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', th);
  try{ localStorage.setItem('gsb-theme', th); }catch(_){ }
}
window.gsbApplyTheme = gsbApplyTheme;
function gsbToggleTheme(){
  const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = cur === 'dark' ? 'light' : 'dark';
  gsbApplyTheme(next);
  _syncThemeIcon();
  // In het account vastzetten (indien ingelogd)
  try{ if(window.gsAuth && gsAuth.user && gsAuth.updateProfile) gsAuth.updateProfile({ theme: next }); }catch(_){ }
}
window.gsbToggleTheme = gsbToggleTheme;
function _syncThemeIcon(){
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const m = document.getElementById('themeIconMoon'), s = document.getElementById('themeIconSun');
  if(m) m.style.display = dark ? 'none' : '';
  if(s) s.style.display = dark ? '' : 'none';
}
setTimeout(_syncThemeIcon, 0);
try{
  if(window.gsAuth && typeof gsAuth.onReady === 'function'){
    gsAuth.onReady(() => { if(gsAuth.profile && gsAuth.profile.theme) gsbApplyTheme(gsAuth.profile.theme); });
  }
}catch(_){ }
  canvas.setWidth(pxW);
  canvas.setHeight(pxH);
  const shadow = document.getElementById('sheetShadow');
  shadow.style.width = pxW+'px';
  shadow.style.height = pxH+'px';
  canvas.getObjects().forEach(o=>{
    if(o._mmW && o._mmH){
      // _mmW/_mmH are ALWAYS LOGICAL (unrotated) dimensions.
      // Scales always map logical dims to fabric dims — NO swap for rotation.
      // Fabric's rotation transform handles the visual swap automatically.
      o.scaleX = (o._mmW * displayPxPerMm) / o.width;
      o.scaleY = (o._mmH * displayPxPerMm) / o.height;
      o.setCoords();
      // Position via bounding-rect offset — works for any origin and any angle.
      const br = o.getBoundingRect(true, true);
      const targetLeft = o._mmLeft * displayPxPerMm;
      const targetTop  = o._mmTop  * displayPxPerMm;
      o.left += targetLeft - br.left;
      o.top  += targetTop  - br.top;
      o.setCoords();
    }
  });
  canvas.requestRenderAll();
  updateInfoBar();
  // Toon de EFFECTIEVE zoom (kan lager zijn dan state.zoom door de canvas-cap)
  const effZoom = fitScale > 0 ? (scale / fitScale) : state.zoom;
  document.getElementById('zoomVal').textContent = Math.round(effZoom * 100) + '%';
  renderRuler();
  renderHRuler();
}

/* =========================================================
   VERTICAL RULER (left of canvas)
   ========================================================= */
function renderRuler(){
  const ruler = document.getElementById('canvasRuler');
  if(!ruler) return;
  const pxH = canvas.getHeight();
  const pxPerMm = displayPxPerMm;
  ruler.style.height = pxH + 'px';
  ruler.innerHTML = '';

  const totalMm = state.sheet.h;
  // Adaptieve tick-dichtheid: bij lange rollen (tot 50 m) geen 5000 DOM-nodes
  // per zoom/resize bouwen. Max ~600 ticks; labels schalen mee.
  let cmStep = 10;                       // 1cm ticks (standaard)
  if(totalMm > 30000) cmStep = 100;      // >30m: alleen 10cm ticks
  else if(totalMm > 12000) cmStep = 50;  // >12m: 5cm ticks
  else if(totalMm > 6000) cmStep = 20;   // >6m: 2cm ticks
  const labelStep = cmStep <= 10 ? 100 : (cmStep <= 50 ? 500 : 1000); // mm tussen labels

  const frag = document.createDocumentFragment();
  for(let mm = 0; mm <= totalMm; mm += cmStep){
    const y = mm * pxPerMm;
    const cm = mm / 10;
    const isMeter = mm % 1000 === 0;
    const isLabel = mm % labelStep === 0;
    const isHalf = mm % (labelStep / 2) === 0;

    const tick = document.createElement('div');
    tick.className = 'ruler-tick';
    tick.style.top = y + 'px';

    if(isMeter){
      tick.classList.add('ruler-meter');
      tick.style.width = '100%';
      if(mm > 0){
        const label = document.createElement('span');
        label.className = 'ruler-label ruler-label-meter';
        label.textContent = (mm/1000) + 'm';
        tick.appendChild(label);
      }
    } else if(isLabel){
      tick.style.width = '60%';
      const label = document.createElement('span');
      label.className = 'ruler-label';
      label.textContent = cm;
      tick.appendChild(label);
    } else if(isHalf){
      tick.style.width = '45%';
    } else {
      tick.style.width = '25%';
    }
    frag.appendChild(tick);
  }
  ruler.appendChild(frag);
}

/* =========================================================
   HORIZONTAL RULER (above canvas)
   ========================================================= */
function renderHRuler(){
  const hruler = document.getElementById('canvasHRuler');
  if(!hruler) return;
  const pxW = canvas.getWidth();
  const pxPerMm = displayPxPerMm;
  hruler.style.width = pxW + 'px';
  hruler.innerHTML = '';

  const totalMm = state.sheet.w; // 550mm = 55cm
  const cmStep = 10; // 1cm = 10mm

  for(let mm = 0; mm <= totalMm; mm += cmStep){
    const x = mm * pxPerMm;
    const cm = mm / 10;
    const is10cm = mm % 100 === 0;
    const is5cm = mm % 50 === 0;

    const tick = document.createElement('div');
    tick.className = 'hruler-tick';
    tick.style.left = x + 'px';

    if(is10cm){
      tick.style.height = '100%';
      if(mm > 0 && mm < totalMm){
        const label = document.createElement('span');
        label.className = 'hruler-label';
        label.textContent = cm;
        tick.appendChild(label);
      }
    } else if(is5cm){
      tick.style.height = '55%';
    } else {
      tick.style.height = '30%';
    }
    hruler.appendChild(tick);
  }
}

/* =========================================================
   ROLL LENGTH INPUT
   ========================================================= */
// Returns the lowest Y (mm) that would clear all placed logos + gap.
function getContentBottomMm(){
  let maxY = 0;
  canvas.getObjects().forEach(o=>{
    if(o._mmTop != null && o._mmH != null){
      maxY = Math.max(maxY, o._mmTop + visMmH(o));
    }
  });
  return maxY;
}

function updateRollLength(lengthM){
  lengthM = Math.round(Math.max(MIN_LENGTH_MM/1000, Math.min(MAX_LENGTH_MM/1000, parseFloat(lengthM) || DEFAULT_LENGTH_MM/1000)));

  // Block shrinking below content extent
  const contentMm = getContentBottomMm();
  const contentM = Math.ceil(contentMm / 1000); // round up to nearest whole meter
  if(lengthM < contentM){
    toast(t('rollTooShort'), 'warn', 4000);
    const inp = document.getElementById('rollLengthInput');
    if(inp) inp.value = state.rollLengthM;
    return;
  }

  state.rollLengthM = lengthM;
  state.sheet.h = lengthM * 1000;
  resizeSheet();
  const inp = document.getElementById('rollLengthInput');
  if(inp) inp.value = state.rollLengthM;
  updateInfoBar();
  updateSummary();
}

// Auto-extend the canvas when logos are placed beyond the current length.
// Called after every logo placement / move / duplicate / fill.
function autoExtendIfNeeded(){
  if(!SHEET_FORMATS[state.sheetFormat]?.isDTF) return; // fixed sheets don't auto-extend
  const contentMm = getContentBottomMm();
  const marginMm = state.gapMm || 5;
  const neededMm = contentMm + marginMm;
  if(neededMm > state.sheet.h && neededMm <= MAX_LENGTH_MM){
    // Extend in 1m increments (round up to nearest 1000mm)
    const newH = Math.min(MAX_LENGTH_MM, Math.ceil(neededMm / 1000) * 1000);
    state.sheet.h = newH;
    state.rollLengthM = newH / 1000;
    resizeSheet();
    const inp = document.getElementById('rollLengthInput');
    if(inp) inp.value = state.rollLengthM;
    updateInfoBar();
    updateSummary();
  }
}

function switchSheetFormat(key){
  const fmt = SHEET_FORMATS[key];
  if(!fmt) return;
  // Warn if logos won't fit on the new format
  const contentBottom = getContentBottomMm();
  const contentRight = getContentRightMm();
  if(canvas.getObjects().some(o => o._mmW)){
    if(contentRight > fmt.w || (!fmt.isDTF && contentBottom > fmt.h)){
      toast(t('formatTooSmall'), 'warn', 4000);
      return;
    }
  }
  state.sheetFormat = key;
  state.sheet.w = fmt.w;
  if(fmt.isDTF){
    // Preserve current roll length or reset to 1m
    const neededH = Math.max(DEFAULT_LENGTH_MM, Math.ceil(contentBottom / 1000) * 1000);
    state.sheet.h = neededH;
    state.rollLengthM = neededH / 1000;
  } else {
    state.sheet.h = fmt.h;
    state.rollLengthM = fmt.h / 1000;
  }
  renderSheetFormatPicker();
  resizeSheet();
  toggleRulerVisibility();
  repackAll();
}

function getContentRightMm(){
  let maxX = 0;
  canvas.getObjects().forEach(o=>{
    if(o._mmLeft != null && o._mmW != null){
      maxX = Math.max(maxX, o._mmLeft + visMmW(o));
    }
  });
  return maxX;
}

function toggleRulerVisibility(){
  // Rulers are always visible for all formats
}

function renderSheetFormatPicker(){
  const container = document.getElementById('sizeGrid');
  container.innerHTML = '';

  // Format buttons 2×2 grid with dimensions
  Object.keys(SHEET_FORMATS).forEach(key=>{
    const fmt = SHEET_FORMATS[key];
    // Role-gated formats: only show to users with matching role
    if(fmt.roles){
      const userRole = window.gsAuth?.profile?.role || 'user';
      if(!fmt.roles.includes(userRole)) return;
    }
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'format-btn' + (state.sheetFormat === key ? ' active' : '');
    const dimW = state.unit === 'cm' ? `${(fmt.w/10).toFixed(1)}` : `${fmt.w}`;
    const dimH = state.unit === 'cm' ? `${(fmt.h/10).toFixed(1)}` : `${fmt.h}`;
    const unit = state.unit === 'cm' ? 'cm' : 'mm';
    const sizeText = fmt.isDTF ? `${dimW} ${unit} ${t('width').toLowerCase()}` : `${dimW} × ${dimH} ${unit}`;
    btn.innerHTML = `<span class="fmt-title">${fmt.label}</span><span class="fmt-size">${sizeText}</span>`;
    btn.onclick = ()=> switchSheetFormat(key);
    container.appendChild(btn);
  });

  // DTF-specific: length stepper BELOW all format buttons (full width)
  const isDTF = SHEET_FORMATS[state.sheetFormat]?.isDTF;
  // Remove old length stepper if present
  const oldLength = container.parentElement.querySelector('.dtf-length-stepper');
  if(oldLength) oldLength.remove();

  if(isDTF){
    const lengthDiv = document.createElement('div');
    lengthDiv.className = 'dtf-length-stepper';
    lengthDiv.style.cssText = 'margin-top:10px';
    lengthDiv.innerHTML = `
      <label style="font-size:.8rem;color:var(--muted);font-weight:500;display:block;margin-bottom:6px">${t('rollLength')}</label>
      <div class="gap-stepper-wrap">
        <button type="button" class="gap-step-btn" id="lengthDec">−</button>
        <input type="number" id="rollLengthInput" min="${MIN_LENGTH_MM/1000}" max="${MAX_LENGTH_MM/1000}" step="1" value="${state.rollLengthM}" readonly>
        <span class="gap-unit">${t('lengthUnit')}</span>
        <button type="button" class="gap-step-btn" id="lengthInc">+</button>
      </div>
    `;
    // Insert after the sizeGrid container (not inside it)
    container.parentElement.insertBefore(lengthDiv, container.nextSibling);

    lengthDiv.querySelector('#lengthDec').onclick = ()=> updateRollLength(state.rollLengthM - 1);
    lengthDiv.querySelector('#lengthInc').onclick = ()=> updateRollLength(state.rollLengthM + 1);
    lengthDiv.querySelector('#rollLengthInput').onchange = e=> updateRollLength(Math.round(parseFloat(e.target.value) || 1));
  }
}

function fmtSize(mmW, mmH){
  if(state.unit==='mm') return `${mmW} × ${mmH} mm`;
  return `${(mmW/10).toFixed(1)} × ${(mmH/10).toFixed(1)} cm`;
}

function fmtRollSize(){
  const w = state.sheet.w;
  const h = state.sheet.h;
  if(state.unit==='mm') return `${w} × ${h} mm`;
  return `${(w/10).toFixed(1)} × ${(h/10).toFixed(1)} cm`;
}

function updateInfoBar(){
  document.getElementById('infoSize').textContent = fmtRollSize();
  const totalArea = state.sheet.w * state.sheet.h;
  let used = 0;
  let logoCount = 0;
  const uniqueIds = new Set();
  canvas.getObjects().forEach(o=>{ if(o._mmW){ used += o._mmW * o._mmH; logoCount++; uniqueIds.add(o._originalId); } });
  const pct = Math.min(100, Math.round((used/totalArea)*100));
  document.getElementById('infoUsedVal').textContent = pct+'%';
  document.getElementById('infoLogoCount').textContent = logoCount;
  document.getElementById('fillMeter').style.width = pct+'%';
  // Optimize button only active with 2+ unique logos on the sheet
  const optBtn = document.getElementById('optimizeBtn');
  if(optBtn) optBtn.disabled = uniqueIds.size < 2;
  // Clear button only active with 1+ logo on the sheet
  document.getElementById('clearBtn').disabled = logoCount < 1;
  // Update fill button (may enable when single unique logo exists)
  if(typeof updateFillBtn === 'function') updateFillBtn();
  updateSummary();
}

document.getElementById('unitToggle').addEventListener('click', e=>{
  if(e.target.tagName!=='BUTTON') return;
  const u = e.target.dataset.unit;
  state.unit = u;
  [...e.currentTarget.children].forEach(b=>b.classList.toggle('active', b.dataset.unit===u));
  renderSheetFormatPicker();
  updateInfoBar();
  renderSelectedPanel();
  renderItemList();
  syncGapUI();
});

/* =========================================================
   UPLOAD
   ========================================================= */
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
uploadArea.addEventListener('click', ()=>fileInput.click());
['dragover','dragenter'].forEach(ev=>uploadArea.addEventListener(ev, e=>{
  e.preventDefault(); uploadArea.classList.add('drag');
}));
['dragleave','drop'].forEach(ev=>uploadArea.addEventListener(ev, e=>{
  e.preventDefault(); uploadArea.classList.remove('drag');
}));
uploadArea.addEventListener('drop', e=>{ e.preventDefault(); handleFiles(e.dataTransfer.files); });
fileInput.addEventListener('change', e=>{
  handleFiles(e.target.files);
  // Reset value so picking the same file again still fires 'change'
  e.target.value = '';
});

// Allow drag-and-drop directly onto the canvas area (invisible drop zone)
const canvasWrap = document.getElementById('canvasWrap');
['dragover','dragenter'].forEach(ev=>canvasWrap.addEventListener(ev, e=>{
  e.preventDefault(); e.dataTransfer.dropEffect = 'copy';
}));
canvasWrap.addEventListener('drop', e=>{
  e.preventDefault(); handleFiles(e.dataTransfer.files);
});

/* ---------------------------------------------------------
   DPI extraction from raster image binary data.
   Reads pHYs chunk (PNG) or JFIF/APP0 header (JPEG).
   Returns DPI as integer, or null if not found.
   --------------------------------------------------------- */
function extractDpiFromArrayBuffer(buf, mimeType){
  try {
    const view = new DataView(buf);
    // PNG: look for pHYs chunk
    if(mimeType === 'image/png' && buf.byteLength > 24){
      let offset = 8; // skip PNG signature
      while(offset < buf.byteLength - 12){
        const chunkLen = view.getUint32(offset);
        const c0 = view.getUint8(offset+4), c1 = view.getUint8(offset+5);
        const c2 = view.getUint8(offset+6), c3 = view.getUint8(offset+7);
        const chunkType = String.fromCharCode(c0, c1, c2, c3);
        if(chunkType === 'pHYs' && chunkLen === 9){
          const ppmX = view.getUint32(offset + 8);
          const unit = view.getUint8(offset + 16);
          if(unit === 1 && ppmX > 0) return Math.round(ppmX / 39.3701);
          return null;
        }
        if(chunkType === 'IDAT' || chunkType === 'IEND') break;
        offset += 12 + chunkLen;
      }
      return null;
    }
    // JPEG: look for JFIF APP0 marker
    if(mimeType === 'image/jpeg' && buf.byteLength > 20){
      if(view.getUint16(0) !== 0xFFD8) return null;
      let offset = 2;
      while(offset < Math.min(buf.byteLength - 2, 65536)){
        const marker = view.getUint16(offset);
        if(marker === 0xFFE0){ // APP0 - JFIF
          const id = String.fromCharCode(view.getUint8(offset+4), view.getUint8(offset+5),
            view.getUint8(offset+6), view.getUint8(offset+7));
          if(id === 'JFIF'){
            const units = view.getUint8(offset + 11);
            const xDensity = view.getUint16(offset + 12);
            if(units === 1 && xDensity > 0) return xDensity; // DPI
            if(units === 2 && xDensity > 0) return Math.round(xDensity * 2.54); // dots/cm → DPI
            return null;
          }
        }
        if(marker === 0xFFDA) break; // start of scan
        if((marker & 0xFF00) === 0xFF00){
          const segLen = view.getUint16(offset + 2);
          offset += 2 + segLen;
        } else { break; }
      }
      return null;
    }
  } catch(e){ /* ignore parse errors */ }
  return null;
}

/* ── EPS: extract embedded PDF stream ──
   Modern EPS files (from Illustrator, CorelDRAW, etc.) often contain a full
   PDF representation between %%BeginDocument / %%EndDocument or simply
   contain the %PDF- marker followed by valid PDF data. This function scans
   the raw bytes for the PDF signature and extracts the PDF portion. */
function _extractPdfFromEps(arrayBuf){
  const bytes = new Uint8Array(arrayBuf);
  // Look for %PDF- signature (hex: 25 50 44 46 2D)
  let pdfStart = -1;
  for(let i = 0; i < bytes.length - 5; i++){
    if(bytes[i]===0x25 && bytes[i+1]===0x50 && bytes[i+2]===0x44 &&
       bytes[i+3]===0x46 && bytes[i+4]===0x2D){
      pdfStart = i;
      break;
    }
  }
  if(pdfStart < 0) return null;
  // Look for %%EOF (the PDF end marker) searching backwards from end
  let pdfEnd = -1;
  for(let i = bytes.length - 6; i >= pdfStart; i--){
    if(bytes[i]===0x25 && bytes[i+1]===0x25 && bytes[i+2]===0x45 &&
       bytes[i+3]===0x4F && bytes[i+4]===0x46){
      pdfEnd = i + 5;
      // Include trailing whitespace/newline after %%EOF
      while(pdfEnd < bytes.length && (bytes[pdfEnd]===0x0A || bytes[pdfEnd]===0x0D)) pdfEnd++;
      break;
    }
  }
  if(pdfEnd < 0) pdfEnd = bytes.length;
  if(pdfEnd - pdfStart < 100) return null; // too small to be valid
  console.log(`[GSB] EPS: extracted embedded PDF (${pdfStart}..${pdfEnd}, ${pdfEnd - pdfStart} bytes)`);
  return arrayBuf.slice(pdfStart, pdfEnd);
}

/* ── EPS: client-side conversion via Ghostscript WASM (Web Worker) ──
   Called when _extractPdfFromEps returns null (no embedded PDF found).
   Loads @jspawn/ghostscript-wasm (~16 MB, cached by browser) inside a
   Web Worker so the UI stays responsive. Returns a PDF ArrayBuffer.
   No server, no auth, no upload — runs entirely in the browser. */
let _epsWorker = null;
let _epsConvertId = 0;

function _convertEpsClient(arrayBuf){
  return new Promise(function(resolve, reject){
    // Lazy-create the worker
    if(!_epsWorker){
      try{
        _epsWorker = new Worker('eps-worker.js');
      }catch(e){
        reject(new Error('Web Worker kon niet gestart worden: '+e.message));
        return;
      }
    }
    const id = ++_epsConvertId;
    function handler(e){
      if(e.data.id !== id) return;
      if(e.data.type === 'status'){
        // Silently ignore worker status — main thread shows its own toast
        return;
      }
      _epsWorker.removeEventListener('message', handler);
      _epsWorker.removeEventListener('error', errHandler);
      if(e.data.type === 'error'){
        reject(new Error(e.data.msg));
      } else {
        resolve(e.data.pdf);  // ArrayBuffer
      }
    }
    function errHandler(e){
      _epsWorker.removeEventListener('message', handler);
      _epsWorker.removeEventListener('error', errHandler);
      reject(new Error('Worker fout: '+(e.message||'onbekend')));
    }
    _epsWorker.addEventListener('message', handler);
    _epsWorker.addEventListener('error', errHandler);
    // Transfer the buffer to the worker (zero-copy)
    _epsWorker.postMessage({ id:id, epsData:arrayBuf }, [arrayBuf]);
  });
}

function handleFiles(files){
  const fileArr = [...files];
  // Enable bulk mode for large uploads (>10 files)
  if(fileArr.length > 10){
    _bulkMode = true;
    _bulkCount = 0;
    showLogoLoading(`0 / ${fileArr.length} bestanden laden…`);
    let loaded = 0;
    const origHide = window._origHideLogoLoading || hideLogoLoading;
    if(!window._origHideLogoLoading) window._origHideLogoLoading = hideLogoLoading;
    // Override hideLogoLoading temporarily to track progress
    window.hideLogoLoading = hideLogoLoading = function(){
      loaded++;
      if(loaded < fileArr.length){
        showLogoLoading(`${loaded} / ${fileArr.length} bestanden laden…`);
      } else {
        window.hideLogoLoading = hideLogoLoading = origHide;
        origHide();
        _finishBulk();
        toast(`${loaded} bestanden toegevoegd`, 'success');
      }
    };
  }
  fileArr.forEach(file=>{
    const type = file.type;
    const ext = file.name.split('.').pop().toLowerCase();
    if(type==='image/svg+xml' || ext==='svg'){
      const reader = new FileReader();
      reader.onload = ev=>{
        showLogoLoading(`"${file.name}" laden…`);
        loadSvg(ev.target.result, file.name);
      };
      reader.readAsText(file);
    } else if(ext==='ai'){
      // AI files: try SVG first (some are SVG), then try PDF rendering.
      const reader = new FileReader();
      reader.onload = ev=>{
        showLogoLoading(`"${file.name}" laden…`);
        const text = ev.target.result;
        if(text.indexOf('<svg') !== -1){
          loadSvg(text, file.name);
        } else {
          // Re-read as ArrayBuffer for pdf.js
          const reader2 = new FileReader();
          reader2.onload = ev2=>loadPdfAsImage(ev2.target.result, file.name);
          reader2.readAsArrayBuffer(file);
        }
      };
      reader.readAsText(file);
    } else if(ext==='eps'){
      // EPS: try fast embedded-PDF extraction first, then full Ghostscript
      // WASM conversion in a Web Worker for EPS without embedded PDF.
      const reader = new FileReader();
      reader.onload = async ev=>{
        const buf = ev.target.result;
        const pdfBuf = _extractPdfFromEps(buf);
        if(pdfBuf){
          loadPdfAsImage(pdfBuf, file.name);
          return;
        }
        // No embedded PDF — convert client-side via Ghostscript WASM
        showLogoLoading('EPS wordt geconverteerd…');
        try {
          const convertedPdf = await _convertEpsClient(buf);
          hideLogoLoading();
          loadPdfAsImage(convertedPdf, file.name);
        } catch(err){
          hideLogoLoading();
          console.error('[GSB] EPS WASM conversion error:', err);
          toast('EPS conversie mislukt: ' + (err.message||'onbekende fout') + '. Probeer het bestand als PDF of AI op te slaan.', 'warn', 8000);
        }
      };
      reader.readAsArrayBuffer(file);
    } else if(type==='application/pdf' || ext==='pdf'){
      const reader = new FileReader();
      reader.onload = ev=>loadPdfAsImage(ev.target.result, file.name);
      reader.readAsArrayBuffer(file);
    } else if(type.startsWith('image/')){
      // Read as ArrayBuffer to extract DPI metadata, then convert to object URL
      const reader = new FileReader();
      reader.onload = ev=>{
        const buf = ev.target.result;
        const dpi = extractDpiFromArrayBuffer(buf, type);
        const blob = new Blob([buf], { type });
        const url = URL.createObjectURL(blob);
        showLogoLoading(`"${file.name}" laden…`);
        loadRaster(url, file.name, dpi);
      };
      reader.readAsArrayBuffer(file);
    } else if(ext==='gsb' || ext==='json'){
      // GSB project file — import
      window.gsbImportProject(file);
    } else {
      toast(`${t('unsupportedFile')}: ${file.name}`, 'error');
    }
  });
}

function loadRaster(dataUrl, name, dpi){
  fabric.Image.fromURL(dataUrl, img=>{
    autoCropRaster(img, (cropped, cw, ch)=>{
      let targetMmW, targetMmH;
      if(dpi && dpi >= 72){
        // Use real-world size from DPI metadata
        targetMmW = (cw / dpi) * 25.4;
        targetMmH = (ch / dpi) * 25.4;
        // Clamp to 90% of sheet width if too large
        if(targetMmW > state.sheet.w * 0.9){
          const scale = (state.sheet.w * 0.9) / targetMmW;
          targetMmW *= scale;
          targetMmH *= scale;
        }
        console.log(`[GSB] "${name}": DPI=${dpi}, real size=${targetMmW.toFixed(1)}×${targetMmH.toFixed(1)}mm (${cw}×${ch}px)`);
      } else {
        // No DPI info — use 25% of sheet width as fallback
        targetMmW = state.sheet.w * 0.25;
        targetMmH = targetMmW * (ch / cw);
      }
      placeImage(cropped, name, targetMmW, targetMmH, cw, ch);
      hideLogoLoading();
    });
    // Revoke object URL to free memory
    if(dataUrl.startsWith('blob:')) URL.revokeObjectURL(dataUrl);
  }, { crossOrigin:'anonymous' });
}

/* ============================================================
   PDF/AI LOADING
   ============================================================ */

/* ---------------------------------------------------------
   pdfToSvg — convert PDF/AI operator list to SVG paths.
   Used to create editable sub-paths for color extraction and
   recoloring. Gradient shading is NOT extracted (shapes get
   their current flat fill). The original PDF binary is stored
   separately for lossless export via pdf-lib embedPdf.
   --------------------------------------------------------- */
// Max paths before we bail out to raster — keeps import snappy
const PDF_MAX_SVG_PATHS = 200;

async function pdfToSvg(arrayBuffer){
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1 });
  const opList = await page.getOperatorList();
  const OPS = pdfjsLib.OPS;
  const W = viewport.width, H = viewport.height;

  // Color helpers
  function toHex(r,g,b){
    const h=v=>Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,'0');
    return '#'+h(r)+h(g)+h(b);
  }
  function cmykToHex(c,m,y,k){ return toHex(255*(1-c)*(1-k),255*(1-m)*(1-k),255*(1-y)*(1-k)); }
  function grayToHex(g){ const v=Math.round(g*255); return toHex(v,v,v); }
  function rgbArgsToHex(a){
    if(a instanceof Uint8ClampedArray) return toHex(a[0],a[1],a[2]);
    if(a[0]>1||a[1]>1||a[2]>1) return toHex(a[0],a[1],a[2]);
    return toHex(a[0]*255,a[1]*255,a[2]*255);
  }
  function fmtN(n){ return Math.round(n*1000)/1000; }

  // Flags — set when operators are encountered that pdfToSvg can't convert
  let hasGradients = false;
  let hasImages = false;

  // Graphics state
  let fillColor='#000000', strokeColor='#000000';
  let lineWidth=1, lineCap=0, lineJoin=0, miterLimit=10;
  let pathD='';
  const elements=[];
  let pathCount=0;
  const stateStack=[];
  const transformCountStack=[0];

  function pushGState(){
    stateStack.push({fillColor,strokeColor,lineWidth,lineCap,lineJoin,miterLimit});
    transformCountStack.push(0);
  }
  function popGState(){
    if(stateStack.length){
      const s=stateStack.pop();
      fillColor=s.fillColor; strokeColor=s.strokeColor;
      lineWidth=s.lineWidth; lineCap=s.lineCap;
      lineJoin=s.lineJoin; miterLimit=s.miterLimit;
    }
    const n=transformCountStack.pop()||0;
    for(let j=0;j<n;j++) elements.push('</g>');
  }

  let tooManyPaths = false;

  function emitPath(doFill,doStroke,rule){
    if(!pathD.trim()){ pathD=''; return; }
    if(tooManyPaths){ pathD=''; return; } // bail-out: skip remaining paths
    const attrs=[`d="${pathD.trim()}"`];
    if(doFill){
      attrs.push(`fill="${fillColor}"`);
      if(rule==='evenodd') attrs.push(`fill-rule="evenodd"`);
    } else { attrs.push(`fill="none"`); }
    if(doStroke){
      attrs.push(`stroke="${strokeColor}"`);
      attrs.push(`stroke-width="${fmtN(lineWidth)}"`);
      const capMap=['butt','round','square'];
      const joinMap=['miter','round','bevel'];
      if(lineCap) attrs.push(`stroke-linecap="${capMap[lineCap]}"`);
      if(lineJoin) attrs.push(`stroke-linejoin="${joinMap[lineJoin]}"`);
      if(miterLimit!==10) attrs.push(`stroke-miterlimit="${fmtN(miterLimit)}"`);
    }
    elements.push(`<path ${attrs.join(' ')}/>`);
    pathCount++; pathD='';
    if(pathCount >= PDF_MAX_SVG_PATHS){ tooManyPaths = true; }
  }

  let firstFillSeen=false, clipCount=0;
  const textFillColors=[]; // capture fill color at each showText call

  // Expand pdf.js 3.x batched constructPath operator
  // Y-flip helper: converts PDF Y-up to SVG Y-down coordinates
  const yF = (y) => H - y;

  function expandConstructPath(ops,coords){
    let ci=0, d='';
    for(let j=0;j<ops.length;j++){
      const sub=ops[j];
      switch(sub){
        case OPS.moveTo: d+=`M${fmtN(coords[ci])} ${fmtN(yF(coords[ci+1]))} `; ci+=2; break;
        case OPS.lineTo: d+=`L${fmtN(coords[ci])} ${fmtN(yF(coords[ci+1]))} `; ci+=2; break;
        case OPS.curveTo: d+=`C${fmtN(coords[ci])} ${fmtN(yF(coords[ci+1]))} ${fmtN(coords[ci+2])} ${fmtN(yF(coords[ci+3]))} ${fmtN(coords[ci+4])} ${fmtN(yF(coords[ci+5]))} `; ci+=6; break;
        case OPS.curveTo2: d+=`S${fmtN(coords[ci])} ${fmtN(yF(coords[ci+1]))} ${fmtN(coords[ci+2])} ${fmtN(yF(coords[ci+3]))} `; ci+=4; break;
        case OPS.curveTo3: d+=`C${fmtN(coords[ci])} ${fmtN(yF(coords[ci+1]))} ${fmtN(coords[ci+2])} ${fmtN(yF(coords[ci+3]))} ${fmtN(coords[ci+2])} ${fmtN(yF(coords[ci+3]))} `; ci+=4; break;
        case OPS.closePath: d+='Z '; break;
        case OPS.rectangle: {
          const rx=coords[ci],ry=coords[ci+1],rw=coords[ci+2],rh=coords[ci+3];
          d+=`M${fmtN(rx)} ${fmtN(yF(ry))} L${fmtN(rx+rw)} ${fmtN(yF(ry))} L${fmtN(rx+rw)} ${fmtN(yF(ry+rh))} L${fmtN(rx)} ${fmtN(yF(ry+rh))} Z `;
          ci+=4; break;
        }
        default: break;
      }
    }
    return d;
  }

  // Process operator list — bail out early if too many paths
  for(let i=0;i<opList.fnArray.length;i++){
    if(tooManyPaths) break; // early exit: skip remaining operators entirely
    const fn=opList.fnArray[i], args=opList.argsArray[i];
    switch(fn){
      case OPS.save: pushGState(); elements.push('<g>'); break;
      case OPS.restore: popGState(); elements.push('</g>'); break;
      case OPS.transform: {
        const[a,b,c,d,e,f]=args;
        // Convert PDF matrix to SVG coordinates: M_svg = F * M_pdf * F^-1
        // where F = translate(0,H) scale(1,-1)
        const a2=a, b2=-b, c2=-c, d2=d;
        const e2=c*H+e, f2=-d*H+H-f;
        elements.push(`<g transform="matrix(${fmtN(a2)},${fmtN(b2)},${fmtN(c2)},${fmtN(d2)},${fmtN(e2)},${fmtN(f2)})">`);
        if(transformCountStack.length) transformCountStack[transformCountStack.length-1]++;
        break;
      }
      case OPS.constructPath: pathD+=expandConstructPath(args[0],args[1]); break;
      case OPS.moveTo: pathD+=`M${fmtN(args[0])} ${fmtN(yF(args[1]))} `; break;
      case OPS.lineTo: pathD+=`L${fmtN(args[0])} ${fmtN(yF(args[1]))} `; break;
      case OPS.curveTo: pathD+=`C${fmtN(args[0])} ${fmtN(yF(args[1]))} ${fmtN(args[2])} ${fmtN(yF(args[3]))} ${fmtN(args[4])} ${fmtN(yF(args[5]))} `; break;
      case OPS.curveTo2: pathD+=`S${fmtN(args[0])} ${fmtN(yF(args[1]))} ${fmtN(args[2])} ${fmtN(yF(args[3]))} `; break;
      case OPS.curveTo3: pathD+=`C${fmtN(args[0])} ${fmtN(yF(args[1]))} ${fmtN(args[2])} ${fmtN(yF(args[3]))} ${fmtN(args[2])} ${fmtN(yF(args[3]))} `; break;
      case OPS.closePath: pathD+='Z '; break;
      case OPS.rectangle: {
        const[rx,ry,rw,rh]=args;
        pathD+=`M${fmtN(rx)} ${fmtN(yF(ry))} L${fmtN(rx+rw)} ${fmtN(yF(ry))} L${fmtN(rx+rw)} ${fmtN(yF(ry+rh))} L${fmtN(rx)} ${fmtN(yF(ry+rh))} Z `;
        break;
      }
      // Colors
      case OPS.setFillRGBColor: fillColor=rgbArgsToHex(args); break;
      case OPS.setStrokeRGBColor: strokeColor=rgbArgsToHex(args); break;
      case OPS.setFillCMYKColor: fillColor=cmykToHex(args[0],args[1],args[2],args[3]); break;
      case OPS.setStrokeCMYKColor: strokeColor=cmykToHex(args[0],args[1],args[2],args[3]); break;
      case OPS.setFillGray: fillColor=grayToHex(args[0]); break;
      case OPS.setStrokeGray: strokeColor=grayToHex(args[0]); break;
      case OPS.setFillColor:
        if(args.length>=4) fillColor=cmykToHex(args[0],args[1],args[2],args[3]);
        else if(args.length>=3) fillColor=rgbArgsToHex(args);
        else if(args.length===1) fillColor=grayToHex(args[0]);
        break;
      case OPS.setStrokeColor:
        if(args.length>=4) strokeColor=cmykToHex(args[0],args[1],args[2],args[3]);
        else if(args.length>=3) strokeColor=rgbArgsToHex(args);
        else if(args.length===1) strokeColor=grayToHex(args[0]);
        break;
      case OPS.setFillColorN:
        if(args.length>=4&&typeof args[0]==='number') fillColor=cmykToHex(args[0],args[1],args[2],args[3]);
        else if(args.length>=3&&typeof args[0]==='number') fillColor=rgbArgsToHex(args);
        else if(args.length===1&&typeof args[0]==='number') fillColor=grayToHex(args[0]);
        else hasGradients=true; // non-numeric args = gradient/pattern reference
        break;
      case OPS.setStrokeColorN:
        if(args.length>=4&&typeof args[0]==='number') strokeColor=cmykToHex(args[0],args[1],args[2],args[3]);
        else if(args.length>=3&&typeof args[0]==='number') strokeColor=rgbArgsToHex(args);
        else if(args.length===1&&typeof args[0]==='number') strokeColor=grayToHex(args[0]);
        else hasGradients=true;
        break;
      // Line properties
      case OPS.setLineWidth: lineWidth=args[0]; break;
      case OPS.setLineCap: lineCap=args[0]; break;
      case OPS.setLineJoin: lineJoin=args[0]; break;
      case OPS.setMiterLimit: miterLimit=args[0]; break;
      // Path painting
      case OPS.fill: {
        if(!firstFillSeen && fillColor==='#ffffff'){
          const m=pathD.trim().match(/^M([\d.-]+)\s+([\d.-]+)\s+L([\d.-]+)\s+([\d.-]+)\s+L([\d.-]+)\s+([\d.-]+)\s+L([\d.-]+)\s+([\d.-]+)\s+Z$/);
          if(m){
            const xs=[+m[1],+m[3],+m[5],+m[7]], ys=[+m[2],+m[4],+m[6],+m[8]];
            if((Math.max(...xs)-Math.min(...xs))>=W*0.95 && (Math.max(...ys)-Math.min(...ys))>=H*0.95){
              pathD=''; firstFillSeen=true; break;
            }
          }
        }
        firstFillSeen=true; emitPath(true,false,'nonzero'); break;
      }
      case OPS.eoFill: firstFillSeen=true; emitPath(true,false,'evenodd'); break;
      case OPS.stroke: emitPath(false,true,null); break;
      case OPS.fillStroke: firstFillSeen=true; emitPath(true,true,'nonzero'); break;
      case OPS.eoFillStroke: firstFillSeen=true; emitPath(true,true,'evenodd'); break;
      case OPS.endPath: pathD=''; break;
      case OPS.closeStroke: pathD+='Z '; emitPath(false,true,null); break;
      // Clipping
      case OPS.clip: case OPS.eoClip:
        if(pathD.trim()){
          const clipId='clip'+(++clipCount);
          const rule=fn===OPS.eoClip?' clip-rule="evenodd"':'';
          elements.push(`<clipPath id="${clipId}"><path d="${pathD.trim()}"${rule}/></clipPath>`);
          elements.push(`<g clip-path="url(#${clipId})">`);
          if(transformCountStack.length) transformCountStack[transformCountStack.length-1]++;
          pathD='';
        }
        break;
      // Embedded images — can't convert to SVG paths, must use raster
      case OPS.paintImageXObject:
      case OPS.paintInlineImageXObject:
      case OPS.paintInlineImageXObjectGroup:
      case OPS.paintImageXObjectRepeat:
        hasImages=true;
        break;
      // Gradient shading fill — just flag it, don't try to extract colors
      case OPS.shadingFill:
        hasGradients=true;
        break;
      // Track fill color at text rendering points
      case OPS.showText: case OPS.showSpacedText:
      case OPS.nextLineShowText: case OPS.nextLineSetSpacingShowText:
        textFillColors.push(fillColor);
        break;
      default: break;
    }
  }

  // ── Extract text content (catches glyphs not converted to outlines) ──
  let textElements = [];
  try {
    const textContent = await page.getTextContent();
    let textIdx = 0;
    for(const item of textContent.items){
      if(!item.str || !item.str.trim()){ continue; }
      // item.transform = [scaleX, skewY, skewX, scaleY, tx, ty] in PDF coords (origin bottom-left, Y up)
      const [a, b, c, d, tx, ty] = item.transform;
      const fontSize = Math.sqrt(a*a + b*b);
      if(fontSize < 0.5){ textIdx++; continue; } // skip invisible text
      // Use tracked fill color from operator list (matches showText call order)
      const color = textFillColors[textIdx] || fillColor;
      textIdx++;
      // Approximate font-weight from font name
      const fontWeight = (item.fontName && /bold/i.test(item.fontName)) ? ' font-weight="700"' : '';
      // Convert text position from PDF (Y-up) to SVG (Y-down) coordinates
      const escaped = item.str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
      textElements.push(
        `<text transform="translate(${fmtN(tx)},${fmtN(yF(ty))})"` +
        ` font-size="${fmtN(fontSize)}"${fontWeight}` +
        ` fill="${color}"` +
        ` font-family="sans-serif"` +
        `>${escaped}</text>`
      );
    }
  } catch(e){
    console.warn('[GSB] pdfToSvg: text extraction failed:', e);
  }

  // Build SVG — coordinates are already converted from PDF (Y-up) to SVG (Y-down)
  const svgText=[
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${fmtN(W)} ${fmtN(H)}" width="${fmtN(W)}pt" height="${fmtN(H)}pt">`,
    ...elements,
    ...textElements,
    '</svg>'
  ].join('\n');

  console.log(`[GSB] pdfToSvg: ${pathCount} paths, ${textElements.length} text items, hasGradients=${hasGradients}, hasImages=${hasImages}, tooManyPaths=${tooManyPaths}, SVG ${svgText.length} chars`);
  return { svgText, pathCount, hasGradients, hasImages, tooManyPaths, pageW: W, pageH: H };
}

// Load a PDF/AI file — simple rules:
//   1. Convert to SVG via pdfToSvg
//   2. Detect gradients
//   3. NO gradients → load as editable SVG group (recolor enabled)
//   4. HAS gradients → render via pdf.js canvas (display only, recolor disabled)
//   5. Always store original buffer for lossless PDF export via embedPdf
async function loadPdfAsImage(arrayBuffer, name){
  if(!window.pdfjsLib){
    toast('PDF.js niet geladen — kan PDF/AI niet openen.', 'error');
    throw new Error('pdf.js not loaded');
  }

  // Clone buffers BEFORE any pdf.js call — getDocument detaches the ArrayBuffer
  const bufferForExport = arrayBuffer.slice(0);
  const bufferForSvg = arrayBuffer.slice(0);
  const bufferForRaster = arrayBuffer.slice(0);

  showLogoLoading(name ? `"${name}" laden…` : 'Logo laden…');

  // --- Step 1: Convert to SVG and detect gradients/images ---
  let svgText = null, pdfHasGradients = false, pdfHasImages = false, svgPathCount = 0, pdfTooManyPaths = false;
  let pdfPageW = 0, pdfPageH = 0;
  try {
    const t0 = performance.now();
    const result = await pdfToSvg(bufferForSvg);
    svgText = result.svgText;
    svgPathCount = result.pathCount;
    pdfHasGradients = result.hasGradients;
    pdfHasImages = result.hasImages;
    pdfTooManyPaths = result.tooManyPaths;
    pdfPageW = result.pageW;
    pdfPageH = result.pageH;
    console.log(`[GSB] pdfToSvg "${name}": ${svgPathCount} paths, gradients=${pdfHasGradients}, images=${pdfHasImages}, tooMany=${pdfTooManyPaths}, page=${pdfPageW}×${pdfPageH}, ${(performance.now()-t0).toFixed(0)}ms`);
  } catch(err){
    console.warn(`[GSB] pdfToSvg failed for "${name}":`, err);
  }

  // --- PATH A: No gradients, no images, not too many paths, valid SVG → editable SVG group ---
  if(svgPathCount > 0 && !pdfHasGradients && !pdfHasImages && !pdfTooManyPaths){
    console.log(`[GSB] "${name}": no gradients, loading as editable SVG`);
    hideLogoLoading();
    loadSvg(svgText, name);
    // Store export buffer + original page dims after loadSvg places the object
    const _pdfPW = pdfPageW, _pdfPH = pdfPageH;
    setTimeout(()=>{
      const objs = canvas.getObjects();
      for(let i = objs.length - 1; i >= 0; i--){
        if(objs[i]._name === name && objs[i]._originalId){
          pdfSourceBuffers.set(objs[i]._originalId, bufferForExport);
          objs[i]._pdfPageW = _pdfPW;
          objs[i]._pdfPageH = _pdfPH;
          console.log(`[GSB] Stored PDF buffer for "${name}" (oid=${objs[i]._originalId}, page=${_pdfPW}×${_pdfPH})`);
          break;
        }
      }
    }, 500);
    return;
  }

  // --- PATH B: Has gradients OR conversion failed → pdf.js canvas render (display only) ---
  const reason = pdfTooManyPaths ? `too many paths (${svgPathCount}≥${PDF_MAX_SVG_PATHS})` : pdfHasImages ? 'embedded images detected' : pdfHasGradients ? 'gradients detected' : 'conversion failed';
  console.log(`[GSB] "${name}": ${reason}, loading as display-only raster`);
  try {
    const pdf = await pdfjsLib.getDocument({ data: bufferForRaster }).promise;
    const page = await pdf.getPage(1);
    // 300 DPI render, maar cap de afmetingen — grote artboards (A0 e.d.)
    // zouden anders honderden MB's aan imageData kosten (dual render ×2)
    const baseViewport = page.getViewport({ scale: 1 });
    const MAX_RENDER_PX = 5000;
    let scale = 300 / 72;
    const maxDim = Math.max(baseViewport.width, baseViewport.height);
    if(maxDim * scale > MAX_RENDER_PX) scale = MAX_RENDER_PX / maxDim;
    const viewport = page.getViewport({ scale });
    const ow = Math.round(viewport.width);
    const oh = Math.round(viewport.height);

    // Dual-render to isolate page background from design
    const off1 = document.createElement('canvas');
    off1.width = ow; off1.height = oh;
    const ctx1 = off1.getContext('2d');
    await page.render({ canvasContext: ctx1, viewport, background: 'rgb(255,255,255)' }).promise;

    const off2 = document.createElement('canvas');
    off2.width = ow; off2.height = oh;
    const ctx2 = off2.getContext('2d');
    await page.render({ canvasContext: ctx2, viewport, background: 'rgb(255,0,255)' }).promise;

    const d1 = ctx1.getImageData(0, 0, ow, oh);
    const d2 = ctx2.getImageData(0, 0, ow, oh);
    const px1 = d1.data, px2 = d2.data;
    let bgPixels = 0;
    for(let i = 0; i < px1.length; i += 4){
      const dr = Math.abs(px1[i] - px2[i]);
      const dg = Math.abs(px1[i+1] - px2[i+1]);
      const db = Math.abs(px1[i+2] - px2[i+2]);
      if(dr + dg + db > 10){ px1[i+3] = 0; bgPixels++; }
    }
    ctx1.putImageData(d1, 0, 0);

    if(bgPixels === 0){
      const imgData = ctx1.getImageData(0, 0, ow, oh);
      const px = imgData.data;
      const BG_THRESH = 250;
      const corners = [0, (ow-1)*4, ((oh-1)*ow)*4, ((oh-1)*ow+ow-1)*4];
      const allWhite = corners.every(i => px[i]>=BG_THRESH && px[i+1]>=BG_THRESH && px[i+2]>=BG_THRESH);
      if(allWhite){
        for(let x=0;x<ow;x++) for(let y=0;y<oh;y++){ const i=(y*ow+x)*4; if(px[i]>=BG_THRESH&&px[i+1]>=BG_THRESH&&px[i+2]>=BG_THRESH) px[i+3]=0; else break; }
        for(let x=0;x<ow;x++) for(let y=oh-1;y>=0;y--){ const i=(y*ow+x)*4; if(px[i]>=BG_THRESH&&px[i+1]>=BG_THRESH&&px[i+2]>=BG_THRESH) px[i+3]=0; else break; }
        for(let y=0;y<oh;y++) for(let x=0;x<ow;x++){ const i=(y*ow+x)*4; if(px[i]>=BG_THRESH&&px[i+1]>=BG_THRESH&&px[i+2]>=BG_THRESH) px[i+3]=0; else break; }
        for(let y=0;y<oh;y++) for(let x=ow-1;x>=0;x--){ const i=(y*ow+x)*4; if(px[i]>=BG_THRESH&&px[i+1]>=BG_THRESH&&px[i+2]>=BG_THRESH) px[i+3]=0; else break; }
        ctx1.putImageData(imgData, 0, 0);
      }
    }

    const dataUrl = off1.toDataURL('image/png');
    fabric.Image.fromURL(dataUrl, img=>{
      img._vectorOrigin = 'pdf';
      img._hasGradients = true;
      autoCropRaster(img, (cropped, cw, ch)=>{
        cropped._vectorOrigin = 'pdf';
        cropped._hasGradients = true;
        // Use actual PDF page dimensions (points → mm) for real-world size.
        // CRITICAL: the raster was auto-cropped to the CONTENT bounds (cw×ch),
        // so the physical target must be scaled by the crop fraction (cw/ow,
        // ch/oh). Using the full page dims here squeezed cropped content into
        // the artboard's aspect ratio (logo's werden in elkaar gedrukt).
        let targetMmW = pdfPageW / 72 * 25.4 * (cw / ow);
        let targetMmH = pdfPageH / 72 * 25.4 * (ch / oh);
        // Clamp to 90% of sheet width if too large
        if(targetMmW > state.sheet.w * 0.9){
          const scale = (state.sheet.w * 0.9) / targetMmW;
          targetMmW *= scale;
          targetMmH *= scale;
        }
        placeImage(cropped, name, targetMmW, targetMmH, cw, ch);
        pdfSourceBuffers.set(cropped._originalId, bufferForExport);
        cropped._pdfPageW = pdfPageW;
        cropped._pdfPageH = pdfPageH;
        hideLogoLoading();
        console.log(`[GSB] PDF/AI "${name}" loaded as display-only (gradient), buffer stored, page=${pdfPageW}×${pdfPageH}`);
      });
    }, { crossOrigin:'anonymous' });
    /* gradient toast removed — color editor shows inline hint instead */
  } catch(err2){
    hideLogoLoading();
    console.error('PDF/AI load failed:', err2);
    toast(`⚠️ "${name}": kon bestand niet openen.`, 'error', 6000);
  }
}

/* Parse physical dimensions from SVG width/height attributes.
   Returns {mmW, mmH} or null if no physical units found. */
function parseSvgDocSize(svgText){
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const svg = doc.querySelector('svg');
  if(!svg) return null;
  const wAttr = svg.getAttribute('width');
  const hAttr = svg.getAttribute('height');
  if(!wAttr || !hAttr) return null;
  function toMm(val){
    if(!val) return null;
    val = val.trim();
    const num = parseFloat(val);
    if(isNaN(num) || num <= 0) return null;
    if(val.endsWith('mm')) return num;
    if(val.endsWith('cm')) return num * 10;
    if(val.endsWith('in')) return num * 25.4;
    if(val.endsWith('pt')) return num * 25.4 / 72;
    if(val.endsWith('pc')) return num * 25.4 / 6;
    // px or unitless — check if viewBox gives a clue, otherwise no physical size
    return null;
  }
  const mmW = toMm(wAttr);
  const mmH = toMm(hAttr);
  if(mmW && mmH) return { mmW, mmH };
  return null;
}

function loadSvg(svgText, name){
  // Detect embedded raster images inside the SVG.
  const embeddedRaster = detectEmbeddedRaster(svgText);

  // Auto-crop the SVG by adjusting the viewBox (removes transparent padding)
  // This happens BEFORE Fabric loads the SVG, so no clipPath artifacts.
  autoCropSvg(svgText, (croppedSvgText)=>{
    // Parse physical document size from the (possibly cropped) SVG
    const docSize = parseSvgDocSize(croppedSvgText);

    fabric.loadSVGFromString(croppedSvgText, (objects, options)=>{
      const group = fabric.util.groupSVGElements(objects, options);
      // Disable object caching for vector quality at any zoom level
      group.objectCaching = false;
      if(group._objects) group._objects.forEach(child => { child.objectCaching = false; });
      const naturalW = group.width || options.width || 200;
      const naturalH = group.height || options.height || 200;
      // Set SVG properties
      group._svgSource = croppedSvgText;
      if(embeddedRaster){
        group._embeddedRasterW = embeddedRaster.w;
        group._embeddedRasterH = embeddedRaster.h;
      }

      let targetMmW, targetMmH;
      if(docSize){
        targetMmW = docSize.mmW;
        targetMmH = docSize.mmH;
        // Clamp to sheet size
        if(targetMmW > state.sheet.w){
          const scale = state.sheet.w / targetMmW * 0.9;
          targetMmW *= scale;
          targetMmH *= scale;
        }
      } else {
        // No physical size — use 25% of sheet width as default
        targetMmW = state.sheet.w * 0.25;
        targetMmH = targetMmW * (naturalH / naturalW);
      }
      placeImage(group, name, targetMmW, targetMmH, naturalW, naturalH);
      hideLogoLoading();
      if(embeddedRaster){
        toast(`⚠️ "${name}": ${t('embeddedRasterWarn')}`, 'warn', 8000);
      }
    });
  });
}

// Parse SVG text for <image> tags with raster data. Returns {w,h} of the
// largest embedded raster, or null if the SVG is pure vector.
function detectEmbeddedRaster(svgText){
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const images = doc.querySelectorAll('image');
  if(!images.length) return null;
  let maxW = 0, maxH = 0;
  images.forEach(img=>{
    const w = parseFloat(img.getAttribute('width')) || 0;
    const h = parseFloat(img.getAttribute('height')) || 0;
    if(w * h > maxW * maxH){ maxW = w; maxH = h; }
  });
  return maxW > 0 ? { w: maxW, h: maxH } : null;
}

/* Auto-crop: detect transparent bounding box and trim empty space.
   Works for both raster images and SVG groups.
   Callback receives (croppedObj, newNaturalW, newNaturalH). */
function autoCropRaster(obj, callback){
  // SVG groups are now cropped via autoCropSvg (viewBox adjustment) before Fabric loading
  if(obj.type !== 'image'){
    callback(obj, obj.width, obj.height);
    return;
  }
  const el = obj.getElement();
  const w = el.naturalWidth || el.width || 1;
  const h = el.naturalHeight || el.height || 1;
  const tmp = document.createElement('canvas');
  tmp.width = w; tmp.height = h;
  const ctx = tmp.getContext('2d');
  ctx.drawImage(el, 0, 0);
  const imgData = ctx.getImageData(0, 0, w, h);
  const px = imgData.data;
  // Find bounding box of non-transparent pixels (alpha > 10)
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for(let y = 0; y < h; y++){
    for(let x = 0; x < w; x++){
      if(px[(y * w + x) * 4 + 3] > 10){
        if(x < minX) minX = x;
        if(x > maxX) maxX = x;
        if(y < minY) minY = y;
        if(y > maxY) maxY = y;
      }
    }
  }
  // Only crop if we'd remove at least 3% of the area on any side
  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  const marginPct = 0.03;
  if(minX < w * marginPct && minY < h * marginPct && cropW > w * (1-marginPct*2) && cropH > h * (1-marginPct*2)){
    // Negligible transparent border — skip
    callback(obj, w, h);
    return;
  }
  if(cropW <= 0 || cropH <= 0){
    callback(obj, w, h);
    return;
  }
  // Crop
  const cropped = document.createElement('canvas');
  cropped.width = cropW;
  cropped.height = cropH;
  const cctx = cropped.getContext('2d');
  cctx.drawImage(tmp, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
  fabric.Image.fromURL(cropped.toDataURL('image/png'), newImg=>{
    callback(newImg, cropW, cropH);
  }, { crossOrigin:'anonymous' });
}

/* Auto-crop SVG by adjusting the viewBox to remove fully transparent padding.
   Uses the browser's native SVG renderer for accurate pixel bounds, then
   modifies the viewBox and width/height attributes in the SVG text.
   Returns the (possibly modified) SVG text via callback.
   This approach avoids Fabric clipPath artifacts (fading, misalignment). */
function autoCropSvg(svgText, callback){
  // Parse viewBox from SVG
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const svgEl = doc.querySelector('svg');
  if(!svgEl){ callback(svgText); return; }
  const vb = svgEl.getAttribute('viewBox');
  if(!vb){ callback(svgText); return; }
  const vbParts = vb.split(/[\s,]+/).map(Number);
  if(vbParts.length !== 4 || vbParts.some(isNaN)){ callback(svgText); return; }
  const [vbX, vbY, vbW, vbH] = vbParts;

  // Render SVG natively in the browser at a reasonable resolution
  const renderW = Math.min(1200, Math.max(400, Math.round(vbW * 2)));
  const renderH = Math.round(renderW * (vbH / vbW));
  const blob = new Blob([svgText], { type:'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.width = renderW;
  img.height = renderH;
  img.onload = ()=>{
    const tmp = document.createElement('canvas');
    tmp.width = renderW; tmp.height = renderH;
    const ctx = tmp.getContext('2d');
    ctx.drawImage(img, 0, 0, renderW, renderH);
    URL.revokeObjectURL(url);

    const imgData = ctx.getImageData(0, 0, renderW, renderH);
    const px = imgData.data;
    // Find bounding box of any non-fully-transparent pixel (alpha > 0)
    let minX = renderW, minY = renderH, maxX = 0, maxY = 0;
    for(let y = 0; y < renderH; y++){
      for(let x = 0; x < renderW; x++){
        if(px[(y * renderW + x) * 4 + 3] > 0){
          if(x < minX) minX = x;
          if(x > maxX) maxX = x;
          if(y < minY) minY = y;
          if(y > maxY) maxY = y;
        }
      }
    }
    if(maxX < minX || maxY < minY){ callback(svgText); return; }

    // Check if crop is significant (> 2% transparent border on any side)
    const leftPct  = minX / renderW;
    const topPct   = minY / renderH;
    const rightPct = (renderW - 1 - maxX) / renderW;
    const botPct   = (renderH - 1 - maxY) / renderH;
    if(leftPct < 0.02 && topPct < 0.02 && rightPct < 0.02 && botPct < 0.02){
      callback(svgText); return;
    }

    // Map pixel bounds to viewBox coordinates — met kleine veiligheidsmarge
    // (1,5%) zodat outlines/strokes op de rand nooit worden afgesneden
    const safPx = Math.max(2, Math.round(Math.max(renderW, renderH) * 0.015));
    const sMinX = Math.max(0, minX - safPx), sMinY = Math.max(0, minY - safPx);
    const sMaxX = Math.min(renderW - 1, maxX + safPx), sMaxY = Math.min(renderH - 1, maxY + safPx);
    const cropVbX = vbX + (sMinX / renderW) * vbW;
    const cropVbY = vbY + (sMinY / renderH) * vbH;
    const cropVbW = ((sMaxX - sMinX + 1) / renderW) * vbW;
    const cropVbH = ((sMaxY - sMinY + 1) / renderH) * vbH;

    // Set viewBox to start at 0,0 and wrap all children in a translate group.
    // This ensures Fabric's internal path coordinates are near the origin,
    // which avoids costly coordinate transforms on every render frame.
    svgEl.setAttribute('viewBox', `0 0 ${cropVbW} ${cropVbH}`);
    // Wrap all child elements in a <g> with translate to shift content to origin
    const wrapG = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
    wrapG.setAttribute('transform', `translate(${-cropVbX},${-cropVbY})`);
    while(svgEl.firstChild) wrapG.appendChild(svgEl.firstChild);
    svgEl.appendChild(wrapG);

    // Update width/height if present (to preserve physical size ratio)
    if(svgEl.hasAttribute('width') && svgEl.hasAttribute('height')){
      const wAttr = svgEl.getAttribute('width');
      const hAttr = svgEl.getAttribute('height');
      const wNum = parseFloat(wAttr);
      const hNum = parseFloat(hAttr);
      if(!isNaN(wNum) && !isNaN(hNum)){
        const wUnit = wAttr.replace(/[\d.\-+e]+/i, '').trim();
        const hUnit = hAttr.replace(/[\d.\-+e]+/i, '').trim();
        svgEl.setAttribute('width', `${(wNum * (cropVbW / vbW)).toFixed(4)}${wUnit}`);
        svgEl.setAttribute('height', `${(hNum * (cropVbH / vbH)).toFixed(4)}${hUnit}`);
      }
    }

    const croppedSvg = new XMLSerializer().serializeToString(svgEl);
    // Pass crop bounds as fraction of original viewBox (for PDF export clipping)
    const cropFracs = { x: cropVbX / vbW, y: cropVbY / vbH, w: cropVbW / vbW, h: cropVbH / vbH };
    callback(croppedSvg, cropFracs);
  };
  img.onerror = ()=>{
    URL.revokeObjectURL(url);
    callback(svgText, null);
  };
  img.src = url;
}

/* ── Bulk mode: defers expensive per-item operations during large uploads ── */
let _bulkMode = false;
let _bulkCount = 0;

function placeImage(obj, name, mmW, mmH, naturalW, naturalH){
  const spot = ensureSpotOnAnySheet(mmW, mmH);
  if(!spot) return;
  const id = ++idCounter;
  obj._id = id;
  obj._originalId = id;
  obj._name = name;
  obj._naturalW = naturalW;
  obj._naturalH = naturalH;
  obj._mmW = mmW;
  obj._mmH = mmH;
  if(obj._svgSource) svgSourceStore.set(id, obj._svgSource);
  obj._mmLeft = spot.x;
  obj._mmTop  = spot.y;
  obj.set({ originX:'left', originY:'top' });
  obj.scaleX = (mmW * displayPxPerMm) / obj.width;
  obj.scaleY = (mmH * displayPxPerMm) / obj.height;
  obj.left = spot.x * displayPxPerMm;
  obj.top  = spot.y * displayPxPerMm;
  attachObjListeners(obj);
  canvas.add(obj);
  registerLogo(obj);
  autoDarkBgForWhiteLogo(obj);
  autoExtendIfNeeded();
  if(_bulkMode){
    // In bulk mode: skip per-item render, undo push, item list, summary
    _bulkCount++;
    // Render canvas every 25 items to show progress
    if(_bulkCount % 25 === 0){
      canvas.requestRenderAll();
      updateInfoBar();
    }
  } else {
    canvas.setActiveObject(obj);
    canvas.requestRenderAll();
    renderItemList();
    checkDpi(obj);
    updateInfoBar();
    updateSummary();
    pushUndo();
  }
}

function _finishBulk(){
  _bulkMode = false;
  canvas.requestRenderAll();
  renderItemList();
  updateInfoBar();
  updateSummary();
  pushUndo();
  _bulkCount = 0;
}

/* Debounced UI rebuild — during drag/scale/rotate the mm values update
   dozens of times per second.  We sync the raw numbers immediately (so
   they're correct when the gesture ends) but defer the expensive DOM
   rebuilds to a single requestAnimationFrame + trailing timeout. */
let _syncUiRafId = null;
let _syncUiTimer = null;
function _debouncedUiRebuild(){
  if(_syncUiRafId) cancelAnimationFrame(_syncUiRafId);
  clearTimeout(_syncUiTimer);
  _syncUiRafId = requestAnimationFrame(()=>{
    renderSelectedPanel();
    updateInfoBar();
    _syncUiRafId = null;
  });
  // Rebuild item list less often — it's heavier (thumbnails)
  _syncUiTimer = setTimeout(()=>{ renderItemList(); }, 200);
}

/* Visual mm dimensions: at 90°/270° these are swapped vs logical _mmW/_mmH.
   Use whenever you need the axis-aligned bounding box in mm (e.g. extent calcs). */
function visMmW(o){ const a=((o.angle||0)%360+360)%360; return (a>45&&a<135)||(a>225&&a<315)?o._mmH:o._mmW; }
function visMmH(o){ const a=((o.angle||0)%360+360)%360; return (a>45&&a<135)||(a>225&&a<315)?o._mmW:o._mmH; }

function syncMmFromPx(obj){
  // Use axis-aligned bounding rect for position.
  const r = obj.getBoundingRect(true, true);
  obj._mmLeft = r.left / displayPxPerMm;
  obj._mmTop  = r.top  / displayPxPerMm;
  // Bounding rect gives VISUAL (axis-aligned) dims. At 90°/270° these are
  // swapped vs logical dims. _mmW/_mmH must always be LOGICAL (unrotated).
  const a = ((obj.angle || 0) % 360 + 360) % 360;
  const swapped = (a > 45 && a < 135) || (a > 225 && a < 315);
  obj._mmW = (swapped ? r.height : r.width)  / displayPxPerMm;
  obj._mmH = (swapped ? r.width  : r.height) / displayPxPerMm;
  autoExtendIfNeeded();
  _debouncedUiRebuild();
  // NB: checkDpi is fired from placeImage and setSizeMm, not here — moving
  // triggers syncMmFromPx dozens of times and we don't want toast spam.
}

function findFreeSpotOrNull(mmW, mmH){
  if(mmW > state.sheet.w || mmH > state.sheet.h) return null;
  const gap = state.gapMm || 0;
  const sheetW = state.sheet.w, sheetH = state.sheet.h;

  // Collect candidate positions: edges of existing objects + gap.
  // This finds gaps efficiently even with mixed sizes.
  const xCandidates = new Set([0]);
  const yCandidates = new Set([0]);
  const objs = canvas.getObjects();
  for(const o of objs){
    if(!o._mmW) continue;
    xCandidates.add(Math.round((o._mmLeft + visMmW(o) + gap) * 10) / 10);
    xCandidates.add(Math.round(o._mmLeft * 10) / 10);
    yCandidates.add(Math.round((o._mmTop + visMmH(o) + gap) * 10) / 10);
    yCandidates.add(Math.round(o._mmTop * 10) / 10);
  }

  // Sort candidates
  const xs = [...xCandidates].filter(x => x + mmW <= sheetW + 0.01).sort((a,b) => a-b);
  const ys = [...yCandidates].filter(y => y + mmH <= sheetH + 0.01).sort((a,b) => a-b);

  // Scan top-to-bottom, left-to-right on candidate positions
  for(const y of ys){
    for(const x of xs){
      if(!overlapsAny(x, y, mmW, mmH)) return {x, y};
    }
  }

  // Fallback: fine grid scan (catches positions between object edges)
  const step = Math.max(2, Math.floor(Math.min(mmW, mmH) / 3) || 2);
  const maxY = sheetH - mmH;
  const maxX = sheetW - mmW;
  for(let y=0; y<=maxY; y+=step){
    for(let x=0; x<=maxX; x+=step){
      if(!overlapsAny(x,y,mmW,mmH)) return {x,y};
    }
  }
  return null;
}

function findFreeSpot(mmW, mmH){
  return findFreeSpotOrNull(mmW, mmH) || {x:0,y:0};
}

/* Smart rotation-aware batch packer — uses bestLayout (same algorithm
   as the "vul vel" button) for dense packing, then filters out slots
   that overlap existing obstacles, then fills any remaining gaps with
   a fine-grained fallback scan (still rotation-aware).

   Takes optional `existingBoxes` parameter so callers can run the packer
   without relying on canvas.getObjects() — useful when pre-computing
   layouts for overflow sheets.

   Returns an array of { x, y, w, h, rotated } slots in mm. A `rotated`
   slot has swapped dimensions: w = original mmH, h = original mmW. The
   caller must place the clone with angle=90 and center origin. */
function packSpotsSmart(mmW, mmH, count, existingBoxes){
  if(count <= 0) return [];
  const sheetW = state.sheet.w, sheetH = state.sheet.h;
  const nativeFits = mmW <= sheetW && mmH <= sheetH;
  const rotatedFits = mmH <= sheetW && mmW <= sheetH;
  if(!nativeFits && !rotatedFits) return [];

  const gap = state.gapMm || 0;

  // Snapshot obstacle boxes (expanded by half-gap on each side for spacing).
  let obstacles = existingBoxes;
  if(!obstacles){
    obstacles = [];
    const objs = canvas.getObjects();
    for(let i=0; i<objs.length; i++){
      const o = objs[i];
      if(!o._mmW) continue;
      // _mmW/_mmH are LOGICAL; _mmLeft/_mmTop are VISUAL (from getBoundingRect).
      // Obstacle boxes need VISUAL dimensions.
      const oa = ((o.angle || 0) % 360 + 360) % 360;
      const oSwapped = (oa > 45 && oa < 135) || (oa > 225 && oa < 315);
      const visW = oSwapped ? o._mmH : o._mmW;
      const visH = oSwapped ? o._mmW : o._mmH;
      obstacles.push({
        x1: o._mmLeft, y1: o._mmTop,
        x2: o._mmLeft + visW, y2: o._mmTop + visH,
      });
    }
  }

  // ----------------------------------------------------------------
  // Row-by-row strip packing with obstacle awareness.
  //
  // For each candidate row (y position), scan left-to-right and place
  // logos wherever they fit without overlapping obstacles or previously
  // placed logos. Try both orientations per row and pick the one that
  // packs more. This fills gaps naturally because every valid position
  // is tested, not just grid-aligned ones.
  // ----------------------------------------------------------------

  const placed = []; // {x1,y1,x2,y2} of placed logos (with gap)

  // Spatial grid for fast overlap detection — avoids O(n) scan per check
  const GRID_CELL = 50; // mm per grid cell
  const gridCols = Math.ceil(sheetW / GRID_CELL) + 1;
  const gridRows = Math.ceil(sheetH / GRID_CELL) + 1;
  const obstacleGrid = new Map();
  const placedGrid = new Map();

  const _gridKey = (col, row) => col * 10000 + row;
  const _insertIntoGrid = (grid, box) => {
    const c0 = Math.max(0, Math.floor(box.x1 / GRID_CELL));
    const c1 = Math.min(gridCols - 1, Math.floor(box.x2 / GRID_CELL));
    const r0 = Math.max(0, Math.floor(box.y1 / GRID_CELL));
    const r1 = Math.min(gridRows - 1, Math.floor(box.y2 / GRID_CELL));
    for(let c = c0; c <= c1; c++){
      for(let r = r0; r <= r1; r++){
        const k = _gridKey(c, r);
        let arr = grid.get(k);
        if(!arr){ arr = []; grid.set(k, arr); }
        arr.push(box);
      }
    }
  };

  // Insert all obstacles into the spatial grid (expanded by gap)
  for(const b of obstacles){
    _insertIntoGrid(obstacleGrid, {
      x1: b.x1 - gap, y1: b.y1 - gap,
      x2: b.x2 + gap, y2: b.y2 + gap,
      _orig: b,
    });
  }

  const overlaps = (x, y, w, h)=>{
    const bx1 = x, by1 = y, bx2 = x + w, by2 = y + h;
    // Check obstacle grid
    const c0 = Math.max(0, Math.floor(bx1 / GRID_CELL));
    const c1 = Math.min(gridCols - 1, Math.floor(bx2 / GRID_CELL));
    const r0 = Math.max(0, Math.floor(by1 / GRID_CELL));
    const r1 = Math.min(gridRows - 1, Math.floor(by2 / GRID_CELL));
    const checked = new Set();
    for(let c = c0; c <= c1; c++){
      for(let r = r0; r <= r1; r++){
        const k = _gridKey(c, r);
        const oArr = obstacleGrid.get(k);
        if(oArr) for(const b of oArr){
          if(checked.has(b)) continue;
          checked.add(b);
          if(bx2 > b.x1 && bx1 < b.x2 && by2 > b.y1 && by1 < b.y2) return true;
        }
        const pArr = placedGrid.get(k);
        if(pArr) for(const b of pArr){
          if(checked.has(b)) continue;
          checked.add(b);
          if(bx2 > b.x1 && bx1 < b.x2 && by2 > b.y1 && by1 < b.y2) return true;
        }
      }
    }
    return false;
  };

  // For a given row y-position and block dimensions, scan left-to-right
  // and return all non-overlapping positions found.
  const scanRow = (y, bw, bh, rotated)=>{
    if(bw > sheetW || bh > sheetH) return [];
    if(y + bh > sheetH + 0.01) return [];
    const spots = [];
    let x = 0;
    while(x + bw <= sheetW + 0.01){
      if(!overlaps(x, y, bw, bh)){
        spots.push({ x, y, w: bw, h: bh, rotated });
        x += bw + gap;
      } else {
        // Step forward by 1mm to find the next gap
        x += 1;
      }
    }
    return spots;
  };

  const _addPlaced = (x, y, w, h) => {
    const box = { x1: x - gap, y1: y - gap, x2: x + w + gap, y2: y + h + gap };
    placed.push(box);
    _insertIntoGrid(placedGrid, box);
  };

  // bestLayout for empty-sheet baseline (fast grid, no obstacles).
  // We use this first for maximum density when no obstacles exist.
  const results = [];
  if(obstacles.length === 0){
    const layout = bestLayout(mmW, mmH, gap, sheetW, sheetH);
    for(let i=0; i<layout.length && results.length < count; i++){
      const p = layout[i];
      results.push(p);
      _addPlaced(p.x, p.y, p.w, p.h);
    }
    return results.slice(0, count);
  }

  // With obstacles: row-by-row scan.
  // Collect all candidate Y positions where a row could start:
  //   - y=0
  //   - bottom edge of every obstacle + gap
  //   - bottom edge of every placed logo + gap
  // This ensures we try rows that start right below obstacles.
  const candidateYs = new Set([0]);
  for(const b of obstacles){
    candidateYs.add(Math.ceil(b.y2 + gap));
  }
  // Also add regular grid rows for both orientations
  const heights = new Set();
  if(nativeFits) heights.add(mmH);
  if(rotatedFits) heights.add(mmW);
  for(const h of heights){
    for(let y = 0; y + h <= sheetH + 0.01; y += h + gap){
      candidateYs.add(Math.round(y * 100) / 100);
    }
  }

  // Sort Y candidates
  const sortedYs = [...candidateYs].sort((a,b) => a - b);

  // For each Y position, try both orientations and greedily place logos
  for(const y of sortedYs){
    if(results.length >= count) break;

    // Try both orientations, pick whichever places more in this row
    let bestRow = [];
    if(nativeFits){
      const row = scanRow(y, mmW, mmH, false);
      if(row.length > bestRow.length) bestRow = row;
    }
    if(rotatedFits){
      const row = scanRow(y, mmH, mmW, true);
      if(row.length > bestRow.length) bestRow = row;
    }

    // Place the winning row's logos
    for(const spot of bestRow){
      if(results.length >= count) break;
      // Double-check (placed array grew since scanRow ran)
      if(!overlaps(spot.x, spot.y, spot.w, spot.h)){
        results.push(spot);
        _addPlaced(spot.x, spot.y, spot.w, spot.h);
      }
    }
  }

  // Final sweep: try placing in any remaining gaps with 5mm step (was 1mm).
  // Uses both orientations in a single pass. 5mm is a good balance between
  // gap-filling precision and performance at high object counts.
  if(results.length < count){
    const STEP = 5; // mm step for final sweep (was 1mm — too slow at 400+ items)
    const tryFill = (bw, bh, rotated)=>{
      if(bw > sheetW || bh > sheetH) return;
      for(let y = 0; y + bh <= sheetH + 0.01 && results.length < count; y += STEP){
        for(let x = 0; x + bw <= sheetW + 0.01 && results.length < count; x += STEP){
          if(!overlaps(x, y, bw, bh)){
            results.push({ x, y, w: bw, h: bh, rotated });
            _addPlaced(x, y, bw, bh);
            x += bw + gap - STEP; // jump past placed logo
          }
        }
      }
    };
    if(nativeFits) tryFill(mmW, mmH, false);
    if(rotatedFits && results.length < count) tryFill(mmH, mmW, true);
  }

  return results;
}

/* Back-compat wrapper — caller code that used packSpotsOnCurrentSheet
   continues to work. */
function packSpotsOnCurrentSheet(mmW, mmH, count){
  return packSpotsSmart(mmW, mmH, count);
}

/* ensureSpotOnAnySheet — synchronous helper. Tries the current tab first;
   if full AND we're in multi-sheet mode (55×100 DTF only), saves the current
   tab, pushes a NEW blank tab, switches to it, and returns a spot on it.
   Returns null if we're single-sheet and the sheet is full.
   Callers can safely call canvas.add(...) right after this returns because
   Single canvas mode: return free spot or null (no sheet spilling). */
function ensureSpotOnAnySheet(mmW, mmH){
  let spot = findFreeSpotOrNull(mmW, mmH);
  if(spot) return spot;

  const logoH = Math.min(mmW, mmH);
  if(logoH > state.sheet.w){ toast(t('sizeTooLarge'), 'error'); return null; }

  // Only DTF rolls can auto-extend
  if(SHEET_FORMATS[state.sheetFormat]?.isDTF){
    let tries = 0;
    while(!spot && state.sheet.h + 1000 <= MAX_LENGTH_MM && tries < 50){
      growRoll(1000);
      spot = findFreeSpotOrNull(mmW, mmH);
      tries++;
    }
  }
  if(!spot){
    toast(t('sheetFullNoSpill'), 'error');
    return null;
  }
  return spot;
}

// Grow the roll by deltaMm (in mm). Updates state, canvas, ruler, input field.
function growRoll(deltaMm){
  const newH = Math.min(MAX_LENGTH_MM, state.sheet.h + deltaMm);
  if(newH === state.sheet.h) return;
  state.sheet.h = newH;
  state.rollLengthM = newH / 1000;
  resizeSheet();
  const inp = document.getElementById('rollLengthInput');
  if(inp) inp.value = state.rollLengthM;
}

// Check if a live object overlaps any OTHER object on the canvas.
function hasOverlap(obj){
  const gap = state.gapMm || 0;
  const ax1 = obj._mmLeft - gap, ay1 = obj._mmTop - gap;
  const ax2 = obj._mmLeft + visMmW(obj) + gap, ay2 = obj._mmTop + visMmH(obj) + gap;
  return canvas.getObjects().some(o=>{
    if(o === obj || !o._mmW) return false;
    const bx1 = o._mmLeft, by1 = o._mmTop;
    const bx2 = o._mmLeft + visMmW(o), by2 = o._mmTop + visMmH(o);
    return !(ax2 <= bx1 || ax1 >= bx2 || ay2 <= by1 || ay1 >= by2);
  });
}

function overlapsAny(x,y,w,h){
  const gap = state.gapMm || 0;
  return canvas.getObjects().some(o=>{
    if(!o._mmW) return false;
    const ox1 = o._mmLeft - gap;
    const oy1 = o._mmTop - gap;
    const ox2 = o._mmLeft + visMmW(o) + gap;
    const oy2 = o._mmTop + visMmH(o) + gap;
    return !(x+w <= ox1 || x >= ox2 || y+h <= oy1 || y >= oy2);
  });
}

function calcEffectiveDpi(obj){
  // Pure vector SVG without embedded raster → infinite resolution.
  // Check _svgSource (or svgSourceStore fallback) regardless of type: after
  // rasterization for canvas performance, clones are fabric.Image but still
  // vector for export because the SVG source is in svgSourceStore.
  // Raster-bewerkte logo's exporteren als 300 DPI raster — geen vector meer.
  const svgSrc = obj._rasterEdited ? null : getSvgSource(obj);
  if(svgSrc && !obj._embeddedRasterW) return Infinity;
  // SVG with embedded raster → DPI based on the raster dimensions vs print size.
  if(svgSrc && obj._embeddedRasterW){
    return (obj._embeddedRasterW / obj._mmW) * MM_PER_INCH;
  }
  // PDF/AI rendered as raster but originally vector → treat as infinite DPI.
  if(obj._vectorOrigin && !obj._rasterEdited) return Infinity;
  return (obj._naturalW / obj._mmW) * MM_PER_INCH;
}
function dpiStatus(dpi){
  if(!isFinite(dpi)) return {label:'vector ✓', cls:'dpi-ok'};
  if(dpi >= 300) return {label:Math.round(dpi)+' dpi ✓', cls:'dpi-ok'};
  if(dpi >= 72)  return {label:Math.round(dpi)+' dpi', cls:'dpi-warn'};
  return {label:Math.round(dpi)+' dpi', cls:'dpi-bad'};
}
// Track which logos we've already warned about so the sticky DPI toast only
// appears once per logo. The user actively dismisses the toast, which releases
// the lock for that logo.
const warnedDpiIds = new Set();
function checkDpi(obj){
  if(!obj) return;
  const key = obj._originalId || obj._id;
  if(key == null) return;
  const dpi = calcEffectiveDpi(obj);
  if(!isFinite(dpi) || dpi >= 150) return;
  if(warnedDpiIds.has(key)) return;
  warnedDpiIds.add(key);
  toast(
    `${t('lowDpiWarn')} (${Math.round(dpi)} DPI). ${t('lowDpiMore')}`,
    'warn',
    0, // sticky — user closes it
    ()=>{ warnedDpiIds.delete(key); },
    t('lowDpiDismiss')
  );
}


/* =========================================================
   COLOR UTILITIES
   ========================================================= */
// Convert hex (#rrggbb) → {r,g,b}
function hexToRgb(hex){
  hex = hex.replace('#','');
  if(hex.length===3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  const n = parseInt(hex,16);
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
}
// Convert {r,g,b} → #rrggbb
function rgbToHex(r,g,b){
  return '#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
}
// Convert {r,g,b} → {c,m,y,k} (0-100)
function rgbToCmyk(r,g,b){
  const r1=r/255, g1=g/255, b1=b/255;
  const k=1-Math.max(r1,g1,b1);
  if(k>=1) return {c:0,m:0,y:0,k:100};
  return {
    c:Math.round(((1-r1-k)/(1-k))*100),
    m:Math.round(((1-g1-k)/(1-k))*100),
    y:Math.round(((1-b1-k)/(1-k))*100),
    k:Math.round(k*100)
  };
}
// Convert {c,m,y,k} (0-100) → {r,g,b}
function cmykToRgb(c,m,y,k){
  const c1=c/100, m1=m/100, y1=y/100, k1=k/100;
  return {
    r:Math.round(255*(1-c1)*(1-k1)),
    g:Math.round(255*(1-m1)*(1-k1)),
    b:Math.round(255*(1-y1)*(1-k1))
  };
}

// Extract unique fill/stroke colors from an SVG fabric group or a fabric.Image with _svgSource.
function extractSvgColors(group){
  const colors = new Map(); // normalized hex → count
  if(!group || !group._objects) return colors;

  // Helper: normalize any color value to lowercase 6-digit hex, or null
  const toNormHex = (v)=>{
    if(!v || v === 'none' || v === 'transparent') return null;
    if(typeof v === 'string'){
      if(v.startsWith('#')){
        return v.length===4 ? '#'+v[1]+v[1]+v[2]+v[2]+v[3]+v[3] : v.toLowerCase();
      }
      if(v.startsWith('rgb')){
        const m = v.match(/(\d+)/g);
        if(m && m.length>=3) return rgbToHex(+m[0],+m[1],+m[2]);
      }
    }
    return null;
  };

  const addColor = (hex)=>{
    if(hex) colors.set(hex, (colors.get(hex)||0)+1);
  };

  // Extract colors from a fabric.Gradient's colorStops
  const extractGradientColors = (grad)=>{
    if(!grad || !grad.colorStops) return;
    grad.colorStops.forEach(stop=>{
      const c = stop.color || stop.color;
      addColor(toNormHex(c));
    });
  };

  // Walk fabric sub-objects if available (fabric.Group)
  if(group._objects){
    const walk = (objs)=>{
      objs.forEach(o=>{
        if(o._objects) walk(o._objects);
        ['fill','stroke'].forEach(prop=>{
          const v = o[prop];
          if(!v || v === 'none' || v === 'transparent') return;
          // Fabric.Gradient object (from SVG <linearGradient>/<radialGradient>)
          if(typeof v === 'object' && v.colorStops){
            extractGradientColors(v);
            return;
          }
          addColor(toNormHex(v));
        });
      });
    };
    walk(group._objects);
  }

  // Also scan _svgSource for gradient stop-colors (catches defs not on fabric objects)
  if(group._svgSource){
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(group._svgSource, 'image/svg+xml');
      doc.querySelectorAll('stop').forEach(stop=>{
        const sc = stop.getAttribute('stop-color');
        addColor(toNormHex(sc));
        const style = stop.getAttribute('style');
        if(style){
          const m = style.match(/stop-color\s*:\s*([^;]+)/i);
          if(m) addColor(toNormHex(m[1].trim()));
        }
      });
    } catch(e){ /* ignore parse errors */ }
  }

  return colors;
}

// Replace a specific color in all paths of an SVG fabric group.
// Handles both direct fill/stroke colors AND gradient stop-colors.
// Also updates _svgSource so preview and export stay in sync.
/* Recolor an SVG source string: replace all occurrences of oldHex in
   fill, stroke, and stop-color attributes/styles. Returns updated SVG string.
   Used by recolorRaster and propagateRecolorToSiblings to keep _svgSource
   in sync for correct PDF export. */
// Color distance helper: Euclidean RGB distance between two hex colors
function _hexColorDist(hex1, hex2){
  const a = hexToRgb(hex1), b = hexToRgb(hex2);
  const dr = a.r - b.r, dg = a.g - b.g, db = a.b - b.b;
  return Math.sqrt(dr*dr + dg*dg + db*db);
}

// Match helper: returns true if hex matches target exactly OR within tolerance
function _hexMatches(hexVal, targetHex, tolerance){
  if(!hexVal) return false;
  if(hexVal === targetHex) return true;
  if(tolerance > 0) return _hexColorDist(hexVal, targetHex) <= tolerance;
  return false;
}

function recolorSvgSourceString(svgStr, oldHex, newHex, tolerance){
  if(!svgStr) return svgStr;
  const old = oldHex.toLowerCase();
  const tol = tolerance || 0;
  const normHex = (v)=>{
    if(!v || typeof v !== 'string') return null;
    if(v.startsWith('#')){
      return v.length===4 ? '#'+v[1]+v[1]+v[2]+v[2]+v[3]+v[3] : v.toLowerCase();
    }
    if(v.startsWith('rgb')){
      const m = v.match(/(\d+)/g);
      if(m && m.length>=3) return rgbToHex(+m[0],+m[1],+m[2]);
    }
    return null;
  };
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgStr, 'image/svg+xml');
    doc.querySelectorAll('*').forEach(el=>{
      ['fill','stroke'].forEach(attr=>{
        const val = el.getAttribute(attr);
        if(val && !val.startsWith('url') && _hexMatches(normHex(val), old, tol)){
          el.setAttribute(attr, newHex);
        }
      });
      const style = el.getAttribute('style');
      if(style){
        let changed = false;
        const newStyle = style.replace(/(fill|stroke)\s*:\s*([^;]+)/gi, (match, prop, val)=>{
          const trimmed = val.trim();
          if(!trimmed.startsWith('url') && _hexMatches(normHex(trimmed), old, tol)){
            changed = true; return prop + ':' + newHex;
          }
          return match;
        });
        if(changed) el.setAttribute('style', newStyle);
      }
    });
    doc.querySelectorAll('stop').forEach(stop=>{
      const sc = stop.getAttribute('stop-color');
      if(sc && _hexMatches(normHex(sc), old, tol)) stop.setAttribute('stop-color', newHex);
      const style = stop.getAttribute('style');
      if(style){
        const newStyle = style.replace(/stop-color\s*:\s*([^;]+)/gi, (match, val)=>{
          if(_hexMatches(normHex(val.trim()), old, tol)) return 'stop-color:' + newHex;
          return match;
        });
        if(newStyle !== style) stop.setAttribute('style', newStyle);
      }
    });
    return new XMLSerializer().serializeToString(doc.documentElement);
  } catch(e){
    console.warn('[GSB] Failed to recolor SVG source string:', e);
    return svgStr;
  }
}

function recolorSvgPaths(group, oldHex, newHex, tolerance){
  if(!group || !group._objects) return;
  const old = oldHex.toLowerCase();
  const tol = tolerance || 0;

  const normHex = (v)=>{
    if(!v || typeof v !== 'string') return null;
    if(v.startsWith('#')){
      return v.length===4 ? '#'+v[1]+v[1]+v[2]+v[2]+v[3]+v[3] : v.toLowerCase();
    }
    if(v.startsWith('rgb')){
      const m = v.match(/(\d+)/g);
      if(m && m.length>=3) return rgbToHex(+m[0],+m[1],+m[2]);
    }
    return null;
  };

  // Recolor gradient stop-colors on a fabric.Gradient object
  const recolorGradient = (grad)=>{
    if(!grad || !grad.colorStops) return false;
    let changed = false;
    grad.colorStops.forEach(stop=>{
      const hex = normHex(stop.color);
      if(_hexMatches(hex, old, tol)){ stop.color = newHex; changed = true; }
    });
    return changed;
  };

  const walk = (objs)=>{
    objs.forEach(o=>{
      if(o._objects) walk(o._objects);
      ['fill','stroke'].forEach(prop=>{
        const v = o[prop];
        if(!v || v === 'none' || v === 'transparent') return;
        // Fabric.Gradient — update stop colors
        if(typeof v === 'object' && v.colorStops){
          if(recolorGradient(v)) o.dirty = true;
          return;
        }
        // Direct color string
        const hex = normHex(v);
        if(_hexMatches(hex, old, tol)) o.set(prop, newHex);
      });
    });
  };
  walk(group._objects);
  group.dirty = true;
  canvas.requestRenderAll();

  // --- Keep _svgSource in sync (single source of truth for export) ---
  if(group._svgSource){
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(group._svgSource, 'image/svg+xml');

      // 1. Update fill/stroke attributes on all elements
      doc.querySelectorAll('*').forEach(el=>{
        ['fill','stroke'].forEach(attr=>{
          const val = el.getAttribute(attr);
          // Skip gradient references like url(#id)
          if(val && !val.startsWith('url') && _hexMatches(normHex(val), old, tol)){
            el.setAttribute(attr, newHex);
          }
        });
        // Inline style fill/stroke
        const style = el.getAttribute('style');
        if(style){
          let changed = false;
          const newStyle = style.replace(/(fill|stroke)\s*:\s*([^;]+)/gi, (match, prop, val)=>{
            const trimmed = val.trim();
            if(!trimmed.startsWith('url') && _hexMatches(normHex(trimmed), old, tol)){
              changed = true; return prop + ':' + newHex;
            }
            return match;
          });
          if(changed) el.setAttribute('style', newStyle);
        }
      });

      // 2. Update gradient <stop> elements (stop-color attribute + inline style)
      doc.querySelectorAll('stop').forEach(stop=>{
        // stop-color as attribute
        const sc = stop.getAttribute('stop-color');
        if(sc && _hexMatches(normHex(sc), old, tol)) stop.setAttribute('stop-color', newHex);
        // stop-color in inline style
        const style = stop.getAttribute('style');
        if(style){
          const newStyle = style.replace(/stop-color\s*:\s*([^;]+)/gi, (match, val)=>{
            if(_hexMatches(normHex(val.trim()), old, tol)) return 'stop-color:' + newHex;
            return match;
          });
          if(newStyle !== style) stop.setAttribute('style', newStyle);
        }
      });

      group._svgSource = new XMLSerializer().serializeToString(doc.documentElement);
      if(group._originalId) svgSourceStore.set(group._originalId, group._svgSource);
    } catch(e){
      console.warn('[GSB] Failed to update _svgSource colors:', e);
    }
  }

  // Mark as recolored — export will use SVG track instead of embedPdf
  group._recolored = true;
}

/* Propagate a color change from the primary object to all its copies.
   CRITICAL: must NOT change positions, must NOT show extra toasts,
   must NOT call setActiveObject on siblings.
   Handles three cases:
   1. SVG group siblings → call recolorSvgPaths directly
   2. Rasterized PNG clones of SVG → update _svgSource + swap image element in-place
   3. Raster image siblings → pixel-replace in-place (no remove/add)        */
function propagateRecolorToSiblings(primaryObj, oldHex, newHex){
  const oid = primaryObj._originalId || primaryObj._id;
  const siblings = canvas.getObjects().filter(o =>
    (o._originalId || o._id) === oid && o !== primaryObj && o._mmW
  );
  if(!siblings.length) return;

  const isVector = primaryObj.type === 'group' && primaryObj._svgSource;

  if(isVector){
    // Separate SVG group clones from rasterized image clones
    const groupSibs = siblings.filter(s => s.type === 'group' && s._objects);
    const imageSibs = siblings.filter(s => s.type === 'image');

    // SVG group siblings: recolor their paths directly (no UI side effects)
    groupSibs.forEach(sib => {
      recolorSvgPaths(sib, oldHex, newHex);
    });

    // Rasterized PNG siblings: render the recolored primary once, then swap
    // each sibling's pixel data in-place. No position/scale changes.
    if(imageSibs.length > 0){
      const updatedSvg = primaryObj._svgSource;

      // Render the recolored primary to a data URL at same resolution as clones
      const rasterScale = 2;
      const rW = Math.round(primaryObj.width * (primaryObj.scaleX || 1) * rasterScale);
      const rH = Math.round(primaryObj.height * (primaryObj.scaleY || 1) * rasterScale);
      const tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = rW;
      tmpCanvas.height = rH;
      const tmpFab = new fabric.StaticCanvas(tmpCanvas, {
        width: rW, height: rH, backgroundColor: null, enableRetinaScaling: false,
      });
      primaryObj.clone(clone => {
        clone.set({
          originX: 'center', originY: 'center',
          left: rW / 2, top: rH / 2,
          scaleX: rW / clone.width,
          scaleY: rH / clone.height,
          angle: 0,
        });
        clone.setCoords();
        tmpFab.add(clone);
        tmpFab.renderAll();
        const dataUrl = tmpCanvas.toDataURL('image/png');
        tmpFab.dispose();

        // Swap each sibling's image element — preserve ALL position/scale/angle
        let done = 0;
        imageSibs.forEach(sib => {
          // Save all spatial properties before element swap
          const saved = {
            left: sib.left, top: sib.top,
            scaleX: sib.scaleX, scaleY: sib.scaleY,
            angle: sib.angle, originX: sib.originX, originY: sib.originY,
          };
          sib._svgSource = updatedSvg;
          sib._recolored = true;
          fabric.Image.fromURL(dataUrl, newImg => {
            sib.setElement(newImg.getElement());
            // Restore ALL spatial properties — setElement may change width/height
            sib.set(saved);
            // Recalculate scale for the new pixel dimensions
            sib.scaleX = (sib._mmW * displayPxPerMm) / sib.width;
            sib.scaleY = (sib._mmH * displayPxPerMm) / sib.height;
            sib.dirty = true;
            sib.setCoords();
            done++;
            if(done === imageSibs.length){
              canvas.requestRenderAll();
            }
          }, { crossOrigin: 'anonymous' });
        });
      }, FABRIC_EXTRA_PROPS);
    }
  } else {
    // Primary is raster (image type). Propagate to all siblings.
    // CRITICAL: also update group-type siblings (original SVG group) so their
    // _svgSource and Fabric paths stay in sync — otherwise PDF export uses stale colors.
    // Use tolerance because raster colors may not exactly match SVG colors
    // (rasterization merges similar colors, anti-aliasing shifts values).
    const groupSibs = siblings.filter(s => s.type === 'group' && s._objects);
    groupSibs.forEach(sib => {
      recolorSvgPaths(sib, oldHex, newHex, RASTER_COLOR_TOLERANCE);
    });

    // Raster copies: pixel-replace in-place without remove/add.
    const oldRgb = hexToRgb(oldHex);
    const newRgb = hexToRgb(newHex);
    const tolSq = RASTER_COLOR_TOLERANCE * RASTER_COLOR_TOLERANCE;

    siblings.forEach(sib => {
      if(sib.type !== 'image') return;
      const el = sib.getElement();
      const tmp = document.createElement('canvas');
      tmp.width = el.naturalWidth || el.width;
      tmp.height = el.naturalHeight || el.height;
      const ctx = tmp.getContext('2d');
      ctx.drawImage(el, 0, 0);
      const imgData = ctx.getImageData(0, 0, tmp.width, tmp.height);
      const px = imgData.data;
      for(let i = 0; i < px.length; i += 4){
        if(px[i+3] < 30) continue;
        const dr = px[i] - oldRgb.r, dg = px[i+1] - oldRgb.g, db = px[i+2] - oldRgb.b;
        if(dr*dr + dg*dg + db*db <= tolSq){
          px[i] = newRgb.r; px[i+1] = newRgb.g; px[i+2] = newRgb.b;
        }
      }
      ctx.putImageData(imgData, 0, 0);

      // Swap image element in-place — NO remove/add, NO position changes
      const saved = {
        left: sib.left, top: sib.top,
        scaleX: sib.scaleX, scaleY: sib.scaleY,
        angle: sib.angle, originX: sib.originX, originY: sib.originY,
      };
      // Update _svgSource so PDF export reflects the color change
      // Use tolerance: raster colors may not exactly match SVG source colors
      const sibSvg = getSvgSource(sib);
      if(sibSvg){
        sib._svgSource = recolorSvgSourceString(sibSvg, oldHex, newHex, RASTER_COLOR_TOLERANCE);
        sib._recolored = true;
      }

      fabric.Image.fromURL(tmp.toDataURL('image/png'), newImg => {
        sib.setElement(newImg.getElement());
        sib.set(saved);
        sib.scaleX = (sib._mmW * displayPxPerMm) / sib.width;
        sib.scaleY = (sib._mmH * displayPxPerMm) / sib.height;
        sib.dirty = true;
        sib.setCoords();
      }, { crossOrigin: 'anonymous' });
    });
    // Single render after all siblings processed
    setTimeout(() => canvas.requestRenderAll(), 150);
  }
}

// ---- Make logo monochrome (all colors → single target color) ----
// Works for both SVG groups and raster images. Updates all siblings + _svgSource.
function makeLogoMonochrome(targetHex){
  const obj = getSelectedObj();
  if(!obj) return;
  pushUndo();

  const isVector = obj.type === 'group';
  const origId = obj._originalId || obj._id;

  // Collect ALL objects in this logo group (primary + siblings)
  const allCopies = canvas.getObjects().filter(o =>
    ((o._originalId || o._id) === origId) && o._mmW
  );

  // Unified monochrome: handle each copy based on its OWN type, not the selected object's type.
  // This ensures both group (SVG source) and image (raster copies) are always updated.
  allCopies.forEach(copy => {
    if(copy.type === 'group'){
      // SVG group: recolor fabric paths to target
      const colors = extractSvgColors(copy);
      const colorList = [...colors.keys()].filter(h => h.toLowerCase() !== targetHex.toLowerCase());
      colorList.forEach(oldHex => recolorSvgPaths(copy, oldHex, targetHex));
    } else if(copy.type === 'image'){
      // Raster: pixel-level replacement
      _monoRasterInPlace(copy, targetHex);
    }
    // Comprehensive _svgSource rewrite for PDF export
    const copySvg = getSvgSource(copy);
    if(copySvg){
      copy._svgSource = _makeMonoSvgSource(copySvg, targetHex);
      copy._recolored = true;
    }
  });

  invalidateThumb(origId);
  setTimeout(() => canvas.requestRenderAll(), 150);
  toast(t('colorMadeMono'), 'success', 2000);
  // Re-render color section to show updated single-color swatches
  setTimeout(() => renderSelectedPanel(), 200);
}

// Comprehensive SVG source monochrome conversion.
// Replaces ALL fill, stroke, stop-color values with targetHex,
// regardless of format (hex, rgb, named colors, shorthand).
// Only skips 'none', 'transparent', 'url()', and the target color itself.
function _makeMonoSvgSource(svgStr, targetHex){
  if(!svgStr) return svgStr;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgStr, 'image/svg+xml');
    const parseErr = doc.querySelector('parsererror');
    if(parseErr) return svgStr; // can't parse, return as-is

    const target = targetHex.toLowerCase();
    const isTarget = (val) => {
      if(!val) return true;
      const v = val.trim().toLowerCase();
      if(v === 'none' || v === 'transparent' || v.startsWith('url')) return true;
      // Normalize to hex for comparison
      let hex = null;
      if(v.startsWith('#')){
        hex = v.length===4 ? '#'+v[1]+v[1]+v[2]+v[2]+v[3]+v[3] : v;
      } else if(v.startsWith('rgb')){
        const m = v.match(/(\d+)/g);
        if(m && m.length>=3) hex = rgbToHex(+m[0],+m[1],+m[2]);
      }
      return hex === target;
    };

    // Replace fill/stroke attributes on all elements
    doc.querySelectorAll('*').forEach(el=>{
      ['fill','stroke'].forEach(attr=>{
        const val = el.getAttribute(attr);
        if(val && !isTarget(val)){
          el.setAttribute(attr, targetHex);
        }
      });
      // Inline styles
      const style = el.getAttribute('style');
      if(style){
        let changed = false;
        const newStyle = style.replace(/(fill|stroke)\s*:\s*([^;]+)/gi, (match, prop, val)=>{
          if(!isTarget(val.trim())){ changed = true; return prop + ':' + targetHex; }
          return match;
        });
        if(changed) el.setAttribute('style', newStyle);
      }
    });

    // Replace gradient stop-colors
    doc.querySelectorAll('stop').forEach(stop=>{
      const sc = stop.getAttribute('stop-color');
      if(sc && !isTarget(sc)) stop.setAttribute('stop-color', targetHex);
      const style = stop.getAttribute('style');
      if(style){
        const newStyle = style.replace(/stop-color\s*:\s*([^;]+)/gi, (match, val)=>{
          if(!isTarget(val.trim())) return 'stop-color:' + targetHex;
          return match;
        });
        if(newStyle !== style) stop.setAttribute('style', newStyle);
      }
    });

    // Replace colors in <style> blocks (CSS rules)
    doc.querySelectorAll('style').forEach(styleEl=>{
      let css = styleEl.textContent;
      if(!css) return;
      let changed = false;
      css = css.replace(/(fill|stroke|stop-color)\s*:\s*([^;}]+)/gi, (match, prop, val)=>{
        if(!isTarget(val.trim())){ changed = true; return prop + ':' + targetHex; }
        return match;
      });
      if(changed) styleEl.textContent = css;
    });

    return new XMLSerializer().serializeToString(doc.documentElement);
  } catch(e){
    console.warn('[GSB] _makeMonoSvgSource failed:', e);
    return svgStr;
  }
}

// Helper: replace ALL non-transparent pixels in a raster image with targetHex.
// Modifies the image element in-place (no remove/add).
function _monoRasterInPlace(obj, targetHex){
  if(obj.type !== 'image') return;
  const el = obj.getElement();
  const tmp = document.createElement('canvas');
  tmp.width = el.naturalWidth || el.width;
  tmp.height = el.naturalHeight || el.height;
  const ctx = tmp.getContext('2d');
  ctx.drawImage(el, 0, 0);
  const imgData = ctx.getImageData(0, 0, tmp.width, tmp.height);
  const px = imgData.data;
  const rgb = hexToRgb(targetHex);

  for(let i = 0; i < px.length; i += 4){
    if(px[i+3] < 30) continue; // keep transparent pixels
    px[i] = rgb.r; px[i+1] = rgb.g; px[i+2] = rgb.b;
  }
  ctx.putImageData(imgData, 0, 0);

  const saved = {
    left: obj.left, top: obj.top, scaleX: obj.scaleX, scaleY: obj.scaleY,
    angle: obj.angle, originX: obj.originX, originY: obj.originY,
  };
  fabric.Image.fromURL(tmp.toDataURL('image/png'), newImg => {
    obj.setElement(newImg.getElement());
    obj.set(saved);
    obj.scaleX = (obj._mmW * displayPxPerMm) / obj.width;
    obj.scaleY = (obj._mmH * displayPxPerMm) / obj.height;
    obj.dirty = true;
    obj.setCoords();
  }, { crossOrigin: 'anonymous' });
}

// Helper: extract all unique hex colors from an SVG source string.
function _extractColorsFromSvgSource(svgStr){
  const colors = new Set();
  if(!svgStr) return colors;
  const hexRe = /#([0-9a-fA-F]{3,8})\b/g;
  let m;
  while((m = hexRe.exec(svgStr)) !== null){
    let h = m[1].toLowerCase();
    if(h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    if(h.length === 6) colors.add('#' + h);
  }
  // Also match rgb() in inline styles
  const rgbRe = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g;
  while((m = rgbRe.exec(svgStr)) !== null){
    colors.add(rgbToHex(parseInt(m[1]), parseInt(m[2]), parseInt(m[3])));
  }
  return colors;
}

// ---- Raster color detection & replacement ----
const RASTER_COLOR_TOLERANCE = 60; // Euclidean RGB distance for recolor matching

// Extract dominant colors from a raster fabric.Image.
// Two-pass clustering: first collect rough clusters, then merge small ones
// into the nearest large cluster. Skips near-white (anti-alias/bg) pixels.
// Returns a Map of hex → pixel count, max 6 representative colors.
function extractRasterColors(obj){
  const result = new Map();
  if(!obj || obj.type !== 'image') return result;
  const el = obj.getElement();
  const tmp = document.createElement('canvas');
  const w = el.naturalWidth || el.width || 1;
  const h = el.naturalHeight || el.height || 1;
  const maxPixels = 200000;
  const stride = Math.max(1, Math.round(Math.sqrt((w*h)/maxPixels)));
  tmp.width = w; tmp.height = h;
  const ctx = tmp.getContext('2d');
  ctx.drawImage(el, 0, 0);
  const data = ctx.getImageData(0, 0, w, h).data;

  // Pass 1: collect clusters with generous tolerance
  const CLUSTER_TOL = 80;
  const tolSq = CLUSTER_TOL * CLUSTER_TOL;
  const clusters = []; // [{r,g,b,count,sumR,sumG,sumB}]
  let whiteCount = 0;  // track near-white pixels separately
  let totalSampled = 0;

  for(let y = 0; y < h; y += stride){
    for(let x = 0; x < w; x += stride){
      const i = (y * w + x) * 4;
      if(data[i+3] < 30) continue; // skip transparent
      totalSampled++;
      const pr = data[i], pg = data[i+1], pb = data[i+2];
      // Count near-white pixels but don't skip — add as cluster if dominant
      if(pr > 240 && pg > 240 && pb > 240){ whiteCount++; continue; }

      // Find closest existing cluster
      let bestIdx = -1, bestDist = Infinity;
      for(let c = 0; c < clusters.length; c++){
        const cl = clusters[c];
        const dr = pr-cl.r, dg = pg-cl.g, db = pb-cl.b;
        const dist = dr*dr + dg*dg + db*db;
        if(dist < bestDist){ bestDist = dist; bestIdx = c; }
      }
      if(bestIdx >= 0 && bestDist <= tolSq){
        const cl = clusters[bestIdx];
        cl.sumR += pr; cl.sumG += pg; cl.sumB += pb;
        cl.count++;
        // Update center to running average for better clustering
        cl.r = Math.round(cl.sumR / cl.count);
        cl.g = Math.round(cl.sumG / cl.count);
        cl.b = Math.round(cl.sumB / cl.count);
      } else {
        clusters.push({r:pr, g:pg, b:pb, count:1, sumR:pr, sumG:pg, sumB:pb});
      }
    }
  }

  // If white pixels are significant (>10% of non-transparent), include as cluster
  if(whiteCount > totalSampled * 0.10){
    clusters.push({r:255, g:255, b:255, count:whiteCount, sumR:255*whiteCount, sumG:255*whiteCount, sumB:255*whiteCount});
  }

  // Pass 2: merge small clusters into nearest large one
  clusters.sort((a,b) => b.count - a.count);
  const totalPixels = clusters.reduce((s,c) => s + c.count, 0);
  const minSize = totalPixels * 0.02; // clusters under 2% get merged
  const merged = [];

  for(const cl of clusters){
    if(cl.count >= minSize || merged.length === 0){
      merged.push(cl);
    } else {
      // Find nearest merged cluster
      let bestIdx = 0, bestDist = Infinity;
      for(let m = 0; m < merged.length; m++){
        const mc = merged[m];
        const dr = cl.r-mc.r, dg = cl.g-mc.g, db = cl.b-mc.b;
        const dist = dr*dr + dg*dg + db*db;
        if(dist < bestDist){ bestDist = dist; bestIdx = m; }
      }
      merged[bestIdx].count += cl.count;
    }
  }

  // Pass 3: merge remaining clusters that are close to each other.
  // This catches shadow/highlight variants of the same base color
  // (e.g. dark-red and mid-red) while keeping truly distinct colors apart.
  const MERGE_DIST_SQ = 120 * 120; // generous for shade variants
  merged.sort((a,b) => b.count - a.count);
  const final = [];
  for(const cl of merged){
    let absorbed = false;
    for(const fc of final){
      const dr = cl.r-fc.r, dg = cl.g-fc.g, db = cl.b-fc.b;
      if(dr*dr + dg*dg + db*db <= MERGE_DIST_SQ){
        fc.count += cl.count; // absorb into dominant cluster (keep its color)
        absorbed = true;
        break;
      }
    }
    if(!absorbed) final.push(cl);
  }

  // Also skip near-black if there's a dominant color (likely shadow/outline)
  const hasColor = final.some(c => (c.r > 40 || c.g > 40 || c.b > 40));
  const filtered = hasColor
    ? final.filter(c => !(c.r < 25 && c.g < 25 && c.b < 25) || c.count > totalPixels * 0.15)
    : final;

  // Return max 4 colors
  filtered.sort((a,b) => b.count - a.count);
  filtered.slice(0, 4).forEach(cl => {
    result.set(rgbToHex(cl.r, cl.g, cl.b), cl.count);
  });
  return result;
}

// Replace all pixels within TOLERANCE of oldColor with exactly newColor.
// Single-pass: every matching pixel becomes the exact same new color.
function recolorRaster(obj, oldHex, newHex){
  if(!obj || obj.type !== 'image') return;
  const oldRgb = hexToRgb(oldHex);
  const newRgb = hexToRgb(newHex);
  const tol = RASTER_COLOR_TOLERANCE;
  const tolSq = tol * tol;
  const el = obj.getElement();
  const tmp = document.createElement('canvas');
  tmp.width = el.naturalWidth || el.width;
  tmp.height = el.naturalHeight || el.height;
  const ctx = tmp.getContext('2d');
  ctx.drawImage(el, 0, 0);
  const imgData = ctx.getImageData(0, 0, tmp.width, tmp.height);
  const px = imgData.data;
  for(let i = 0; i < px.length; i += 4){
    if(px[i+3] < 30) continue;
    const dr = px[i] - oldRgb.r;
    const dg = px[i+1] - oldRgb.g;
    const db = px[i+2] - oldRgb.b;
    if(dr*dr + dg*dg + db*db <= tolSq){
      px[i]   = newRgb.r;
      px[i+1] = newRgb.g;
      px[i+2] = newRgb.b;
    }
  }
  ctx.putImageData(imgData, 0, 0);
  fabric.Image.fromURL(tmp.toDataURL('image/png'), newImg=>{
    newImg.set({
      left: obj.left, top: obj.top, angle: obj.angle, flipX: obj.flipX, flipY: obj.flipY,
      scaleX: obj.scaleX, scaleY: obj.scaleY,
      originX: obj.originX, originY: obj.originY,
    });
    newImg._id = obj._id;
    newImg._originalId = obj._originalId;
    newImg._name = obj._name;
    newImg._naturalW = tmp.width;
    newImg._naturalH = tmp.height;
    newImg._mmW = obj._mmW;
    newImg._mmH = obj._mmH;
    newImg._mmLeft = obj._mmLeft;
    newImg._mmTop = obj._mmTop;
    newImg._vectorOrigin = obj._vectorOrigin;
    if(obj._embeddedRasterW) newImg._embeddedRasterW = obj._embeddedRasterW;
    if(obj._embeddedRasterH) newImg._embeddedRasterH = obj._embeddedRasterH;
    if(obj._pdfPageW) newImg._pdfPageW = obj._pdfPageW;
    if(obj._pdfPageH) newImg._pdfPageH = obj._pdfPageH;
    if(obj._isFillTile) newImg._isFillTile = obj._isFillTile;

    // Update _svgSource with the new color so PDF export reflects the change
    // Use tolerance: raster-extracted colors may not exactly match SVG source hex values
    const objSvg = getSvgSource(obj);
    if(objSvg){
      newImg._svgSource = recolorSvgSourceString(objSvg, oldHex, newHex, RASTER_COLOR_TOLERANCE);
      newImg._recolored = true;
    }

    attachObjListeners(newImg);
    // Suppress panel rebuild so the color picker stays open
    _suppressPanelRebuild = true;
    canvas.remove(obj);
    canvas.add(newImg);
    canvas.setActiveObject(newImg);
    canvas.requestRenderAll();
    _suppressPanelRebuild = false;
    state.selectedId = newImg._id;
    renderItemList();
    toast(t('colorChanged'), 'success', 2000);
  });
}

/* =========================================================
   SELECTION / SELECTED PANEL
   ========================================================= */
let _suppressPanelRebuild = false;
canvas.on('selection:created', e=>{ state.selectedId = e.selected[0]?._id; updateBgRemoveBtn(); updateFillBtn(); if(!_suppressPanelRebuild) renderSelectedPanel(); renderItemList(); });
canvas.on('selection:updated', e=>{ state.selectedId = e.selected[0]?._id; updateBgRemoveBtn(); updateFillBtn(); if(!_suppressPanelRebuild) renderSelectedPanel(); renderItemList(); });
canvas.on('selection:cleared', ()=>{ state.selectedId = null; updateBgRemoveBtn(); updateFillBtn(); renderSelectedPanel(); renderItemList(); });

function getSelectedObj(){ return canvas.getActiveObject(); }

function renderSelectedPanel(){
  const panel = document.getElementById('selectedPanel');
  const section = document.getElementById('selectedSection');
  const obj = getSelectedObj();

  // Check for multi-select
  if(obj && obj.type === 'activeSelection'){
    const count = obj._objects?.length || 0;
    panel.innerHTML = `
      <div style="padding:12px;background:var(--bg-light);border-radius:8px;text-align:center;margin-bottom:12px">
        <p style="margin:0;font-size:0.9rem;color:var(--text);font-weight:700">${count} ${t('selectMultiple')}</p>
      </div>
      <div class="toolbar" style="margin-bottom:8px">
        <button class="tool-btn" data-act="multi-rot" style="flex:1">${t('rotateMultiple')}</button>
        <button class="tool-btn" data-act="multi-dup" style="flex:1">${t('duplicateMultiple')}</button>
        <button class="tool-btn" data-act="multi-del" style="flex:1;background:#fee2e2;color:#dc2626">${t('deleteMultiple')}</button>
      </div>
      <div class="panel-group" style="margin-bottom:8px">
        <div class="panel-group-title">${t('alignLabel')}</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:3px;margin-bottom:4px">
          <button class="tool-btn align-icon-btn" data-act="align-left" title="${t('alignLeft')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="1" y="1" width="1.5" height="14" fill="currentColor"/><rect x="4" y="3" width="10" height="4" rx=".5" fill="currentColor" opacity=".5"/><rect x="4" y="9" width="6" height="4" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
          <button class="tool-btn align-icon-btn" data-act="align-center-h" title="${t('alignCenterH')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="7.25" y="1" width="1.5" height="14" fill="currentColor"/><rect x="2" y="3" width="12" height="4" rx=".5" fill="currentColor" opacity=".5"/><rect x="4" y="9" width="8" height="4" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
          <button class="tool-btn align-icon-btn" data-act="align-right" title="${t('alignRight')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="13.5" y="1" width="1.5" height="14" fill="currentColor"/><rect x="2" y="3" width="10" height="4" rx=".5" fill="currentColor" opacity=".5"/><rect x="6" y="9" width="6" height="4" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
          <button class="tool-btn align-icon-btn" data-act="distribute-h" title="${t('distributeH')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="1" y="1" width="1" height="14" fill="currentColor" opacity=".4"/><rect x="14" y="1" width="1" height="14" fill="currentColor" opacity=".4"/><rect x="3.5" y="4" width="3" height="8" rx=".5" fill="currentColor" opacity=".5"/><rect x="9.5" y="4" width="3" height="8" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:3px">
          <button class="tool-btn align-icon-btn" data-act="align-top" title="${t('alignTop')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="1" y="1" width="14" height="1.5" fill="currentColor"/><rect x="3" y="4" width="4" height="10" rx=".5" fill="currentColor" opacity=".5"/><rect x="9" y="4" width="4" height="6" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
          <button class="tool-btn align-icon-btn" data-act="align-center-v" title="${t('alignCenterV')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="1" y="7.25" width="14" height="1.5" fill="currentColor"/><rect x="3" y="2" width="4" height="12" rx=".5" fill="currentColor" opacity=".5"/><rect x="9" y="4" width="4" height="8" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
          <button class="tool-btn align-icon-btn" data-act="align-bottom" title="${t('alignBottom')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="1" y="13.5" width="14" height="1.5" fill="currentColor"/><rect x="3" y="3" width="4" height="10" rx=".5" fill="currentColor" opacity=".5"/><rect x="9" y="7" width="4" height="6" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
          <button class="tool-btn align-icon-btn" data-act="distribute-v" title="${t('distributeV')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="1" y="1" width="14" height="1" fill="currentColor" opacity=".4"/><rect x="1" y="14" width="14" height="1" fill="currentColor" opacity=".4"/><rect x="4" y="3.5" width="8" height="3" rx=".5" fill="currentColor" opacity=".5"/><rect x="4" y="9.5" width="8" height="3" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
        </div>
      </div>
      <div class="panel-group" style="margin-bottom:8px">
        <div class="panel-group-title">${t('alignCanvasLabel')}</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin-bottom:4px">
          <button class="tool-btn align-icon-btn" data-act="canvas-align-left" title="${t('alignLeft')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="0" y="0" width="16" height="16" fill="currentColor" opacity=".07" rx="1"/><rect x="1" y="1" width="1.5" height="14" fill="currentColor"/><rect x="4" y="5" width="8" height="6" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
          <button class="tool-btn align-icon-btn" data-act="canvas-align-center-h" title="${t('alignCenterH')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="0" y="0" width="16" height="16" fill="currentColor" opacity=".07" rx="1"/><rect x="7.25" y="1" width="1.5" height="14" fill="currentColor"/><rect x="4" y="5" width="8" height="6" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
          <button class="tool-btn align-icon-btn" data-act="canvas-align-right" title="${t('alignRight')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="0" y="0" width="16" height="16" fill="currentColor" opacity=".07" rx="1"/><rect x="13.5" y="1" width="1.5" height="14" fill="currentColor"/><rect x="4" y="5" width="8" height="6" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:3px">
          <button class="tool-btn align-icon-btn" data-act="canvas-align-top" title="${t('alignTop')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="0" y="0" width="16" height="16" fill="currentColor" opacity=".07" rx="1"/><rect x="1" y="1" width="14" height="1.5" fill="currentColor"/><rect x="5" y="4" width="6" height="8" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
          <button class="tool-btn align-icon-btn" data-act="canvas-align-center-v" title="${t('alignCenterV')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="0" y="0" width="16" height="16" fill="currentColor" opacity=".07" rx="1"/><rect x="1" y="7.25" width="14" height="1.5" fill="currentColor"/><rect x="5" y="4" width="6" height="8" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
          <button class="tool-btn align-icon-btn" data-act="canvas-align-bottom" title="${t('alignBottom')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="0" y="0" width="16" height="16" fill="currentColor" opacity=".07" rx="1"/><rect x="1" y="13.5" width="14" height="1.5" fill="currentColor"/><rect x="5" y="4" width="6" height="8" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
        </div>
      </div>
    `;
    // Wire up ALL buttons with data-act in the multi-select panel
    panel.querySelectorAll('[data-act]').forEach(b=>{
      b.onclick = ()=>actOnSelected(b.dataset.act);
    });
    if(section) section.classList.add('highlight');
    return;
  }

  if(!obj || !obj._mmW){
    panel.innerHTML = `<p class="empty">${t('selectEmpty')}</p>`;
    if(section) section.classList.remove('highlight');
    return;
  }
  // Flash gradient border on selection
  if(section){
    section.classList.remove('highlight');
    void section.offsetWidth;
    section.classList.add('highlight');
  }
  const isVector = !!(obj.type === 'group' && obj._svgSource);
  const hasEmbeddedRaster = !!(isVector && obj._embeddedRasterW);
  const isPureVector = isVector && !hasEmbeddedRaster;
  const dpi = dpiStatus(calcEffectiveDpi(obj));
  const unit = state.unit;
  // Show VISUAL dimensions — at 90°/270° these are swapped vs logical _mmW/_mmH.
  // The user sees a visually wide/tall logo and expects breedte/hoogte to match.
  const dispW = visMmW(obj);
  const dispH = visMmH(obj);
  const w = unit==='mm' ? dispW.toFixed(1) : (dispW/10).toFixed(2);
  const h = unit==='mm' ? dispH.toFixed(1) : (dispH/10).toFixed(2);
  const curAngle = Math.round(((obj.angle||0)%360+360)%360);
  const isRaster = (obj.type === 'image') && !obj._vectorOrigin;
  const thrVal = document.getElementById('bgThreshold')?.value || 240;

  panel.innerHTML = `
    ${(obj.type === 'image' || obj.type === 'group') ? `
    <!-- ── Logo bewerken (prominent) ── -->
    <button data-act="edit-logo" style="width:100%;padding:10px 16px;margin-bottom:12px;border:none;border-radius:10px;background:linear-gradient(135deg,#F97316,#EA580C);color:#fff;font-size:.88rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:filter .15s;box-shadow:0 2px 8px rgba(249,115,22,.25)" onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter=''">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      Logo bewerken
    </button>` : ''}

    <!-- ── TRANSFORM group ── -->
    <div class="panel-group">
      <div class="panel-group-title">${t('sectionTransform')}</div>

      <div class="panel-row-label">${t('logoSize')}</div>
      <div class="size-row" style="margin-bottom:10px">
        <div class="field">
          <label>${t('width')} (${unit})</label>
          <input type="number" step="0.1" id="inpW" value="${w}">
        </div>
        <button type="button" class="ratio-lock${_ratioLocked?' active':''}" id="ratioLockBtn" title="${_ratioLocked?t('ratioLock'):t('ratioUnlock')}" aria-label="${t('ratioLock')}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            ${_ratioLocked?'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>':'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M17 11V7a5 5 0 0 0-10 0"></path>'}
          </svg>
        </button>
        <div class="field">
          <label>${t('height')} (${unit})</label>
          <input type="number" step="0.1" id="inpH" value="${h}">
        </div>
      </div>

      ${state.manualMode ? `
      <div class="panel-row-label">${t('rotation')}</div>
      <div class="field" style="margin-bottom:0">
        <div class="rot-slider-head">
          <label style="margin:0">${t('rotation')}</label>
          <div class="rot-val" id="rotVal">${curAngle}°</div>
        </div>
        <input type="range" min="0" max="360" step="1" value="${curAngle}" id="rotSlider" class="rot-slider">
        <div class="rot-chips" id="rotChips">
          <button data-rot="0">0°</button>
          <button data-rot="90">90°</button>
          <button data-rot="180">180°</button>
          <button data-rot="270">270°</button>
        </div>
      </div>` : ''}
    </div>

    <!-- ── ALIGN TO SHEET group ── -->
    <div class="panel-group">
      <div class="panel-group-title">${t('alignCanvasLabel')}</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin-bottom:4px">
        <button class="tool-btn align-icon-btn" data-act="canvas-align-left" title="${t('alignLeft')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="0" y="0" width="16" height="16" fill="currentColor" opacity=".07" rx="1"/><rect x="1" y="1" width="1.5" height="14" fill="currentColor"/><rect x="4" y="5" width="8" height="6" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
        <button class="tool-btn align-icon-btn" data-act="canvas-align-center-h" title="${t('alignCenterH')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="0" y="0" width="16" height="16" fill="currentColor" opacity=".07" rx="1"/><rect x="7.25" y="1" width="1.5" height="14" fill="currentColor"/><rect x="4" y="5" width="8" height="6" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
        <button class="tool-btn align-icon-btn" data-act="canvas-align-right" title="${t('alignRight')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="0" y="0" width="16" height="16" fill="currentColor" opacity=".07" rx="1"/><rect x="13.5" y="1" width="1.5" height="14" fill="currentColor"/><rect x="4" y="5" width="8" height="6" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:3px">
        <button class="tool-btn align-icon-btn" data-act="canvas-align-top" title="${t('alignTop')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="0" y="0" width="16" height="16" fill="currentColor" opacity=".07" rx="1"/><rect x="1" y="1" width="14" height="1.5" fill="currentColor"/><rect x="5" y="4" width="6" height="8" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
        <button class="tool-btn align-icon-btn" data-act="canvas-align-center-v" title="${t('alignCenterV')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="0" y="0" width="16" height="16" fill="currentColor" opacity=".07" rx="1"/><rect x="1" y="7.25" width="14" height="1.5" fill="currentColor"/><rect x="5" y="4" width="6" height="8" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
        <button class="tool-btn align-icon-btn" data-act="canvas-align-bottom" title="${t('alignBottom')}"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="0" y="0" width="16" height="16" fill="currentColor" opacity=".07" rx="1"/><rect x="1" y="13.5" width="14" height="1.5" fill="currentColor"/><rect x="5" y="4" width="6" height="8" rx=".5" fill="currentColor" opacity=".5"/></svg></button>
      </div>
    </div>

    <div id="colorSection" style="display:none"></div>

    <!-- ── INFO group ── -->
    <div class="panel-group">
      <div class="panel-group-title">${t('sectionInfo')}</div>

      <div class="panel-row-label">${isPureVector ? t('quality') : t('dpiAt')}</div>
      <div class="field" style="margin-bottom:0">
        <div><span class="dpi-pill ${dpi.cls}">${dpi.label}</span></div>
        ${hasEmbeddedRaster ? `<p class="dpi-hint">${t('embeddedRasterHint')}</p>` : ''}
        ${!isVector ? `<p class="dpi-hint">${t('dpiHint')}</p>` : ''}
      </div>
    </div>
  `;

  /* ── Wiring ── */
  panel.querySelectorAll('[data-act]').forEach(b=>{
    b.onclick = ()=>actOnSelected(b.dataset.act);
  });
  document.getElementById('inpW').onchange = e=>setSizeMm('w', parseFloat(e.target.value));
  document.getElementById('inpH').onchange = e=>setSizeMm('h', parseFloat(e.target.value));

  // Ratio lock button
  const lockBtn = document.getElementById('ratioLockBtn');
  if(lockBtn){
    lockBtn.classList.toggle('active', _ratioLocked);
    lockBtn.onclick = ()=>{
      _ratioLocked = !_ratioLocked;
      lockBtn.classList.toggle('active', _ratioLocked);
      lockBtn.title = _ratioLocked ? t('ratioLock') : t('ratioUnlock');
      // Update lock icon: locked vs unlocked
      lockBtn.innerHTML = _ratioLocked
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M17 11V7a5 5 0 0 0-10 0"></path></svg>';
      // Also toggle Fabric's interactive scaling lock on current object
      const cur = getSelectedObj();
      if(cur){
        cur.lockUniScaling = _ratioLocked;
        canvas.requestRenderAll();
      }
    };
  }

  // Bg remove (raster only)
  const bgBtn = document.getElementById('bgRemoveBtn');
  const bgThr = document.getElementById('bgThreshold');
  const thrValEl = document.getElementById('thrVal');
  if(bgBtn && bgThr){
    bgThr.oninput = e=>{ if(thrValEl) thrValEl.textContent = e.target.value; };
    bgBtn.onclick = ()=>{
      const curr = getSelectedObj();
      if(!curr || curr.type !== 'image') return;
      removeWhiteBg(curr, parseInt(bgThr.value, 10));
    };
  }

  // Colors
  buildColorEditor(obj, isVector);

  // Rotation slider — only wired in manual mode
  const slider = document.getElementById('rotSlider');
  const valEl  = document.getElementById('rotVal');
  const chips  = panel.querySelectorAll('#rotChips button');
  if(!slider || !valEl) return;
  let rotTimer = null;
  const markActiveChip = (a)=>{
    chips.forEach(b=>b.classList.toggle('active', parseInt(b.dataset.rot,10) === a));
  };
  const applyRot = (a, immediate)=>{
    a = ((Math.round(a)%360)+360)%360;
    valEl.textContent = a + '°';
    slider.value = a;
    obj.rotate(a);
    canvas.requestRenderAll();
    markActiveChip(a);
    clearTimeout(rotTimer);
    if(immediate){
      syncMmFromPx(obj); clampObjToSheet(obj);
    } else {
      rotTimer = setTimeout(()=>{ syncMmFromPx(obj); clampObjToSheet(obj); }, 150);
    }
  };
  markActiveChip(curAngle);
  slider.addEventListener('input', e=> applyRot(parseInt(e.target.value, 10), false));
  slider.addEventListener('change', e=> applyRot(parseInt(e.target.value, 10), true));
  chips.forEach(b=>{
    b.onclick = ()=> applyRot(parseInt(b.dataset.rot,10), true);
  });
}

/* ---- Color editor injected into selected panel ---- */
function buildColorEditor(obj, isVector){
  const section = document.getElementById('colorSection');
  if(!section) return;

  // Gradient files (AI/PDF with gradients): disable recolor — show hint in color section
  if(obj._hasGradients){
    section.innerHTML = `<p class="color-hint" style="color:#b45309">Dit bestand bevat kleurverlopen (gradients). Kleuren in dit bestand kunnen daarom niet aangepast worden. Upload een versie zonder gradient of als SVG voor volledige bewerking.</p>`;
    return;
  }

  if(isVector){
    // SVG: extract colors and show swatches
    const colors = extractSvgColors(obj);
    if(!colors.size){
      section.innerHTML = `<p class="color-hint">${t('colorNoColors')}</p>`;
      return;
    }
    const sorted = [...colors.entries()].sort((a,b)=>b[1]-a[1]);
    let html = `<p class="color-hint">${t('colorClickToChange')}</p><div class="color-swatches">`;
    sorted.forEach(([hex])=>{
      html += `<div class="color-swatch" data-hex="${hex}" style="background:${hex}" title="${hex}"></div>`;
    });
    html += `</div>`;
    // Quick-action monochrome buttons
    html += `<div class="mono-btns" style="display:flex;gap:6px;margin:8px 0">`;
    html += `<button class="mono-btn mono-white" title="${t('colorMakeWhite')}" style="flex:1;padding:6px 0;border:1px solid #ccc;border-radius:6px;cursor:pointer;font-size:.8rem;background:#fff;color:#333">${t('colorMakeWhite')}</button>`;
    html += `<button class="mono-btn mono-black" title="${t('colorMakeBlack')}" style="flex:1;padding:6px 0;border:1px solid #333;border-radius:6px;cursor:pointer;font-size:.8rem;background:#222;color:#fff">${t('colorMakeBlack')}</button>`;
    html += `</div>`;
    html += `<div id="colorEditArea"></div>`;
    section.innerHTML = html;

    // Wire up monochrome buttons
    section.querySelector('.mono-white')?.addEventListener('click', ()=> makeLogoMonochrome('#ffffff'));
    section.querySelector('.mono-black')?.addEventListener('click', ()=> makeLogoMonochrome('#000000'));

    section.querySelectorAll('.color-swatch').forEach(sw=>{
      sw.onclick = ()=>{
        section.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('active'));
        sw.classList.add('active');
        showColorPicker(sw.dataset.hex, (newHex)=>{
          pushUndo();
          const oldHex = sw.dataset.hex;
          recolorSvgPaths(obj, oldHex, newHex);
          propagateRecolorToSiblings(obj, oldHex, newHex);
          invalidateThumb(obj._originalId || obj._id);
          sw.style.background = newHex;
          sw.dataset.hex = newHex;
          toast(t('colorChanged'), 'success', 2000);
        });
      };
    });
  } else {
    // Raster: detect dominant colors and allow replacement (same UX as SVG)
    const colors = extractRasterColors(obj);
    if(!colors.size){
      section.innerHTML = `<p class="color-hint">${t('colorNoColors')}</p>`;
      return;
    }
    const sorted = [...colors.entries()].sort((a,b)=>b[1]-a[1]);
    let html = `<p class="color-hint">${t('colorClickToChange')}</p><div class="color-swatches">`;
    sorted.forEach(([hex])=>{
      html += `<div class="color-swatch" data-hex="${hex}" style="background:${hex}" title="${hex}"></div>`;
    });
    html += `</div>`;
    // Quick-action monochrome buttons
    html += `<div class="mono-btns" style="display:flex;gap:6px;margin:8px 0">`;
    html += `<button class="mono-btn mono-white" title="${t('colorMakeWhite')}" style="flex:1;padding:6px 0;border:1px solid #ccc;border-radius:6px;cursor:pointer;font-size:.8rem;background:#fff;color:#333">${t('colorMakeWhite')}</button>`;
    html += `<button class="mono-btn mono-black" title="${t('colorMakeBlack')}" style="flex:1;padding:6px 0;border:1px solid #333;border-radius:6px;cursor:pointer;font-size:.8rem;background:#222;color:#fff">${t('colorMakeBlack')}</button>`;
    html += `</div>`;
    html += `<div id="colorEditArea"></div>`;
    section.innerHTML = html;

    // Wire up monochrome buttons
    section.querySelector('.mono-white')?.addEventListener('click', ()=> makeLogoMonochrome('#ffffff'));
    section.querySelector('.mono-black')?.addEventListener('click', ()=> makeLogoMonochrome('#000000'));

    section.querySelectorAll('.color-swatch').forEach(sw=>{
      sw.onclick = ()=>{
        section.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('active'));
        sw.classList.add('active');
        showColorPicker(sw.dataset.hex, (newHex)=>{
          pushUndo();
          const oldHex = sw.dataset.hex;
          // Use getSelectedObj() — the fabric object changes after pixel replacement
          const current = getSelectedObj();
          if(current){
            recolorRaster(current, oldHex, newHex);
            // Wait a tick for recolorRaster to finish replacing the object,
            // then propagate to siblings using the new object reference
            setTimeout(()=>{
              const updated = getSelectedObj();
              if(updated) propagateRecolorToSiblings(updated, oldHex, newHex);
            }, 100);
            invalidateThumb(current._originalId || current._id);
          }
          sw.style.background = newHex;
          sw.dataset.hex = newHex;
        });
      };
    });
  }
}

// Internal state for the active color picker
let _pickerMode = 'hex'; // 'hex' | 'rgb' | 'cmyk'
let _pickerHex = '#000000';
let _pickerCallback = null;

function getCurrentPickerHex(){ return _pickerHex; }

function showColorPicker(initialHex, onChange, rasterMode){
  _pickerHex = initialHex || '#000000';
  _pickerCallback = onChange || null;
  const area = document.getElementById('colorEditArea');
  if(!area) return;
  renderPickerUI(area, rasterMode);
}

function renderPickerUI(area, rasterMode){
  const rgb = hexToRgb(_pickerHex);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  let html = `
    <div class="color-picker-row">
      <input type="color" id="cpNative" value="${_pickerHex}">
      <span style="font-size:.78rem;font-weight:600;color:var(--text)">${_pickerHex}</span>
    </div>
    <div class="color-mode-tabs">
      <button data-mode="hex" class="${_pickerMode==='hex'?'active':''}">HEX</button>
      <button data-mode="rgb" class="${_pickerMode==='rgb'?'active':''}">RGB</button>
      <button data-mode="cmyk" class="${_pickerMode==='cmyk'?'active':''}">CMYK</button>
    </div>`;

  if(_pickerMode === 'hex'){
    html += `<div class="color-input-group"><label>#</label><input class="hex-input" id="cpHex" value="${_pickerHex.replace('#','')}" maxlength="6"></div>`;
  } else if(_pickerMode === 'rgb'){
    html += `<div class="color-input-group">
      <label>R</label><input type="number" id="cpR" min="0" max="255" value="${rgb.r}">
      <label>G</label><input type="number" id="cpG" min="0" max="255" value="${rgb.g}">
      <label>B</label><input type="number" id="cpB" min="0" max="255" value="${rgb.b}">
    </div>`;
  } else {
    html += `<div class="color-input-group">
      <label>C</label><input type="number" id="cpC" min="0" max="100" value="${cmyk.c}">
      <label>M</label><input type="number" id="cpM" min="0" max="100" value="${cmyk.m}">
      <label>Y</label><input type="number" id="cpY" min="0" max="100" value="${cmyk.y}">
      <label>K</label><input type="number" id="cpK" min="0" max="100" value="${cmyk.k}">
    </div>`;
  }

  html += `<button class="color-apply-btn" id="cpApply" style="width:100%;margin-top:8px;padding:8px 14px;font-size:.85rem">${t('colorApply')}</button>`;

  area.innerHTML = html;

  // Mode tabs
  area.querySelectorAll('.color-mode-tabs button').forEach(b=>{
    b.onclick = ()=>{ _pickerMode = b.dataset.mode; renderPickerUI(area, rasterMode); };
  });

  // Native color input — update on 'change' (picker closed) to avoid
  // re-rendering the DOM while the picker is still open.
  const native = document.getElementById('cpNative');
  if(native){
    native.oninput = e=>{ _pickerHex = e.target.value; };
    native.onchange = e=>{ _pickerHex = e.target.value; renderPickerUI(area, rasterMode); };
  }

  // HEX input
  const hexIn = document.getElementById('cpHex');
  if(hexIn) hexIn.onchange = e=>{
    let v = e.target.value.replace(/[^0-9a-fA-F]/g,'');
    if(v.length===6){ _pickerHex = '#'+v.toLowerCase(); renderPickerUI(area, rasterMode); }
  };

  // RGB inputs — update _pickerHex + color preview, but do NOT re-render
  // the picker DOM. Re-rendering destroys input fields mid-edit and causes
  // roundtrip conversion errors (RGB→hex→RGB loses precision).
  ['R','G','B'].forEach(ch=>{
    const el = document.getElementById('cp'+ch);
    if(el) el.onchange = ()=>{
      const r = parseInt(document.getElementById('cpR')?.value||0);
      const g = parseInt(document.getElementById('cpG')?.value||0);
      const b = parseInt(document.getElementById('cpB')?.value||0);
      _pickerHex = rgbToHex(r,g,b);
      const native = document.getElementById('cpNative');
      if(native) native.value = _pickerHex;
    };
  });

  // CMYK inputs — same approach: update hex + preview only, don't re-render.
  // CMYK↔RGB conversion is lossy, so re-rendering would overwrite user's
  // carefully entered values with rounded approximations.
  ['C','M','Y','K'].forEach(ch=>{
    const el = document.getElementById('cp'+ch);
    if(el) el.onchange = ()=>{
      const c = parseInt(document.getElementById('cpC')?.value||0);
      const m = parseInt(document.getElementById('cpM')?.value||0);
      const y = parseInt(document.getElementById('cpY')?.value||0);
      const k = parseInt(document.getElementById('cpK')?.value||0);
      const rgb = cmykToRgb(c,m,y,k);
      _pickerHex = rgbToHex(rgb.r, rgb.g, rgb.b);
      const native = document.getElementById('cpNative');
      if(native) native.value = _pickerHex;
    };
  });

  // Apply button (SVG mode only)
  const applyBtn = document.getElementById('cpApply');
  if(applyBtn && _pickerCallback){
    applyBtn.onclick = ()=>{ _pickerCallback(_pickerHex); };
  }
}

let _ratioLocked = true; // aspect ratio lock — default ON

function setSizeMm(dim, val){
  const obj = getSelectedObj();
  if(!obj) return;
  if(state.unit==='cm') val *= 10;

  // The UI shows VISUAL dimensions (visMmW/visMmH). At 90°/270° rotation,
  // visual width = _mmH and visual height = _mmW. So when the user edits
  // "breedte" (dim='w'), they're changing the VISUAL width — which maps to
  // _mmH at 90°. We swap the dim parameter to target the correct logical dim.
  const a = ((obj.angle || 0) % 360 + 360) % 360;
  const isSwapped = (a > 45 && a < 135) || (a > 225 && a < 315);
  if(isSwapped) dim = (dim === 'w') ? 'h' : 'w';

  let newW, newH;
  if(_ratioLocked){
    const ratio = obj._mmW / obj._mmH;
    if(dim==='w'){ newW = val; newH = val / ratio; }
    else { newH = val; newW = val * ratio; }
  } else {
    newW = dim==='w' ? val : obj._mmW;
    newH = dim==='h' ? val : obj._mmH;
  }

  // Apply to ALL copies of this logo (same _originalId)
  const oid = obj._originalId || obj._id;
  const siblings = canvas.getObjects().filter(o => (o._originalId || o._id) === oid);
  siblings.forEach(o => {
    o._mmW = newW;
    o._mmH = newH;
    o.scaleX = (newW * displayPxPerMm) / o.width;
    o.scaleY = (newH * displayPxPerMm) / o.height;
    o.setCoords();
  });

  // Auto-repack so copies fill the sheet optimally at new size (skip in manual mode)
  if(siblings.length > 1 && !state.manualMode) repackAll();

  canvas.requestRenderAll();
  renderSelectedPanel();
  renderItemList();
  updateInfoBar();
  checkDpi(obj);
  pushUndo();
}

/* Align/distribute objects — called from multi-select panel.
   Breaks the activeSelection to work in canvas coordinates,
   then re-selects the objects afterward. */
function alignObjects(targets, action){
  if(!targets.length) return;
  pushUndo();
  // Break activeSelection so objects have canvas-absolute coords
  canvas.discardActiveObject();
  canvas.requestRenderAll();

  // Get bounding rects in canvas coords
  const items = targets.map(o => {
    o.setCoords();
    const br = o.getBoundingRect(true, true);
    return { o, br };
  });

  switch(action){
    case 'align-left': {
      const ref = Math.min(...items.map(i=>i.br.left));
      items.forEach(({o,br}) => { o.left += ref - br.left; o.setCoords(); });
      break;
    }
    case 'align-right': {
      const ref = Math.max(...items.map(i=>i.br.left+i.br.width));
      items.forEach(({o,br}) => { o.left += ref - (br.left+br.width); o.setCoords(); });
      break;
    }
    case 'align-top': {
      const ref = Math.min(...items.map(i=>i.br.top));
      items.forEach(({o,br}) => { o.top += ref - br.top; o.setCoords(); });
      break;
    }
    case 'align-bottom': {
      const ref = Math.max(...items.map(i=>i.br.top+i.br.height));
      items.forEach(({o,br}) => { o.top += ref - (br.top+br.height); o.setCoords(); });
      break;
    }
    case 'align-center-h': {
      const minL = Math.min(...items.map(i=>i.br.left));
      const maxR = Math.max(...items.map(i=>i.br.left+i.br.width));
      const cx = (minL+maxR)/2;
      items.forEach(({o,br}) => { o.left += cx - (br.left+br.width/2); o.setCoords(); });
      break;
    }
    case 'align-center-v': {
      const minT = Math.min(...items.map(i=>i.br.top));
      const maxB = Math.max(...items.map(i=>i.br.top+i.br.height));
      const cy = (minT+maxB)/2;
      items.forEach(({o,br}) => { o.top += cy - (br.top+br.height/2); o.setCoords(); });
      break;
    }
    case 'distribute-h': {
      if(items.length < 3) break;
      items.sort((a,b) => a.br.left - b.br.left);
      const totalW = items.reduce((s,i)=>s+i.br.width, 0);
      const minL = items[0].br.left;
      const maxR = items[items.length-1].br.left + items[items.length-1].br.width;
      const space = (maxR - minL - totalW) / (items.length - 1);
      let x = minL;
      items.forEach(({o,br}) => { o.left += x - br.left; x += br.width + space; o.setCoords(); });
      break;
    }
    case 'distribute-v': {
      if(items.length < 3) break;
      items.sort((a,b) => a.br.top - b.br.top);
      const totalH = items.reduce((s,i)=>s+i.br.height, 0);
      const minT = items[0].br.top;
      const maxB = items[items.length-1].br.top + items[items.length-1].br.height;
      const space = (maxB - minT - totalH) / (items.length - 1);
      let y = minT;
      items.forEach(({o,br}) => { o.top += y - br.top; y += br.height + space; o.setCoords(); });
      break;
    }

    // ── Canvas-level alignment (align to sheet) ──
    case 'canvas-align-left': {
      items.forEach(({o,br}) => { o.left += 0 - br.left; o.setCoords(); });
      break;
    }
    case 'canvas-align-right': {
      const cw = canvas.getWidth();
      items.forEach(({o,br}) => { o.left += cw - (br.left+br.width); o.setCoords(); });
      break;
    }
    case 'canvas-align-top': {
      items.forEach(({o,br}) => { o.top += 0 - br.top; o.setCoords(); });
      break;
    }
    case 'canvas-align-bottom': {
      const ch = canvas.getHeight();
      items.forEach(({o,br}) => { o.top += ch - (br.top+br.height); o.setCoords(); });
      break;
    }
    case 'canvas-align-center-h': {
      const cx = canvas.getWidth()/2;
      items.forEach(({o,br}) => { o.left += cx - (br.left+br.width/2); o.setCoords(); });
      break;
    }
    case 'canvas-align-center-v': {
      const cy = canvas.getHeight()/2;
      items.forEach(({o,br}) => { o.top += cy - (br.top+br.height/2); o.setCoords(); });
      break;
    }
  }

  // Sync mm values
  targets.forEach(o => syncMmFromPx(o));

  // Re-select the same objects so user can immediately align again
  if(targets.length === 1){
    canvas.setActiveObject(targets[0]);
  } else {
    const sel = new fabric.ActiveSelection(targets, { canvas });
    canvas.setActiveObject(sel);
  }
  canvas.requestRenderAll();
  renderSelectedPanel();
  pushUndo();
}

function actOnSelected(act){
  const obj = getSelectedObj();
  if(!obj) return;

  // Multi-select actions
  if(obj.type === 'activeSelection'){
    const objs = obj._objects || [];
    switch(act){
      case 'multi-rot':
        objs.forEach(o => { const cur = Math.round(((o.angle||0)%360+360)%360); o.rotate(cur===0?90:0); syncMmFromPx(o); });
        canvas.requestRenderAll();
        pushUndo();
        break;
      case 'multi-dup':
        objs.forEach(o => duplicate(o));
        break;
      case 'multi-del':
        objs.forEach(o => canvas.remove(o));
        canvas.requestRenderAll();
        canvas.discardActiveObject();
        renderItemList();
        renderSelectedPanel();
        updateInfoBar();
        updateSummary();
        pushUndo();
        break;

      // ── Alignment actions ──
      // IMPORTANT: activeSelection objects have coords relative to group center.
      // We must break the selection, move objects on canvas, then re-select.
      case 'align-left':
      case 'align-right':
      case 'align-top':
      case 'align-bottom':
      case 'align-center-h':
      case 'align-center-v':
      case 'distribute-h':
      case 'distribute-v':
      case 'canvas-align-left':
      case 'canvas-align-right':
      case 'canvas-align-top':
      case 'canvas-align-bottom':
      case 'canvas-align-center-h':
      case 'canvas-align-center-v': {
        alignObjects(objs.slice(), act);
        break;
      }
    }
    return;
  }

  // Single-select actions
  switch(act){
    case 'edit-logo': { if(window.gsbLogoEditor) window.gsbLogoEditor.open(obj); break; }
    case 'rot90': { const cur = Math.round(((obj.angle||0)%360+360)%360); obj.rotate(cur===0?90:0); canvas.requestRenderAll(); syncMmFromPx(obj); pushUndo(); break; }
    case 'dup':   duplicate(obj); break;
    case 'del':   removeObj(obj); break;
    case 'canvas-align-left':
    case 'canvas-align-right':
    case 'canvas-align-top':
    case 'canvas-align-bottom':
    case 'canvas-align-center-h':
    case 'canvas-align-center-v': {
      alignObjects([obj], act);
      break;
    }
  }
}

function duplicate(obj){
  // Capture needed props BEFORE any tab switch so we don't lose the source.
  const mmW = obj._mmW, mmH = obj._mmH;
  const angle = obj.angle || 0;
  const srcProps = {
    _originalId: obj._originalId,
    _name: obj._name,
    _naturalW: obj._naturalW,
    _naturalH: obj._naturalH,
  };
  const natW = obj.width, natH = obj.height;

  // For raster images we can clone synchronously by reusing the existing
  // HTMLImageElement. For SVG groups we fall back to the async enliven path.
  if(obj.type === 'image'){
    const imgEl = obj.getElement();
    const spot = ensureSpotOnAnySheet(mmW, mmH);
    if(!spot) return;
    const clone = new fabric.Image(imgEl, {
      originX:'left', originY:'top',
      angle, flipX:false, flipY:false,
      scaleX: (mmW * displayPxPerMm) / natW,
      scaleY: (mmH * displayPxPerMm) / natH,
      left: spot.x * displayPxPerMm,
      top:  spot.y * displayPxPerMm,
    });
    clone._id = ++idCounter;
    clone._originalId = srcProps._originalId;
    clone._name = srcProps._name;
    clone._naturalW = srcProps._naturalW;
    clone._naturalH = srcProps._naturalH;
    clone._mmW = mmW;
    clone._mmH = mmH;
    clone._mmLeft = spot.x;
    clone._mmTop  = spot.y;
    attachObjListeners(clone);
    canvas.add(clone);
    canvas.setActiveObject(clone);
    canvas.requestRenderAll();
    renderItemList();
    updateInfoBar();
    updateSummary();
    pushUndo();
    return;
  }

  // SVG / group path — rebuild via JSON (async).
  const srcJson = obj.toJSON(FABRIC_EXTRA_PROPS);
  const spot = ensureSpotOnAnySheet(mmW, mmH);
  if(!spot) return;
  fabric.util.enlivenObjects([srcJson], ([clone])=>{
    clone._id = ++idCounter;
    clone._originalId = srcProps._originalId;
    clone._name = srcProps._name;
    clone._naturalW = srcProps._naturalW;
    clone._naturalH = srcProps._naturalH;
    clone._mmW = mmW;
    clone._mmH = mmH;
    clone._mmLeft = spot.x;
    clone._mmTop  = spot.y;
    clone.set({
      originX:'left', originY:'top',
      angle, flipX:false, flipY:false,
      scaleX: (mmW * displayPxPerMm) / natW,
      scaleY: (mmH * displayPxPerMm) / natH,
      left: spot.x * displayPxPerMm,
      top:  spot.y * displayPxPerMm,
    });
    attachObjListeners(clone);
    canvas.add(clone);
    canvas.setActiveObject(clone);
    canvas.requestRenderAll();
    renderItemList();
    updateInfoBar();
    updateSummary();
    pushUndo();
  });
}

function removeObj(obj){
  if(state.fillTemplate && obj._originalId === state.fillTemplate.originalId){
    state.fillTemplate = null;
  }
  canvas.remove(obj);
  renderItemList();
  renderSelectedPanel();
  updateInfoBar();
  updateSummary();
  pushUndo();
}

document.getElementById('clearBtn').onclick = ()=>{
  if(!canvas.getObjects().length) return;
  confirmModal(t('clearTitle'), t('clearBody')).then(ok=>{
    if(!ok) return;
    canvas.clear();
    state.fillTemplate = null;
    state.selectedId = null;
    // Reset DTF roll length to 1 meter
    if(SHEET_FORMATS[state.sheetFormat]?.isDTF){
      state.rollLengthM = 1;
      state.sheet.h = 1000;
      resizeSheet();
      renderSheetFormatPicker();
    }
    // Logo registry is kept — logos stay in the list with count 0
    renderItemList();
    renderSelectedPanel();
    updateInfoBar();
    updateSummary();
    pushUndo();
    toast(t('clearDone'),'success');
  });
};

/* =========================================================
   ITEM LIST (grouped by _originalId)
   ========================================================= */
/* Thumbnail cache — keyed by _originalId, invalidated on recolor / resize */
const _thumbCache = new Map();
function invalidateThumb(originalId){ _thumbCache.delete(originalId); }
function invalidateAllThumbs(){ _thumbCache.clear(); }

/* Logo registry — keeps uploaded logo metadata even after clearing the canvas.
   Key = _originalId, Value = { name, mmW, mmH, naturalW, naturalH, serialized (Fabric JSON) } */
const _logoRegistry = new Map();
function registerLogo(obj){
  const oid = obj._originalId ?? obj._id;
  if(_logoRegistry.has(oid)) return;
  _logoRegistry.set(oid, {
    originalId: oid,
    name: obj._name,
    mmW: obj._mmW,
    mmH: obj._mmH,
    naturalW: obj._naturalW,
    naturalH: obj._naturalH,
    json: obj.toJSON(FABRIC_EXTRA_PROPS),
  });
}

function renderItemList(){
  const list = document.getElementById('itemList');

  // If user is actively editing a stepper input inside the list, skip full rebuild
  // to prevent losing focus. Still update the count header so it stays accurate.
  const activeEl = document.activeElement;
  if(activeEl && activeEl.tagName === 'INPUT' && activeEl.closest('#itemList .count-stepper')){
    // Lightweight count update only
    const uniqueIds = new Set();
    let totalObjs = 0;
    canvas.getObjects().forEach(o=>{ if(o._mmW){ uniqueIds.add(o._originalId ?? o._id); totalObjs++; } });
    for(const [oid] of _logoRegistry) uniqueIds.add(oid);
    document.getElementById('itemCount').textContent = `(${uniqueIds.size} ${uniqueIds.size===1?t('logo'):t('logos')} · ${totalObjs} ${t('copies')})`;
    return;
  }

  const groups = new Map();
  canvas.getObjects().forEach(o=>{
    if(!o._mmW) return;
    const oid = o._originalId ?? o._id;
    if(!groups.has(oid)){
      groups.set(oid, { originalId:oid, name:o._name, objs:[], sampleObj:o, naturalW:o._naturalW, naturalH:o._naturalH });
    }
    groups.get(oid).objs.push(o);
  });
  // Merge in registry entries that have no canvas objects (cleared logos)
  for(const [oid, reg] of _logoRegistry){
    if(!groups.has(oid)){
      groups.set(oid, { originalId:oid, name:reg.name, objs:[], sampleObj:null, naturalW:reg.naturalW, naturalH:reg.naturalH, regMmW:reg.mmW, regMmH:reg.mmH });
    }
  }

  // Single canvas: count only live objects
  const globalCounts = new Map();
  for(const [oid, g] of groups) globalCounts.set(oid, g.objs.length);
  const globalUniqueIds = new Set(groups.keys());
  const totalGlobalObjs = canvas.getObjects().filter(o=>o._mmW).length;

  document.getElementById('itemCount').textContent = `(${globalUniqueIds.size} ${globalUniqueIds.size===1?t('logo'):t('logos')} · ${totalGlobalObjs} ${t('copies')})`;

  if(!groups.size){
    list.innerHTML = `<p class="empty">${t('listEmpty')}</p>`;
    updateSummary();
    return;
  }

  list.innerHTML = '';
  // Sort groups by _logoRegistry insertion order (= upload order) for stable display
  const registryOrder = [..._logoRegistry.keys()];
  const sortedGroups = [...groups.values()].sort((a, b) => {
    const ai = registryOrder.indexOf(a.originalId);
    const bi = registryOrder.indexOf(b.originalId);
    // Items not in registry go to the end
    return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
  });
  sortedGroups.forEach(g=>{
    const sample = g.sampleObj;
    // Show VISUAL dimensions in the item list (consistent with selected panel)
    const mmW = sample ? visMmW(sample) : (g.regMmW || 0);
    const mmH = sample ? visMmH(sample) : (g.regMmH || 0);
    const dpi = sample ? dpiStatus(calcEffectiveDpi(sample)) : { cls:'ok', label:'—' };
    const wmm = mmW.toFixed(0), hmm = mmH.toFixed(0);
    const wcm = (mmW/10).toFixed(1), hcm = (mmH/10).toFixed(1);
    const sizeLabel = state.unit==='mm' ? `${wmm}×${hmm} mm` : `${wcm}×${hcm} cm`;
    const isSelected = g.objs.some(o => o._id === state.selectedId);
    const globalCount = globalCounts.get(g.originalId) || 0;

    const row = document.createElement('div');
    row.className = 'item-row' + (isSelected ? ' selected' : '') + (globalCount === 0 ? ' item-row-empty' : '');
    row.innerHTML = `
      <div class="item-thumb"></div>
      <div class="item-info">
        <div class="name" title="${escapeHtml(g.name)}">${escapeHtml(g.name)}</div>
        <div class="meta">${sizeLabel} · <span class="dpi-pill ${dpi.cls}" style="font-size:.6rem">${dpi.label}</span></div>
      </div>
      <div class="count-stepper" data-oid="${g.originalId}">
        <button type="button" data-act="dec">−</button>
        <input type="number" min="0" value="${globalCount}" />
        <button type="button" data-act="inc">+</button>
      </div>
      <button type="button" class="row-del" title="${t('tbDel')}" aria-label="${t('tbDel')}"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    `;
    row.addEventListener('click', e=>{
      if(e.target.closest('.count-stepper')) return;
      if(e.target.closest('.row-del')) return;
      if(sample){
        canvas.setActiveObject(sample);
        state.selectedId = sample._id;
        canvas.requestRenderAll();
        renderSelectedPanel();
      }
      renderItemList();
    });
    const stepper = row.querySelector('.count-stepper');
    const inp = stepper.querySelector('input');
    // +/- buttons read the current INPUT value (not stale globalCount)
    stepper.querySelector('[data-act="dec"]').onclick = ()=>{
      const cur = Math.max(0, parseInt(inp.value,10) || 0);
      changeGroupCount(g.originalId, Math.max(0, cur - 1));
    };
    stepper.querySelector('[data-act="inc"]').onclick = ()=>{
      const cur = Math.max(0, parseInt(inp.value,10) || 0);
      changeGroupCount(g.originalId, cur + 1);
    };
    // Debounced oninput: typing a number applies it after a short delay
    let _stepperTimer = null;
    inp.oninput = ()=>{
      clearTimeout(_stepperTimer);
      _stepperTimer = setTimeout(()=>{
        const v = Math.max(0, parseInt(inp.value,10) || 0);
        changeGroupCount(g.originalId, v);
      }, 600);
    };
    inp.onchange = ()=>{
      clearTimeout(_stepperTimer);
      const v = Math.max(0, parseInt(inp.value,10) || 0);
      changeGroupCount(g.originalId, v);
    };
    row.querySelector('.row-del').onclick = (e)=>{
      e.stopPropagation();
      if(state.fillTemplate && state.fillTemplate.originalId === g.originalId){
        state.fillTemplate = null;
      }
      // Remove group from canvas AND from registry
      g.objs.forEach(o => canvas.remove(o));
      _logoRegistry.delete(g.originalId);
      _thumbCache.delete(g.originalId);
      if(g.objs.some(o => o._id === state.selectedId)) state.selectedId = null;
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      renderItemList();
      renderSelectedPanel();
      updateInfoBar();
      updateSummary();
      updateFillBtn();
    };
    {
      const oid = g.originalId;
      if(sample){
        if(_thumbCache.has(oid)){
          row.querySelector('.item-thumb').style.backgroundImage = `url(${_thumbCache.get(oid)})`;
        } else {
          try {
            const objPxW = sample.width * sample.scaleX;
            const objPxH = sample.height * sample.scaleY;
            const thumbTarget = 80;
            const thumbMult = Math.min(2, Math.max(0.3, thumbTarget / Math.max(objPxW, objPxH, 1)));
            const mini = sample.toDataURL({ format:'png', multiplier: thumbMult });
            _thumbCache.set(oid, mini);
            row.querySelector('.item-thumb').style.backgroundImage = `url(${mini})`;
          } catch(e){}
        }
      } else if(_thumbCache.has(oid)){
        // Cleared logo — use cached thumbnail
        row.querySelector('.item-thumb').style.backgroundImage = `url(${_thumbCache.get(oid)})`;
      }
    }
    list.appendChild(row);
  });
  updateSummary();
}

// Single canvas mode — no cross-tab helpers needed

// Build a serialized fabric.Image clone from a template POJO, positioned
// at the given slot. Returns a JSON-ready plain object ready to be pushed
// into tab.json.objects.
function buildSerializedClone(tplObj, slot, mmW, mmH, natW, natH, baseAngle, newId){
  const clone = JSON.parse(JSON.stringify(tplObj));
  const sx = (mmW * displayPxPerMm) / natW;
  const sy = (mmH * displayPxPerMm) / natH;
  clone.originX = 'center';
  clone.originY = 'center';
  clone.angle   = slot.rotated ? 90 : (baseAngle || 0);
  clone.flipX   = false;
  clone.flipY   = false;
  // Scales always based on LOGICAL (unrotated) dims — same formula for 0° and 90°.
  // At 90°, fabric auto-swaps visual width↔height via the angle.
  clone.scaleX  = sx;
  clone.scaleY  = sy;
  clone.left    = (slot.x + slot.w/2) * displayPxPerMm;
  clone.top     = (slot.y + slot.h/2) * displayPxPerMm;
  clone._id     = newId;
  clone._mmLeft = slot.x;
  clone._mmTop  = slot.y;
  // _mmW/_mmH = LOGICAL (unrotated) dims — slot.w/h are visual (possibly swapped)
  clone._mmW    = slot.rotated ? slot.h : slot.w;
  clone._mmH    = slot.rotated ? slot.w : slot.h;
  return clone;
}

// Pack as many clones as possible onto a SAVED (non-active) tab and
// append them to tab.json.objects. Returns number of copies added.
// Removed: tab-related functions (saveCurrentTabState, loadTabState, addSheetTab, removeSheetTab,
// switchToTab, renderSheetTabs, addClonesToSavedTab, removeClonesFromSavedTab,
// removeGroupFromAllSavedTabs, cleanupEmptyOverflowTabs) — DTF roll is now a single continuous canvas

/* changeGroupCount — global count editor for single canvas.
   Strategy: INCREMENTAL — only add new copies or remove excess.
   Existing copies keep their position so nothing "jumps." */
let _changeGroupBusy = false;
let _changeGroupQueued = null; // {originalId, targetCount} for queued call
function changeGroupCount(originalId, targetCount){
  targetCount = Math.max(0, targetCount);

  // Mutex: if already placing copies, queue the latest request
  if(_changeGroupBusy){
    _changeGroupQueued = { originalId, targetCount };
    return;
  }
  _changeGroupBusy = true;
  const _releaseMutex = () => {
    _changeGroupBusy = false;
    if(_changeGroupQueued){
      const q = _changeGroupQueued;
      _changeGroupQueued = null;
      setTimeout(() => changeGroupCount(q.originalId, q.targetCount), 0);
    }
  };

  // Gather live copies sorted top→bottom, left→right (stable removal order)
  const liveCopies = canvas.getObjects()
    .filter(o => o._originalId === originalId && o._mmW)
    .sort((a,b) => (a._mmTop - b._mmTop) || (a._mmLeft - b._mmLeft));
  const currentCount = liveCopies.length;

  // Helper: shrink DTF roll to fit content tightly
  const shrinkDTF = () => {
    if(!SHEET_FORMATS[state.sheetFormat]?.isDTF) return;
    const contentBottom = getContentBottomMm();
    const shrinkGap = state.gapMm || 0;
    const newH = Math.max(1000, Math.ceil((contentBottom + shrinkGap) / 100) * 100);
    if(newH < state.sheet.h){
      state.sheet.h = newH;
      state.rollLengthM = newH / 1000;
      resizeSheet();
      const inp = document.getElementById('rollLengthInput');
      if(inp) inp.value = state.rollLengthM;
    }
  };

  // ── Target = 0: remove all from canvas (keep in registry) ──
  if(targetCount === 0){
    if(state.fillTemplate && state.fillTemplate.originalId === originalId) state.fillTemplate = null;
    if(liveCopies.some(o => o._id === state.selectedId)) state.selectedId = null;
    canvas.discardActiveObject();
    liveCopies.forEach(o => canvas.remove(o));
    canvas.requestRenderAll();
    shrinkDTF();
    renderItemList();
    renderSelectedPanel();
    updateInfoBar();
    updateSummary();
    _releaseMutex();
    return;
  }

  // ── No live copies: re-create from registry ──
  if(currentCount === 0){
    const reg = _logoRegistry.get(originalId);
    if(!reg){ _releaseMutex(); return; }
    fabric.util.enlivenObjects([reg.json], (objs)=>{
      if(!objs.length) return;
      const obj = objs[0];
      obj._originalId = reg.originalId;
      obj._name = reg.name;
      obj._mmW = reg.mmW;
      obj._mmH = reg.mmH;
      obj._naturalW = reg.naturalW;
      obj._naturalH = reg.naturalH;
      const spot = ensureSpotOnAnySheet(reg.mmW, reg.mmH);
      if(!spot) return;
      obj._mmLeft = spot.x;
      obj._mmTop = spot.y;
      obj.scaleX = (reg.mmW * displayPxPerMm) / obj.width;
      obj.scaleY = (reg.mmH * displayPxPerMm) / obj.height;
      obj.left = spot.x * displayPxPerMm;
      obj.top = spot.y * displayPxPerMm;
      attachObjListeners(obj);
      canvas.add(obj);
      canvas.requestRenderAll();
      autoExtendIfNeeded();
      if(targetCount > 1){
        _releaseMutex();
        changeGroupCount(originalId, targetCount);
      } else {
        renderItemList();
        renderSelectedPanel();
        updateInfoBar();
        updateSummary();
        _releaseMutex();
      }
    });
    return;
  }

  // ── No change ──
  if(targetCount === currentCount){ _releaseMutex(); return; }

  // ── DECREASE: remove excess copies from end of sorted list ──
  if(targetCount < currentCount){
    const toRemove = liveCopies.slice(targetCount);
    if(toRemove.some(o => o._id === state.selectedId)) state.selectedId = null;
    canvas.discardActiveObject();
    toRemove.forEach(o => canvas.remove(o));
    canvas.requestRenderAll();
    shrinkDTF();
    renderItemList();
    renderSelectedPanel();
    updateInfoBar();
    updateSummary();
    pushUndo();
    _releaseMutex();
    return;
  }

  // ── INCREASE: add only delta new copies, keep existing in place ──
  const delta = targetCount - currentCount;
  const liveSample = liveCopies[0];

  // Use stored logical dims directly — always accurate regardless of rotation
  const mmW = liveSample._mmW;
  const mmH = liveSample._mmH;
  const natW = liveSample.width;
  const natH = liveSample.height;

  const srcProps = {
    _originalId: liveSample._originalId, _name: liveSample._name,
    _naturalW: liveSample._naturalW, _naturalH: liveSample._naturalH,
    _hasGradients: liveSample._hasGradients,
    _embeddedRasterW: liveSample._embeddedRasterW,
    _embeddedRasterH: liveSample._embeddedRasterH,
    _vectorOrigin: liveSample._vectorOrigin,
    _pdfPageW: liveSample._pdfPageW,
    _pdfPageH: liveSample._pdfPageH,
  };

  if(state.fillTemplate && state.fillTemplate.originalId === originalId){
    state.fillTemplate = null;
  }

  const nativeFits  = mmW <= state.sheet.w && mmH <= state.sheet.h;
  const rotatedFits = mmH <= state.sheet.w && mmW <= state.sheet.h;
  if(!nativeFits && !rotatedFits && !state.manualMode){
    toast(t('sizeTooLarge'), 'error');
    _releaseMutex();
    return;
  }

  // Find free spots for ONLY the delta new copies.
  // All existing canvas objects (including this group's copies) are automatic obstacles.
  let slots = packSpotsSmart(mmW, mmH, delta);
  if(SHEET_FORMATS[state.sheetFormat]?.isDTF && !state.manualMode){
    let growTries = 0;
    while(slots.length < delta && state.sheet.h + 1000 <= MAX_LENGTH_MM && growTries < 10){
      growRoll(1000);
      slots = packSpotsSmart(mmW, mmH, delta);
      growTries++;
    }
  }
  // In manual mode: if packer can't find spots, generate fallback positions
  // (centered on sheet with small offsets so user can see & drag them)
  if(state.manualMode && slots.length < delta){
    const existing = slots.length;
    const centerX = state.sheet.w / 2 - mmW / 2;
    const centerY = state.sheet.h / 2 - mmH / 2;
    for(let i = existing; i < delta; i++){
      const offset = (i - existing) * 3; // 3mm cascade per logo so they're distinguishable
      slots.push({ x: centerX + offset, y: centerY + offset, w: mmW, h: mmH, rotated: false });
    }
  }
  if(slots.length === 0){
    toast(t('sizeTooLarge'), 'error');
    _releaseMutex();
    return;
  }

  // --- Performance: disable auto-render during batch add ---
  canvas.renderOnAddRemove = false;

  // --- Performance: rasterize SVG groups to PNG for fast cloning ---
  const isGroup = liveSample.type === 'group';
  const rasterScale = 2;
  const rasterW = Math.round(natW * Math.abs(liveSample.scaleX || 1) * rasterScale);
  const rasterH = Math.round(natH * Math.abs(liveSample.scaleY || 1) * rasterScale);

  // Show percentage counter for large batches — use setTimeout to let browser render
  const _startCloning = () => {
  const placeNewClones = (imgDataUrl) => {
    const addClone = (slot) => {
      return new Promise(resolve => {
        if(imgDataUrl){
          fabric.Image.fromURL(imgDataUrl, img => {
            const newId = ++idCounter;
            img._id = newId;
            img._originalId = srcProps._originalId;
            img._name = srcProps._name;
            img._naturalW = srcProps._naturalW;
            img._naturalH = srcProps._naturalH;
            if(srcProps._hasGradients) img._hasGradients = srcProps._hasGradients;
            if(srcProps._embeddedRasterW) img._embeddedRasterW = srcProps._embeddedRasterW;
            if(srcProps._embeddedRasterH) img._embeddedRasterH = srcProps._embeddedRasterH;
            if(srcProps._vectorOrigin) img._vectorOrigin = srcProps._vectorOrigin;
            if(srcProps._pdfPageW) img._pdfPageW = srcProps._pdfPageW;
            if(srcProps._pdfPageH) img._pdfPageH = srcProps._pdfPageH;
            img._mmW = slot.rotated ? slot.h : slot.w;
            img._mmH = slot.rotated ? slot.w : slot.h;
            img._mmLeft = slot.x; img._mmTop = slot.y;
            img.originX = 'center'; img.originY = 'center';
            img.angle = slot.rotated ? 90 : 0;
            img.flipX = false; img.flipY = false;
            img.scaleX = (img._mmW * displayPxPerMm) / img.width;
            img.scaleY = (img._mmH * displayPxPerMm) / img.height;
            img.left = (slot.x + slot.w/2) * displayPxPerMm;
            img.top  = (slot.y + slot.h/2) * displayPxPerMm;
            attachObjListeners(img);
            canvas.add(img);
            resolve();
          }, { crossOrigin: 'anonymous' });
        } else {
          const tplObj = liveSample.toObject(FABRIC_EXTRA_PROPS);
          const obj = buildSerializedClone(tplObj, slot, mmW, mmH, natW, natH, 0, ++idCounter);
          obj._originalId = srcProps._originalId;
          obj._name = srcProps._name;
          obj._naturalW = srcProps._naturalW;
          obj._naturalH = srcProps._naturalH;
          fabric.util.enlivenObjects([obj], ([clone]) => {
            if(srcProps._hasGradients) clone._hasGradients = srcProps._hasGradients;
            if(srcProps._vectorOrigin) clone._vectorOrigin = srcProps._vectorOrigin;
            if(srcProps._embeddedRasterW) clone._embeddedRasterW = srcProps._embeddedRasterW;
            if(srcProps._embeddedRasterH) clone._embeddedRasterH = srcProps._embeddedRasterH;
            if(srcProps._pdfPageW) clone._pdfPageW = srcProps._pdfPageW;
            if(srcProps._pdfPageH) clone._pdfPageH = srcProps._pdfPageH;
            attachObjListeners(clone);
            canvas.add(clone);
            resolve();
          });
        }
      });
    };

    const BATCH = 32;
    let idx = 0;
    const nextBatch = () => {
      const batch = slots.slice(idx, idx + BATCH);
      idx += BATCH;
      // Update loader progress as percentage
      if(delta > 10){
        const done = Math.min(idx, slots.length);
        showCanvasLoader(Math.round((done / slots.length) * 90), "Logo's plaatsen");
      }
      Promise.all(batch.map(slot => addClone(slot))).then(() => {
        if(idx < slots.length){
          setTimeout(nextBatch, 0);
        } else {
          if(delta > 10 && !state.manualMode) showCanvasLoader(95, 'Indeling optimaliseren');
          canvas.renderOnAddRemove = true; // restore after batch
          canvas.requestRenderAll();
          autoExtendIfNeeded();
          shrinkDTF();
          // Auto-optimize layout when adding many copies at once (skip in manual mode)
          if(delta > 10 && !state.manualMode){
            // Use setTimeout to let the loader text update render before repack blocks
            setTimeout(() => {
              repackAll();
              hideCanvasLoader();
              _releaseMutex();
            }, 50);
          } else {
            renderItemList();
            renderSelectedPanel();
            updateInfoBar();
            updateSummary();
            pushUndo();
            hideCanvasLoader();
            _releaseMutex();
          }
          if(slots.length < delta){
            toast(t('sizeTooLarge'), 'warn');
          }
        }
      });
    };
    nextBatch();
  };

  if(isGroup){
    // Use liveSample.toDataURL() — renders the group exactly as displayed on canvas
    // This guarantees no mirroring/flipping issues from SVG transforms
    const savedAngle = liveSample.angle;
    const savedFlipX = liveSample.flipX;
    const savedFlipY = liveSample.flipY;
    liveSample.set({ angle: 0, flipX: false, flipY: false });
    liveSample.setCoords();
    const dataUrl = liveSample.toDataURL({
      format: 'png',
      multiplier: rasterScale,
    });
    liveSample.set({ angle: savedAngle, flipX: savedFlipX, flipY: savedFlipY });
    liveSample.setCoords();
    placeNewClones(dataUrl);
  } else if(liveSample.type === 'image'){
    // Already a rasterized image — reuse its element src for fast cloning
    const el = liveSample.getElement();
    const src = el && el.src ? el.src : null;
    if(src){
      placeNewClones(src);
    } else {
      placeNewClones(null);
    }
  } else {
    placeNewClones(null);
  }
  }; // end _startCloning

  if(delta > 10){
    showCanvasLoader(0, "Logo's plaatsen");
    setTimeout(_startCloning, 30); // let browser render the 0% before heavy work
  } else {
    _startCloning();
  }
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

/* =========================================================
   BACKGROUND REMOVAL
   ========================================================= */
// updateBgRemoveBtn is now a no-op; bg remove is wired inside renderSelectedPanel
function updateBgRemoveBtn(){}

function removeWhiteBg(obj, threshold){
  const imgEl = obj.getElement();
  const tmp = document.createElement('canvas');
  tmp.width = imgEl.naturalWidth || imgEl.width;
  tmp.height = imgEl.naturalHeight || imgEl.height;
  const tctx = tmp.getContext('2d');
  tctx.drawImage(imgEl, 0, 0);
  const data = tctx.getImageData(0,0,tmp.width,tmp.height);
  const px = data.data;
  for(let i=0; i<px.length; i+=4){
    if(px[i] >= threshold && px[i+1] >= threshold && px[i+2] >= threshold){
      px[i+3] = 0;
    }
  }
  tctx.putImageData(data, 0, 0);

  /* --- Auto-crop: find bounding box of non-transparent pixels --- */
  const w = tmp.width, h = tmp.height;
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for(let y = 0; y < h; y++){
    for(let x = 0; x < w; x++){
      if(px[(y * w + x) * 4 + 3] > 0){
        if(x < minX) minX = x;
        if(x > maxX) maxX = x;
        if(y < minY) minY = y;
        if(y > maxY) maxY = y;
      }
    }
  }

  // Only crop if there's meaningful transparent border (> 2% on any side)
  const hasContent = maxX >= minX && maxY >= minY;
  const leftPct  = hasContent ? minX / w : 0;
  const topPct   = hasContent ? minY / h : 0;
  const rightPct = hasContent ? (w - 1 - maxX) / w : 0;
  const botPct   = hasContent ? (h - 1 - maxY) / h : 0;
  const shouldCrop = hasContent && (leftPct > 0.02 || topPct > 0.02 || rightPct > 0.02 || botPct > 0.02);

  let finalDataUrl, finalW, finalH, cropRatioW, cropRatioH;
  if(shouldCrop){
    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = cropW;
    cropCanvas.height = cropH;
    const cctx = cropCanvas.getContext('2d');
    cctx.putImageData(tctx.getImageData(minX, minY, cropW, cropH), 0, 0);
    finalDataUrl = cropCanvas.toDataURL('image/png');
    finalW = cropW;
    finalH = cropH;
    cropRatioW = cropW / w;
    cropRatioH = cropH / h;
    console.log(`[GSB BgRemove] Auto-crop: ${w}×${h} → ${cropW}×${cropH} (removed ${((1 - cropRatioW * cropRatioH) * 100).toFixed(1)}% transparent area)`);
  } else {
    finalDataUrl = tmp.toDataURL('image/png');
    finalW = w;
    finalH = h;
    cropRatioW = 1;
    cropRatioH = 1;
  }

  fabric.Image.fromURL(finalDataUrl, newImg=>{
    /* Keep the same scale per natural pixel — the bounding box shrinks
       because the image now has fewer natural pixels after crop. */
    newImg.set({
      left: obj.left, top: obj.top, angle: obj.angle, flipX: obj.flipX, flipY: obj.flipY,
      scaleX: obj.scaleX, scaleY: obj.scaleY,
    });
    newImg._id = obj._id;
    newImg._originalId = obj._originalId;
    newImg._name = obj._name;
    newImg._naturalW = finalW;
    newImg._naturalH = finalH;
    newImg._mmW = obj._mmW * cropRatioW;
    newImg._mmH = obj._mmH * cropRatioH;
    newImg._mmLeft = obj._mmLeft;
    newImg._mmTop = obj._mmTop;
    // Preserve vector-origin flag so DPI stays correct after bg removal
    if(obj._vectorOrigin) newImg._vectorOrigin = obj._vectorOrigin;
    const bgSvg = getSvgSource(obj);
    if(bgSvg) newImg._svgSource = bgSvg;
    if(obj._hasGradients) newImg._hasGradients = obj._hasGradients;
    if(obj._embeddedRasterW) newImg._embeddedRasterW = obj._embeddedRasterW;
    if(obj._embeddedRasterH) newImg._embeddedRasterH = obj._embeddedRasterH;
    if(obj._pdfPageW) newImg._pdfPageW = obj._pdfPageW;
    if(obj._pdfPageH) newImg._pdfPageH = obj._pdfPageH;
    if(obj._isFillTile) newImg._isFillTile = obj._isFillTile;
    attachObjListeners(newImg);
    canvas.remove(obj);
    canvas.add(newImg);
    canvas.setActiveObject(newImg);
    canvas.requestRenderAll();
    syncMmFromPx(newImg);
    renderItemList();
    toast(t('bgRemoved'),'success');
  });
}

/* =========================================================
   FILL SHEET
   ========================================================= */
const fillBtn = document.getElementById('fillSheetBtn');

function updateFillBtn(){
  const obj = getSelectedObj();
  // Enable if a logo is selected, OR if exactly 1 unique logo exists on canvas
  if(obj && obj._mmW){
    fillBtn.disabled = false;
  } else {
    const logos = canvas.getObjects().filter(o => o._mmW);
    const uniqueIds = new Set(logos.map(o => o._originalId));
    fillBtn.disabled = uniqueIds.size !== 1;
  }
}

fillBtn.onclick = ()=>{
  let obj = getSelectedObj();
  // If nothing selected but only 1 unique logo on canvas, use that one
  if(!obj || !obj._mmW){
    const logos = canvas.getObjects().filter(o => o._mmW);
    const uniqueIds = new Set(logos.map(o => o._originalId));
    if(uniqueIds.size === 1 && logos.length > 0){
      obj = logos[0];
      canvas.setActiveObject(obj);
      canvas.renderAll();
    } else {
      toast(t('addLogoFirst'),'warn'); return;
    }
  }
  if(!obj || !obj._mmW){ toast(t('addLogoFirst'),'warn'); return; }

  // Reset any rotation on the sample so the tiler works with the logo's
  // un-rotated native dimensions (the packer will rotate tiles itself).
  obj.set({ originX:'left', originY:'top', angle:0, flipX:false, flipY:false });
  // Recompute mmW/mmH from the current scale + natural width, ignoring
  // whatever getBoundingRect cached for a rotated state.
  const nativeMmW = (obj.width * (obj.scaleX || 1)) / displayPxPerMm;
  const nativeMmH = (obj.height * (obj.scaleY || 1)) / displayPxPerMm;
  obj._mmW = nativeMmW;
  obj._mmH = nativeMmH;
  obj.setCoords();

  state.fillTemplate = {
    originalId: obj._originalId,
    mmW: nativeMmW, mmH: nativeMmH,
    angle: 0,
    name: obj._name,
    naturalW: obj._naturalW, naturalH: obj._naturalH,
    sampleObj: obj,
  };
  tileSheet();
};

function clearFillTiles(){
  const tiles = canvas.getObjects().filter(o=>o._isFillTile);
  tiles.forEach(o=>canvas.remove(o));
}

/* Dense fill layout.
   Enumerates every single-cut partition (horizontal or vertical) of the sheet
   into two rectangular regions, each packed with one orientation of the logo
   (0° or 90°). Also considers single-orientation fills. Returns the densest
   layout found as an array of {x,y,w,h,rotated}. */
function bestLayout(mmW, mmH, gap, sheetW, sheetH){
  const W = sheetW, H = sheetH, g = gap;

  // Pack a rectangular region (offX, offY, regW, regH) with a single
  // orientation. rotated=true → block dims become (mmH, mmW).
  const packRegion = (offX, offY, regW, regH, rotated)=>{
    const bw = rotated ? mmH : mmW;
    const bh = rotated ? mmW : mmH;
    if (bw - 1e-6 > regW || bh - 1e-6 > regH) return [];
    const cols = Math.floor((regW + g) / (bw + g));
    const rows = Math.floor((regH + g) / (bh + g));
    if (cols <= 0 || rows <= 0) return [];
    const out = [];
    for (let r=0; r<rows; r++){
      for (let c=0; c<cols; c++){
        out.push({
          x: offX + c*(bw+g),
          y: offY + r*(bh+g),
          w: bw, h: bh, rotated
        });
      }
    }
    return out;
  };

  let best = [];
  const consider = (placements)=>{
    if (placements.length > best.length) best = placements;
  };

  // Single-orientation fills.
  consider(packRegion(0, 0, W, H, false));
  consider(packRegion(0, 0, W, H, true));

  // Horizontal split: top strip uses orientation A (N rows of it), bottom
  // strip uses orientation B (as many rows as fit).
  for (const rotA of [false, true]) {
    const bhA = rotA ? mmW : mmH;
    if (bhA - 1e-6 > H) continue;
    for (let n = 1; ; n++) {
      const topH = n*bhA + (n-1)*g;
      if (topH - 1e-6 > H) break;
      const topPlacements = packRegion(0, 0, W, topH, rotA);
      if (topPlacements.length === 0) break;
      const remH = H - topH - g;
      for (const rotB of [false, true]) {
        const bottomPlacements = remH > 0 ? packRegion(0, topH + g, W, remH, rotB) : [];
        consider(topPlacements.concat(bottomPlacements));
      }
    }
  }

  // Vertical split: left strip uses orientation A (N cols of it), right strip
  // uses orientation B.
  for (const rotA of [false, true]) {
    const bwA = rotA ? mmH : mmW;
    if (bwA - 1e-6 > W) continue;
    for (let n = 1; ; n++) {
      const leftW = n*bwA + (n-1)*g;
      if (leftW - 1e-6 > W) break;
      const leftPlacements = packRegion(0, 0, leftW, H, rotA);
      if (leftPlacements.length === 0) break;
      const remW = W - leftW - g;
      for (const rotB of [false, true]) {
        const rightPlacements = remW > 0 ? packRegion(leftW + g, 0, remW, H, rotB) : [];
        consider(leftPlacements.concat(rightPlacements));
      }
    }
  }

  return best;
}

function tileSheet(){
  if(!state.fillTemplate){ toast(t('noFillActive'),'warn'); return; }
  const ft = state.fillTemplate;
  const sample = canvas.getObjects().find(o=>o._originalId === ft.originalId && !o._isFillTile);
  if(!sample){ toast(t('logoGone'),'error'); state.fillTemplate = null; return; }
  ft.sampleObj = sample;

  // --- Performance: disable auto-render during batch remove/add ---
  canvas.renderOnAddRemove = false;

  // Clear ALL copies/tiles of this logo — keep OTHER logos intact
  const toRemove = canvas.getObjects().filter(o=>
    o._originalId === ft.originalId
  );
  toRemove.forEach(o=>canvas.remove(o));

  // Force sample to a known orientation (top-left origin, no rotation, no flip)
  sample.set({ originX:'left', originY:'top', angle:0, flipX:false, flipY:false });

  // Use packSpotsSmart which respects existing objects from OTHER logos as obstacles.
  // The sample is temporarily removed so it doesn't block itself.
  // Pass a high count to fill all available space.
  const maxSlots = 999;
  let layout = packSpotsSmart(ft.mmW, ft.mmH, maxSlots);
  if(!layout || layout.length === 0){
    toast(t('sizeTooLarge'),'error');
    state.fillTemplate = null;
    // Re-add the sample so it's not lost
    canvas.add(sample);
    canvas.requestRenderAll();
    return;
  }

  const natW = sample.width;
  const natH = sample.height;

  const placeAt = (target, p)=>{
    // Use the TARGET's own width/height for scale calculation.
    // For SVG groups, tw = SVG coordinate units; for raster PNG clones, tw = pixel width.
    const tw = target.width;
    const th = target.height;
    // _mmW/_mmH = LOGICAL (unrotated) dims. Scales always same formula for 0° and 90°.
    const logicalW = p.rotated ? p.h : p.w;
    const logicalH = p.rotated ? p.w : p.h;
    const sx = (logicalW * displayPxPerMm) / tw;
    const sy = (logicalH * displayPxPerMm) / th;
    target.set({
      originX:'center', originY:'center',
      angle: p.rotated ? 90 : 0,
      scaleX: sx, scaleY: sy,
      left: (p.x + p.w/2) * displayPxPerMm,
      top:  (p.y + p.h/2) * displayPxPerMm,
    });
    target._mmLeft = p.x;
    target._mmTop  = p.y;
    target._mmW = logicalW;
    target._mmH = logicalH;
    target.setCoords();
  };

  placeAt(sample, layout[0]);
  canvas.add(sample); // re-add after removal for packing

  // --- Performance: rasterize SVG groups to PNG for fast tiling ---
  const isGroup = sample.type === 'group';
  const rasterScale = 2;
  const rasterW = Math.round(natW * (sample.scaleX || 1) * rasterScale);
  const rasterH = Math.round(natH * (sample.scaleY || 1) * rasterScale);

  const finishTiling = ()=>{
    canvas.renderOnAddRemove = true; // restore after batch
    canvas.requestRenderAll();
    autoExtendIfNeeded();

    // Shrink DTF roll to fit content tightly
    if(SHEET_FORMATS[state.sheetFormat]?.isDTF){
      const contentBottom = getContentBottomMm();
      const shrinkGap = state.gapMm || 0;
      const newH = Math.max(1000, Math.ceil((contentBottom + shrinkGap) / 100) * 100);
      if(newH < state.sheet.h){
        state.sheet.h = newH;
        state.rollLengthM = newH / 1000;
        resizeSheet();
        const inp = document.getElementById('rollLengthInput');
        if(inp) inp.value = state.rollLengthM;
      }
    }

    renderItemList();
    updateInfoBar();
    updateSummary();
    pushUndo();
    const rotCount = layout.filter(p=>p.rotated).length;
    const extra = rotCount === 0 ? '' : ` · ${rotCount} × 90°`;
    toast(`${layout.length} ${t('copies')}${extra}`, 'success');
  };

  const addTilesFromImage = (imgDataUrl)=>{
    let processed = 0;
    const BATCH = 8;
    const addBatch = ()=>{
      const end = Math.min(processed + BATCH, layout.length);
      for(let idx = processed; idx < end; idx++){
        if(idx === 0){ processed++; continue; } // skip sample (already placed)
        const p = layout[idx];
        if(imgDataUrl){
          fabric.Image.fromURL(imgDataUrl, img => {
            img._id = ++idCounter;
            img._originalId = ft.originalId;
            img._name = ft.name;
            img._naturalW = ft.naturalW;
            img._naturalH = ft.naturalH;
            img._isFillTile = true;
            if(sample._hasGradients) img._hasGradients = sample._hasGradients;
            if(sample._vectorOrigin) img._vectorOrigin = sample._vectorOrigin;
            if(sample._pdfPageW) img._pdfPageW = sample._pdfPageW;
            if(sample._pdfPageH) img._pdfPageH = sample._pdfPageH;
            if(sample._embeddedRasterW) img._embeddedRasterW = sample._embeddedRasterW;
            if(sample._embeddedRasterH) img._embeddedRasterH = sample._embeddedRasterH;
            placeAt(img, p);
            attachObjListeners(img);
            canvas.add(img);
          }, { crossOrigin: 'anonymous' });
        }
      }
      processed = end;
      if(processed < layout.length){
        setTimeout(addBatch, 0);
      } else {
        setTimeout(finishTiling, 50);
      }
    };
    addBatch();
  };

  if(isGroup && layout.length > 1){
    // Use sample.toDataURL() — renders exactly as displayed, no mirroring issues
    const savedAngle = sample.angle;
    const savedFlipX = sample.flipX;
    const savedFlipY = sample.flipY;
    sample.set({ angle: 0, flipX: false, flipY: false });
    sample.setCoords();
    const dataUrl = sample.toDataURL({
      format: 'png',
      multiplier: rasterScale,
    });
    sample.set({ angle: savedAngle, flipX: savedFlipX, flipY: savedFlipY });
    sample.setCoords();
    addTilesFromImage(dataUrl);
  } else if(layout.length > 1){
    // Non-group: use JSON serialization (fast for images)
    const sampleJson = sample.toJSON(FABRIC_EXTRA_PROPS);
    let idx = 1;
    const next = ()=>{
      if(idx >= layout.length){ finishTiling(); return; }
      fabric.util.enlivenObjects([sampleJson], ([clone])=>{
        clone._id = ++idCounter;
        clone._originalId = ft.originalId;
        clone._name = ft.name;
        clone._naturalW = ft.naturalW;
        clone._naturalH = ft.naturalH;
        clone._isFillTile = true;
        // Explicitly preserve vector properties — enlivenObjects may drop custom _ props
        if(sample._hasGradients) clone._hasGradients = sample._hasGradients;
        if(sample._vectorOrigin) clone._vectorOrigin = sample._vectorOrigin;
        if(sample._embeddedRasterW) clone._embeddedRasterW = sample._embeddedRasterW;
        if(sample._embeddedRasterH) clone._embeddedRasterH = sample._embeddedRasterH;
        if(sample._pdfPageW) clone._pdfPageW = sample._pdfPageW;
        if(sample._pdfPageH) clone._pdfPageH = sample._pdfPageH;
        placeAt(clone, layout[idx]);
        attachObjListeners(clone);
        canvas.add(clone);
        idx++;
        next();
      });
    };
    next();
  } else {
    finishTiling();
  }
}

/* =========================================================
   SUMMARY (across all sheet tabs)
   ========================================================= */
function collectAllSheetStats(){
  // Single canvas version: only count current objects on canvas
  const stats = { unique: new Set(), total: 0, used: 0, lowDpi: 0, midDpi: 0, okDpi: 0 };
  const objs = canvas.getObjects();

  objs.forEach(o => {
    if(!o._mmW) return;
    stats.unique.add(o._originalId);
    stats.total++;
    stats.used += o._mmW * o._mmH;
    const dpi = calcEffectiveDpi(o);
    if(!isFinite(dpi)) { stats.okDpi++; return; }
    if(dpi >= 300) stats.okDpi++;
    else if(dpi >= 72) stats.midDpi++;
    else stats.lowDpi++;
  });

  return stats;
}

function updateSummary(){
  const s = collectAllSheetStats();
  document.getElementById('sumUnique').textContent = s.unique.size;
  document.getElementById('sumTotal').textContent  = s.total;
  const sheetArea = state.sheet.w * state.sheet.h;
  const pct = sheetArea ? Math.round((s.used / sheetArea) * 100) : 0;
  document.getElementById('sumUsage').textContent  = pct + '%';
  let dpiTxt;
  if(s.total === 0) dpiTxt = '—';
  else if(s.lowDpi > 0) dpiTxt = `⚠️ ${s.lowDpi} laag`;
  else if(s.midDpi > 0) dpiTxt = `⚠ ${s.midDpi} matig`;
  else dpiTxt = `✓ 300+`;
  document.getElementById('sumDpi').textContent = dpiTxt;
  const isDTF = SHEET_FORMATS[state.sheetFormat]?.isDTF;
  const sumLengthEl = document.getElementById('sumLength');
  if(isDTF){
    sumLengthEl.textContent = state.rollLengthM + 'm';
  } else {
    const fmt = SHEET_FORMATS[state.sheetFormat];
    sumLengthEl.textContent = fmt ? fmt.label : '—';
  }
}

/* =========================================================
   PDF EXPORT (multi-page for multi-sheet 55x100)
   ========================================================= */
const exportBtn = document.getElementById('exportBtn');

async function runPdfExport(withBackground = false){
  /* -------------------------------------------------------
     VECTOR-FIRST PDF EXPORT
     Primary engine: pdf-lib (creates final PDF)
     SVG track:      jsPDF + svg2pdf.js → intermediate PDF → embed in pdf-lib
     AI/PDF track:   original ArrayBuffer → embed in pdf-lib
     Raster track:   fabric clone → canvas PNG → embed in pdf-lib
     Canvas is NEVER used as export source for vector input.
     ------------------------------------------------------- */
  const canvasObjs = canvas.getObjects().filter(o => o._mmW != null);
  if(canvasObjs.length === 0){ toast(t('addLogoFirst'),'warn'); return; }

  // Low DPI warning
  let lowDpiCount = 0;
  canvasObjs.forEach(o => { const d = calcEffectiveDpi(o); if(isFinite(d) && d < 300) lowDpiCount++; });
  if(lowDpiCount > 0){
    const ok = await confirmModal(t('lowResFound'), `${lowDpiCount} ${t('lowResBody')}`, {okLabel:t('lowResOk')});
    if(!ok) return;
  }

  showPdfProgress(true);
  await new Promise(r => setTimeout(r, 400));

  // Trim height to content
  const contentBottomMm = getContentBottomMm();
  const exportGap = state.gapMm || 0;
  const trimmedH = Math.min(state.sheet.h, Math.ceil(contentBottomMm + exportGap));
  const sheetW = state.sheet.w;

  // Conversion constants
  const MM_TO_PT = 72 / 25.4;          // 1 mm = 2.8346… pt
  const RASTER_DPI = 300;
  const RASTER_PX_PER_MM = RASTER_DPI / 25.4;  // ~11.81 px/mm

  const yieldFrame = ()=> new Promise(r => setTimeout(r, 0));

  try {
    updatePdfProgress(1, 1);

    // --- Library detection ---
    const hasPdfLib = typeof window.PDFLib !== 'undefined' && typeof window.PDFLib.PDFDocument !== 'undefined';
    if(!hasPdfLib) throw new Error('pdf-lib niet geladen — kan geen PDF maken');

    const { PDFDocument, rgb } = window.PDFLib;

    // Detect svg2pdf.js availability — it may register as:
    //  (a) jsPDF plugin: new jsPDF().svg() exists, OR
    //  (b) window.svg2pdf global (function or object with .default)
    const hasJsPDF = typeof window.jspdf !== 'undefined' && typeof window.jspdf.jsPDF === 'function';
    let hasSvg2pdf = false;
    if(hasJsPDF){
      try {
        const probe = new window.jspdf.jsPDF({ unit:'mm', format:[10,10] });
        if(typeof probe.svg === 'function') hasSvg2pdf = true;
      } catch(_){}
    }
    if(!hasSvg2pdf){
      hasSvg2pdf = (typeof window.svg2pdf === 'function') ||
                   (typeof window.svg2pdf === 'object' && window.svg2pdf !== null &&
                    typeof (window.svg2pdf.default || window.svg2pdf.svg2pdf) === 'function');
    }

    const canDoSvgVector = hasSvg2pdf && hasJsPDF;
    console.log('[GSB Export] hasPdfLib:', hasPdfLib, '| hasSvg2pdf:', hasSvg2pdf,
                '| hasJsPDF:', hasJsPDF, '| canDoSvgVector:', canDoSvgVector);

    // --- Create final pdf-lib document ---
    const finalDoc = await PDFDocument.create();
    const sheetWPt = sheetW * MM_TO_PT;
    const sheetHPt = trimmedH * MM_TO_PT;

    // Detect if this is a fixed-format sheet (A3/A4/A5) for proof with footer
    const fmtDef = SHEET_FORMATS[state.sheetFormat];
    const isFixedSheet = fmtDef && !fmtDef.isDTF;

    // Footer SVG natural dimensions (viewBox 992.13 × 128.18 pt)
    const FOOTER_NATURAL_W_PT = 992.13;
    const FOOTER_NATURAL_H_PT = 128.18;
    const PAGE_W_MM = 350; // page width for A3/A4/A5 proofs
    const TOP_PAD_MM = 15;  // space above sheet (for format label)
    const GAP_MM = 10;      // gap between sheet bottom and footer
    const BTM_PAD_MM = 0;   // footer flush to bottom edge
    const FOOTER_H_MM = FOOTER_NATURAL_H_PT / MM_TO_PT; // ~45.2mm

    // For all proof types: page includes footer at bottom
    // For A3/A4/A5: page = 350mm wide, sheet = full format height, centered
    // For DTF: page = sheet width, footer scaled to match
    // For normal export: page = sheet size, no background
    const proofSheetHMm = (withBackground && isFixedSheet) ? fmtDef.h : trimmedH;
    const proofSheetHPt = proofSheetHMm * MM_TO_PT;
    let pageWPt, pageHPt, offsetXPt = 0, offsetYPt = 0;
    // Footer height scales with page width (preserving aspect ratio)
    let actualFooterHMm = FOOTER_H_MM; // default at 350mm width
    if(withBackground){
      if(isFixedSheet){
        pageWPt = PAGE_W_MM * MM_TO_PT;
      } else {
        pageWPt = sheetWPt;
        // Scale footer height proportionally to page width
        actualFooterHMm = FOOTER_H_MM * (sheetW / PAGE_W_MM);
      }
      const pageHMm = TOP_PAD_MM + proofSheetHMm + GAP_MM + actualFooterHMm + BTM_PAD_MM;
      pageHPt = pageHMm * MM_TO_PT;
      // Center the sheet horizontally (only matters for A3/A4/A5)
      offsetXPt = (pageWPt - sheetWPt) / 2;
      // Sheet bottom Y in PDF coords (Y=0 at bottom)
      const sheetBottomMm = BTM_PAD_MM + actualFooterHMm + GAP_MM;
      // offsetYPt: used in drawAtTile to shift tiles from sheet-relative to page coords
      // drawAtTile computes: yPt = pageHPt - (mmTop + mmH) * MM_TO_PT - offsetYPt
      // When mmTop=0, tile should align to TOP of the content area.
      // So: offsetYPt = pageHPt - proofSheetHPt - sheetBottomMm * MM_TO_PT (= TOP_PAD_MM * MM_TO_PT)
      offsetYPt = pageHPt - proofSheetHPt - sheetBottomMm * MM_TO_PT;
    } else {
      pageWPt = sheetWPt;
      pageHPt = sheetHPt;
    }
    const page = finalDoc.addPage([pageWPt, pageHPt]);

    // --- Optional proof background ---
    if(withBackground){
      // Light gray background (full page, all proof types)
      page.drawRectangle({ x: 0, y: 0, width: pageWPt, height: pageHPt,
        color: rgb(229/255, 231/255, 235/255) });

      if(isFixedSheet){
        // Sheet border — always shows full format (A3/A4/A5), not trimmed content
        const sheetBottomPt = (BTM_PAD_MM + FOOTER_H_MM + GAP_MM) * MM_TO_PT;
        const borderColor = rgb(0.4, 0.4, 0.4);
        page.drawRectangle({
          x: offsetXPt, y: sheetBottomPt,
          width: sheetWPt, height: proofSheetHPt,
          borderColor, borderWidth: 0.5,
        });

        // Format label above the sheet border
        const labelBold = await finalDoc.embedFont(window.PDFLib.StandardFonts.HelveticaBold);
        const label = fmtDef.label + '  (' + sheetW + ' × ' + fmtDef.h + ' mm)';
        const labelSize = 11;
        const labelW = labelBold.widthOfTextAtSize(label, labelSize);
        page.drawText(label, {
          x: offsetXPt + (sheetWPt - labelW) / 2,
          y: sheetBottomPt + proofSheetHPt + 5,
          size: labelSize,
          font: labelBold,
          color: rgb(0.3, 0.3, 0.3),
        });

      }

      // Footer SVG at the bottom — for ALL proof types (A3/A4/A5 + DTF)
      try {
        const ftImg = new Image();
        const ftLoadP = new Promise((res, rej) => { ftImg.onload = res; ftImg.onerror = rej; });
        ftImg.src = PROOF_FOOTER_DATA_URI; // inline base64 — no fetch needed
        await ftLoadP;
        // Rasterize at 150 DPI (use natural SVG proportions for raster)
        const ftPxW = Math.round(PAGE_W_MM * 150 / 25.4);
        const ftPxH = Math.round(FOOTER_H_MM * 150 / 25.4);
        const ftCanvas = document.createElement('canvas');
        ftCanvas.width = ftPxW; ftCanvas.height = ftPxH;
        const ftCtx = ftCanvas.getContext('2d');
        ftCtx.drawImage(ftImg, 0, 0, ftPxW, ftPxH);
        // Eigen drukproef-logo (printer/admin) vervangt het TPS-logo linksin
        try {
          const customLogo = (window.gsAuth && gsAuth.profile && gsAuth.profile.proof_logo) || null;
          if(customLogo){
            const li = new Image();
            await new Promise((res, rej) => { li.onload = res; li.onerror = rej; li.src = customLogo; });
            const areaW = ftPxW * 0.32, pad = ftPxH * 0.14;
            ftCtx.fillStyle = '#000';
            ftCtx.fillRect(0, 0, areaW, ftPxH);
            const mw = areaW - pad * 2, mh = ftPxH - pad * 2;
            const sc = Math.min(mw / li.width, mh / li.height);
            const dw = li.width * sc, dh = li.height * sc;
            ftCtx.drawImage(li, pad + (mw - dw) / 2, pad + (mh - dh) / 2, dw, dh);
            console.log('[GSB Export] Custom proof logo toegepast in footer');
          }
        } catch(clErr){ console.warn('[GSB Export] Custom proof logo mislukt:', clErr); }
        const ftDataUrl = ftCanvas.toDataURL('image/png');
        const ftBase64 = ftDataUrl.split(',')[1];
        const ftBin = atob(ftBase64);
        const ftBytes = new Uint8Array(ftBin.length);
        for(let i = 0; i < ftBin.length; i++) ftBytes[i] = ftBin.charCodeAt(i);
        const embeddedFt = await finalDoc.embedPng(ftBytes);
        const footerHPt = actualFooterHMm * MM_TO_PT;
        const footerYPt = BTM_PAD_MM * MM_TO_PT;
        page.drawImage(embeddedFt, { x: 0, y: footerYPt, width: pageWPt, height: footerHPt });
        console.log('[GSB Export] Footer embedded at bottom of proof (' + ftPxW + '×' + ftPxH + 'px)');
      } catch(ftErr){
        console.error('[GSB Export] Could not embed proof footer:', ftErr);
      }
    }

    // --- Collect objects grouped by originalId ---
    const liveObjs = canvas.getObjects().filter(o => o._mmW != null);
    const uniqueLogos = new Map(); // oid → { sample, tiles: [] }
    for(const o of liveObjs){
      const oid = o._originalId || o._id;
      if(!uniqueLogos.has(oid)){
        uniqueLogos.set(oid, { sample: o, tiles: [] });
      } else {
        // Prefer a sample with _recolored/_rasterEdited flag — it reflects
        // edits (kleur, outline). Also prefer group (SVG) over image for
        // higher-fidelity vector export when nothing was edited.
        const cur = uniqueLogos.get(oid).sample;
        const curEdited = cur._recolored || cur._rasterEdited;
        const oEdited = o._recolored || o._rasterEdited;
        if(!curEdited && oEdited){
          uniqueLogos.get(oid).sample = o;
        } else if(!curEdited && !oEdited && cur.type !== 'group' && o.type === 'group'){
          uniqueLogos.get(oid).sample = o;
        }
      }
      uniqueLogos.get(oid).tiles.push({
        mmLeft: o._mmLeft, mmTop: o._mmTop,
        mmW: o._mmW, mmH: o._mmH,
        angle: o.angle || 0,
      });
    }

    // --- Classify into three tracks ---
    // Track 1: SVG vector (svg2pdf.js) — for pure SVG uploads with _svgSource
    // Track 2: PDF embed (pdf-lib embedPdf) — for AI/PDF uploads with pdfSourceBuffers entry
    //          Preserves 100% of original vector content including gradients, patterns, text.
    // Track 3: Raster (300 DPI PNG) — for images and anything else
    const vectorSvgIds = new Set();
    const pdfEmbedIds = new Set();
    const rasterIds = new Set();

    for(const [oid, grp] of uniqueLogos){
      const s = grp.sample;

      // PRIORITY: If the logo has _svgSource AND svg2pdf support, ALWAYS use Track 1.
      // _svgSource is the auto-cropped SVG — it has exactly the right content area
      // without artboard whitespace. This is true for:
      //   - Pure SVG uploads
      //   - AI/PDF PATH A (pdfToSvg → autoCropSvg, no gradients)
      //   - Recolored AI/PDF logos
      // Track 2 (embedPdf) embeds the ORIGINAL uncropped PDF page, which causes
      // squished logos when the artboard is larger than the content.
      // _rasterEdited: edits (outline/kleur/upscale) live only in the pixels —
      // stale SVG sources or original PDF buffers must NOT be used for export.
      const sSvgSrc = s._rasterEdited ? null : getSvgSource(s);
      if(canDoSvgVector && sSvgSrc && !s._embeddedRasterW){
        vectorSvgIds.add(oid);
      } else if(pdfSourceBuffers.has(oid) && !s._recolored && !s._rasterEdited && !sSvgSrc){
        // AI/PDF PATH B: gradient logo, no _svgSource available.
        // embedPdf is the only way to preserve gradient/pattern fidelity.
        // Check if content is significantly smaller than artboard → fall back to raster.
        let useRaster = false;
        if(s._pdfPageW && s._pdfPageH){
          const refTile = grp.tiles.find(t => Math.abs(t.angle % 360) <= 0.1) || grp.tiles[0];
          if(refTile){
            const swp = isDimSwapped(refTile.angle);
            const contentMmW = swp ? refTile.mmH : refTile.mmW;
            const contentMmH = swp ? refTile.mmW : refTile.mmH;
            const artboardMmW = s._pdfPageW * 25.4 / 72;
            const artboardMmH = s._pdfPageH * 25.4 / 72;
            if(contentMmW < artboardMmW * 0.8 || contentMmH < artboardMmH * 0.8){
              useRaster = true;
              console.log(`[GSB Export] ${s._name||oid}: gradient PDF, artboard >> content → Track 3 (raster)`);
            }
          }
        }
        if(useRaster) rasterIds.add(oid);
        else pdfEmbedIds.add(oid);
      } else {
        rasterIds.add(oid);
      }
    }
    console.log(`[GSB Export] Classification: ${vectorSvgIds.size} SVG vector, ${pdfEmbedIds.size} PDF embed (lossless), ${rasterIds.size} raster`);

    // --- Helper: call svg2pdf with correct API ---
    async function callSvg2pdf(svgEl, targetJsPdf, opts){
      if(typeof targetJsPdf.svg === 'function')
        return await targetJsPdf.svg(svgEl, opts);
      if(typeof window.svg2pdf === 'function')
        return await window.svg2pdf(svgEl, targetJsPdf, opts);
      if(window.svg2pdf && typeof window.svg2pdf.default === 'function')
        return await window.svg2pdf.default(svgEl, targetJsPdf, opts);
      if(window.svg2pdf && typeof window.svg2pdf.svg2pdf === 'function')
        return await window.svg2pdf.svg2pdf(svgEl, targetJsPdf, opts);
      throw new Error('svg2pdf not available');
    }

    // --- Helper: rasterize a fabric object to PNG ArrayBuffer at 300 DPI ---
    async function rasterizeLogo(sample, mmW, mmH){
      const pxW = Math.round(mmW * RASTER_PX_PER_MM);
      const pxH = Math.round(mmH * RASTER_PX_PER_MM);
      const tmpEl = document.createElement('canvas');
      tmpEl.width = pxW; tmpEl.height = pxH;
      const tmpFab = new fabric.StaticCanvas(tmpEl, {
        width: pxW, height: pxH, backgroundColor: null, enableRetinaScaling: false,
      });
      const clone = await new Promise(res => sample.clone(res, FABRIC_EXTRA_PROPS));
      clone.set({
        originX:'center', originY:'center',
        left: pxW/2, top: pxH/2,
        scaleX: pxW / clone.width,
        scaleY: pxH / clone.height,
        angle: 0,
      });
      clone.setCoords();
      tmpFab.add(clone);
      tmpFab.renderAll();
      // Get PNG as ArrayBuffer
      const dataUrl = tmpEl.toDataURL('image/png');
      tmpFab.dispose();
      // Convert data URL to Uint8Array
      const base64 = dataUrl.split(',')[1];
      const binStr = atob(base64);
      const bytes = new Uint8Array(binStr.length);
      for(let i = 0; i < binStr.length; i++) bytes[i] = binStr.charCodeAt(i);
      return bytes;
    }

    // --- Helper: does this angle swap bounding-box dimensions? ---
    // Only 90° and 270° swap width↔height. 0° and 180° do NOT.
    function isDimSwapped(angle){
      const a = ((angle % 360) + 360) % 360;
      return (a > 45 && a < 135) || (a > 225 && a < 315);
    }

    // --- Helper: draw embedded content at tile position, handling rotation ---
    function drawAtTile(embeddedObj, tile, isPage){
      const angle = ((tile.angle % 360) + 360) % 360;
      const hasRotation = angle > 0.1 && angle < 359.9;
      const swapped = isDimSwapped(angle);

      // _mmW/_mmH are ALWAYS LOGICAL (unrotated) dimensions.
      // Source = logical = what pdf-lib should draw at (no swap).
      const srcWPt = tile.mmW * MM_TO_PT;
      const srcHPt = tile.mmH * MM_TO_PT;
      // Visual bounding box (after rotation) — swap when rotated
      const bboxWPt = (swapped ? tile.mmH : tile.mmW) * MM_TO_PT;
      const bboxHPt = (swapped ? tile.mmW : tile.mmH) * MM_TO_PT;

      if(!hasRotation){
        // 0°: draw directly at bounding box position
        const xPt = tile.mmLeft * MM_TO_PT + offsetXPt;
        const yPt = pageHPt - (tile.mmTop + tile.mmH) * MM_TO_PT - offsetYPt;
        const drawOpts = { x: xPt, y: yPt, width: bboxWPt, height: bboxHPt };
        if(isPage) page.drawPage(embeddedObj, drawOpts);
        else page.drawImage(embeddedObj, drawOpts);
      } else {
        // Any rotation: use affine transform around bounding-box center
        const cx = tile.mmLeft * MM_TO_PT + bboxWPt / 2 + offsetXPt;
        const cy = pageHPt - (tile.mmTop * MM_TO_PT + bboxHPt / 2) - offsetYPt;

        const rad = -(angle * Math.PI / 180);
        const cos = Math.cos(rad), sin = Math.sin(rad);

        page.pushOperators(
          window.PDFLib.pushGraphicsState(),
          window.PDFLib.concatTransformationMatrix(
            cos, sin, -sin, cos,
            cx - cos*cx + sin*cy,
            cy - sin*cx - cos*cy
          ),
        );
        // Draw at source's natural dims, centered on the bounding-box center
        const drawOpts = { x: cx - srcWPt/2, y: cy - srcHPt/2, width: srcWPt, height: srcHPt };
        if(isPage) page.drawPage(embeddedObj, drawOpts);
        else page.drawImage(embeddedObj, drawOpts);
        page.pushOperators(window.PDFLib.popGraphicsState());
      }
    }

    let vectorOk = 0, vectorFail = 0;

    // ===========================================================
    // TRACK 1: SVG VECTOR — svg2pdf.js → intermediate jsPDF → embed as PDF page in pdf-lib
    // ===========================================================
    if(vectorSvgIds.size > 0){
      // Self-test svg2pdf with a trivial SVG → temp jsPDF
      let svg2pdfWorks = false;
      try {
        const testJsPdf = new window.jspdf.jsPDF({ unit:'mm', format:[10,10] });
        const testSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        testSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        testSvg.setAttribute('viewBox', '0 0 10 10');
        testSvg.setAttribute('width', '10'); testSvg.setAttribute('height', '10');
        const testRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        testRect.setAttribute('width','10'); testRect.setAttribute('height','10'); testRect.setAttribute('fill','red');
        testSvg.appendChild(testRect);
        testSvg.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none';
        document.body.appendChild(testSvg);
        await callSvg2pdf(testSvg, testJsPdf, { x:0, y:0, width:10, height:10 });
        document.body.removeChild(testSvg);
        svg2pdfWorks = true;
        console.log('%c[GSB] svg2pdf self-test: PASSED', 'color:green;font-weight:bold');
      } catch(e){
        console.error('[GSB] svg2pdf self-test FAILED:', e);
        try { document.body.querySelector('svg[style*="-9999"]')?.remove(); } catch(_){}
      }

      if(!svg2pdfWorks){
        console.error('[GSB] svg2pdf broken — moving all SVG logos to raster track');
        for(const oid of vectorSvgIds) rasterIds.add(oid);
        vectorSvgIds.clear();
      }
    }

    if(vectorSvgIds.size > 0){
      // Container must NOT constrain SVG size (no width/height limits).
      // svg2pdf.js calls getComputedStyle — if the SVG is inside a 1px box,
      // computed dimensions collapse and the render breaks.
      const svgContainer = document.createElement('div');
      svgContainer.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none;overflow:visible';
      document.body.appendChild(svgContainer);
      const parser = new DOMParser();

      // Cache: oid → embeddedPage (so we embed once, stamp many times)
      const svgEmbedCache = new Map();

      for(const oid of vectorSvgIds){
        const grp = uniqueLogos.get(oid);
        const svgText = getSvgSource(grp.sample);
        if(!svgText){ rasterIds.add(oid); continue; }

        let embeddedPage = null;
        try {
          // 1. Determine the logo's physical mm dimensions (un-rotated).
          //    These are the GROUND TRUTH for how big this logo should be.
          const refTile = grp.tiles.find(t => Math.abs(t.angle % 360) <= 0.1) || grp.tiles[0];
          const refSwapped = isDimSwapped(refTile.angle);
          const srcMmW = refSwapped ? refTile.mmH : refTile.mmW;
          const srcMmH = refSwapped ? refTile.mmW : refTile.mmH;

          // 2. Parse SVG into DOM element
          const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
          const parseErr = svgDoc.querySelector('parsererror');
          if(parseErr) throw new Error('SVG parse error: ' + parseErr.textContent.substring(0, 200));
          let svgEl = svgDoc.documentElement;

          if(!svgEl.getAttribute('xmlns'))
            svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

          // Ensure viewBox exists
          if(!svgEl.getAttribute('viewBox')){
            const aw = parseFloat(svgEl.getAttribute('width')) || 100;
            const ah = parseFloat(svgEl.getAttribute('height')) || 100;
            svgEl.setAttribute('viewBox', `0 0 ${aw} ${ah}`);
          }

          // 3. Read viewBox — this is the SVG's native coordinate system.
          const vbParts = svgEl.getAttribute('viewBox').split(/[\s,]+/).map(Number);
          const vbW = vbParts[2];
          const vbH = vbParts[3];

          // ============================================================
          // IDENTITY-TRANSFORM APPROACH (definitive fix for stretching)
          // ============================================================
          // Previous attempts tried to let svg2pdf.js scale SVG→mm.
          // svg2pdf consistently distorted the content regardless of how
          // we configured width/height/units.
          //
          // New strategy: svg2pdf does ZERO scaling.
          //   - SVG width/height = viewBox dimensions (unitless)
          //   - jsPDF page = viewBox dimensions in POINTS
          //   - svg2pdf target = viewBox dimensions in POINTS
          //   → viewBox ≡ viewport ≡ page ≡ target = identity transform
          //   → svg2pdf just writes SVG paths at native coordinates
          //
          // All physical scaling (to mm) happens AFTER, in pdf-lib's
          // drawPage({width, height}) which is a simple affine transform.
          // ============================================================
          svgEl.setAttribute('width', String(vbW));
          svgEl.setAttribute('height', String(vbH));
          // Strip any preserveAspectRatio that could cause svg2pdf to
          // add offsets or non-uniform scaling within the identity page
          svgEl.setAttribute('preserveAspectRatio', 'none');
          // Remove inline styles that could override dimensions
          svgEl.style.cssText = '';

          console.log(`[GSB SVG] ${grp.sample._name || oid}: ` +
            `viewBox=${vbParts.join(' ')}, target=${srcMmW.toFixed(1)}×${srcMmH.toFixed(1)}mm`);

          // 4. Import into DOM (required for getComputedStyle by svg2pdf)
          const imported = document.importNode(svgEl, true);
          svgContainer.appendChild(imported);

          // 5. Create intermediate jsPDF at VIEWBOX dimensions in POINTS.
          //    1 SVG user unit = 1 point. No mm, no scaling.
          //    CRITICAL: jsPDF silently swaps format[0]/format[1] when the
          //    first dimension > second AND no orientation is specified
          //    (defaults to portrait). This caused ALL previous stretching
          //    bugs — the page became portrait while svg2pdf rendered
          //    landscape content, producing a clipped/stretched result.
          const tmpPdf = new window.jspdf.jsPDF({
            unit: 'pt',
            format: [vbW, vbH],
            orientation: vbW > vbH ? 'landscape' : 'portrait',
            compress: false,
          });

          // 6. svg2pdf renders at viewBox scale — identity, no distortion.
          await callSvg2pdf(imported, tmpPdf, {
            x: 0, y: 0,
            width: vbW, height: vbH,
          });

          // 7. Embed the identity-scale page in pdf-lib.
          //    drawAtTile will scale it to physical mm via drawPage({width,height}).
          const tmpBytes = tmpPdf.output('arraybuffer');
          // Verify jsPDF didn't swap our dimensions
          const jsPdfW = tmpPdf.internal.pageSize.getWidth();
          const jsPdfH = tmpPdf.internal.pageSize.getHeight();
          console.log(`[GSB SVG] Intermediate: ${tmpBytes.byteLength} bytes, ` +
            `requested=${vbW}×${vbH}pt, jsPDF actual=${jsPdfW}×${jsPdfH}pt, ` +
            `match=${Math.abs(jsPdfW-vbW)<0.1 && Math.abs(jsPdfH-vbH)<0.1 ? '✓' : '✗ SWAPPED!'}`);

          const tmpDoc = await PDFDocument.load(tmpBytes);
          const [ep] = await finalDoc.embedPdf(tmpDoc, [0]);
          embeddedPage = ep;
          svgEmbedCache.set(oid, embeddedPage);

          // Clean up DOM
          svgContainer.removeChild(imported);

          console.log(`[GSB] SVG vector embed OK: ${grp.sample._name || oid} (${srcMmW.toFixed(1)}×${srcMmH.toFixed(1)}mm)`);
        } catch(e){
          console.error('[GSB] SVG vector embed FAILED for', oid, ':', e);
          embeddedPage = null;
        }

        if(embeddedPage){
          // Draw at each tile position
          for(const tile of grp.tiles){
            try {
              drawAtTile(embeddedPage, tile, true);
              vectorOk++;
            } catch(e){
              console.error('[GSB] drawPage failed for SVG tile:', e);
              vectorFail++;
            }
          }
        } else {
          // Fallback to raster for this logo
          console.warn('[GSB] SVG logo', oid, 'falling back to raster');
          rasterIds.add(oid);
          vectorFail += grp.tiles.length;
        }
        await yieldFrame();
      }
      document.body.removeChild(svgContainer);
    }

    // ===========================================================
    // TRACK 2: PDF EMBED — original AI/PDF via pdf-lib embedPdf
    // ===========================================================
    // Embeds the ORIGINAL PDF binary — preserves 100% of vector content
    // including gradients, patterns, shadings, text, and complex artwork.
    // NOTE: Only files whose content matches the full artboard reach this track.
    // Auto-cropped files (artboard >> content) are redirected to Track 1/3
    // during classification above, because embedPdf always embeds the full page.
    if(pdfEmbedIds.size > 0){
      const pdfEmbedCache = new Map(); // oid → embeddedPage
      for(const oid of pdfEmbedIds){
        const grp = uniqueLogos.get(oid);
        if(!grp) continue;

        let embeddedPage = pdfEmbedCache.get(oid);
        if(!embeddedPage){
          try {
            const srcBuffer = pdfSourceBuffers.get(oid);
            if(!srcBuffer) throw new Error('No source buffer for ' + oid);
            const srcDoc = await PDFDocument.load(srcBuffer);

            const [ep] = await finalDoc.embedPdf(srcDoc, [0]);
            embeddedPage = ep;
            pdfEmbedCache.set(oid, embeddedPage);
            console.log(`[GSB] PDF embed OK: ${grp.sample._name || oid} (${srcBuffer.byteLength} bytes)`);
          } catch(e){
            console.error('[GSB] PDF embed FAILED for', oid, ':', e);
            // Fallback to raster
            rasterIds.add(oid);
            continue;
          }
        }

        for(const tile of grp.tiles){
          try {
            drawAtTile(embeddedPage, tile, true);
            vectorOk++;
          } catch(e){
            console.error('[GSB] drawPage failed for PDF tile:', e);
            vectorFail++;
          }
        }
        await yieldFrame();
      }
    }

    // ===========================================================
    // TRACK 3: RASTER — 300 DPI PNG embedded as image in pdf-lib
    // ===========================================================
    // Cache: oid → embedded PDFImage
    const rasterEmbedCache = new Map();

    for(const oid of rasterIds){
      const grp = uniqueLogos.get(oid);
      if(!grp) continue;
      const sample = grp.sample;

      let embeddedImg = rasterEmbedCache.get(oid);
      if(!embeddedImg){
        try {
          // Find a non-rotated tile's dimensions, or un-swap from a rotated tile
          const refTile = grp.tiles.find(t => Math.abs(t.angle % 360) <= 0.1) || grp.tiles[0];
          const refSwapped = isDimSwapped(refTile.angle);
          const srcMmW = refSwapped ? refTile.mmH : refTile.mmW;
          const srcMmH = refSwapped ? refTile.mmW : refTile.mmH;
          const pngBytes = await rasterizeLogo(sample, srcMmW, srcMmH);
          embeddedImg = await finalDoc.embedPng(pngBytes);
          rasterEmbedCache.set(oid, embeddedImg);
        } catch(e){
          console.error('[GSB] Rasterize failed for', oid, ':', e);
          continue;
        }
      }

      for(const tile of grp.tiles){
        try {
          drawAtTile(embeddedImg, tile, false);
        } catch(e){
          console.error('[GSB] drawImage failed for raster tile:', e);
        }
      }
      await yieldFrame();
    }

    // --- Dimension labels under every logo (proof only) ---
    if(withBackground){
      try {
        const dimFont = await finalDoc.embedFont(window.PDFLib.StandardFonts.Helvetica);
        const dimSize = 7;
        const dimColor = rgb(0.35, 0.35, 0.35);
        const dimBgColor = rgb(1, 1, 1);
        let dimCount = 0;

        for(const [oid, grp] of uniqueLogos){
          for(const tile of grp.tiles){
            // Visual (post-rotation) dimensions in cm
            const swapped = isDimSwapped(tile.angle);
            const wCm = ((swapped ? tile.mmH : tile.mmW) / 10).toFixed(1);
            const hCm = ((swapped ? tile.mmW : tile.mmH) / 10).toFixed(1);
            const dimText = wCm + ' × ' + hCm + ' cm';

            // Position: centered below this tile
            const bboxWPt = (swapped ? tile.mmH : tile.mmW) * MM_TO_PT;
            const tileXPt = tile.mmLeft * MM_TO_PT + offsetXPt;
            const tileYPt = pageHPt - (tile.mmTop + (swapped ? tile.mmW : tile.mmH)) * MM_TO_PT - offsetYPt;

            const textW = dimFont.widthOfTextAtSize(dimText, dimSize);
            const textX = tileXPt + (bboxWPt - textW) / 2;
            const textY = tileYPt - 10; // 10pt below the tile

            // Small white background behind text for readability
            const pad = 2;
            page.drawRectangle({
              x: textX - pad, y: textY - 2,
              width: textW + pad * 2, height: dimSize + 4,
              color: dimBgColor, opacity: 0.85,
            });

            page.drawText(dimText, {
              x: textX, y: textY,
              size: dimSize,
              font: dimFont,
              color: dimColor,
            });
            dimCount++;
          }
        }
        console.log('[GSB Export] Dimension labels drawn for', dimCount, 'logos');
      } catch(dimErr){
        console.warn('[GSB Export] Could not draw dimension labels:', dimErr);
      }
    }

    // --- Save and download ---
    const projectTitle = (document.getElementById('projectTitleInput').value || '').trim();
    const today = new Date();
    const dateStr = String(today.getDate()).padStart(2,'0') + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + today.getFullYear();
    const safeTitle = projectTitle ? projectTitle.replace(/[^a-zA-Z0-9\-_ ]/g, '').replace(/\s+/g, '-').substring(0, 40) : '';
    const proofTag = withBackground ? '-drukproef' : '';
    const formatTag = SHEET_FORMATS[state.sheetFormat]?.isDTF ? '-dtf' : `-${state.sheetFormat}`;
    const filename = safeTitle
      ? `${safeTitle}${formatTag}${proofTag}-${dateStr}.pdf`
      : `gangsheet${formatTag}${proofTag}-${dateStr}.pdf`;

    const finalBytes = await finalDoc.save();
    const blob = new Blob([finalBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    setTimeout(()=> URL.revokeObjectURL(url), 5000);

    // --- Report results ---
    const totalTiles = [...uniqueLogos.values()].reduce((s, g) => s + g.tiles.length, 0);
    const rasterTiles = totalTiles - vectorOk;
    console.log(`[GSB Export] Done: ${vectorOk} vector, ${rasterTiles} raster, ${vectorFail} fallbacks`);

    if(vectorOk > 0){
      toast(`PDF opgeslagen: ${vectorOk} vector, ${rasterTiles} raster (300 DPI)`, 'success', 5000);
    } else if(vectorFail > 0){
      toast('PDF opgeslagen als 300 DPI raster (vector embedding mislukt — zie console)', 'warn', 5000);
    } else {
      toast('PDF opgeslagen (300 DPI raster)', 'success', 3000);
    }
    showPdfProgress(false, `${filename} ${t('pdfSaved')}`);
  } catch(err){
    console.error('PDF export error:', err);
    showPdfProgress(false, 'Export mislukt');
    toast('PDF export mislukt: ' + (err.message || err), 'warn');
  }
}

// Wire up export buttons
exportBtn.onclick = () => runPdfExport(false);
const exportBgBtn = document.getElementById('exportBgBtn');
if(exportBgBtn) exportBgBtn.onclick = () => runPdfExport(true);

/* =========================================================
   PDF PROGRESS INDICATOR (above export button)
   ========================================================= */
function showPdfProgress(show, doneMsg){
  const wrap = document.getElementById('pdfProgressWrap');
  if(show){
    wrap.innerHTML = `<div class="pdf-progress-inner">
      <div class="pdf-spinner"></div>
      <span id="pdfProgressLabel">${t('pdfGenerating')}</span>
    </div>`;
    wrap.classList.add('visible');
    document.getElementById('exportBtn').disabled = true;
    const _bgBtn = document.getElementById('exportBgBtn');
    if(_bgBtn) _bgBtn.disabled = true;
  } else {
    wrap.innerHTML = `<div class="pdf-progress-inner pdf-done">
      <span class="pdf-check">✓</span>
      <span>${doneMsg || ''}</span>
    </div>`;
    document.getElementById('exportBtn').disabled = false;
    const _bgBtn2 = document.getElementById('exportBgBtn');
    if(_bgBtn2) _bgBtn2.disabled = false;
    setTimeout(()=>{ wrap.classList.remove('visible'); wrap.innerHTML = ''; }, 3500);
  }
}
function updatePdfProgress(current, total){
  const label = document.getElementById('pdfProgressLabel');
  if(label){
    if(total > 1) label.textContent = `${t('pdfGenerating')} (${current}/${total})…`;
    else label.textContent = t('pdfGenerating');
  }
}

/* =========================================================
   TOAST + MODAL
   ========================================================= */
const toastWrap = document.getElementById('toastWrap');
/* =========================================================
   CANVAS LOADING OVERLAY
   ========================================================= */
function showCanvasLoader(pct, label){
  const el = document.getElementById('canvasPct');
  if(!el) return;
  const numEl = document.getElementById('canvasPctNum');
  const lblEl = document.getElementById('canvasPctLabel');
  if(numEl) numEl.textContent = (typeof pct === 'number' ? Math.round(pct) : 0) + '%';
  if(lblEl && label) lblEl.textContent = label;
  el.classList.add('active');
}
function hideCanvasLoader(){
  const el = document.getElementById('canvasPct');
  if(el) el.classList.remove('active');
}

/* ── Logo loading overlay (centered on canvas) ── */
let _logoLoadTimer = null;
function showLogoLoading(text){
  const ov = document.getElementById('logoLoadOverlay');
  const tx = document.getElementById('logoLoadText');
  const bar = document.getElementById('logoLoadBarFill');
  if(!ov) return;
  if(tx) tx.textContent = text || 'Logo laden…';
  if(bar) bar.style.width = '0%';
  ov.classList.add('active');
  // Animate the bar in steps to give visual feedback
  clearInterval(_logoLoadTimer);
  let pct = 0;
  _logoLoadTimer = setInterval(()=>{
    pct += Math.random() * 12 + 3;
    if(pct > 90) pct = 90; // Never reach 100 until hideLogoLoading
    if(bar) bar.style.width = pct + '%';
  }, 300);
}
function hideLogoLoading(){
  clearInterval(_logoLoadTimer);
  const ov = document.getElementById('logoLoadOverlay');
  const bar = document.getElementById('logoLoadBarFill');
  if(bar) bar.style.width = '100%';
  setTimeout(()=>{
    if(ov) ov.classList.remove('active');
    if(bar) bar.style.width = '0%';
  }, 350);
}

function toast(msg, type='info', ms=3000, toastId, dismissLabel){
  const el = document.createElement('div');
  el.className = 'toast ' + type + (ms === 0 ? ' sticky' : '');
  if(toastId) el.dataset.toastId = toastId;
  const text = document.createElement('span');
  text.className = 'toast-text';
  text.textContent = msg;
  el.appendChild(text);
  if(ms === 0){
    const close = document.createElement('button');
    close.type = 'button';
    if(dismissLabel){
      // Text button instead of × icon
      close.className = 'toast-dismiss-btn';
      close.textContent = dismissLabel;
    } else {
      close.className = 'toast-close';
      close.setAttribute('aria-label', 'Sluiten');
      close.innerHTML = '&times;';
    }
    close.onclick = ()=>{
      el.style.opacity = '0';
      el.style.transform = 'translateY(-6px)';
      setTimeout(()=>el.remove(), 300);
    };
    el.appendChild(close);
  } else {
    setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateY(-6px)'; }, ms);
    setTimeout(()=>el.remove(), ms+400);
  }
  toastWrap.appendChild(el);
}

function dismissToast(id){
  const el = toastWrap.querySelector(`[data-toast-id="${id}"]`);
  if(el){
    el.style.opacity = '0';
    el.style.transform = 'translateY(-6px)';
    setTimeout(()=>el.remove(), 300);
  }
}

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalActions = document.getElementById('modalActions');

function openModal(title, body, buttons){
  return new Promise(resolve=>{
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modalActions.innerHTML = '';
    buttons.forEach(b=>{
      const btn = document.createElement('button');
      btn.className = 'btn ' + (b.primary ? 'btn-primary' : 'btn-ghost');
      btn.textContent = b.label;
      btn.onclick = ()=>{ modal.classList.remove('open'); resolve(b.val); };
      modalActions.appendChild(btn);
    });
    modal.classList.add('open');
  });
}

function confirmModal(title, body, opts={}){
  return openModal(title, body, [
    { label: opts.cancelLabel || t('cancel'), val:false },
    { label: opts.okLabel     || t('ok'),     val:true, primary:true },
  ]);
}

/* =========================================================
   REPACK — shelf-packs every logo on the current canvas using the new gap.
   Single canvas mode: overflow items trigger a warning (no tab spilling).
   ========================================================= */
function repackAll(){
  if(state.fillTemplate){ tileSheet(); return; }
  const objs = canvas.getObjects().filter(o=>o._mmW && o._mmH && !o._isFillTile);
  if(objs.length === 0) return;

  canvas.discardActiveObject();

  const gap = state.gapMm || 0;
  const sheetW = state.sheet.w;
  let sheetH = state.sheet.h;
  const isDTF = !!SHEET_FORMATS[state.sheetFormat]?.isDTF;

  /* ── Skyline bottom-left packer ──
     Tracks the "skyline" — the top edge of occupied space at each x position.
     For every item we try both orientations (normal + rotated 90°) and pick
     the placement that adds the least height. This fills side-gaps naturally
     because smaller items slide into lower parts of the skyline. */

  // Reset all rotations/flips to 0° before repacking — prevents accumulation
  // (e.g. 90°+90°=180° upside down) and ensures the packer only applies 0° or 90°.
  objs.forEach(o => {
    o.rotate(0);
    o.flipX = false;
    o.flipY = false;
    // Recalculate scales so visual size matches _mmW × _mmH at angle=0
    o.scaleX = (o._mmW * displayPxPerMm) / o.width;
    o.scaleY = (o._mmH * displayPxPerMm) / o.height;
    o.setCoords();
  });

  // Gather items with their ORIGINAL (un-rotated) mm dimensions
  const items = objs.map(o => {
    // Use _mmW/_mmH which are the logical dimensions
    return { obj: o, origW: o._mmW, origH: o._mmH, area: o._mmW * o._mmH };
  });

  // Sort by height descending for better skyline packing
  items.sort((a,b) => b.origH - a.origH || b.area - a.area);

  // Skyline: array of {x, y, width} segments, initially one segment spanning full width at y=0
  let skyline = [{ x: 0, y: 0, width: sheetW }];
  const overflow = [];
  const placements = []; // {item, x, y, w, h, rotated}

  // Find the skyline segment index that covers position x
  const segAt = (sx) => {
    for(let i = 0; i < skyline.length; i++){
      if(sx >= skyline[i].x && sx < skyline[i].x + skyline[i].width) return i;
    }
    return -1;
  };

  // Get the max skyline height under a rectangle [rx, rx+rw]
  const maxSkylineUnder = (rx, rw) => {
    let maxY = 0;
    for(let i = 0; i < skyline.length; i++){
      const s = skyline[i];
      const sx1 = s.x, sx2 = s.x + s.width;
      // Check overlap
      if(sx2 > rx + 0.01 && sx1 < rx + rw - 0.01){
        if(s.y > maxY) maxY = s.y;
      }
    }
    return maxY;
  };

  // Place a rectangle: update skyline by raising segments under [rx, rx+rw] to newTop
  const placeSkyline = (rx, rw, newTop) => {
    const newSkyline = [];
    for(let i = 0; i < skyline.length; i++){
      const s = skyline[i];
      const sx1 = s.x, sx2 = s.x + s.width;
      // Fully outside the placed rect — keep as-is
      if(sx2 <= rx + 0.01 || sx1 >= rx + rw - 0.01){
        newSkyline.push(s);
        continue;
      }
      // Partially or fully covered
      // Left portion outside rect
      if(sx1 < rx - 0.01){
        newSkyline.push({ x: sx1, y: s.y, width: rx - sx1 });
      }
      // Right portion outside rect
      if(sx2 > rx + rw + 0.01){
        newSkyline.push({ x: rx + rw, y: s.y, width: sx2 - (rx + rw) });
      }
    }
    // Add the placed segment
    newSkyline.push({ x: rx, y: newTop, width: rw });
    // Sort by x
    newSkyline.sort((a,b) => a.x - b.x);
    // Merge adjacent segments with same y
    const merged = [newSkyline[0]];
    for(let i = 1; i < newSkyline.length; i++){
      const prev = merged[merged.length - 1];
      const cur = newSkyline[i];
      if(Math.abs(prev.x + prev.width - cur.x) < 0.01 && Math.abs(prev.y - cur.y) < 0.01){
        prev.width += cur.width;
      } else {
        merged.push(cur);
      }
    }
    skyline = merged;
  };

  // Try to place a block of dimensions bw×bh on the skyline.
  // Returns {x, y, waste} of best position, or null if doesn't fit.
  const findBestPos = (bw, bh, maxH) => {
    let bestX = -1, bestY = Infinity, bestWaste = Infinity;
    // Try every skyline segment as a left edge
    for(let i = 0; i < skyline.length; i++){
      const sx = skyline[i].x;
      if(sx + bw > sheetW + 0.01) continue;
      const baseY = maxSkylineUnder(sx, bw);
      if(baseY + bh > maxH + 0.01) continue;
      // "waste" = how high this placement sits. Lower is better.
      // Tiebreak: prefer leftmost position.
      if(baseY < bestY || (baseY === bestY && sx < bestX)){
        bestY = baseY;
        bestX = sx;
        bestWaste = baseY + bh;
      }
    }
    // Also try aligned to right edges of skyline segments
    for(let i = 0; i < skyline.length; i++){
      const sx = skyline[i].x + skyline[i].width - bw;
      if(sx < -0.01 || sx + bw > sheetW + 0.01) continue;
      const baseY = maxSkylineUnder(sx, bw);
      if(baseY + bh > maxH + 0.01) continue;
      if(baseY < bestY || (baseY === bestY && sx < bestX)){
        bestY = baseY;
        bestX = sx;
        bestWaste = baseY + bh;
      }
    }
    if(bestX < 0) return null;
    return { x: bestX, y: bestY, waste: bestWaste };
  };

  items.forEach(item => {
    const w = item.origW, h = item.origH;
    const fitsNormal  = w <= sheetW + 0.01;
    const fitsRotated = h <= sheetW + 0.01;
    if(!fitsNormal && !fitsRotated){ overflow.push(item); return; }

    // Add gap to dimensions for packing, but place at position without gap
    const gw = w + gap, gh = h + gap;
    const grw = h + gap, grh = w + gap;

    let bestPlacement = null;

    // Try normal orientation
    if(fitsNormal){
      const pos = findBestPos(gw, gh, sheetH + gap);
      if(pos) bestPlacement = { x: pos.x, y: pos.y, w, h, gw, gh, rotated: false, waste: pos.waste };
    }
    // Try rotated
    if(fitsRotated){
      const pos = findBestPos(grw, grh, sheetH + gap);
      if(pos){
        if(!bestPlacement || pos.waste < bestPlacement.waste){
          bestPlacement = { x: pos.x, y: pos.y, w: h, h: w, gw: grw, gh: grh, rotated: true, waste: pos.waste };
        }
      }
    }

    // Auto-extend DTF roll if neither orientation fits
    if(!bestPlacement && isDTF){
      for(let ext = 0; ext < 20 && !bestPlacement; ext++){
        sheetH = Math.min(MAX_LENGTH_MM, sheetH + 500);
        if(fitsNormal){
          const pos = findBestPos(gw, gh, sheetH + gap);
          if(pos) bestPlacement = { x: pos.x, y: pos.y, w, h, gw, gh, rotated: false, waste: pos.waste };
        }
        if(!bestPlacement && fitsRotated){
          const pos = findBestPos(grw, grh, sheetH + gap);
          if(pos) bestPlacement = { x: pos.x, y: pos.y, w: h, h: w, gw: grw, gh: grh, rotated: true, waste: pos.waste };
        }
      }
      if(bestPlacement){
        state.sheet.h = sheetH;
        state.rollLengthM = sheetH / 1000;
        resizeSheet();
        const inp = document.getElementById('rollLengthInput');
        if(inp) inp.value = state.rollLengthM;
      }
    }

    if(!bestPlacement){ overflow.push(item); return; }

    // Update skyline with placed rectangle (including gap)
    placeSkyline(bestPlacement.x, bestPlacement.gw, bestPlacement.y + bestPlacement.gh);
    placements.push(bestPlacement);
    item.placement = bestPlacement;
  });

  // Apply placements to canvas objects — preserve exact _mmW/_mmH to prevent drift
  placements.forEach((p, idx) => {
    const item = items.find(it => it.placement === p);
    if(!item) return;
    const o = item.obj;

    // Save original logical dimensions before any transforms
    const savedMmW = item.origW;
    const savedMmH = item.origH;

    // Set absolute rotation: 0° (normal) or 90° (rotated).
    o.rotate(p.rotated ? 90 : 0);
    o.setCoords();

    // Position via bounding-rect offset — works with any rotation/origin
    const br = o.getBoundingRect(true, true);
    o.left += (p.x * displayPxPerMm) - br.left;
    o.top  += (p.y * displayPxPerMm) - br.top;
    o.setCoords();

    // Set mm values directly — don't use syncMmFromPx to avoid bounding-rect drift
    o._mmLeft = p.x;
    o._mmTop  = p.y;
    o._mmW    = savedMmW;
    o._mmH    = savedMmH;
  });

  // Shrink DTF roll to fit content tightly
  if(isDTF){
    const maxBottom = placements.reduce((m, p) => Math.max(m, p.y + p.h), 0);
    const newH = Math.max(1000, Math.ceil((maxBottom + gap) / 100) * 100);
    if(newH < state.sheet.h){
      state.sheet.h = newH;
      state.rollLengthM = newH / 1000;
      resizeSheet();
      const inp = document.getElementById('rollLengthInput');
      if(inp) inp.value = state.rollLengthM;
    }
  }

  canvas.requestRenderAll();
  renderItemList();
  updateInfoBar();
  updateSummary();
  pushUndo();

  if(overflow.length > 0){
    toast(`${overflow.length} × ${t('sheetFullNoSpill')}`, 'warn');
  }
}

/* =========================================================
   GAP STEPPER (left sidebar section 3)
   ========================================================= */
let gapTimer = null;

function syncGapUI(){
  const inp = document.getElementById('gapInput');
  const unitLbl = document.getElementById('gapUnitLabel');
  if(!inp) return;
  const isCm = state.unit === 'cm';
  inp.step = isCm ? '0.1' : '0.5';
  inp.value = isCm ? (state.gapMm / 10).toFixed(1) : state.gapMm;
  if(unitLbl) unitLbl.textContent = isCm ? 'cm' : 'mm';
}

function applyGapChange(newMm){
  state.gapMm = Math.max(0, Math.min(20, newMm));
  syncGapUI();
  undoRedoStack._statsDirty = true;
  clearTimeout(gapTimer);
  gapTimer = setTimeout(()=>{
    if(state.fillTemplate) tileSheet();
    else repackAll();
  }, 300);
}

document.getElementById('gapDec').onclick = ()=>{
  const step = state.unit === 'cm' ? 1 : 0.5;
  applyGapChange(state.gapMm - step);
};
document.getElementById('gapInc').onclick = ()=>{
  const step = state.unit === 'cm' ? 1 : 0.5;
  applyGapChange(state.gapMm + step);
};
document.getElementById('gapInput').onchange = e=>{
  let v = parseFloat(e.target.value) || 0;
  if(state.unit === 'cm') v *= 10;
  applyGapChange(v);
};

/* =========================================================
   SHEET BACKGROUND PICKER
   ========================================================= */
let _bgManuallyChosen = false;
document.getElementById('bgPicker').addEventListener('click', e=>{
  if(!e.target.dataset.bg) return;
  const bg = e.target.dataset.bg;
  _bgManuallyChosen = true;
  state.sheetBg = bg;
  [...e.currentTarget.children].forEach(el=>el.classList.toggle('active', el.dataset.bg===bg));
  const shadow = document.getElementById('sheetShadow');
  shadow.classList.remove('bg-white','bg-gray','bg-black','bg-checker');
  shadow.classList.add('bg-'+bg);
});

/* Logo's met wit standaard op zwarte achtergrond tonen (alleen preview).
   Detecteert (bijna-)witte pixels in het logo en zet de vel-achtergrond
   op zwart — tenzij de gebruiker zelf al een achtergrond koos. */
function autoDarkBgForWhiteLogo(obj){
  if(_bgManuallyChosen || state.sheetBg === 'black' || !obj) return;
  try{
    const natW = obj.width || 1, natH = obj.height || 1;
    const mult = Math.min(1, 64 / Math.max(natW, natH));
    if(!obj.toCanvasElement) return;
    const el = obj.toCanvasElement(mult);
    const ctx = el.getContext('2d');
    const d = ctx.getImageData(0, 0, el.width, el.height).data;
    let white = 0, opaque = 0;
    for(let i = 0; i < d.length; i += 4){
      if(d[i+3] < 40) continue;
      opaque++;
      if(d[i] >= 245 && d[i+1] >= 245 && d[i+2] >= 245) white++;
    }
    if(opaque > 0 && white / opaque > 0.02){
      state.sheetBg = 'black';
      const picker = document.getElementById('bgPicker');
      if(picker) [...picker.children].forEach(sw => sw.classList.toggle('active', sw.dataset.bg === 'black'));
      const shadow = document.getElementById('sheetShadow');
      if(shadow){
        shadow.classList.remove('bg-white','bg-gray','bg-black','bg-checker');
        shadow.classList.add('bg-black');
      }
      toast('Logo bevat wit — achtergrond op zwart gezet (alleen preview, export blijft transparant)', 'info', 4000);
    }
  }catch(e){ /* detection is best-effort */ }
}
window.autoDarkBgForWhiteLogo = autoDarkBgForWhiteLogo;

/* =========================================================
   ZOOM
   ========================================================= */
function setZoom(z){
  state.zoom = Math.max(0.25, Math.min(4, z));
  resizeSheet();
}
document.getElementById('zoomInBtn').onclick  = ()=>setZoom(state.zoom * 1.25);
document.getElementById('zoomOutBtn').onclick = ()=>setZoom(state.zoom / 1.25);
document.getElementById('zoomFitBtn').onclick = ()=>setZoom(1);
document.getElementById('zoomOneBtn').onclick = ()=>setZoom(2);

/* =========================================================
   UNDO/REDO BUTTONS
   ========================================================= */
document.getElementById('undoBtn').onclick = ()=>undo();
document.getElementById('redoBtn').onclick = ()=>redo();

/* =========================================================
   PROJECT SAVE/LOAD
   ========================================================= */
/* =========================================================
   OPTIMIZE LAYOUT
   ========================================================= */
const _optBtn = document.getElementById('optimizeBtn');
if(_optBtn) _optBtn.onclick = ()=>{
  const objs = canvas.getObjects().filter(o=>o._mmW);
  if(objs.length < 2) return;
  // If manual mode is active, ask before optimizing (switches to auto)
  if(state.manualMode){
    confirmModal(t('manualModeLabel'), t('manualModeOptimizeWarn') + ' ' + t('manualModeConfirm'), {okLabel: t('ok'), cancelLabel: t('cancel')}).then(ok => {
      if(!ok) return;
      state.manualMode = false;
      _updateManualModeUI();
      _doOptimize();
    });
    return;
  }
  _doOptimize();
};
function _doOptimize(){
  const objs = canvas.getObjects().filter(o=>o._mmW);
  if(objs.length < 2) return;
  pushUndo();
  if(objs.length > 20){
    showCanvasLoader(0, 'Indeling optimaliseren');
    setTimeout(() => {
      repackAll();
      hideCanvasLoader();
      toast(t('optimizeDone'), 'success');
    }, 50);
  } else {
    repackAll();
    toast(t('optimizeDone'), 'success');
  }
};

/* =========================================================
   MANUAL MODE TOGGLE
   ========================================================= */
function _updateManualModeUI(){
  const cb = document.getElementById('manualModeToggle');
  const badge = document.getElementById('manualBadge');
  if(cb) cb.checked = state.manualMode;
  if(badge) badge.classList.toggle('active', state.manualMode);
}

const _manualToggle = document.getElementById('manualModeToggle');
if(_manualToggle) _manualToggle.addEventListener('change', ()=>{
  if(_manualToggle.checked){
    // Switching TO manual mode
    state.manualMode = true;
    _updateManualModeUI();
    toast(t('manualModeOn'), 'info', 2500);
  } else {
    // Switching BACK to automatic — styled confirm dialog
    _manualToggle.checked = true; // keep checked until user confirms
    confirmModal(t('manualModeLabel'), t('manualModeConfirm'), {okLabel: t('ok'), cancelLabel: t('cancel')}).then(ok => {
      if(!ok){
        return; // user cancelled, checkbox stays checked
      }
      state.manualMode = false;
      _manualToggle.checked = false;
      _updateManualModeUI();
      pushUndo();
      const objs = canvas.getObjects().filter(o=>o._mmW);
      if(objs.length > 1){
        showCanvasLoader(0, 'Indeling optimaliseren');
        setTimeout(() => {
          repackAll();
          hideCanvasLoader();
          toast(t('manualModeOff'), 'success', 2500);
        }, 50);
      } else {
        toast(t('manualModeOff'), 'success', 2500);
      }
    });
  }
});

/* Preview functionality removed */

/* Keyboard shortcuts: now shown in the info panel (ⓘ button) */

/* =========================================================
   KEYBOARD
   ========================================================= */
document.addEventListener('keydown', e=>{
  const tag = (e.target.tagName||'').toLowerCase();
  if(tag === 'input' || tag === 'textarea') return;

  if(e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey){ e.preventDefault(); undo(); return; }
  if((e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey) || (e.key === 'y' && (e.ctrlKey || e.metaKey))){ e.preventDefault(); redo(); return; }
  if(e.key === 'a' && (e.ctrlKey || e.metaKey)){ e.preventDefault(); canvas.discardActiveObject(); canvas.getObjects().forEach(o=>canvas.setActiveObject(o, null, true)); canvas.requestRenderAll(); renderSelectedPanel(); return; }

  if(e.key === '+' || e.key === '='){ e.preventDefault(); setZoom(state.zoom * 1.25); return; }
  if(e.key === '-' || e.key === '_'){ e.preventDefault(); setZoom(state.zoom / 1.25); return; }
  if(e.key === '0'){ e.preventDefault(); setZoom(1); return; }

  const obj = getSelectedObj();
  if(!obj) return;

  if(e.key === 'Delete' || e.key === 'Backspace'){
    e.preventDefault();
    if(obj.type === 'activeSelection'){
      const objs = obj._objects || [];
      objs.forEach(o => canvas.remove(o));
      canvas.requestRenderAll();
      canvas.discardActiveObject();
      renderItemList();
      renderSelectedPanel();
      updateInfoBar();
      updateSummary();
      pushUndo();
    } else {
      removeObj(obj);
    }
    return;
  }
  if(e.key === 'd' && (e.ctrlKey || e.metaKey)){ e.preventDefault(); duplicate(obj); return; }
  const nudge = e.shiftKey ? 5 : 1;
  let dx=0, dy=0;
  if(e.key === 'ArrowLeft')  dx = -nudge;
  if(e.key === 'ArrowRight') dx =  nudge;
  if(e.key === 'ArrowUp')    dy = -nudge;
  if(e.key === 'ArrowDown')  dy =  nudge;
  if(dx || dy){
    e.preventDefault();
    obj._mmLeft = Math.max(0, Math.min(state.sheet.w - visMmW(obj), (obj._mmLeft||0) + dx));
    obj._mmTop  = Math.max(0, Math.min(state.sheet.h - visMmH(obj), (obj._mmTop||0)  + dy));
    obj.set({ left: obj._mmLeft * displayPxPerMm, top: obj._mmTop * displayPxPerMm });
    obj.setCoords();
    canvas.requestRenderAll();
    renderSelectedPanel();
    updateInfoBar();
    pushUndo();
  }
});

/* =========================================================
   LANGUAGE SWITCH
   ========================================================= */
function applyI18n(){
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.dataset.i18n;
    const val = I18N[state.lang][key];
    if(typeof val === 'string') el.textContent = val;
  });
  // Translate placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.dataset.i18nPlaceholder;
    const val = I18N[state.lang][key];
    if(typeof val === 'string') el.placeholder = val;
  });
  /* Upload tip with clickable link */
  const tipP = document.getElementById('uploadTipP');
  if(tipP){
    const tipText = I18N[state.lang].uploadTip || '';
    const linkText = I18N[state.lang].uploadTipLink || '';
    tipP.innerHTML = '';
    tipP.appendChild(document.createTextNode(tipText + ' '));
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'tip-link';
    a.textContent = linkText;
    a.onclick = (e)=>{ e.preventDefault(); document.getElementById('infoPanelBackdrop').classList.add('open'); };
    tipP.appendChild(a);
  }
  renderSheetFormatPicker();
  renderSelectedPanel();
  renderItemList();
  updateInfoBar();
  updateSummary();
}

document.getElementById('langSwitch').addEventListener('click', e=>{
  if(e.target.tagName !== 'BUTTON') return;
  const lang = e.target.dataset.lang;
  if(!lang || !I18N[lang]) return;
  state.lang = lang;
  [...e.currentTarget.children].forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  applyI18n();
});

/* =========================================================
   INIT
   ========================================================= */
window.addEventListener('resize', ()=>{ resizeSheet(); });

renderSheetFormatPicker();
toggleRulerVisibility();
resizeSheet();
updateInfoBar();
updateSummary();
renderSelectedPanel();
renderItemList();
syncGapUI();
applyI18n();
updateUndoRedoButtons();

/* =========================================================
   INFO PANEL
   ========================================================= */
document.getElementById('infoBtn').onclick = ()=>{
  document.getElementById('infoPanelBackdrop').classList.add('open');
};
document.getElementById('infoClose').onclick = ()=>{
  document.getElementById('infoPanelBackdrop').classList.remove('open');
};
document.getElementById('infoPanelBackdrop').onclick = (e)=>{
  if(e.target === e.currentTarget) e.currentTarget.classList.remove('open');
};

/* =========================================================
   GUIDED TOUR
   ========================================================= */
const TOUR_STEPS = [
  { target:'#projectTitleSection',        titleKey:'tourStepProjectTitle', bodyKey:'tourStepProjectBody', pos:'right' },
  { target:'.left .section:nth-child(2)', titleKey:'tourStep1Title', bodyKey:'tourStep1Body', pos:'right' },
  { target:'.left .section:nth-child(3)', titleKey:'tourStep2Title', bodyKey:'tourStep2Body', pos:'right' },
  { target:'#layoutGapSection',            titleKey:'tourStepLayoutGapTitle', bodyKey:'tourStepLayoutGapBody', pos:'right' },
  { target:'#itemListSection',            titleKey:'tourStepListTitle', bodyKey:'tourStepListBody', pos:'right' },
  { target:'.zoom-bar',                   titleKey:'tourStepZoomTitle', bodyKey:'tourStepZoomBody', pos:'below' },
  { target:'.canvas-bottom-bar',          titleKey:'tourStep6Title', bodyKey:'tourStep6Body', pos:'above' },
  { target:'#selectedSection',            titleKey:'tourStepSelTitle', bodyKey:'tourStepSelBody', pos:'left' },
  { target:'.right .section:nth-child(2)',titleKey:'tourStep5Title', bodyKey:'tourStep5Body', pos:'left' },
];

let tourIdx = -1;
const tourBackdrop  = document.getElementById('tourBackdrop');
const tourHighlight = document.getElementById('tourHighlight');
const tourTooltip   = document.getElementById('tourTooltip');
const tourTitle     = document.getElementById('tourStepTitle');
const tourBody      = document.getElementById('tourStepBody');
const tourStepNum   = document.getElementById('tourStepNum');
const tourNextBtn   = document.getElementById('tourNext');
const tourSkipBtn   = document.getElementById('tourSkip');

function showTourStep(idx){
  tourIdx = idx;
  if(idx >= TOUR_STEPS.length){ endTour(); return; }
  const step = TOUR_STEPS[idx];
  const el = document.querySelector(step.target);
  if(!el){ showTourStep(idx+1); return; }

  // Scroll the sidebar so the target element is visible before positioning
  el.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'nearest' });

  // Use a small delay so scrollIntoView finishes and getBoundingClientRect is correct
  clearTimeout(showTourStep._scrollTimer);
  showTourStep._scrollTimer = setTimeout(()=> _positionTourStep(idx, step, el), 350);
}
function _positionTourStep(idx, step, el){
  const rect = el.getBoundingClientRect();
  const pad = 8;
  tourHighlight.style.left   = (rect.left - pad) + 'px';
  tourHighlight.style.top    = (rect.top - pad) + 'px';
  tourHighlight.style.width  = (rect.width + pad*2) + 'px';
  tourHighlight.style.height = (rect.height + pad*2) + 'px';

  tourTitle.textContent = t(step.titleKey);
  tourBody.textContent  = t(step.bodyKey);
  tourStepNum.textContent = `${idx+1} / ${TOUR_STEPS.length}`;
  tourNextBtn.textContent = idx === TOUR_STEPS.length - 1 ? t('tourFinish') : t('tourNext');

  // Position tooltip — reset all sides first
  const margin = 16;
  tourTooltip.style.left = 'auto';
  tourTooltip.style.right = 'auto';
  tourTooltip.style.top = 'auto';
  tourTooltip.style.bottom = 'auto';
  if(step.pos === 'right'){
    tourTooltip.style.left = (rect.right + margin) + 'px';
    tourTooltip.style.top  = rect.top + 'px';
  } else if(step.pos === 'left'){
    tourTooltip.style.right = (window.innerWidth - rect.left + margin) + 'px';
    tourTooltip.style.top  = rect.top + 'px';
  } else if(step.pos === 'above'){
    tourTooltip.style.left = rect.left + 'px';
    tourTooltip.style.bottom = (window.innerHeight - rect.top + margin) + 'px';
  } else { // below
    tourTooltip.style.left = rect.left + 'px';
    tourTooltip.style.top  = (rect.bottom + margin) + 'px';
  }

  // Clamp tooltip so it stays within the viewport
  requestAnimationFrame(()=>{
    const tr = tourTooltip.getBoundingClientRect();
    if(tr.bottom > window.innerHeight - 8){
      tourTooltip.style.top = Math.max(8, window.innerHeight - tr.height - 8) + 'px';
    }
    if(tr.right > window.innerWidth - 8){
      tourTooltip.style.left = Math.max(8, window.innerWidth - tr.width - 8) + 'px';
    }
  });
}

function startTour(){
  tourBackdrop.classList.add('open');
  showTourStep(0);
}
function endTour(){
  tourBackdrop.classList.remove('open');
  tourIdx = -1;
}

document.getElementById('tourBtn').onclick = startTour;
tourNextBtn.onclick = ()=> showTourStep(tourIdx + 1);
tourSkipBtn.onclick = endTour;
tourBackdrop.onclick = (e)=>{
  if(e.target === tourBackdrop) endTour();
};

/* =========================================================
   AUTH INTEGRATION + PROJECT SAVE/LOAD
   ========================================================= */
let _currentProjectId = null;

// Called by login-ui.js when user clicks "Save current project"
window.gsbGetProjectData = function(){
  const objs = canvas.getObjects().filter(o => o._mmW);
  return {
    id: _currentProjectId,
    name: document.getElementById('projectTitleInput')?.value || 'Naamloos project',
    sheetFormat: state.sheetFormat,
    canvasJson: canvas.toJSON(FABRIC_EXTRA_PROPS),
    logoCount: new Set(objs.map(o => o._originalId)).size,
    sheetCount: 1,
  };
};

/* ── Offline project export/import ── */
window.gsbExportProject = function(){
  const data = window.gsbGetProjectData();
  const payload = {
    _gsb: true,
    version: '2.5.0',
    name: data.name,
    sheetFormat: data.sheetFormat,
    canvasJson: data.canvasJson,
    logoCount: data.logoCount,
    sheetCount: data.sheetCount,
    savedAt: new Date().toISOString(),
  };
  const json = JSON.stringify(payload);
  const blob = new Blob([json], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = (data.name || 'project').replace(/[^a-zA-Z0-9_\-\s]/g, '').trim().replace(/\s+/g, '-') || 'project';
  a.href = url;
  a.download = safeName + '.gsb';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('Project opgeslagen als bestand', 'success');
};

window.gsbImportProject = function(file){
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if(!data._gsb || !data.canvasJson){
        toast('Ongeldig projectbestand', 'error');
        return;
      }
      window.gsbLoadProject({
        id: null,
        name: data.name || 'Geïmporteerd project',
        sheet_format: data.sheetFormat,
        canvas_json: data.canvasJson,
      });
    } catch(e){
      console.error('[GSB] Import error:', e);
      toast('Kan bestand niet lezen: ' + (e.message||'onbekende fout'), 'error');
    }
  };
  reader.readAsText(file);
};

// Called by login-ui.js when loading a saved project
window.gsbLoadProject = function(project){
  if(!project) return;
  _currentProjectId = project.id;
  // Set project title
  const inp = document.getElementById('projectTitleInput');
  if(inp) inp.value = project.name || '';
  // Set format
  if(project.sheet_format && SHEET_FORMATS[project.sheet_format]){
    state.sheetFormat = project.sheet_format;
    document.querySelectorAll('#formatPicker .format-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.format === project.sheet_format);
    });
    const fmt = SHEET_FORMATS[project.sheet_format];
    state.sheet.w = fmt.w; state.sheet.h = fmt.h;
    resizeSheet();
  }
  // Load canvas state
  if(project.canvas_json && typeof project.canvas_json === 'object'){
    _isLoadingState = true;
    const jsonStr = JSON.stringify(project.canvas_json);
    canvas.loadFromJSON(jsonStr, () => {
      _isLoadingState = false;
      canvas.getObjects().forEach(o => {
        attachObjListeners(o);
        // Restore SVG source from store if available
        if(o._originalId && svgSourceStore.has(o._originalId) && !o._svgSource){
          o._svgSource = svgSourceStore.get(o._originalId);
        }
      });
      canvas.requestRenderAll();
      renderItemList();
      updateInfoBar();
      updateSummary();
      pushUndo();
      toast(`Project "${project.name}" geladen`, 'success');
    }, (o, obj) => {
      // reviver: restore custom props
    });
  }
};

window.gsbSetProjectId = function(id){ _currentProjectId = id; };

// Apply user preferences after login
if(window.gsAuth){
  gsAuth.onReady(() => {
    const p = gsAuth.profile;
    if(!p) return;
    // Apply preferred unit
    if(p.preferred_unit && p.preferred_unit !== state.unit){
      state.unit = p.preferred_unit;
      document.querySelectorAll('#unitToggle button').forEach(b => {
        b.classList.toggle('active', b.dataset.unit === p.preferred_unit);
      });
      syncGapUI();
    }
    // Apply preferred language
    if(p.preferred_lang && p.preferred_lang !== state.lang){
      state.lang = p.preferred_lang;
      applyI18n();
      document.querySelectorAll('#langSwitch button').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === p.preferred_lang);
      });
    }
    // Re-render format picker now that role is known (for role-gated formats like dtf32)
    renderSheetFormatPicker();
  });
}

// Log exports for usage tracking
const _origExportPdf = typeof exportPdf === 'function' ? exportPdf : null;
if(_origExportPdf){
  // Wrap exportPdf to log usage (non-blocking)
  // Note: exportPdf is called directly by onclick, so we hook via the button
  const expBtn = document.getElementById('exportBtn');
  if(expBtn){
    const origClick = expBtn.onclick;
    expBtn.onclick = function(e){
      if(window.gsAuth?.logUsage) gsAuth.logUsage('export_pdf', { format: state.sheetFormat });
      if(origClick) return origClick.call(this, e);
    };
  }
}

// Initialize auth on page load
if(window.gsAuth){
  gsAuth.init();
} else {
  // No auth available — show app directly
  const app = document.getElementById('appContainer');
  if(app) app.style.display = '';
}

/* ── Expose functions for external scripts (text-editor.js etc.) ── */
window.toast = toast;
window.loadSvg = loadSvg;
window._gsbCanvas = canvas;
window._displayPxPerMm = displayPxPerMm;
window.attachObjListeners = attachObjListeners;
window.syncMmFromPx = syncMmFromPx;
window.renderItemList = renderItemList;
window.renderSelectedPanel = renderSelectedPanel;

