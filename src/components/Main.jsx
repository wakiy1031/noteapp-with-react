import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Main = ({ currentNote, onUpdateNote }) => {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    if (currentNote) {
      setMarkdownContent(currentNote.content);
    }
  }, [currentNote]);

  const onEditNote = (key, value) => {
    onUpdateNote({
      ...currentNote,
      [key]: value,
      modDate: Date.now(),
    });
  };

  if (!currentNote) {
    return (
      <div className="w-4/6 h-screen border-l-2 border-gray-300 flex justify-center items-center">
        <p className="text-lg text-gray-500">ノートを選択してください</p>
      </div>
    );
  }

  return (
    <div className="w-4/6 h-screen border-l-2 border-gray-300">
      <div className="p-4 h-screen max-h-[50vh]">
        <input
          id="title"
          type="text"
          placeholder="タイトル"
          className="w-full block border-b-2 border-gray-300 h-12 resize-none focus:outline-none text-2xl font-bold p-2 placeholder:text-gray-300"
          value={currentNote.title}
          onChange={(e) => {
            onEditNote("title", e.target.value);
          }}
        />
        <textarea
          id="content"
          placeholder="ノートの内容"
          className="w-full block border-b-2 border-gray-300 resize-none focus:outline-none h-[calc(50vh-100px)] text-lg p-2 placeholder:text-gray-300"
          value={currentNote.content}
          onChange={(e) => {
            onEditNote("content", e.target.value);
          }}
        />
      </div>
      <div className="p-4 h-screen max-h-[50vh] overflow-y-scroll bg-gray-100 border-t-2 border-gray-300">
        <p className="text-lg font-bold">{currentNote.title}</p>
        <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
      </div>
    </div>
  );
};
