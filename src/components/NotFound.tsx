export default function NotFound({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen items-center justify-center'>
      <h1 className='text-xl font-bold'>
        {children || "Sorry, but we couldn't find that particular page"}
      </h1>
    </div>
  );
}
