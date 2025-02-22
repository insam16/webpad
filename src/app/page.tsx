"use client";

import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Home() {
  const [memoList, setMemoList] = useState<string[]>([]);  // 메모 리스트 상태
  const [newMemo, setNewMemo] = useState<string>("");  // 새 메모 입력 상태
  const [editingIndex, setEditingIndex] = useState<number | null>(null);  // 수정 중인 메모의 인덱스
  const [showToast, setShowToast] = useState(false);
  
  // 1. 페이지 초기화 시 로컬 스토리지에서 메모 불러오기
  useEffect(() => {
    const storedMemos = JSON.parse(localStorage.getItem("memos") || "[]");
    setMemoList(storedMemos);
  }, []);  // 빈 배열을 두면 컴포넌트가 처음 마운트될 때만 실행

  // 2. 메모 리스트 상태가 변경될 때마다 로컬 스토리지에 저장하기
  useEffect(() => {
    if (memoList.length > 0) {
      localStorage.setItem("memos", JSON.stringify(memoList));
    }
  }, [memoList]);  // memoList가 변경될 때마다 실행

  const handleAddMemo = () => {
    if (newMemo.trim()) {
      const updatedMemos = [...memoList, newMemo];
      setMemoList(updatedMemos);  // 새 메모 추가
      setNewMemo("");  // 메모 추가 후 입력 필드 초기화
    }
  };

  const handleEditMemo = (index: number) => {
    setEditingIndex(index);  // 수정하려는 메모의 인덱스를 설정
  };

  const handleSaveMemo = (index: number, updatedMemo: string) => {
    const updatedMemos = [...memoList];
    updatedMemos[index] = updatedMemo;  // 메모 수정
    setMemoList(updatedMemos);
    setEditingIndex(null);  // 수정 완료 후 편집 모드 종료
  };

  const handleDeleteMemo = (index: number) => {
    const updatedMemos = memoList.filter((_, i) => i !== index);  // 메모 삭제
    setMemoList(updatedMemos);
  };

  const handleCopyMemo = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // 3초 후 자동 닫힘
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h3 className="text-3xl font-bold text-blue-600 mb-5">📝 웹 메모장</h3>

      <div className="bg-white shadow-md p-4 rounded-lg w-full max-w-lg">
        <input
          type="text"
          value={newMemo}
          onChange={(e) => setNewMemo(e.target.value)}
          placeholder="새 메모를 입력하세요"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddMemo}
          className="mt-2 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
        >
          추가하기
        </button>
      </div>

      <ul className="w-full max-w-lg mt-5">
        {memoList.map((memo, index) => (
          <li
            key={index}
            className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center mb-2"
          >
            {editingIndex === index ? (
              <input
                type="text"
                defaultValue={memo}
                onBlur={(e) => handleSaveMemo(index, e.target.value)}  // 수정 완료 시 저장
                autoFocus
                className="border w-full px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="text-gray-700">{memo}</span>
            )}

            <div className="flex space-x-2">
              <CopyToClipboard text={memo} onCopy={handleCopyMemo}>
                <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                  📋
                </button>
              </CopyToClipboard>
              <button
                onClick={() => handleEditMemo(index)}
                className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDeleteMemo(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                  🗑️
                </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Toast message */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-md shadow-md">
          ✅ 복사 완료!
        </div>
      )}

      {/* animation style */}
      <style jsx>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
