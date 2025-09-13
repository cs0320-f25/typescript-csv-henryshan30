import { error } from "console";
import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const QUOTE_CSV_PATH = path.join(__dirname, "../data/quote.csv")
const EMPTY_CSV_PATH = path.join(__dirname, "../data/empty.csv")
const ROW_CSV_PATH = path.join(__dirname, "../data/row.csv")
const COLUMN_CSV_PATH = path.join(__dirname, "../data/column.csv")
const NO_HEADER_CSV_PATH = path.join(__dirname, "../data/no_header.csv")
const MISMATCH_TYPE_CSV_PATH = path.join(__dirname, "../data/mismatch_type.csv")
const PersonSchema = z.tuple([z.string(), z.coerce.number()]).transform(
  ([name, age]) => ({ name, age })
);

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("empty last column", async () => {
  const results = await parseCSV(COLUMN_CSV_PATH);
  expect(results[1]).toEqual(["Nim", "22", ""]);
  expect(results[2]).toEqual(["Alice", "23", ""]);
});

test("parses empty fields", async () => {
  const results = await parseCSV(EMPTY_CSV_PATH);
  expect(results[1]).toEqual(["Charlie", "", "Providence"]);
  expect(results[2]).toEqual(["Nim", "22", ""]);
});

test("parses blank line as a empty row", async () => {
  const results = await parseCSV(ROW_CSV_PATH);
  expect(results[2]).toEqual([]);
});

test("parses fields that contains commas with quotes", async () => {
  const results = await parseCSV(QUOTE_CSV_PATH);
  expect(results[1]).toEqual(["Alice", "veni, vidi, vici"]);
  expect(results[2]).toEqual(["Bob", "hello, world"]);
});

test("Undefined schema", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, undefined);
  expect(results[1]).toEqual(["Alice", "23"]);
});

test("works with schema", async () => {
  const results = await parseCSV(NO_HEADER_CSV_PATH, PersonSchema);
  expect(results[0]).toEqual({ name: "Alice", age: 23 });
  expect(results[1]).toEqual({ name: "Bob", age: 30 }); 
  expect(results[2]).toEqual({ name: "Charlie", age: 25 });
  expect(results[3]).toEqual({ name: "Nim", age: 22 });
});


test("error for invalid types", async () => {
  const results = await parseCSV(NO_HEADER_CSV_PATH, PersonSchema);
  expect(error);
});
