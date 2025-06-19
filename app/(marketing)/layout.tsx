export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased">
        <div className="flex min-h-screen flex-col">
          <div>Marketing Page</div>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
