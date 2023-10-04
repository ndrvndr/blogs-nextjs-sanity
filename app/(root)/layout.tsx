export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className='max-w-7xl m-auto p-8 flex justify-between'>
        <span>My Blog</span>
        <ul className='flex gap-8'>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      {children}
      <footer className='w-fit m-auto py-8'>
        copyright &copy; Your Name 2023
      </footer>
    </>
  );
}
