import { IMarkdownNode } from '../types';

export type Offset = [number, number];

export function extractText(node: IMarkdownNode): [string, Offset[]] {
  let accumulator = '';

  let queue: IMarkdownNode[] = [node];

  const offsets: Offset[] = [];

  while (queue.length) {
    const curr = queue.shift()!;

    if (curr.value) {
      offsets.push([accumulator.length, accumulator.length + curr.value.length]);
      accumulator += curr.value;
    }

    if (curr.children) {
      queue = [...curr.children, ...queue];
    }
  }

  return [accumulator, offsets];
}
