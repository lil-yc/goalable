import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
    return (
        <Container maxW={"container.lg"}>
            <Flex gap={20}>
                <Box flex={2} py={10}>
                    <FeedPosts />
                </Box>
                <Flex flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"} bgColor={"rgba(255,255,255,0.1)"}>
                    <SuggestedUsers />
                </Flex>
            </Flex>
        </Container>
    );
};

export default HomePage;