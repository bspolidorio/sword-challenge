import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toasterStyles } from "@/styles/toaster";
import toast from "react-hot-toast";
import { Repo } from "../../@types/types";
import useAuth from "./useAuth";

const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<DocumentData[]>();

  const setBookmark = async (repo: Repo) => {
    await setDoc(
      doc(db, "users", user!.uid, "myBookmarks", repo.id.toString()),
      {
        ...repo,
      }
    );
    toast(`${repo.name} has been added to My bookmarks`, {
      duration: 3000,
      style: toasterStyles,
    });
  };

  const deleteBookmark = async (repo: Repo) => {
    await deleteDoc(
      doc(db, "users", user!.uid, "myBookmarks", repo.id.toString())
    );
    toast(`${repo.name} has been removed from My bookmarks`, {
      duration: 3000,
      style: toasterStyles,
    });
  };

  useEffect(() => {
    if (!user?.uid) return;

    return onSnapshot(
      collection(db, "users", user.uid, "myBookmarks"),
      (snapshot) => {
        setBookmarks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, user?.uid]);

  return { bookmarks, deleteBookmark, setBookmark };
};

export default useBookmarks;
