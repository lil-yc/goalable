import { Box, Flex, Text } from "@chakra-ui/react"
import { CiBookmarkCheck } from "react-icons/ci";
import { TbProgress } from "react-icons/tb";

const ProfileTabs = () => {
    return (
        <Flex w={"full"}
            justifyContent={"center"}
            gap={{ base: 4, sm: 10 }}
            textTransform={"uppercase"}
            fontWeight={"bold"}
        >

            <Flex borderTop={"1px solid white"} alignItems={"center"} p="3" gap={1} cursor={"pointer"}>
                <Box fontSize={20}>
                    <TbProgress />
                </Box>
                <Text fontSize={12} display={{ base: "none", sm: "block" }} >
                    Current
                </Text>
            </Flex>
            <Flex alignItems={"center"} p="3" gap={1} cursor={"pointer"}>
                <Box fontSize={20}>
                    <CiBookmarkCheck />
                </Box>
                <Text fontSize={12} display={{ base: "none", sm: "block" }} >
                    Completed
                </Text>
            </Flex>
            {/* <Flex alignItems={"center"} p="3" gap={1} cursor={"pointer"}>
                <Box fontSize={20}>
                    <BsBookmark />
                </Box>
                <Text fontSize={12} display={{ base: "none", sm: "block" }} >
                    Saved
                </Text>
            </Flex>
            <Flex alignItems={"center"} p="3" gap={1} cursor={"pointer"}>
                <Box fontSize={20}>
                    <BsSuitHeart fontWeight={"bold"} />
                </Box>
                <Text fontSize={12} display={{ base: "none", sm: "block" }} >
                    Likes
                </Text>
            </Flex> */}
        </Flex >
    )
}

export default ProfileTabs