import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addTodo = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("todos", { text: args.text, completed: false });
  },
});

export const getTodos = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("todos").collect();
  },
});

export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    text: v.string(),
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { text: args.text, completed: args.completed });
  },
});

export const deleteTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});