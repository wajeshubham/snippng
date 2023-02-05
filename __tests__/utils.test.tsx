import { deepClone } from "@/utils";

describe("Utils", () => {
  it("deep clones the javascript object", async () => {
    let date = new Date().toISOString();
    let updatedDate = new Date().setFullYear(2002);

    const objectToBeCloned = {
      name: "John",
      age: 20,
      marks: {
        science: 70,
        math: 75,
      },
      birthDate: date,
    };
    const clonedObject = deepClone(objectToBeCloned);
    clonedObject.name = "Updated";
    clonedObject.marks.science = 10;
    clonedObject.birthDate = updatedDate;

    expect(objectToBeCloned.name).toBe("John");
    expect(objectToBeCloned.marks.science).toBe(70);
    expect(objectToBeCloned.birthDate).toBe(date);

    expect(clonedObject.name).toBe("Updated");
    expect(clonedObject.marks.science).toBe(10);
    expect(clonedObject.birthDate).toBe(updatedDate);
  });
});
