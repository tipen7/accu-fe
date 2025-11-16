"use client";
import { useState, useEffect, useMemo } from "react";
import MatkulForm from "../components/MatkulForm";
import { MatkulCard } from "../components/MatkulCard";
import { Matkul } from "../manage/utils";

export default function ViewPage() {
  const [matkulList, setMatkulList] = useState<Matkul[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    nama: string;
  } | null>(null);

  const API_MATKUL_URL = "https://pekris-webdev.vercel.app/api/matkul";

  const fetchMatkul = async () => {
    try {
      const response = await fetch(API_MATKUL_URL, {
        headers: {
          Authorization: `Bearer 2ySAGN7AuQBYpJ1ZVktVyf7ZGfMRSUyU`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMatkulList(data);
      }
    } catch (error) {
      console.error("Failed to fetch matkul:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatkul();
  }, []);

  const handleUpdate = async (updatedMatkul: Matkul) => {
    try {
      const response = await fetch(`${API_MATKUL_URL}/${updatedMatkul.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 2ySAGN7AuQBYpJ1ZVktVyf7ZGfMRSUyU`,
        },
        body: JSON.stringify(updatedMatkul),
      });
      if (response.ok) {
        fetchMatkul();
      } else {
        alert("Failed to update matkul");
      }
    } catch (error) {
      console.error("Error updating matkul:", error);
    }
  };

  const handleDelete = (id: string, nama: string) => {
    setDeleteConfirm({ id, nama });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const response = await fetch(`${API_MATKUL_URL}/${deleteConfirm.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer 2ySAGN7AuQBYpJ1ZVktVyf7ZGfMRSUyU`,
        },
      });
      if (response.ok) {
        fetchMatkul();
        setDeleteConfirm(null);
      } else {
        alert("Failed to delete matkul");
      }
    } catch (error) {
      console.error("Error deleting matkul:", error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const renderedMatkulList = useMemo(() => {
    return matkulList.map((matkul) => (
      <MatkulCard
        key={matkul.id}
        matkul={matkul}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    ));
  }, [matkulList]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen w-full overflow-hidden">
        <div className="mb-8 hidden">
          <MatkulForm onSuccess={fetchMatkul} />
        </div>
        <div className="flex flex-col items-center gap-10">
          <h1 className="mb-6 text-white text-4xl font-semibold">
            Here are your courses!
          </h1>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 flex items-center justify-center min-h-screen w-full overflow-hidden">
      <div className="mb-8 hidden">
        <MatkulForm onSuccess={fetchMatkul} />
      </div>
      <div className="flex flex-col items-center gap-10">
        <h1 className="mb-6 text-white text-4xl font-semibold">
          Here are your courses!
        </h1>
        {matkulList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderedMatkulList}
          </div>
        ) : (
          <div className="text-white text-xl text-center">
            your courses is still empty, try add one in the manage!
          </div>
        )}
      </div>
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete "{deleteConfirm.nama}"?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
