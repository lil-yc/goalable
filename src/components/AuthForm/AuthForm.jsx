import { Box, Image, VStack, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true)


    return (
        <>
            <Box border={"1px solid white"} borderRadius={4} padding={5} bgColor={"rgba(255,255,255,0.1)"}>
                <VStack spacing={4}>
                    {/* <Image src='/logo.png' h={24} cursor={"pointer"} alt='Logo' /> */}
                    <Image src='/goalable-logo.png' h={50} cursor={"pointer"} alt='Logo' />

                    {isLogin ? <Login /> : <Signup />}

                    {/* OR divider */}
                    <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                        <Text mx={1} color={"white"}>
                            OR
                        </Text>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                    </Flex>
                    <GoogleAuth prefix={isLogin ? "Log in" : "Sign Up"} />
                </VStack>
            </Box>

            {/* Login/Signup box */}
            <Box border={"1px solid gray"} borderRadius={4} padding={5} bgColor={"rgba(255,255,255,0.1)"}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Box mx={2} fontSize={14}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </Box>
                    <Box onClick={() => setIsLogin(!isLogin)} color="#ff9f1a" cursor="pointer">
                        {isLogin ? "Sign up" : "Log in"}
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default AuthForm