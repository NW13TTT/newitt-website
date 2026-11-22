# Skyline Explorer

The standalone Cloudflare Worker serves the flight archive, community submissions and votes, and authenticated moderation. Its preview is on a separate workers.dev hostname with an isolated D1 database. The preview reuses approved site assets and adds the Explorer links to the approved Skyline response. The existing site configuration has no new production routes or bindings.

## Run and verify

Use Node 22.13 or newer for the SQLite-backed tests.

```sh
node --test tests/*.test.mjs
wrangler d1 migrations apply DB --local --config explorer/wrangler.jsonc
wrangler dev --local --config explorer/wrangler.jsonc
```

Supply `VISITOR_SECRET` and `ADMIN_PASSWORD` as protected Worker secrets or ignored local development variables. The administration username is `skyline`. Moderators can approve destinations, optionally place an approximate public map marker, close voting, mark progress, remove a destination or add and edit a verified flight. Votes are recorded only for open destinations. No community candidates or votes are seeded.

The rate limit stores keyed, expiring network hashes rather than raw IP addresses. The voting cookie stores a signed random browser identifier. A short-lived network restriction can also affect people sharing a connection. These checks limit easy repeat voting without asserting verified identity.

## Flight sources

- Green Acres Glamping is verified in [Green Acres From Above](https://www.youtube.com/watch?v=2LNXfJaJ--E). Its operator identifies the location as Lea, Herefordshire. The map marker represents the village.
- [2026 From Above](https://www.youtube.com/watch?v=thIa5NoHoto) credits the NEWITT MEDIA track Neon Aetherway and publishes chapters for Brockworth and Coopers Edge at 00:09, Gloucester Prison at 03:11, and the Ancient Ram Inn at 03:44.
- The three preview stills are from the existing graded aerial compilation at 05:42, 02:20 and 03:50. Gloucester Prison uses the existing approved gallery photo.
- The database seed includes approximate public location sources. It contains no launch coordinates.

The Workers preview is for review. Any future production integration needs explicit approval, a separately configured production database and secrets, and a deployment plan for the existing custom domain.
