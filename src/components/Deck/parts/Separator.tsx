import React from "react";

class OwnCardsSeparator extends React.Component {//<Props, State>{
  //     initialTitle: string;
  //   constructor(props: Props) {
  //     super(props);
  //     this.state = {
  //       beanId: props.beanId,
  //       isVisible: true 

  //     };
  //     this.initialTitle = document.title;
  //   }


  render() {

    return (
      <div id="dd2" className="float-bottom container-fluid hd-100 w-sdf100 dd-inline-block ml-3 px-2" style={{ "width": "200px", "height": "10%" }}>
        <div className="row">
          <div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>
        </div>
      </div>
    );
  }
}

export default OwnCardsSeparator;
//<div className="col-md-3 col-sm-3 col-xs-3" style={{"width" :"200px"}}>r</div>
// className="container-fluid px-0">
//<img onClick={this.click} src={this.state.imgSrc} alt="some image" className='img-fluid w-100'/>
