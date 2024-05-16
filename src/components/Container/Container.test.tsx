import { render } from "@testing-library/react";
import { describe, expect } from "vitest";
import Layout from "./Container";

describe("Container component", () => {
  it("The container component renders correctly"),
    () => {
      const { container } = render(
        <Layout>
          <p>Example</p>
        </Layout>
      );
      expect(container).toHaveClass("container");
    };
});
