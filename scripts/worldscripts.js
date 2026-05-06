// Prevent Players from Identifying their items by hiding the buttons from them, only the GM will be able to Identify them
// Remove Identify button at top of Item Sheet
Hooks.on("renderItemSheet5e", (sheet, [html]) => {
  if (game.user.isGM) return;
  const unidentified = sheet.item.system.identified === false;
  if (!unidentified) return;
  html.parentElement.querySelectorAll('[data-action="toggleState"][data-property="system.identified"]').forEach(n => n.remove());
});

// Remove Identify button from Item Context menu on Actor Sheet
Hooks.on("dnd5e.getItemContextOptions", (item, buttons) => {
  if (game.user.isGM) return;
  const unidentified = item.system.identified === false;
  if (!unidentified) return;
  const removeUnid = buttons.findIndex(option => option.name === 'DND5E.Identify');
  buttons.findSplice(e => e.name === "DND5E.Identify");
});
