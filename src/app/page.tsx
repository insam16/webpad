'use client'

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
    setTimeout(() => setShowToast(false), 3000); // 3초 후 자동 닫힘
  };

  return (
    <div>
      <h1>웹 메모장</h1>
      <div>
        <input
          type="text"
          value={newMemo}
          onChange={(e) => setNewMemo(e.target.value)}
          placeholder="새 메모를 입력하세요"
        />
        <button onClick={handleAddMemo}>메모 추가</button>
      </div>

      <ul>
        {memoList.map((memo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  defaultValue={memo}
                  onBlur={(e) => handleSaveMemo(index, e.target.value)}  // 수정 완료 시 저장
                  autoFocus
                />
              </div>
            ) : (
              <div>
                <span>{memo}</span>
                <CopyToClipboard
                  text={memo}
                >
                  <button
                    onClick={handleCopyMemo}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    복사
                  </button>
                </CopyToClipboard>
                <button onClick={() => handleEditMemo(index)}>수정</button>
                <button onClick={() => handleDeleteMemo(index)}>삭제</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {showToast && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-md shadow-md">
          복사 완료!
        </div>
      )}
    </div>
  );
}
