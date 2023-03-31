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
import useAuth from "./useAuth";
import { toasterStyles } from "@/styles/toaster";
import toast from "react-hot-toast";

const usePreferredTopics = () => {
  const { user } = useAuth();
  const [preferredTopics, setPreferredTopics] = useState<DocumentData[]>();

  const setTopic = async (topic: string, sortBy = "stars") => {
    await setDoc(doc(db, "users", user!.uid, "myPreferredTopics", topic), {
      topic,
      sortBy,
    });
    if (sortBy) return;
    toast(`${topic} has been added to My preferred topics`, {
      duration: 3000,
      style: toasterStyles,
    });
  };

  const deleteTopic = async (topic: string) => {
    await deleteDoc(doc(db, "users", user!.uid, "myPreferredTopics", topic));
    toast(`${topic} has been removed from My preferred topics`, {
      duration: 3000,
      style: toasterStyles,
    });
  };

  useEffect(() => {
    if (!user?.uid) return;

    return onSnapshot(
      collection(db, "users", user?.uid, "myPreferredTopics"),
      (snapshot) => {
        setPreferredTopics(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, user?.uid]);

  return { preferredTopics, setTopic, deleteTopic };
};

export default usePreferredTopics;
