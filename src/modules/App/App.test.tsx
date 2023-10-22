import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import PageContent from "./PageContent/PageContent";
import { Provider } from "react-redux";
import { store } from "./../../redux/store";
import { Messages } from "../../constants/text";
import { RoutesPath } from "../../constants/routes";

test("initial page rendering", async () => {
  render(
    <Provider store={store}>
      <PageContent />
    </Provider>,
    { wrapper: BrowserRouter }
  );
  const text = Messages.HOME__BUTTON_TEXT;

  // verify page content for default route
  expect(screen.getByText(text)).toBeInTheDocument();
});

test("landing on a non-existant page", () => {
  const badRoute = "/some/bad/route";

  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <PageContent />
    </MemoryRouter>
  );

  // verify navigation to "no match" route
  expect(screen.getByText(Messages.WRONG_PAGE)).toBeInTheDocument();
});

test("rendering a chosen page", () => {
  const route = RoutesPath.ABOUT;

  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={[route]}>
      <Provider store={store}>
        <PageContent />
      </Provider>
    </MemoryRouter>
  );

  expect(screen.getByText(Messages.ABOUT__PARTING_WORDS)).toBeInTheDocument();
});
