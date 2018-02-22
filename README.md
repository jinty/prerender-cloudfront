prerender.io cloudfront example middleware
==

This is an example of integrating prerender.io and a SPA in S3 served
over Cloudfront.

Instructions
--

1. Upload prerender-cloudfront.yaml to Cloudformation as a new stack,
   that'll setup the example for you. Enter your prerender.io token when
   asked.
2. Upload code.js and index.html to the S3 bucket created by
   Cloudformation in step 1.
3. Change the read permissions for code.js and index.html to be publicly
   readable.

Testing
--

To see the page as rendered by prerender.io run:

    curl -H 'User-Agent: Facebot' https://${CLOUDFRONT_DOMAIN}/over/here

The same page without pre-rendering:

    curl https://${CLOUDFRONT_DOMAIN}/over/here

Implementation
--

Two Lambda@edge functions are used. The first detects bot requests on
requests entering the system, it sets a header which Cloudfront uses to
partition the cache. The second function, run after the cache, detects
the presence of the header and, if present, routes the request to
Prerender.io

Caching
--

By default, static resources from the bucket are cached for a long time
period. This improves performance but means that the deploy process of
any real app will need a Cloudfront purge step.

As prerender.io does NOT want any Cloudfront caching (see
https://github.com/prerender/prerender/issues/93#issuecomment-366774910)
we disable that by including a X-Prerender-Cachebuster header which
effectively disables cloudfront caching.

NOTE: using X-Prerender-Cachebuster is probably not optimal, if you find
a better way, please let me know.
