import { useEffect, useState } from "react";
import styles from "./nerocoin.module.css";

// Define a color mapping for specific words or patterns
const colorMap = {
  "//": "#868686", // Comments
  "AI-Powered Advisor": "#2D8CC6", // Keywords
  "Real Assets Tokenization": "#E9950D", 
  "Peer-to-Peer (P2P) Marketplace":"#DF3078",
  "Future Ecosystem Expansion": "#04A57D",
  "Import the NeuroCoin SDK": "#868686",
  "Initialize the API with your private key": "#868686",
  "Generate a new wallet address": "#868686",
  function: "#2D8CC6",
  async: "#2D8CC6",
  try: "#2D8CC6",
  catch: "#2D8CC6",
  await: "#2D8CC6",
  if: "#C586C0",
  else: "#C586C0",
  NeuroCoinAPI: "#F22C3D", // Class names
  require: "#E9950D", // Functions
  "error.message": "#FFFFFF",
  log: "#E83E39",
  error: "#E83E39",
  console: "#DF3078",
  generateWallet: "#E83E39",
  neurocoin: "#FFFFFF", // Variables
  wallet: "#FFFFFF",
  apiKey: "#DF3078",
  apiEndpoint: "#DF3078",

  message: "#FFFFFF",
  address: "#FFFFFF",
  "#F22C3D": "#F22C3D", // Your specific requested color
  "'YOUR-PRIVATE-KEY'": "#04A57D", // Strings
  "'https://api.neurocoin.network'": "#04A57D",
  "'New Wallet Address:'": "#CE9178",
  "'Error generating wallet:'": "#04A57D",
  "'neurocoin-sdk'": "#04A57D",
};

// Add new suggestion sets at the top with your other constants
const suggestionSets = {
  require: ["'express'", "'react'", "'axios'", "'lodash'", "'neurocoin-sdk'"],
  apiKey: [
    "'YOUR-PRIVATE-KEY'",
    "'API-KEY-123'",
    "'NEURO-KEY'",
    "'TEST-KEY'",
    "'YOUR-PRIVATE-KEY'",
  ],
  apiEndpoint: [
    "'http://localhost:3000'",
    "'https://dev.neurocoin.net'",
    "'https://staging.neurocoin.net'",
    "'https://api.neurocoin.network'",
    "'https://api.neurocoin.network'",
  ],
  // Add new suggestion set for neurocoin methods
  neuroCoinMethods: ["generateWallet()", "createWallet()", "getBalance()"],
};

