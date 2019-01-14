import * as React from 'react';
import * as Konva from 'konva';
import { KonvaNodeProps, Group, Rect, Label, Tag, Text } from 'react-konva';

import * as Style from '../style/canvas.json';
import { Port } from './port';


interface BoxProps extends Konva.ContainerConfig, KonvaNodeProps {
  /* Box label, shown below the box. */
  label: string;

  inputPorts: string[];
  outputPorts: string[];
}

interface BoxState {
  hovering: boolean;
}

export class Box extends React.Component<BoxProps,BoxState> {

  constructor(props: BoxProps) {
    super(props);
    this.state = {hovering: false};
  }

  render() {
    const { width, height, ...props } = this.props;
    const inputPortSep = height / (props.inputPorts.length + 1);
    const outputPortSep = height / (props.outputPorts.length + 1);

    /* Precalculate width of text label to center label via x offset.

    The only alternative is to grab the actual Text node via a `ref` and set
    the offset after the component has mounted:
    https://github.com/konvajs/react-konva/issues/6
    */
    const textWidth = new Konva.Text({
      text: props.label,
      fontSize: Style.boxFontSize
    }).getTextWidth();

    return (
      <Group {...props} offsetX={width/2} offsetY={height/2}>
        <Rect x={0} y={0}
          width={width} height={height}
          cornerRadius={5}
          fill={Style.boxBaseColor}
          stroke={this.state.hovering ? Style.strokeHighlightColor : Style.strokeColor}
          strokeWidth={Style.strokeWidth}
          onMouseEnter={evt => {
            // Move to top on hover to ensure tooltip not occluded.
            evt.target.findAncestors('Group').map(group => group.moveToTop());
            this.setState({hovering: true});
          }}
          onMouseLeave={() => this.setState({hovering: false})}
        />
        {props.inputPorts.map((label, i) =>
          <Port key={i} name={`${props.name}:in${i+1}`} label={label}
            x={0} y={(i+1) * inputPortSep}
          />
        )}
        {props.outputPorts.map((label, i) =>
          <Port key={i} name={`${props.name}:out${i+1}`} label={label}
            x={width} y={(i+1) * outputPortSep}
          />
        )}
        <Label x={width/2} y={height + Style.labelPadding}
          offsetX={textWidth/2 + Style.labelPadding} >
          <Tag cornerRadius={5}
            fill={Style.labelBaseColor} opacity={Style.labelOpacity} />
          <Text text={props.label} fontSize={Style.boxFontSize}
            fill={Style.labelTextColor} padding={Style.labelPadding} />
        </Label>
      </Group>
    );
  }
}