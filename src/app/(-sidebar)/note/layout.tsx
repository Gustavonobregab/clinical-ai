export default function NoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {children}
    </div>
  );
}
