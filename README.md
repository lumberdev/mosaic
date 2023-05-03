# Mosaic, the ai aggregator

This repo is home to Mosaic, the AI tool Aggregator by [Lumber](https://lumber.dev). It was created using SvelteKit as a full stack framework, Supabase for auth and Contentful for content management.

## Content management

Contentful currently has only 2 content models: Tool and Tool Gallery.
There is currently only one Tool Gallery: Main.
When adding content through the admin panel, new tools are created as drafts. They then need to be published and added to the main tool gallery.

### Adding new tools

1. Go to `/admin`
2. Paste a comma separated list of URLs, then hit the button and both readability and metadata will be fetched for each url.
3. Pick which one to send to the AI
4. Once all of the AI content is fetched, upload to contentful will be automatic.

If a tool doesn't return any metadata or readability data, feel free to delete it using the delete button next to its name.

## Developing

To get started, clone this repo, install the dependencies and run a development server.

```bash
git clone https://github.com/lumberdev/mosaic.git
yarn
yarn dev
```

## Building

To create a production version of your app:

```bash
yarn build
```

You can preview the production build with `yarn preview`.
