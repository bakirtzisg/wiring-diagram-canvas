/* JSON format for flow graphs (wiring diagrams).
 *
 * We use the same format as Catlab.jl for serializing wiring diagrams as JSON.
 * It is based on the JSON graph format used in the KIELER project and its
 * successor ELK (Eclipse Layout Kernel).
 *
 * References:
 *
 * - KEILER's JSON graph format:
 *   https://rtsys.informatik.uni-kiel.de/confluence/display/KIELER/JSON+Graph+Format
 *
 * - ELK's JSON graph format:
 *   https://www.eclipse.org/elk/documentation/tooldevelopers/graphdatastructure/jsonformat.html
 */

/** A flow graph, aka wiring diagram.
*/
export interface FlowGraph extends Box {
  /** Boxes in flow graph. */
  children: Box[];

  /** Wires in flow graph. */
  edges: Wire[];
}

/** Box in a flow graph.
 */
export interface Box extends GraphElement {
  /** Input and output ports of box. */
  ports?: Port[];

  /** x coordinate of box, with origin at box center. */
  x?: number;

  /** y coordinate of box, with origin at box center. */
  y?: number;

  /** Width of box. */
  width?: number;

  /** Height of box. */
  height?: number;
}

/** Port attached to a box.
 */
export interface Port extends GraphElement {
  /** Is the port an input port or an output port? */
  portkind: string; // 'input' | 'output';
}

/** Wire between boxes in a flow graph.
 */
export interface Wire extends GraphElement {
  /** ID of source box. */
  source: string;

  /** ID of source port. */
  sourcePort?: string;

  /** ID of target box. */
  target: string;

  /** ID of target port. */
  targetPort?: string;

  /** Source point of wire, relative to center of source box. */
  sourcePoint?: Point;

  /** Target point of wire, relative to center of target box. */
  targetPoint?: Point;

  /** Bend points of wire, including source and target points. */
  bendPoints?: Point[];
}

/** Abstract base interface for elements in a flow graph.
 */
interface GraphElement {
  /** ID of graph element. */
  id?: string;

  /** Text labels associated with graph element.
   * 
   * Currently, we allow elements to have at most one label.
   */
  labels?: {
    text: string;
  }[];

  /** Arbitrary JSON data associated with graph element. */
  properties?: {
    [key: string]: any;
  };
}

/** Point in the Cartesian plane.
 */
export interface Point {
  /** x coordinate of point. */
  x: number;

  /** y coordinate of point. */
  y: number;
}
