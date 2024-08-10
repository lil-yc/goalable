import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from "@chakra-ui/react"
import useUserProfileStore from "../../store/userProfileStore"
import useAuthStore from "../../store/authStore"
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";
// Additional imports for linking new page
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";


const ProfileHeader = () => {
    const { userProfile } = useUserProfileStore();
    const authUser = useAuthStore(state => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);
    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }} >
            <AvatarGroup
                size={{ base: "xl", md: "2xl" }}
                justifySelf={"center"}
                alignSelf={"flex-start"}
                mx={"auto"}
            >
                <Avatar src={userProfile.profilePicURL} alt="logo" />
            </AvatarGroup>
            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
                <Flex gap={4} direction={{ base: "column", sm: "row" }}
                    justifyContent={{ base: "center", sm: "flex-start" }}
                    alignItems={"center"}
                    w={"full"}
                >

                    <Flex alignItems={"center"} gap={4}>
                        <Text fontSize={"30"} fontWeight={"bold"} >
                            {userProfile.fullName}
                        </Text>
                    </Flex>

                    {/* Display edit profile/follow depending on user logged in*/}
                    {visitingOwnProfileAndAuth && (
                        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>

                            {/* CHANGED TO LINK TO EditProfilePage */}
                            <Link
                                to={`/editprofile`}
                                as={RouterLink}
                            >
                                <Button bg={"white"} color={"black"} _hover={{ bg: "#decc81" }} size={{ base: "xs", md: "sm" }}>
                                    Edit Profile
                                </Button >
                            </Link>
                        </Flex>
                    )}

                    {visitingAnotherProfileAndAuth && (
                        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                            <Button bg={"#decc81"} color={"black"} _hover={{ bg: "#ff9f1a" }}
                                size={{ base: "xs", md: "sm" }}
                                onClick={handleFollowUser}
                                isLoading={isUpdating}
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                        </Flex>
                    )}
                </Flex>

                <Text fontSize={{ base: "sm", md: "lg" }}
                    color={"rgba(255, 255, 255, 0.5)"}
                >
                    @{userProfile.username}
                </Text>


                <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }} >
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as="span" fontWeight={"bold"} mr={1}>
                            {userProfile.posts.length}
                        </Text>
                        Goals
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as="span" fontWeight={"bold"} mr={1}>
                            {userProfile.followers.length}
                        </Text>
                        Followers
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as="span" fontWeight={"bold"} mr={1}>
                            {userProfile.following.length}
                        </Text>
                        Following
                    </Text>
                </Flex>


                <Flex>
                    <Text fontSize={"sm"}
                        color={"rgba(255, 255, 255, 0.5)"}>
                        {userProfile.bio}
                    </Text>
                </Flex>
            </VStack >
            {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
        </Flex >
    )
}

export default ProfileHeader 