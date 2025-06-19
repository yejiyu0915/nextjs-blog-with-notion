'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ProfileImage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative h-[144px] w-[144px]">
        <Image
          src="/images/profile-light.jpg"
          alt="J_Wisdom"
          fill
          className="object-cover"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative h-[144px] w-[144px]">
      <Image
        src={theme === 'dark' ? '/images/profile-dark.jpg' : '/images/profile-light.jpg'}
        alt="J_Wisdom"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
