import { HashRouter as Router } from "react-router-dom";
import ErrorBoundary from "./../../components/ErrorBoundary/ErrorBoundary";
import PageContent from "./PageContent/PageContent";
import "./styles.scss";

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <PageContent />
      </Router>
    </ErrorBoundary>
  );
};

export default App;
