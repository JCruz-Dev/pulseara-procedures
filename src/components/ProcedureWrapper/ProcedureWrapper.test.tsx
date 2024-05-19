import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import ProcedureWrapper from "./ProcedureWrapper";
import { IProcedures } from "../../db/types";

const mockData: IProcedures = {
  procediment: "Test Procedure",
  procediment_code: "12345",
  procediment_difference: 100,
  reclaimed_amount: 200,
  insurance_authorized_amount: 150,
};
describe("ProcedureWrapper", () => {
  test("renders ProcedureWrapper component with correct data", () => {
    render(<ProcedureWrapper data={mockData} idx={1} />);

    // Check if ProcedureItems are rendered with correct titles and descriptions
    expect(screen.getByTestId("procedure-item-Procedimiento")).toContainHTML(
      "Test Procedure"
    );
    expect(screen.getByTestId("procedure-item-codigo")).toContainHTML("12345");
    expect(screen.getByTestId("procedure-item-reclamado")).toContainHTML(
      "RD$ 200"
    );
    expect(screen.getByTestId("procedure-item-difference")).toContainHTML(
      "RD$ 100"
    );
    expect(screen.getByTestId("procedure-item-insurance")).toContainHTML(
      "RD$ 150"
    );
  });
});
