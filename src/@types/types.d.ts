import React from "react";

export type tool = "cursor" | "shapes" | "";

export type shape = "circle" | "rect" | "star" | "";

export type figure = {
  x: number;
  y: number;
  type: shape;
  width?: number;
  height?: number;
  radius?: number;
  numPoints?: number;
  innerRadius?: number;
  outerRadius?: number;
};

export type context = {
  tool: tool;
  setTool: React.Dispatch<React.SetStateAction<tool>>;
  shape: shape;
  setShape: React.Dispatch<React.SetStateAction<shape>>;
} | null;
