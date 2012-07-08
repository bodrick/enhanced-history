urlBuilder = new BH.Helpers.UrlBuilder()

settings = new BH.Models.Settings()
settings.fetch()

selectionContextMenu = new BH.Lib.ContextMenus.SelectionContextMenu(chrome, urlBuilder)

if settings.get('searchBySelection')
  selectionContextMenu.create()

pageContextMenu = new BH.Lib.ContextMenus.PageContextMenu(chrome, urlBuilder)
pageContextMenu.listenToTabs()

if settings.get('searchByDomain')
  pageContextMenu.create()

browserActions = new BH.Lib.BrowserActions(chrome, urlBuilder)
browserActions.listen()