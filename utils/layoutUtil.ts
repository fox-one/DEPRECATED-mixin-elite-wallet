const layoutDefault = { bottomNav: true }

const layouts = {
  'snapshots-id': { bottomNav: false },
  'addresses-id': { bottomNav: false },
  'addresses-id-create': { bottomNav: false },
  'addresses-id-edit': { bottomNav: false },
  'transaction-id': { bottomNav: false },
  'withdraw': { bottomNav: false },
  'deposit': { bottomNav: false },
  'bot_detail-id': { bottomNav: false },
  'bots_management':{ bottomNav: false },
}

export function setLayout({ app, $vuetify, route, store }) {
  let layout = layoutDefault
  const spec = layouts[app.getRouteBaseName(route)]
  layout = spec ? { ...layout, ...spec } : layout
  store.commit('app/setLayout', layout)
}