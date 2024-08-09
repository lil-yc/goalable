import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetGoalById = (postId) => {
    const [isLoading, setIsLoading] = useState(true);
    const [goal, setGoal] = useState(null);

    const showToast = useShowToast();

    useEffect(() => {
        const getGoal = async () => {
            setIsLoading(true);
            setGoal(null);
            try {
                const goalRef = await getDoc(doc(firestore, "posts", postId));
                if (goalRef.exists()) {
                    setGoal(goalRef.data());
                }
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };
        getGoal();
    }, [showToast, setGoal, postId]);


    return { isLoading, goal, setGoal };
};

export default useGetGoalById;