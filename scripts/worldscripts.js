// This script will change the default token configuration for newly created or imported actors
//   (does not affect actors already in the world).
// It changes the following:
// - Always show all resource bars for owners of the token
Hooks.on("preCreateActor", (actorData, options, userId) => {
  actorData.token = actorData.token ?? {};
  mergeObject(actorData.token, {
    displayName: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
    displayBars: CONST.TOKEN_DISPLAY_MODES.OWNER,
  });
});
