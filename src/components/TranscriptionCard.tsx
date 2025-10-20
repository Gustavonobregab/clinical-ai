interface TranscriptionCardProps {
  rawText: string | null;
}

export default function TranscriptionCard({ rawText }: TranscriptionCardProps) {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Transcription</h2>
      
      {rawText && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Raw Text</h3>
          <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
            {rawText}
          </p>
        </div>
      )}
    </div>
  );
}
