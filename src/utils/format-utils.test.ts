import { dateToString } from "./format-utils";

describe("testing util functions", () => {
  it("should convert a date To local time String", () => {
    const date = new Date(2020,0,24);
    expect(dateToString(date)).toBe("1/24/2020 at 12:00:00 AM");
  });
});
