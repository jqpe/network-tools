/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as WhoisImport } from './routes/whois'
import { Route as TldImport } from './routes/tld'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as WhoisDomainImport } from './routes/whois.$domain'
import { Route as TldTldImport } from './routes/tld.$tld'

// Create/Update Routes

const WhoisRoute = WhoisImport.update({
  path: '/whois',
  getParentRoute: () => rootRoute,
} as any)

const TldRoute = TldImport.update({
  path: '/tld',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const WhoisDomainRoute = WhoisDomainImport.update({
  path: '/$domain',
  getParentRoute: () => WhoisRoute,
} as any)

const TldTldRoute = TldTldImport.update({
  path: '/$tld',
  getParentRoute: () => TldRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/tld': {
      id: '/tld'
      path: '/tld'
      fullPath: '/tld'
      preLoaderRoute: typeof TldImport
      parentRoute: typeof rootRoute
    }
    '/whois': {
      id: '/whois'
      path: '/whois'
      fullPath: '/whois'
      preLoaderRoute: typeof WhoisImport
      parentRoute: typeof rootRoute
    }
    '/tld/$tld': {
      id: '/tld/$tld'
      path: '/$tld'
      fullPath: '/tld/$tld'
      preLoaderRoute: typeof TldTldImport
      parentRoute: typeof TldImport
    }
    '/whois/$domain': {
      id: '/whois/$domain'
      path: '/$domain'
      fullPath: '/whois/$domain'
      preLoaderRoute: typeof WhoisDomainImport
      parentRoute: typeof WhoisImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AboutRoute,
  TldRoute: TldRoute.addChildren({ TldTldRoute }),
  WhoisRoute: WhoisRoute.addChildren({ WhoisDomainRoute }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/tld",
        "/whois"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/tld": {
      "filePath": "tld.tsx",
      "children": [
        "/tld/$tld"
      ]
    },
    "/whois": {
      "filePath": "whois.tsx",
      "children": [
        "/whois/$domain"
      ]
    },
    "/tld/$tld": {
      "filePath": "tld.$tld.tsx",
      "parent": "/tld"
    },
    "/whois/$domain": {
      "filePath": "whois.$domain.tsx",
      "parent": "/whois"
    }
  }
}
ROUTE_MANIFEST_END */
