import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer,
  createContext,
  useContext,
  forwardRef,
  lazy,
  Suspense,
} from "react";
import { createPortal } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import "./App.css";

/* ================= CONTEXT ================= */
const UserContext = createContext();

/* ================= REDUCER ================= */
function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };
    case "dec":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

/* ================= CUSTOM HOOK ================= */
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  return [value, () => setValue((v) => !v)];
}

/* ================= FORWARD REF ================= */
const FancyInput = forwardRef((_, ref) => (
  <input
    ref={ref}
    className="input"
    placeholder="ForwardRef Input"
    aria-label="Forward ref input"
  />
));

/* ================= HOC ================= */
function withBorder(Component) {
  const WithBorder = (props) => (
    <div className="hoc-box">
      <Component {...props} />
    </div>
  );
  return WithBorder;
}

const SimpleText = () => <p>HOC Wrapped Component</p>;
const EnhancedText = withBorder(SimpleText);

/* ================= LAZY ================= */
const LazyComponent = lazy(() =>
  Promise.resolve({
    default: () => <p>Lazy Loaded Component</p>,
  })
);

/* ================= PORTAL ================= */
function Modal({ onClose }) {
  return createPortal(
    <div className="modal-overlay">
      <dialog open className="modal">
        <p>Portal Modal</p>
        <button className="btn danger" onClick={onClose}>
          Close
        </button>
      </dialog>
    </div>,
    document.body
  );
}

/* ================= ROUTE PAGES ================= */
function Page({ children }) {
  return <div className="route-page">{children}</div>;
}

function Home() {
  return <Page>🏠 Home Page</Page>;
}

function About() {
  return <Page>ℹ️ About Page</Page>;
}

function Contact() {
  return <Page>📞 Contact Page</Page>;
}

/* ================= APP ================= */
export default function App() {
  const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [isOn, toggle] = useToggle(false);
  const [dark, setDark] = useState(false);

  const inputRef = useRef(null);
  const fancyRef = useRef(null);

  const doubleCount = useMemo(() => count * 2, [count]);
  const increment = useCallback(() => setCount((c) => c + 1), []);

  useEffect(() => {
    console.log("Count updated:", count);
  }, [count]);

  return (
    <UserContext.Provider value="Aditya Janjanam">
      <BrowserRouter>
        <div className={`page ${dark ? "dark" : ""}`}>
          <div className="container">

            <h1 className="title">🚀 React All-in-One (Single JSX)</h1>

            {/* DARK MODE */}
            <button
              className="btn secondary"
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
            >
              {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            {/* NAV */}
            <nav className="nav" aria-label="Main navigation">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>

            {/* PROPS */}
            <Card title="Props">
              <User name="Aditya" role="Full Stack Developer" />
            </Card>

            {/* EVENTS + CONDITIONAL */}
            <Card title="Events & Conditionals">
              <p>{loggedIn ? "✅ Logged In" : "❌ Logged Out"}</p>
              <button
                className="btn secondary"
                onClick={() => setLoggedIn(!loggedIn)}
              >
                Toggle Login
              </button>
            </Card>

            {/* FORMS */}
            <Card title="Forms">
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                aria-label="Name input"
              />
              <p>Typed Name: {name}</p>
            </Card>

            {/* COUNTER */}
            <Card title="useState & useMemo">
              <p>Count: {count}</p>
              <p>Double: {doubleCount}</p>
              <button className="btn primary" onClick={increment}>
                +
              </button>
              <button
                className="btn danger"
                onClick={() => setCount(count - 1)}
              >
                -
              </button>
            </Card>

            {/* REDUCER */}
            <Card title="useReducer">
              <p>Count: {state.count}</p>
              <button
                className="btn primary"
                onClick={() => dispatch({ type: "inc" })}
              >
                +
              </button>
              <button
                className="btn danger"
                onClick={() => dispatch({ type: "dec" })}
              >
                -
              </button>
            </Card>

            {/* CUSTOM HOOK */}
            <Card title="Custom Hook">
              <p>Status: {isOn ? "ON" : "OFF"}</p>
              <button className="btn secondary" onClick={toggle}>
                Toggle
              </button>
            </Card>

            {/* useRef */}
            <Card title="useRef">
              <input ref={inputRef} className="input" placeholder="Focus me" />
              <button
                className="btn secondary"
                onClick={() => inputRef.current.focus()}
              >
                Focus Input
              </button>
            </Card>

            {/* forwardRef */}
            <Card title="forwardRef">
              <FancyInput ref={fancyRef} />
              <button
                className="btn secondary"
                onClick={() => fancyRef.current.focus()}
              >
                Focus
              </button>
            </Card>

            {/* HOC */}
            <Card title="HOC">
              <EnhancedText />
            </Card>

            {/* SUSPENSE */}
            <Card title="Suspense">
              <Suspense fallback={<p>Loading...</p>}>
                <LazyComponent />
              </Suspense>
            </Card>

            {/* TRANSITION */}
            <Card title="Transitions">
              <button
                className="btn secondary"
                onClick={() => setShowBox(!showBox)}
              >
                Toggle Box
              </button>
              <div className={`box ${showBox ? "show" : ""}`}>
                Smooth Transition
              </div>
            </Card>

            {/* PORTAL */}
            <Card title="Portals">
              <button
                className="btn primary"
                onClick={() => setShowModal(true)}
              >
                Open Modal
              </button>
              {showModal && (
                <Modal onClose={() => setShowModal(false)} />
              )}
            </Card>

            {/* CONTEXT */}
            <Card title="Context API">
              <ContextChild />
            </Card>

            {/* FOOTER */}
            <Footer />

          </div>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

/* ================= COMPONENTS ================= */
function User({ name, role }) {
  return (
    <p>
      👤 <b>{name}</b> — {role}
    </p>
  );
}

function ContextChild() {
  const user = useContext(UserContext);
  return <p>Context User: {user}</p>;
}

function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

/* ================= FOOTER ================= */
function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 React All-in-One by Aditya Janjanam</p>
    </footer>
  );
}
