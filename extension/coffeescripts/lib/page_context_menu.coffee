class BH.Lib.PageContextMenu extends BH.Base
  @include BH.Modules.chromeSupport
  @include BH.Modules.urlSupport

  create: ->
    @menu = @chromeAPI.contextMenus.create
      title: @t('visits_to_domain', ['domain'])
      contexts: ['page']
      onclick: (data) => @onClick(data)

  onClick: (data) ->
    urlOptions = absolute: true
    url = @urlFor('search', @_getDomain(data.pageUrl)[1], urlOptions)

    @chromeAPI.tabs.create
      url: url

  updateTitleDomain: (tab) ->
    @chromeAPI.contextMenus.update @menu,
      title: @t('visits_to_domain', [@_getDomain(tab.url)[1]])

  listenToTabs: ->
    @chromeAPI.tabs.onSelectionChanged.addListener (tabId) =>
      @onTabSelectionChanged(tabId) if @menu

    @chromeAPI.tabs.onUpdated.addListener (tabId, changedInfo, tab) =>
      @onTabUpdated(tab) if @menu

  onTabSelectionChanged: (tabId) ->
    @chromeAPI.tabs.get tabId, (tab) =>
      @updateTitleDomain(tab)

  onTabUpdated: (tab) ->
    @updateTitleDomain(tab) if tab.selected

  remove: ->
    @chromeAPI.contextMenus.remove(@menu)
    delete(@menu)

  _getDomain: (url) ->
    url.match(/\w+:\/\/(.*?)\//)