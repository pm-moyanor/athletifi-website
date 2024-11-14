We could use a [`loading.tsx`][nextjs-loading] file to provide a loading screen
that would work on the first page load. However, `nextjs-toploader` provides a
better experience when switching between pages (when switching routes) and
`loading.tsx` makes that experience worse.

[nextjs-loading]: https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming