
import { Box, Flex, Text } from "@chakra-ui/react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const Task = ({ task }) => {

    return (

        <>
            <Flex >
                <MdCheckBoxOutlineBlank fontSize={30} cursor={"pointer"} opacity={"50%"} />
                <Text fontSize={20} >{task.value}</Text>
            </Flex >

        </>

    );
};

export default Task;


