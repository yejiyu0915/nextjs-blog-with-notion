'use client';
import Giscus from '@giscus/react';

{
  /* <script src="https://giscus.app/client.js"
        data-repo="yejiyu0915/nextjs-blog-with-notion-giscus"
        data-repo-id="R_kgDOOxM6pg"
        data-category="Announcements"
        data-category-id="DIC_kwDOOxM6ps4CqoWR"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light"
        data-lang="ko"
        crossorigin="anonymous"
        async>
</script> */
}

export default function GiscusComments() {
  return (
    <Giscus
      repo="yejiyu0915/nextjs-blog-with-notion-giscus"
      repoId="R_kgDOOxM6pg"
      category="Announcements"
      categoryId="DIC_kwDOOxM6ps4CqoWR"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="ko"
      loading="lazy"
    />
  );
}
