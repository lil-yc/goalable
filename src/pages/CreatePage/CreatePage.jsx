import {
    Button,
    CloseButton,
    Image,
    Input,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const CreatePage = () => {
    const [caption, setCaption] = useState("");
    const [desc, setDesc] = useState("");
    const imageRef = useRef(null);
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const showToast = useShowToast();
    const { isLoading, handleCreatePost } = useCreatePost();


    const handlePostCreation = async () => {
        try {
            await handleCreatePost(selectedFile, caption, desc, tasks);
            setCaption("");
            setDesc("");
            setSelectedFile(null);
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    // Add Task
    const [tasks, setTasks] = useState([{ value: "" }]);

    const handleAddTasks = () => {
        setTasks([...tasks, { value: "" }]);
    };

    const handleRemoveTasks = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const handleValueChange = (index, event) => {
        const values = [...tasks];
        values[index].value = event.target.value;
        setTasks(values);
    };

    return (
        <Box m={10}>

            <Box fontSize={35}>
                Create a Goal
            </Box>

            <Input
                maxW={400}
                placeholder='Goal Title'
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                color={"#ff9f1a"}
            />
            <br /><br />
            <Textarea
                maxW={600}
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <br /><br />
            <Text>Choose an image:</Text>
            <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

            <BsFillImageFill
                onClick={() => imageRef.current.click()}
                style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
                size={16}
            />
            {selectedFile && (
                <Flex mt={5} h={250} position={"relative"} justifyContent={"center"} >
                    <Image src={selectedFile} alt='Selected img' borderRadius={10} />
                    <CloseButton
                        position={"absolute"}
                        top={2}
                        right={2}
                        onClick={() => {
                            setSelectedFile(null);
                        }}
                    />
                </Flex>
            )}
            <br />
            <Text fontSize={20} color={"#decc81"}> Add Tasks:</Text>

            {/* Add Task */}
            <Box >

                {tasks.map((task, index) => (
                    <Box key={index}>
                        <Input
                            type="text"
                            placeholder="Write a task"
                            maxW={400}
                            value={task.value}
                            onChange={(e) => handleValueChange(index, e)}
                        />

                        <Button onClick={() => handleRemoveTasks(index)}>
                            <MdDelete fontSize={20} />
                        </Button>
                    </Box>
                ))}

                <Button onClick={handleAddTasks}>
                    <IoIosAdd fontSize={20} />
                </Button>
            </Box>

            <br />
            <br />
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}
                bg={"#decc81"} color={"black"} _hover={{ bg: "#ff9f1a" }}
            >
                Create!
            </Button>

        </Box>
    )
};

export default CreatePage;



function useCreatePost() {
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const createPost = usePostStore((state) => state.createPost);
    const addPost = useUserProfileStore((state) => state.addPost);
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const { pathname } = useLocation();

    const handleCreatePost = async (selectedFile, caption, desc, tasks) => {
        if (isLoading) return;
        if (!caption) throw new Error("Please choose a title.");
        if (!selectedFile) throw new Error("Please select an image.");
        setIsLoading(true);
        const newPost = {
            caption: caption,
            desc: desc,
            tasks: tasks, // will not be empty if tasks added from create page
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid,
        };

        try {
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
            const userDocRef = doc(firestore, "users", authUser.uid);
            const imageRef = ref(storage, `posts/${postDocRef.id}`);

            await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
            await uploadString(imageRef, selectedFile, "data_url");
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(postDocRef, { imageURL: downloadURL });

            newPost.imageURL = downloadURL;

            if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id });

            if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });

            showToast("Success", "Goal created!", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleCreatePost };
}