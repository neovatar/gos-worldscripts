// Prevent Players from Identifying their items by hiding the buttons from them, only the GM will be able to Identify them
// Remove Identify button at top of Item Sheet
Hooks.on("renderItemSheet", (sheet, [html]) => {
  if (game.user.isGM) return;
  const unidentified = sheet.item.system.identified === false;
  if (!unidentified) return;
  html.querySelectorAll(".dnd5e.sheet.item .sheet-header .item-subtitle label:has(input:not([disabled]))").forEach(n => n.remove());
});

// Remove Identify button from Item Context menu on Actor Sheet
Hooks.on("dnd5e.getItemContextOptions", (item, buttons) => {
    if (game.user.isGM) return;
    const unidentified = item.system.identified === false;
    if (!unidentified) return;
    const removeUnid = buttons.findIndex(option => option.name === 'DND5E.Identify');
    buttons.findSplice(e => e.name === "DND5E.Identify");
});


// Add total prepared spells to the spell headers on the character sheet
Hooks.on("renderActorSheet5eCharacter2", function(app, [html]) {
  const prep = app.document.items.reduce((acc, i) => {
    if (i.type === 'spell' && i.system.preparation.mode === "prepared" && i.system.preparation.prepared & i.system.level !== 0) {
      acc.push(i.name);
    }
    return acc;
  }, []);
  const headers = html.querySelectorAll('div[data-type="spell"]');
  for (const header of headers) {
    const type = header.querySelector('h3[class="item-name spell-header"]').textContent;
    if (!type.includes('Innate') && !type.includes('At-Will') && !type.includes('Cantrip') && !type.includes('Pact')) {
      const controls = header.querySelector('div[class="item-header item-controls"]');
      controls.textContent += `${prep.length}`;
      controls.setAttribute("data-tooltip", "Total Prepared Spells");
      controls.setAttribute("style", "color: white;");
    };
  };
});
