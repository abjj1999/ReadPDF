export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="w-screen min-h-screen  flex items-center justify-center flex-col h-full bg-gradient-to-r from-gray-700 via-gray-900 to-black">
        <h1 className="text-4xl font-semibold text-white my-5 ">PDF.AI</h1>
        {children}
      </div>
    );
  };