import React, { Component } from 'react';

class Input extends Component {
    state = {  }
    render() { 
        //Dùng kiến thức phân rã this.props thì khi dùng code sẽ gọn hơn
        const {id, input, name,label,labelSize,inputRef,frmField,frmForm,err,errMessage,...others} = this.props;//props la nhung properties co sẵn của reactJS
        const size = labelSize ? labelSize : 3;
        const classLeft=`col-sm-${size} col-form-label`;
        const classRight=`col-sm-${12 - size}`;
        
        const inputClass = `form-control ${err? "is-invalid":" "}`;
        
        return ( 
            <div className="form-group row">
                <label htmlFor={id} className={classLeft}>{label}</label>
                <div className={classRight}>
                    { others["rows"] > 1 ? (
                        <textarea  ref={inputRef} className={inputClass} id={id} {...others} {...frmField}> </textarea>
                        ) : (
                        <input  ref={inputRef} className={inputClass} id={id} {...others} {...frmField}/>
                        // ) : (
                        // <radio></radio>
                        )
                    }
                    {err?<div className="invalid-feedback">{errMessage}</div>:null}
                    {/* <input type={this.props.type} className="form-control" id="inputEmail3" /> */}
                </div>
            </div>
         );
    }
}
 
export default Input;
