import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from "@chakra-ui/react";

const FaQsComponent = ({ Faqs = [] }) => {
  return (
    <Box mt={3} borderTop="1px" borderColor="gray.200" pt={3}>
      <Heading as="h2" size="lg" mb={3} textAlign={"center"}>
        FAQS
      </Heading>
      <Accordion allowToggle allowMultiple defaultIndex={[0]}>
        {Faqs.map((faq, index) => (
          <AccordionItem key={index} mb={2}>
            <AccordionButton
              _expanded={{ bg: "#EDF0F2" }}
              _dark={{
                bg: "gray.700"
              }}
            >
              <Box flex="1" textAlign="left" fontWeight="bold">
                <i className="bx bx-question-mark me-1"></i>
                {faq.question}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default FaQsComponent;
