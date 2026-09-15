import { useState, useRef } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search unga browser la support aagala. Chrome try pannunga.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      onSearch(transcript); // voice result la direct search trigger
    };

    recognition.onerror = (event) => {
      console.error("Voice search error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceSearch = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center", gap: "6px" }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={isListening ? "Listening..." : "Search products..."}
        style={{ padding: "6px 10px", borderRadius: "6px" }}
      />
      <button type="submit">Search</button>
      <button
        type="button"
        onClick={isListening ? stopVoiceSearch : startVoiceSearch}
      >
        {isListening ? "🎙️ Stop" : "🎤"}
      </button>
    </form>
  );
}

export default SearchBar;