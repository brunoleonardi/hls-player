import { useState, useRef } from 'react';
import HlsPlayer from 'react-hls-player';
import './App.css';

const STREAM_OPTIONS = [
  { value: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { value: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' },
  { value: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8' },
  { value: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8' },
];

const CUSTOM_OPTION_VALUE = '__custom__';

function App() {
  const playerRef = useRef(null);
  const [selectedStream, setSelectedStream] = useState(STREAM_OPTIONS[0].value);
  const [customUrl, setCustomUrl] = useState('');
  const [streamUrl, setStreamUrl] = useState(STREAM_OPTIONS[0].value);

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedStream(value);
    if (value !== CUSTOM_OPTION_VALUE) {
      setStreamUrl(value);
      setCustomUrl('');
    }
  };

  const handleLoadCustomStream = (event) => {
    event.preventDefault();
    if (!customUrl.trim()) {
      return;
    }
    const trimmedUrl = customUrl.trim();
    setStreamUrl(trimmedUrl);
  };

  return (
    <div className="App">
      <section className="App-container">
        <h1>HLS Player</h1>
        <p className="App-description">
          Biblioteca usada: {' '}
          <code>react-hls-player</code>.
        </p>

        <section className="Stream-section">
          <label className="Stream-label" htmlFor="stream-select">
            Selecione uma stream
          </label>
          <select
            id="stream-select"
            className="Stream-select"
            value={selectedStream}
            onChange={handleSelectChange}
          >
            {STREAM_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.value}
              </option>
            ))}
            <option value={CUSTOM_OPTION_VALUE}>Outro (URL personalizada)</option>
          </select>

          {selectedStream === CUSTOM_OPTION_VALUE && (
            <form
              className="Stream-form"
              onSubmit={handleLoadCustomStream}
              aria-label="Formulário para carregar URL personalizada"
            >
              <label htmlFor="stream-url">URL personalizada (.m3u8)</label>
              <div className="Stream-inputGroup">
                <input
                  id="stream-url"
                  type="url"
                  placeholder="https://exemplo.com/playlist.m3u8"
                  value={customUrl}
                  onChange={(event) => setCustomUrl(event.target.value)}
                  required
                />
                <button type="submit">Carregar stream</button>
              </div>
            </form>
          )}
        </section>

        <div className="Player-wrapper">
          <HlsPlayer
            playerRef={playerRef}
            src={streamUrl}
            autoPlay={false}
            controls={true}
            width="100%"
            height="auto"
          />
        </div>
      </section>
    </div>
  );
}

export default App;
