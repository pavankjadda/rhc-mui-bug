import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/date-pickers">Date Pickers Test</Link> <br />
        </li>
        <li>
          <Link to="/dialog-demo">Dialog Demo</Link> <br />
        </li>
        <li>
          <Link to="/form-demo">Form Test</Link> <br />
        </li>
        <li>
          <Link to="/zod-form-demo">Zod Form Test</Link> <br />
        </li>
      </ul>
    </div>
  );
}
