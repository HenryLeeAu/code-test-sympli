import { render, waitFor, fireEvent } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { setupServer } from "msw/node";
import { rest } from "msw";

import reducers from "./redux/reducers";
import App from "./App";

describe("<App />", () => {
  const tarUrl = "https://swapi.dev/api/people";
  const filmUrl = "https://swapi.dev/api/films/1";
  const resData = {
    next: "http://swapi.dev/api/people/?page=2",
    previous: null,
    results: [
      {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        birth_year: "19BBY",
        gender: "male",
        films: [filmUrl],
        url: "http://swapi.dev/api/people/1",
      },
      {
        name: "C-3PO",
        height: "167",
        mass: "75",
        birth_year: "112BBY",
        gender: "n/a",
        films: [
          "http://swapi.dev/api/films/1/",
          "http://swapi.dev/api/films/2/",
          "http://swapi.dev/api/films/3/",
          "http://swapi.dev/api/films/4/",
          "http://swapi.dev/api/films/5/",
          "http://swapi.dev/api/films/6/",
        ],
        url: "http://swapi.dev/api/people/2/",
      },
    ],
  };
  const resFilm = {
    title: "A New Hope",
    url: filmUrl,
  };

  const initStore = () => {
    return createStore(reducers, applyMiddleware(thunk));
  };
  const handlers = [
    rest.get(tarUrl, (req, res, ctx) => {
      return res(ctx.json(resData));
    }),
    rest.get(filmUrl, (req, res, ctx) => {
      return res(ctx.json(resFilm));
    }),
  ];
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders loading screen", async () => {
    const { queryByTestId } = render(
      <Provider store={initStore()}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(queryByTestId("screen-loading")).toBeTruthy();
    });
  });

  it("renders failed screen", async () => {
    server.use(
      rest.get(tarUrl, (res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { queryByTestId } = render(
      <Provider store={initStore()}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(queryByTestId("screen-failed")).toBeTruthy();
    });
  });

  it("open and close modal", async () => {
    const { queryByTestId, getAllByTestId, queryByText } = render(
      <Provider store={initStore()}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(queryByTestId("table")).toBeTruthy();
    });

    fireEvent.click(getAllByTestId("row")[0]);

    await waitFor(() => {
      expect(queryByText(resFilm.title)).toBeTruthy();
    });

    fireEvent.click(queryByText("Close"));

    await waitFor(() => {
      expect(queryByTestId("modal")).toBeFalsy();
    });
  });
});
