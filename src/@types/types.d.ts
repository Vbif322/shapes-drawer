import React from "react";

export type tool = "cursor" | "shapes" | undefined;

export type shape = "circle" | "rect" | "star";

export interface BaseFigure {
  x: number;
  y: number;
  type: shape;
}

export interface Circle extends BaseFigure {
  radius: number;
  type: "circle";
}

export interface Rect extends BaseFigure {
  width: number;
  height: number;
  type: "rect";
}

export interface Star extends BaseFigure {
  numPoints: number;
  innerRadius: number;
  outerRadius: number;
  type: "star";
}

export type figure = Circle | Rect | Star;

export type temporaryFigure = (figure & { click: true }) | { click: false };

export type context = {
  tool: tool;
  setTool: React.Dispatch<React.SetStateAction<tool>>;
  shape: shape;
  setShape: React.Dispatch<React.SetStateAction<shape>>;
} | null;
