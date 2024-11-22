We could use a [`loading.tsx`][nextjs-loading] file to provide a loading screen
that would work on the first page load. However, having a `loading.tsx` file
degrades the experience provided by `nextjs-toploader` when switching pages
(that is, when switching routes). So instead of `loading.tsx` we use
`nextjs-toploader` along with `<Suspense />`.

[nextjs-loading]: https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming