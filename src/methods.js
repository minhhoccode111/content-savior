import localforage from "localforage";
import sortBy from "sort-by";
import { matchSorter } from "match-sorter";

export const set = (contents) => localforage.setItem("contents", contents);

export const getContents = async (searchQuery) => {
  let contents = (await localforage.getItem("contents")) || [];
  if (searchQuery)
    contents = matchSorter(contents, searchQuery, {
      keys: ["title", "tags", "link", "notes"],
    });
  return contents.sort(sortBy("title", "createdAt", "tags"));
};

export const createContent = async () => {
  const id = Math.random().toString(36).slice(2, 9);
  const content = { id, createdAt: Date.now() };
  const contents = await getContents();
  contents.unshift(content);
  await set(contents);
  return content;
};

export const getContent = async (id) => {
  const contents = await localforage.getItem("contents");
  if (!contents) throw new Error(`That's content doesn't exist`);
  const content = contents.find((content) => content.id === id);
  return content ?? null;
};

export const updateContent = async (id, updates) => {
  const contents = await localforage.getItem("contents");
  const content = contents.find((content) => content.id === id);
  if (!content) throw new Error("No content found for ", id);
  Object.assign(content, updates);
  await set(contents);
  return content;
};

export const deleteContent = async (id) => {
  const contents = await localforage.getItem("contents");
  const index = contents.findIndex((content) => content.id === id);
  if (index > -1) {
    contents.splice(index, 1);
    await set(contents);
    return true;
  }
  return false;
};
