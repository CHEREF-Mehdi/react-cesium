import { test } from "./api";

describe("api call",()=>{

    it("should be haja", async () => {
      expect(test()).toBe("");
    });

})

