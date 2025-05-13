import Navbar from "./Navbar";
import { ContentToggle } from "./toggles";
import styles from "../style";
import Footer from "./Footer";
import { H4 } from "./typography";

const questions = [
  {
    title: "What is IKEMA?",
    content:
      "we are revolutionizing how people invest in and interact with real-world assets. Leveraging the power of Blockchain technology and Artificial intelligence, our platform bridges the gap between traditional real estate markets and the digital future, making real asset investments accessible, transparent, and efficient for everyone.",
  },
  {
    title: "How can I generate cash flow from the tokens?",
    content:
      "Cash Flow generated from tokens depends on how the token is structured. For example, security tokens may generate cash flow through dividends, while utility tokens may generate cash flow through fees associated with the underlying product or service. Additionally, tokens may generate cash flow through appreciation in value if they are traded on an exchange.",
  },
  {
    title: "How many tokens are available?",
    content:
      "The Total Supply is 1 billion IKE tokens.",
  },
  {
    title: "Where can I buy IKE?",
    content:
      "IKE tokens will be available exclusively through our official website during the sale phases.",
  },
  {
    title:
      "Is there a team behind IKE?",
    content:
      "The project is initially managed by its founder. A full team will be formed to handle future operations and development.",
  },
];

export const FAQ = () => {
  return (
    <div className="bg-[url('./assets/bg-overlay.png')] lg:bg-contain bg-auto">
      <div className={`${styles.paddingXX} ${styles.flexCenter}`}>
        <Navbar />
      </div>
      <div className="mt-5 d-flex flex-column align-items-center justify-content-center">
        <div className="col-8">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <H4>
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "32px",
                  color: "#846424",
                  marginTop: "30px",
                  marginBottom: "20px",
                }}
              >
                FAQ's{" "}
              </p>
            </H4>
            {/* <div className="mt-5" /> */}
            <div className="w-100 mt-1">
              {questions.map((data, ind) => (
                <div key={ind}>
                  <ContentToggle title={data.title} content={data.content} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5" />
      <div className={`bg-black  ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};
