import localforage from "localforage";
import sortBy from "sort-by";
import { matchSorter } from "match-sorter";

const set = (contents) => localforage.setItem("contents", contents);

export const getContents = async (searchQuery) => {
  let contents = await localforage.getItem("contents");
  if (searchQuery)
    contents = matchSorter(contents, searchQuery, {
      keys: ["title", "tags", "link", "notes"],
    });
  return contents.sort(sortBy(""));
};
