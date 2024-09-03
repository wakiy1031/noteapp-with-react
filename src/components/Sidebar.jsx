export const Sidebar = ({
  onAddNote,
  notes,
  onDeleteNote,
  currentNote,
  setCurrentNote,
}) => {
  const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);
  return (
    <div className="w-2/6 border-r-2 border-gray-300 h-screen">
      <div className="flex justify-between items-center mb-4 p-4">
        <h1 className="text-2xl font-bold">ノート</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={onAddNote}
        >
          追加
        </button>
      </div>
      <div className="flex flex-col overflow-y-scroll h-[calc(100vh-100px)] p-4">
        {sortedNotes.map((note) => (
          <div
            key={note.id}
            className={`flex flex-col gap-2 p-4 rounded-md hover:bg-gray-100 ${
              currentNote === note.id ? "bg-gray-100" : ""
            }`}
            onClick={() => setCurrentNote(note.id)}
          >
            <div className="flex justify-between items-center">
              <strong className="text-lg font-bold">{note.title}</strong>
              <button
                className="text-red-500 text-sm font-bold"
                onClick={() => onDeleteNote(note.id)}
              >
                削除
              </button>
            </div>
            <p className="text-sm">
              {note.content.substring(0, 20)}
              {note.content.length > 20 ? "..." : ""}
            </p>
            <small className="text-xs text-gray-500">
              更新日:{new Date(note.modDate).toLocaleDateString("ja-JP")}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};
