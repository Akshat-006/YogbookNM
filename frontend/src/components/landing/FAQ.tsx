import { Container } from "@/components/layout/Container";
import { FAQS } from "@/constants/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section className="py-24">
      <Container className="max-w-3xl">
        <div className="mb-12 text-center">
          <p className="font-semibold text-primary">
            FAQ
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible>
          {FAQS.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
            >
              <AccordionTrigger>
                {item.question}
              </AccordionTrigger>

              <AccordionContent>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}