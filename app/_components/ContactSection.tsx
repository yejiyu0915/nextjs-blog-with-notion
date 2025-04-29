import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Megaphone, BookOpen, HandshakeIcon } from 'lucide-react';

const contactItems = [
  {
    icon: Megaphone,
    title: '광고 및 제휴',
    description: '브랜드 홍보, 컨텐츠 제작, 협업 제안',
    mailto: {
      email: 'isu5519@naver.com',
      subject: '[광고/제휴] 제안',
      body: '브랜드/제품명:\n제안 내용:\n기간:\n예산:',
    },
  },
  {
    icon: BookOpen,
    title: '강의 문의',
    description: '기술 강의, 워크샵, 세미나 진행',
    mailto: {
      email: 'isu5519@naver.com',
      subject: '[강의] 문의',
      body: '강의 주제:\n예상 인원:\n희망 일정:\n문의 내용:',
    },
  },
  {
    icon: HandshakeIcon,
    title: '기타 문의',
    description: '채용, 인터뷰, 기타 협업 제안',
    mailto: {
      email: 'isu5519@naver.com',
      subject: '[기타] 문의',
      body: '문의 종류:\n문의 내용:',
    },
  },
];

export default function ContactSection() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>문의하기</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {contactItems.map((item, index) => (
            <a
              key={index}
              href={`mailto:${item.mailto.email}?subject=${encodeURIComponent(
                item.mailto.subject
              )}&body=${encodeURIComponent(item.mailto.body)}`}
              className="group bg-primary/3 hover:bg-muted flex items-start gap-4 rounded-lg p-3 transition-colors"
            >
              <div className="text-primary flex shrink-0 items-center justify-center p-1.5">
                <item.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium break-keep">{item.title}</h3>
                <p className="text-muted-foreground text-xs break-keep">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
