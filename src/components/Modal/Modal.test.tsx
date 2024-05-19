import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProcedureModal from "./ProcedureModal";
import { Provider as JotaiProvider, atom, createStore } from "jotai";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { mockProcedures } from "./mock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Server Config
const server = setupServer(
  http.post("/deleteToManyProcedures", () => {
    return HttpResponse.json({ success: true });
  }),
  http.post("/updateAllProcedure", () => {
    return HttpResponse.json({ success: true });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ProcedureModal", () => {
  test("opens and closes the modal", () => {
    const proceduresAtom = atom(mockProcedures);
    const store = createStore();
    store.set(proceduresAtom, []);

    const queryClient = new QueryClient();

    render(
      <JotaiProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <ProcedureModal />
        </QueryClientProvider>
      </JotaiProvider>
    );

    const openButton = screen.getByText("Editar procedimientos");
    fireEvent.click(openButton);

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    const closeButton = screen.getByAltText("Close modal icon");
    fireEvent.click(closeButton);

    waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });
  });
});

describe("ProcedureModal", () => {
  test("adds a new procedure", () => {
    const proceduresAtom = atom(mockProcedures);
    const store = createStore();
    store.set(proceduresAtom, []);
    render(
      <JotaiProvider store={store}>
        <QueryClientProvider client={new QueryClient()}>
          <ProcedureModal />
        </QueryClientProvider>
      </JotaiProvider>
    );

    const openButton = screen.getByText("Editar procedimientos");
    fireEvent.click(openButton);

    const addButton = screen.getByText("Añadir procedimiento");
    fireEvent.click(addButton);

    const procedureItems = screen.getAllByText(/Procedimiento/);
    expect(procedureItems).toHaveLength(2);
  });

  test("removes a procedure", async () => {
    const proceduresAtom = atom(mockProcedures);
    const store = createStore();
    store.set(proceduresAtom, []);

    render(
      <JotaiProvider store={store}>
        <QueryClientProvider client={new QueryClient()}>
          <ProcedureModal />
        </QueryClientProvider>
      </JotaiProvider>
    );

    const openButton = screen.getByText("Editar procedimientos");
    fireEvent.click(openButton);

    // const removeButtons = container.querySelectorAll(
    //   ".button-eliminar-procedimiento"
    // );

    await waitFor(() => {
      const procedureItems = screen.getAllByText(/Procedimiento/);
      expect(procedureItems).toHaveLength(1);
    });
  });

  test("submits the form", async () => {
    const proceduresAtom = atom(mockProcedures);
    const store = createStore();
    store.set(proceduresAtom, []);
    render(
      <JotaiProvider store={store}>
        <QueryClientProvider client={new QueryClient()}>
          <ProcedureModal />
        </QueryClientProvider>
      </JotaiProvider>
    );

    const openButton = screen.getByText("Editar procedimientos");
    fireEvent.click(openButton);

    const submitButton = screen.getByText("Guardar cambios");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
