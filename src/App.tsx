import * as React from "react";

/**
 * Props Cardio
 *
 * This page has several components that accept and consume props.
 * Your job is to add the neccessary type annotations that represent
 * the props of the components.
 *
 * Comments above each section of components give hints as to how to
 * properly add types to the components.
 *
 * You'll know that you are done when all of the red squiggles are gone.
 */

// HTML Element Mirroring
type VariantColors = "primary" | "secondary";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variantColor?: VariantColors;
}

const Button = ({ variantColor, style, ...props }: ButtonProps) => {
  const innerStyle = {
    ...style,
    color: "white",
    backgroundColor:
      variantColor === "primary" ? "rgb(26,100,255)" : "rgb(170,170,170)"
  };
  return <button style={innerStyle} {...props} />;
};

// Basic Props
const Counter = ({ count }: { count: number }) => {
  return <h1>Count: {count}</h1>;
};
const CounterButtons = ({
  setCount
}: {
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div>
      <Button
        variantColor="primary"
        onClick={() => setCount((count) => count - 1)}
      >
        -
      </Button>
      <Button onClick={() => setCount((count) => count + 1)}>+</Button>
    </div>
  );
};

// Children Prop & Style Prop
const Tooltip = ({
  children,
  contents,
  style
}: {
  children: React.ReactNode;
  contents: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          ...style,
          display: hovered ? "block" : "none",
          position: "absolute",
          top: "100%"
        }}
      >
        {contents}
      </div>
      {children}
    </div>
  );
};

// Render Props
const MousePosition = ({
  children
}: {
  children: ({ x, y }: { x: number; y: number }) => React.ReactElement;
}) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    function onMove(event: MouseEvent) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return children(mousePosition);
};

// Don't change anything below this point
// Any of the red squiggles down here will
// go away once you fix the issues above.
export default function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <div>See the instructions in the code editor.</div>
      <Tooltip contents="Counter Tooltip">
        <Counter count={count} />
      </Tooltip>
      <CounterButtons setCount={setCount} />
      <MousePosition>
        {({ x, y }) => (
          <Tooltip
            style={{
              border: "solid 1px rgba(255,255,255,0.2)",
              padding: "6px",
              borderRadius: "3px"
            }}
            contents={
              <span style={{ color: "red" }}>Mouse Position Tooltip</span>
            }
          >
            <h2>
              Mouse Position: {x}, {y}
            </h2>
          </Tooltip>
        )}
      </MousePosition>
    </div>
  );
}
