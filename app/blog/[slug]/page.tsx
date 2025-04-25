import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, User } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getPostBySlug } from '@/lib/notion';
import { formatDate } from '@/lib/date';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { compile } from '@mdx-js/mdx';
import withSlugs from 'rehype-slug';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';
import { visit } from 'unist-util-visit';
import type { Element } from 'hast';

// 목차 항목의 타입 정의
interface TocEntry {
  value: string; // 목차 항목의 텍스트
  depth: number; // 목차 항목의 깊이 (h1, h2, h3 등)
  id?: string; // 목차 항목의 id (h 태그의 id와 일치)
  children?: Array<TocEntry>; // 하위 목차 항목
}

// 목차의 타입 정의 (목차 항목의 배열)
type Toc = Array<TocEntry>;

/**
 * 목차 항목에서 'user-content-' 접두사를 제거하는 함수
 * @param entry 목차 항목
 * @returns 접두사가 제거된 목차 항목
 */
function cleanTocId(entry: TocEntry): TocEntry {
  const cleanedEntry = { ...entry };

  // id가 있으면 'user-content-' 접두사 제거
  if (cleanedEntry.id) {
    cleanedEntry.id = cleanedEntry.id.replace('user-content-', '');
  }

  // 하위 항목이 있으면 재귀적으로 접두사 제거
  if (cleanedEntry.children && cleanedEntry.children.length > 0) {
    cleanedEntry.children = cleanedEntry.children.map(cleanTocId);
  }

  return cleanedEntry;
}

/**
 * h 태그의 id에서 'user-content-' 접두사를 제거하는 커스텀 rehype 플러그인
 * @returns rehype 플러그인 함수
 */
function rehypeRemoveUserContentPrefix() {
  return (tree: Element) => {
    // AST를 순회하면서 h 태그를 찾아 id 속성 수정
    visit(tree, 'element', (node) => {
      // h1~h6 태그인 경우
      if (
        node.tagName === 'h1' ||
        node.tagName === 'h2' ||
        node.tagName === 'h3' ||
        node.tagName === 'h4' ||
        node.tagName === 'h5' ||
        node.tagName === 'h6'
      ) {
        // id 속성이 있으면 'user-content-' 접두사 제거
        if (node.properties && node.properties.id) {
          node.properties.id = node.properties.id.replace('user-content-', '');
        }
      }
    });
  };
}

/**
 * 목차 항목을 렌더링하는 컴포넌트
 * @param item 목차 항목
 * @returns 목차 항목 컴포넌트
 */
function TableOfContentsLink({ item }: { item: TocEntry }) {
  return (
    <div className="space-y-2">
      {/* 목차 항목 링크 */}
      <Link
        key={item.id}
        href={`#${item.id}`}
        className={`hover:text-foreground text-muted-foreground block font-medium transition-colors`}
      >
        {item.value}
      </Link>
      {/* 하위 목차 항목이 있으면 재귀적으로 렌더링 */}
      {item.children && item.children.length > 0 && (
        <div className="space-y-2 pl-4">
          {item.children.map((subItem) => (
            <TableOfContentsLink key={subItem.id} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}

// 블로그 포스트 페이지의 props 타입 정의
interface BlogPostProps {
  params: Promise<{ slug: string }>; // URL 파라미터 (블로그 포스트의 slug)
}

/**
 * 블로그 포스트 페이지 컴포넌트
 * @param params URL 파라미터
 * @returns 블로그 포스트 페이지 컴포넌트
 */
export default async function BlogPost({ params }: BlogPostProps) {
  // URL 파라미터에서 slug 추출
  const { slug } = await params;
  // slug를 사용하여 블로그 포스트 데이터 가져오기
  const { markdown, post } = await getPostBySlug(slug);

  // MDX 컴파일 및 목차 추출
  const { data } = await compile(markdown, {
    rehypePlugins: [
      withSlugs, // h 태그에 id 속성 추가
      rehypeSanitize, // 안전하지 않은 HTML 제거
      withToc, // 목차 추출
      withTocExport, // 목차를 MDX 내보내기로 추가
    ],
  });

  // 목차 데이터에서 'user-content-' 접두사 제거
  const cleanedToc: Toc = data?.toc ? data.toc.map(cleanTocId) : [];

  return (
    <div className="container py-12">
      <div className="grid grid-cols-[240px_1fr_240px] gap-8">
        {/* 왼쪽 사이드바 (추후 콘텐츠 추가) */}
        <aside>{/* 추후 콘텐츠 추가 */}</aside>

        {/* 메인 콘텐츠 영역 */}
        <section>
          {/* 블로그 헤더 */}
          <div className="space-y-4">
            <div className="space-y-2">
              {/* 태그 목록 */}
              <div className="flex gap-2">
                {post.tags?.map((tag) => <Badge key={tag}>{tag}</Badge>)}
              </div>
              {/* 블로그 제목 */}
              <h1 className="text-4xl font-bold">{post.title}</h1>
            </div>

            {/* 메타 정보 (작성자, 날짜) */}
            <div className="text-muted-foreground flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              {/* 읽기 시간 (주석 처리됨) */}
              {/* <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>5분 읽기</span>
              </div> */}
            </div>
          </div>

          {/* 구분선 */}
          <Separator className="my-8" />

          {/* 블로그 본문 (MDX 콘텐츠) */}
          <div className="prose prose-neutral prose-sm dark:prose-invert prose-headings:scroll-mt-[var(--header-height)] max-w-none">
            <MDXRemote
              source={markdown}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm], // GitHub Flavored Markdown 지원
                  rehypePlugins: [
                    [rehypeSlug, { prefix: '' }], // h 태그에 id 속성 추가 (접두사 없음)
                    rehypeSanitize, // 안전하지 않은 HTML 제거
                    rehypePrettyCode, // 코드 블록 스타일링
                    rehypeRemoveUserContentPrefix, // 'user-content-' 접두사 제거
                  ],
                },
              }}
            />
          </div>

          {/* 구분선 */}
          <Separator className="my-16" />

          {/* 이전/다음 포스트 네비게이션 */}
          <nav className="grid grid-cols-2 gap-8">
            {/* 이전 포스트 링크 */}
            <Link href="/blog/previous-post">
              <Card className="group hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-medium">
                    <ChevronLeft className="h-4 w-4" />
                    <span>시작하기</span>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    Next.js를 시작하는 방법부터 프로젝트 구조, 기본 설정까지 상세히 알아봅니다.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {/* 다음 포스트 링크 */}
            <Link href="/blog/next-post" className="text-right">
              <Card className="group hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center justify-end gap-2 text-base font-medium">
                    <span>심화 가이드</span>
                    <ChevronRight className="h-4 w-4" />
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    Next.js의 고급 기능들을 활용하여 더 나은 웹 애플리케이션을 만드는 방법을
                    소개합니다.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </nav>
        </section>

        {/* 오른쪽 사이드바 (목차) */}
        <aside className="relative">
          <div className="sticky top-[var(--sticky-top)]">
            <div className="bg-muted/60 space-y-4 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold">목차</h3>
              <nav className="space-y-3 text-sm">
                {/* 목차 항목 렌더링 */}
                {cleanedToc.map((item) => (
                  <TableOfContentsLink key={item.id} item={item} />
                ))}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
