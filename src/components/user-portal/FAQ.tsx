import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQData {
  question: string;
  answer: string;
}
const faqDummyData = [
  {
    question:
      'What payment methods do you accept for purchasing access to soccer stats?',
    answer:
      'We accept all major credit cards, PayPal, and other secure online payment methods.',
  },
  {
    question: 'How do I receive my virtual card for accessing soccer stats?',
    answer:
      'Once your payment is confirmed, you will receive an email with instructions on how to access the soccer stats service.',
  },
  {
    question:
      "Can I return my virtual card if I'm not satisfied with the card?",
    answer:
      'Due to the nature of virtual cards offering access to digital content, we do not offer refunds. However, we strive to ensure customer satisfaction and are happy to assist with any issues.',
  },
  {
    question: 'Do you offer international access to soccer stats?',
    answer:
      'Yes, our virtual cards for accessing soccer stats are accessible internationally. As long as you have an internet connection, you can access them from anywhere in the world.',
  },
  {
    question: 'Is there a warranty?',
    answer:
      'We do not offer warranties, but we are committed to providing quality service and support for accessing soccer stats.',
  },
];

const Accordion: FC<{ faqData: FAQData[] }> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full">
      <div className=" bg-cardsDark bg-opacity-70 mt-7 rounded-10">
        {faqDummyData.map((faq, idx) => (
          <div key={idx} className={`flex justify-between items-center px-4`}>
            <div className="flex flex-col text-primary text-base font-extralight w-full">
              <div
                className={`flex justify-between items-center`}
                onClick={() => handleToggle(idx)}
              >
                <div className="p-6 font-normal">{faq.question}</div>
                <div className="h-6">
                  <FontAwesomeIcon
                    icon={openIndex === idx ? faMinus : faPlus}
                  />
                </div>
              </div>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: 'auto' },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`transition-opacity px-4 pb-6 text-primary opacity-80 mr-16 leading-6`}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div
                className={`h-px ${idx < faqDummyData.length - 1 ? ' bg-partnersBorders' : 'bg-transparent'}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
