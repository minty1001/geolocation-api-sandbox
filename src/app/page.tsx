'use client';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col align-center space-y-4">
      <button className="border" onClick={() => router.push('/get')}>
        get
      </button>
      <button className="border" onClick={() => router.push('/watch')}>
        watch
      </button>
      <button className="border" onClick={() => router.push('/watch/auto')}>
        auto watch
      </button>
    </div>
  );
};

export default Home;