export default function CodeWriter() {
  const [currentLine, setCurrentLine] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [finalCode, setFinalCode] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [pauseTyping, setPauseTyping] = useState(false);
  const [suggestionPhase, setSuggestionPhase] = useState("cycling");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // "// Import the Safiah Coin",
  // "const { SAFICoinAPI } = require('SAFIcoin-sdk');",
  // "",
  // "// Initialize the API with your private key",
  // "const SAFIcoin = new SAFICoinAPI({",
  // "  apiKey: 'YOUR-PRIVATE-KEY',",
  // "  apiEndpoint: 'https://api.SAFIcoin.network',",
  // "});",
  // "",
  // "// Generate a new wallet address",
  // "async function generateWallet() {",
  // "  try {",
  // "    const wallet = await SAFIcoin.generateWallet();",
  // "    console.log('New Wallet Address:', wallet.address);",
  // "  } catch (error) {",
  // "    console.error('Error generating wallet:', error.message);",
  // "  }",
  // "}",

  const codeLines = [
    "AI-Powered Advisor",
    "AI Advisor offer personalized recommendations",
    "based on user preferences and market trends",
    "",
    "Real Assets Tokenization",
    "We transform real estate and other tangible",
    "assets into easily tradable digital tokens",
    "",
    "Peer-to-Peer (P2P) Marketplace",
    "Our decentralized marketplace connects buyers",
    "and sellers directly, eliminating",
    "middlemen and reducing costs",
    "",
    "Future Ecosystem Expansion",
    "We’re laying the groundwork for more:",
    "IKE plans to expand into DeFi tools,",
    "staking, and utility-based applications",
    "as we grow.",
    "",
  ];

  // Update cursor position - this would be calculated based on text length
  useEffect(() => {
    if (showSuggestions) {
      const lineHeight = 24; // Adjust if your line height is different
      const lineNumber = 2; // Since it's on the second line (const { NeuroCoinAPI } = require()
      const leftOffset = 320; // Adjust based on the position after "require("

      setCursorPosition({
        x: leftOffset,
        y: lineNumber * lineHeight,
      });
    }
  }, [showSuggestions]);

  // Update the check for showing suggestions effect
  useEffect(() => {
    if (pauseTyping || isMobile) return;

    // For require
    if (
      currentLine === 1 &&
      typedText === "const { NeuroCoinAPI } = require("
    ) {
      setShowSuggestions(true);
      setSuggestions(suggestionSets.require);
      setSelectedSuggestion(0);
      setSuggestionPhase("cycling");
      setPauseTyping(true);
    }
    // For apiKey
    else if (currentLine === 5 && typedText === "  apiKey: ") {
      setShowSuggestions(true);
      setSuggestions(suggestionSets.apiKey);
      setSelectedSuggestion(0);
      setSuggestionPhase("cycling");
      setPauseTyping(true);
    } else if (
      currentLine === 12 &&
      typedText === "    const wallet = await neurocoin."
    ) {
      setShowSuggestions(true);
      setSuggestions(suggestionSets.neuroCoinMethods);
      setSelectedSuggestion(0);
      setSuggestionPhase("cycling");
      setPauseTyping(true);
    }
  }, [typedText, currentLine, pauseTyping, isMobile]);

  // Handle the suggestion cycling and selection animation
  useEffect(() => {
    if (!showSuggestions || suggestionPhase !== "cycling") return;

    // Cycle through suggestions
    const cycleSuggestions = setInterval(() => {
      setSelectedSuggestion((prev) => (prev + 1) % suggestions.length);
    }, 300);

    // After cycling for a while, stop on the correct suggestion
    const selectCorrect = setTimeout(() => {
      // Find the correct suggestion for line 1
      const correctIndex = suggestions.findIndex(
        (s) => s === "'neurocoin-sdk'"
      );
      setSelectedSuggestion(correctIndex >= 0 ? correctIndex : 0);
      setSuggestionPhase("selected");

      clearInterval(cycleSuggestions);
    }, 1200);

    return () => {
      clearInterval(cycleSuggestions);
      clearTimeout(selectCorrect);
    };
  }, [showSuggestions, suggestions, suggestionPhase]);

  // Update the selection handler effect
  useEffect(() => {
    if (suggestionPhase !== "selected") return;

    const completeSelection = setTimeout(() => {
      const selectedOption = suggestions[selectedSuggestion];
      let completedText = "";

      // Add case for neurocoin methods
      if (currentLine === 12) {
        completedText = `    const wallet = await neurocoin.${selectedOption}`;
      } else if (currentLine === 1) {
        completedText = `const { NeuroCoinAPI } = require(${selectedOption})`;
      } else if (currentLine === 5) {
        completedText = `  apiKey: ${selectedOption}`;
      } else if (currentLine === 6) {
        completedText = `  apiEndpoint: ${selectedOption}`;
      }

      setTypedText(completedText);
      setSuggestionPhase("completed");

      setTimeout(() => {
        setShowSuggestions(false);
        setPauseTyping(false);
        setFinalCode((prev) => [
          ...prev,
          completedText +
            (currentLine === 1 ? ";" : currentLine === 12 ? ";" : ","),
        ]);
        setTypedText("");
        setCurrentLine((prev) => prev + 1);
      }, 500);
    }, 600);

    return () => clearTimeout(completeSelection);
  }, [suggestionPhase, selectedSuggestion, suggestions, currentLine]);

  // Update cursor position calculation
  useEffect(() => {
    if (showSuggestions) {
      const lineHeight = 24;
      let leftOffset = 320;
      let lineNumber = 2;

      // Add position for neurocoin methods
      if (currentLine === 12) {
        leftOffset = 280; // Adjust this value based on where "neurocoin." ends
        lineNumber = 13;
      } else if (currentLine === 5) {
        leftOffset = 100;
        lineNumber = 6;
      } else if (currentLine === 6) {
        leftOffset = 140;
        lineNumber = 7;
      }

      setCursorPosition({
        x: leftOffset,
        y: lineNumber * lineHeight,
      });
    }
  }, [showSuggestions, currentLine]);

  // Main typing animation effect
  useEffect(() => {
    if (pauseTyping) return;

    if (currentLine < codeLines.length) {
      if (typedText.length < codeLines[currentLine].length) {
        const timeoutId = setTimeout(() => {
          setTypedText(
            (prev) => prev + codeLines[currentLine][typedText.length]
          );
        }, 50);
        return () => clearTimeout(timeoutId);
      } else {
        const timeoutId = setTimeout(() => {
          setFinalCode((prev) => [...prev, typedText]);
          setTypedText("");
          setCurrentLine((prev) => prev + 1);
        }, 500);
        return () => clearTimeout(timeoutId);
      }
    } else {
      const timeoutId = setTimeout(() => {
        setCurrentLine(0);
        setFinalCode([]);
        setTypedText("");
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [typedText, currentLine, pauseTyping, codeLines]);

  // Add useEffect to detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Common breakpoint for mobile devices
    };

    // Check on initial load
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Function to apply custom colors to code text
  const colorizeCode = (code) => {
    let result = [];
    let currentPos = 0;

    // Helper function to check if text at position matches a pattern
    const matchPattern = (text, pos, pattern) => {
      return text.substring(pos, pos + pattern.length) === pattern;
    };

    while (currentPos < code.length) {
      let matched = false;

      // Try to match each pattern in the colorMap
      for (const [pattern, color] of Object.entries(colorMap)) {
        if (matchPattern(code, currentPos, pattern)) {
          result.push(
            <span
              key={`${currentPos}-${pattern}`}
              style={{ color }}
              className="text-xs xs:text-sm sm:text-base lg:text-sm xl:text-base"
            >
              {pattern}
            </span>
          );
          currentPos += pattern.length;
          matched = true;
          break;
        }
      }

      // If no pattern matched, add the character as-is
      if (!matched) {
        result.push(<span key={`char-${currentPos}`}>{code[currentPos]}</span>);
        currentPos++;
      }
    }

    return result;
  };

  return (
    <div
      className={`${styles["api-code-container"]} w-full h-[300px] sm:h-[360px] md:h-[460px] bg-[#0e0e0d] overflow-auto relative rounded-t-3xl rounded-b-xl p-1 sm:p-2 lg:p-0 xl:p-5`}
    >
      <pre
        style={{
          backgroundColor: "#0e0e0d",
          color: "#d4d4d4",
          padding: isMobile ? "8px" : "16px",
          borderRadius: "4px",
          overflow: isMobile ? "auto" : "visible",
          fontFamily:
            'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          lineHeight: "1.5",
          fontSize: isMobile ? "12px" : "14px",
          textAlign: "left",
          position: "relative",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <code>
          {finalCode.map((line, index) => (
            <div key={`line-${index}`}>
              <span style={{ color: "#858585", marginRight: "16px" }}>
                {index + 1}
              </span>
              {colorizeCode(line)}
            </div>
          ))}
          <div>
            <span style={{ color: "#858585", marginRight: "16px" }}>
              {finalCode.length + 1}
            </span>
            {colorizeCode(typedText)}
            <span className={styles.cursor || "cursor"}>▌</span>
          </div>
        </code>

        {showSuggestions && (
          <div
            style={{
              position: "absolute",
              top: cursorPosition.y,
              left: cursorPosition.x,
              width: "180px",
              backgroundColor: "#1E1E1E",
              border: "1px solid #454545",
              borderRadius: "4px",
              zIndex: 9999,
              boxShadow: "0 4px 12px rgba(0,0,0,0.8)",
              overflow: "visible",
              maxHeight: "150px",
              pointerEvents: "auto",
              transform: "translateZ(0)",
            }}
          >
            <div
              style={{
                backgroundColor: "#1E1E1E",
                position: "relative",
                zIndex: 9999,
              }}
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  style={{
                    padding: "8px 12px",
                    backgroundColor:
                      selectedSuggestion === index ? "#264F78" : "transparent",
                    color: selectedSuggestion === index ? "#FFFFFF" : "#E0E0E0",
                    fontSize: "14px",
                    cursor: "default",
                    whiteSpace: "nowrap",
                    borderLeft:
                      selectedSuggestion === index
                        ? "2px solid #4EA6FF"
                        : "2px solid transparent",
                    transition: "background-color 0.1s ease",
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        )}
      </pre>
    </div>
  );
}
