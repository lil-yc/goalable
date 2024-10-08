import {
    Avatar,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";
import { Link as RouterLink } from "react-router-dom";

// Page created to avoid Modal issues

const EditProfilePage = ({ isOpen, onClose }) => {
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        bio: '',
    });
    const authUser = useAuthStore((state) => state.user);
    const fileRef = useRef(null);
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const { isUpdating, editProfile } = useEditProfile();
    const showToast = useShowToast();

    const handleEditProfile = async () => {

        try {
            await editProfile(inputs, selectedFile);
            setSelectedFile(null);
            onClose();
        } catch (error) {
            showToast("Error", error.message, "error");
        }

    };
    console.log(inputs.fullName, inputs.username, inputs.bio)
    return (

        <>

            {/* Container Flex */}
            <Flex>
                <Stack spacing={4} w={"full"} maxW={"md"} p={6} my={0}>
                    <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                        Edit Profile
                    </Heading>
                    <FormControl>
                        <Stack direction={["column", "row"]} spacing={6}>
                            <Center>
                                <Avatar
                                    size='xl'
                                    src={selectedFile || authUser.profilePicURL}
                                    border={"2px solid white "}
                                />
                            </Center>
                            <Center w='full'>
                                <Button w='full' onClick={() => fileRef.current.click()}>
                                    Edit Profile Picture
                                </Button>
                            </Center>
                            <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
                        </Stack>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={"sm"}>Full Name</FormLabel>
                        <Input
                            placeholder={"Full Name"}
                            size={"sm"}
                            type={"text"}
                            value={inputs.fullName || authUser.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={"sm"}>Username</FormLabel>
                        <Input
                            placeholder={"Username"}
                            size={"sm"}
                            type={"text"}
                            defaultValue={inputs.username || authUser.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={"sm"}>Bio</FormLabel>
                        <Input
                            placeholder={"Bio"}
                            size={"sm"}
                            type={"text"}
                            value={inputs.bio || authUser.bio}
                            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                        />
                    </FormControl>

                    <Stack spacing={6} direction={["column", "row"]}>
                        <Link
                            to={`/${authUser?.username}`}
                            as={RouterLink}>
                            <Button
                                bg={"white"}
                                color={"black"}
                                w='full'
                                size='sm'
                                _hover={{ bg: "#7f99d7" }}
                            >
                                Go Back
                            </Button>
                        </Link>
                        <Button
                            bg={"#ff9f1a"}
                            color={"black"}
                            size='sm'
                            w='full'
                            _hover={{ bg: "#decc81" }}
                            onClick={handleEditProfile}
                            isLoading={isUpdating}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>

        </>

    );
};

export default EditProfilePage;
