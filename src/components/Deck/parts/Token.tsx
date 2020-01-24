import React from "react";

export type TokenProps = { beanId: string, opacity: number };

class Token extends React.Component<TokenProps>{
  opacity: number;
  constructor(props: TokenProps) {
    super(props);
    this.state = {
      beanId: props.beanId
    };
    this.opacity = props.opacity;
  }

  changeState = (obj: any) => {
    this.setState(obj);
  }

  startFlashTabTitle = () => {
  }

  render() {
    let cssClasses = 'float-left55 img-fluid rounded';
    let width = "25%";
    return (
        <div id="dd2" className="align-text-bottom float-left">
          <img alt="some image"  width={width} className={cssClasses} 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Sierpinski_carpet_4.svg" />
        </div>
    );
  }
}

export default Token;
