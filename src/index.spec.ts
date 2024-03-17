import start from "./index"

test("should start app", () => {
  expect(start()).toBe("[INFO] Process started.")
})
