import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, Box, IconButton, Heading } from "@chakra-ui/react";
import { FaQuestionCircle, FaReply } from "react-icons/fa";

const Index = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handlePostQuestion = () => {
    if (currentQuestion.trim() !== "") {
      setQuestions([...questions, { question: currentQuestion, answers: [] }]);
      setCurrentQuestion("");
    }
  };

  const handlePostAnswer = () => {
    if (currentAnswer.trim() !== "" && selectedQuestion !== null) {
      const updatedQuestions = questions.map((q, index) => {
        if (index === selectedQuestion) {
          return { ...q, answers: [...q.answers, currentAnswer] };
        }
        return q;
      });
      setQuestions(updatedQuestions);
      setCurrentAnswer("");
    }
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={4}>
          Gaming Slot Technician Q&A
        </Heading>
        <HStack width="100%">
          <Input placeholder="Post a question..." value={currentQuestion} onChange={(e) => setCurrentQuestion(e.target.value)} />
          <Button leftIcon={<FaQuestionCircle />} colorScheme="teal" onClick={handlePostQuestion}>
            Post
          </Button>
        </HStack>
        <VStack spacing={4} width="100%">
          {questions.map((q, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text fontWeight="bold">{q.question}</Text>
              <VStack spacing={2} mt={2} align="start">
                {q.answers.map((answer, aIndex) => (
                  <HStack key={aIndex} spacing={2}>
                    <FaReply />
                    <Text>{answer}</Text>
                  </HStack>
                ))}
              </VStack>
              <HStack mt={2}>
                <Input
                  placeholder="Write an answer..."
                  value={selectedQuestion === index ? currentAnswer : ""}
                  onChange={(e) => {
                    setSelectedQuestion(index);
                    setCurrentAnswer(e.target.value);
                  }}
                />
                <IconButton aria-label="Post Answer" icon={<FaReply />} colorScheme="teal" onClick={handlePostAnswer} />
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
