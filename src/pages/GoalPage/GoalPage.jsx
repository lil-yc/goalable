import { Box, Image, Flex, Link, Text, VStack, UnorderedList, ListItem, } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import useGetGoalById from "../../hooks/useGetGoalById";
import Task from "./Task";

const GoalPage = () => {
    const { goalId } = useParams();
    const { isLoading, goal } = useGetGoalById(goalId);


    const pageNotFound = !isLoading && !goal;
    if (pageNotFound) return <PageNotFound />;

    if (goal) return (
        <>
            <VStack >
                <Image src={goal.imageURL} alt='cover image'
                    h={150}
                    w={"100%"}
                    objectFit={"cover"}
                    opacity={"50%"}
                />

                <Text
                    fontSize={"40"} fontWeight={"bold"}
                >{goal.caption}
                </Text>

                <Text
                    opacity={"50%"}
                >{goal.desc}
                </Text>
            </VStack>
            <Box
                m={5}>
                <Text
                    fontSize={20}
                    fontWeight={"bold"}
                    mb={2}

                >
                    Tasks
                </Text>
                <Flex
                    px={{ base: 2, sm: 4 }}
                    maxW={"full"}
                    mx={"auto"}
                    borderTop={"1px solid"}
                    borderColor={"whiteAlpha.300"}
                    direction={"column"}
                />
                {/* Tasks */}

                <VStack
                    m={10}
                    alignItems={"left"}
                >
                    {goal.tasks.map((task, idx) => (
                        <Task key={idx} task={task} />
                    ))}

                </VStack>

            </Box>
        </>
    );
};

const PageNotFound = () => {
    return (
        <Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={50}>
            <Text fontSize={"2xl"}>Page Not Found</Text>
            <Link as={RouterLink} to={"/"} color={"#ff9f1a"} w={"max-content"} mx={"auto"}>
                Go home
            </Link>
        </Flex>
    );
};
export default GoalPage;

