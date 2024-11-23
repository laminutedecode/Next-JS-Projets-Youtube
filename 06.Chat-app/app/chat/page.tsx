"use client"
import { useEffect, useState } from 'react';
import ChatContainer from '@/app/components/ChatContainer';
import SendMessage from '@/app/components/SendMessage';
import useClientAuth from '@/app/hooks/useClientAuth';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();
  const { user, isFetch } = useClientAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFetch) {
      setLoading(false);
    }
  }, [isFetch]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  return (
    <div className="w-full h-screen">
      <ChatContainer />
      <SendMessage />
    </div>
  );
}
