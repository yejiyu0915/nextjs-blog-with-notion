import ProfileSection from '@/app/_components/ProfileSection';
import ContactSection from '@/app/_components/ContactSection';
import { getTags, getPublishedPosts } from '@/lib/notion';
import HeaderSection from '@/app/_components/HeaderSection';
import { Suspense } from 'react';
import TagSectionClient from '@/app/_components/TagSection.client';
import TagSectionSkeleton from '@/app/_components/TagSectionSkeleton';
import PostListSkeleton from '@/components/features/blog/PostListSkeleton';
import PostListSuspense from '@/components/features/blog/PostListSuspense';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '홈',
  description: '프론트엔드 개발과 관련된 다양한 지식과 경험을 공유하는 블로그입니다.',
  alternates: {
    canonical: '/',
  },
};
interface HomeProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = sort || 'latest';

  const tags = getTags();
  const postsPromise = getPublishedPosts({ tag: selectedTag, sort: selectedSort });

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr_220px]">
        {/* 좌측 사이드바 */}
        <aside className="order-2 md:order-none">
          <Suspense fallback={<TagSectionSkeleton />}>
            <TagSectionClient tags={tags} selectedTag={selectedTag} />
          </Suspense>
        </aside>
        <div className="order-3 space-y-8 md:order-none">
          {/* 섹션 제목 */}
          <HeaderSection selectedTag={selectedTag} />
          {/* 블로그 카드 그리드 */}
          <Suspense fallback={<PostListSkeleton />}>
            <PostListSuspense postsPromise={postsPromise} />
          </Suspense>
        </div>
        {/* 우측 사이드바 */}
        <aside className="order-1 flex flex-col gap-6 md:order-none">
          <ProfileSection />
          <ContactSection />
        </aside>
      </div>
    </div>
  );
}
