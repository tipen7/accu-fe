"use client";
import { useState } from "react";
import { Matkul } from "../manage/utils";

interface MatkulCardProps {
  matkul: Matkul;
  onUpdate: (updatedMatkul: Matkul) => void;
  onDelete: (id: string, nama: string) => void;
}

export const MatkulCard = ({ matkul, onUpdate, onDelete }: MatkulCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nama, setNama] = useState(matkul.nama);
  const [deskripsi, setDeskripsi] = useState(matkul.deskripsi);
  const [sks, setSks] = useState(matkul.sks);

  const handleSave = () => {
    onUpdate({ ...matkul, nama, deskripsi, sks });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(matkul.id, matkul.nama);
  };

  return (
    <div className="rounded-xl bg-[#AA14F0] flex flex-col p-4 lg:w-[300px] md:w-[200px] w-[100px] items-center justify-center text-white">
      {isEditing ? (
        <>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full mb-2 p-1 rounded"
          />
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full mb-2 p-1 rounded"
          />
          <input
            type="number"
            value={sks}
            onChange={(e) => setSks(Number(e.target.value))}
            className="w-full mb-2 p-1 rounded"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 px-2 py-1 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 px-2 py-1 rounded"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h1 className="text-lg font-bold mb-2">{matkul.nama}</h1>
          <p className="text-sm mb-2">{matkul.deskripsi}</p>
          <p className="text-sm mb-4">SKS: {matkul.sks}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 px-2 py-1 rounded"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};
