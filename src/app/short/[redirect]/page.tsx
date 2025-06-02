'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { getUrl, incrementClick } from '@/utils/storage';

export default function RedirectPage({ params }: { params: { redirect: string } }) {
  useEffect(() => {
    const record = getUrl(params.redirect);
    if (record) {
      incrementClick(params.redirect);
      window.location.href = record.original;
    } else {
      notFound();
    }
  }, [params.redirect]);

  return <p>Redirecting...</p>;
}

