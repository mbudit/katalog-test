
import HTMLFlipBook from 'react-pageflip';
import './App.css';

// Fix for React PageFlip TS errors
const FlipBook = HTMLFlipBook as any;

// Dynamically import all images in the catalogue-pages folder
// @ts-ignore
const imagesGlob = import.meta.glob('./assets/catalogue-pages/catalogue-*.png', { eager: true, query: '?url', import: 'default' });

const sortedImages = Object.entries(imagesGlob)
  .sort(([pathA], [pathB]) => {
    const numA = parseInt(pathA.match(/catalogue-(\d+)\.png/)?.[1] || '0', 10);
    const numB = parseInt(pathB.match(/catalogue-(\d+)\.png/)?.[1] || '0', 10);
    return numA - numB;
  })
  .map(([_, url]) => url as string);

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Exclusive Collection</h1>
        <p>Swipe or drag pages to explore our latest catalog.</p>
      </header>
      
      <main className="catalog-wrapper">
        <div className="book-container">
          <FlipBook
            width={595}
            height={842}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="flip-book"
            showPageCorners={true}
            flippingTime={800}
            usePortrait={false}
            drawShadow={true}
            startZIndex={20}
            startPage={0}
            useMouseEvents={true}
            swipeDistance={30}
          >
            {sortedImages.map((src, index) => (
              <div className="page" key={index}>
                <div className="page-content">
                  <img src={src} alt={`Page ${index + 1}`} className="page-image" draggable="false" />
                  <div className="page-number">{index + 1}</div>
                </div>
              </div>
            ))}
          </FlipBook>
        </div>
      </main>
    </div>
  );
}

export default App;
